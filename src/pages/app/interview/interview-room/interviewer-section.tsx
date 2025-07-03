import React from "react";

import Icon from "../../../../components/icon";
import { useGlobalContext } from "../../../../context";
import CreateStripePaymentModal from "./create-stripe-payment-modal";
import { generateInterviewResponseStream } from "../../../../utils/openai";
import interviewQuestionsData from "../../../../data/interview-questions.json";
// @ts-ignore
import { MicVAD } from "@ricky0123/vad-web";

import { loadStripe } from "@stripe/stripe-js";
import { restApi } from "../../../../context/restApi";

const InterviewerSection = () => {
    const [state, { dispatch }] = useGlobalContext();
    const mediaRecorderRef = React.useRef<MediaRecorder | null>(null);
    const vadRef = React.useRef<any>(null);
    const audioChunksRef = React.useRef<Blob[]>([]);
    const isRecordingRef = React.useRef<boolean>(false);
    const micStreamRef = React.useRef<MediaStream | null>(null);
    const recentSpeechRef = React.useRef<string>('');
    const lastSpeechTimeRef = React.useRef<number>(0);
    const speechAccumulationTimeoutRef = React.useRef<number | null>(null);

    const [screenStream, setScreenStream] = React.useState<MediaStream | null>(null);
    const [micStream, setMicStream] = React.useState<MediaStream | null>(null);
    const [isOpenModal, setIsOpenModal] = React.useState(false);
    const [isPremium, setIsPremium] = React.useState(false);
    const [isTranscribing, setIsTranscribing] = React.useState(false);
    const [transcribedText, setTranscribedText] = React.useState("");
    const [isSpeaking, setIsSpeaking] = React.useState(false);
    const [vadStatus, setVadStatus] = React.useState<'idle' | 'requesting-permission' | 'listening' | 'speaking' | 'processing' | 'accumulating'>('idle');

    const [stripePromise, setStripePromise] = React.useState(null as any);

    React.useEffect(() => {
        const fetchClientSecret = async () => {
            const res = await restApi.postRequest('get-stripe-client-secret');
            if (res.data.publishableKey) {
                setStripePromise(loadStripe(res.data.publishableKey));
            }
        };

        fetchClientSecret();
    }, []);

    React.useEffect(() => {
        setIsPremium(state.user.isPremium);
    }, [state.user])

    // Initialize VAD with available audio source (screen share or microphone)
    const initializeVADWithAudio = async (audioStream: MediaStream) => {
        try {
            console.log("Initializing VAD with audio stream...");
            setVadStatus('requesting-permission');

            dispatch({ type: 'currentQuestion', payload: '🎤 Initializing voice detection...' });
            dispatch({ type: 'streamingResponse', payload: '🔄 Setting up audio processing...' });
            dispatch({ type: 'isStreamingResponse', payload: true });

            // Store the audio stream
            setMicStream(audioStream);
            micStreamRef.current = audioStream;

            console.log("Audio stream ready, initializing VAD...");

            // Initialize VAD with the audio stream
            const vad = await MicVAD.new({
                onSpeechStart: () => {
                    console.log("🎤 Speech started");
                    setIsSpeaking(true);
                    setVadStatus('speaking');
                    startRecording();
                    
                    dispatch({ type: 'currentQuestion', payload: '🎤 Listening...' });
                    dispatch({ type: 'streamingResponse', payload: '🎙️ Speaker detected, recording...' });
                    dispatch({ type: 'isStreamingResponse', payload: true });
                },
                onSpeechEnd: (audio) => {
                    console.log("🔇 Speech ended");
                    setIsSpeaking(false);
                    setVadStatus('processing');
                    stopRecording();
                    
                    dispatch({ type: 'currentQuestion', payload: '🔄 Processing speech...' });
                    dispatch({ type: 'streamingResponse', payload: '🔄 Speech ended, processing audio...' });
                    
                    // Process the audio from VAD immediately (no delay)
                    processVADAudio(audio);
                },
                onVADMisfire: () => {
                    console.log("🔇 VAD misfire - false positive");
                    setIsSpeaking(false);
                    setVadStatus('listening');
                    stopRecording();
                },
                // Optimized VAD Configuration for longer speech with natural pauses
                preSpeechPadFrames: 2, // Increased padding to catch speech start better
                redemptionFrames: 15, // Increased to handle natural pauses (1.5 seconds)
                frameSamples: 1536, // Increased for better quality
                positiveSpeechThreshold: 0.25, // Slightly higher to avoid false starts
                negativeSpeechThreshold: 0.15, // Higher to be more tolerant of pauses
                minSpeechFrames: 8, // Longer minimum to avoid cutting off short pauses
                submitUserSpeechOnPause: false, // Don't submit on short pauses
                // Use the provided audio stream
                stream: audioStream
            });

            vadRef.current = vad;

            // Start VAD
            await vad.start();
            setVadStatus('listening');

            dispatch({ type: 'currentQuestion', payload: '🎧 Voice detection active' });
            dispatch({ type: 'streamingResponse', payload: '🎯 Ready to detect speech from audio...' });
            dispatch({ type: 'isStreamingResponse', payload: true });

            console.log("VAD initialized and started successfully");

        } catch (error) {
            console.error("Error initializing VAD:", error);
            setVadStatus('idle');
            dispatch({ type: 'streamingResponse', payload: '⚠️ Error initializing voice detection. Please check permissions.' });
            dispatch({ type: 'isStreamingResponse', payload: false });
        }
    };

    // Request microphone permission and initialize VAD (fallback method)
    const initializeMicrophoneAndVAD = async () => {
        try {
            console.log("Requesting separate microphone permission...");
            setVadStatus('requesting-permission');

            dispatch({ type: 'currentQuestion', payload: '🎤 Requesting microphone permission...' });
            dispatch({ type: 'streamingResponse', payload: '🔒 Please allow microphone access for voice detection' });
            dispatch({ type: 'isStreamingResponse', payload: true });

            // Request microphone access
            const microphoneStream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    sampleRate: 16000
                }
            });

            // Initialize VAD with microphone stream
            await initializeVADWithAudio(microphoneStream);

        } catch (error) {
            console.error("Error initializing microphone and VAD:", error);
            setVadStatus('idle');
            dispatch({ type: 'streamingResponse', payload: '⚠️ Error accessing microphone. Please check permissions.' });
            dispatch({ type: 'isStreamingResponse', payload: false });
        }
    };

    // Start recording when speech is detected
    const startRecording = () => {
        if (isRecordingRef.current) return;

        try {
            // Use microphone stream for recording, not screen share
            if (micStreamRef.current) {
                const mediaRecorder = new MediaRecorder(micStreamRef.current, {
                    mimeType: 'audio/webm'
                });

                mediaRecorderRef.current = mediaRecorder;
                audioChunksRef.current = [];

                mediaRecorder.ondataavailable = (event) => {
                    if (event.data.size > 0) {
                        audioChunksRef.current.push(event.data);
                    }
                };

                mediaRecorder.onstop = () => {
                    console.log('MediaRecorder stopped');
                };

                isRecordingRef.current = true;
                mediaRecorder.start();
                console.log("📹 Recording started with microphone");
            }
        } catch (error) {
            console.error("Error starting recording:", error);
        }
    };

    // Stop recording when speech ends
    const stopRecording = () => {
        if (!isRecordingRef.current) return;

        try {
            if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
                mediaRecorderRef.current.stop();
                isRecordingRef.current = false;
                console.log("⏹️ Recording stopped");
            }
        } catch (error) {
            console.error("Error stopping recording:", error);
        }
    };

    // Process audio from VAD
    const processVADAudio = async (vadAudio: Float32Array) => {
        try {
            setIsTranscribing(true);
            
            // Show processing state
            dispatch({ type: 'currentQuestion', payload: '🔄 Processing speech...' });
            dispatch({ type: 'streamingResponse', payload: '🔄 Converting speech to text...' });
            
            // Convert Float32Array to WAV Blob for API
            const audioBlob = float32ArrayToWav(vadAudio, 16000);
            
            console.log('Processing VAD audio, size:', audioBlob.size);

            const formData = new FormData();
            formData.append('audio', audioBlob, 'audio.wav');

            const response = await restApi.postRequest('ai/speech-to-text', formData);

            if (response && response.data && response.data.success) {
                const transcribedText = response.data.transcribed_text;

                if (transcribedText && transcribedText.trim().length > 0) {
                    console.log('VAD transcription:', transcribedText);
                    
                    // Check if this is a continuation of recent speech
                    const currentTime = Date.now();
                    const timeSinceLastSpeech = currentTime - lastSpeechTimeRef.current;
                    const shouldAccumulate = timeSinceLastSpeech < 3000 && recentSpeechRef.current.length > 0;
                    
                    if (shouldAccumulate) {
                        // Accumulate with previous speech
                        const combinedText = recentSpeechRef.current + ' ' + transcribedText;
                        recentSpeechRef.current = combinedText;
                        console.log('Accumulating speech:', combinedText);
                        
                        setVadStatus('accumulating');
                        dispatch({ type: 'currentQuestion', payload: '🔄 Accumulating speech...' });
                        dispatch({ type: 'streamingResponse', payload: `📝 Combined: "${combinedText}"` });
                        
                        // Set a timeout to process the accumulated speech if no more speech comes
                        if (speechAccumulationTimeoutRef.current) {
                            clearTimeout(speechAccumulationTimeoutRef.current);
                        }
                        
                        speechAccumulationTimeoutRef.current = setTimeout(() => {
                            console.log('Processing accumulated speech:', recentSpeechRef.current);
                            processAccumulatedSpeech(recentSpeechRef.current);
                        }, 2000); // Wait 2 seconds for more speech
                        
                    } else {
                        // Fresh speech or too much time passed
                        recentSpeechRef.current = transcribedText;
                        lastSpeechTimeRef.current = currentTime;
                        setTranscribedText(transcribedText);
                        
                        // Show transcribed text
                        dispatch({ type: 'currentQuestion', payload: '🎙️ Speech Transcribed' });
                        dispatch({ type: 'streamingResponse', payload: transcribedText });
                        dispatch({ type: 'isStreamingResponse', payload: true });

                        // Set a timeout to process if no more speech comes
                        if (speechAccumulationTimeoutRef.current) {
                            clearTimeout(speechAccumulationTimeoutRef.current);
                        }
                        
                        speechAccumulationTimeoutRef.current = setTimeout(() => {
                            // Process as interview question immediately
                            if (recentSpeechRef.current.trim().length > 3) {
                                processTranscribedText(recentSpeechRef.current);
                            } else {
                                // Too short, continue listening
                                resetToListening();
                            }
                        }, 2000); // Wait 2 seconds for potential continuation
                    }
                    
                } else {
                    // No speech detected, continue listening
                    resetToListening();
                }
            } else {
                console.error('API response error:', response);
                resetToListening();
            }

        } catch (error) {
            console.error('Error processing VAD audio:', error);
            resetToListening();
        } finally {
            setIsTranscribing(false);
        }
    };

    // Process accumulated speech
    const processAccumulatedSpeech = (finalText: string) => {
        console.log('Processing final accumulated speech:', finalText);
        setTranscribedText(finalText);
        
        // Clear accumulation state
        recentSpeechRef.current = '';
        lastSpeechTimeRef.current = 0;
        
        if (speechAccumulationTimeoutRef.current) {
            clearTimeout(speechAccumulationTimeoutRef.current);
            speechAccumulationTimeoutRef.current = null;
        }
        
        // Process the final text
        if (finalText.trim().length > 3) {
            processTranscribedText(finalText);
        } else {
            resetToListening();
        }
    };

    // Reset to listening state
    const resetToListening = () => {
        setVadStatus('listening');
        dispatch({ type: 'streamingResponse', payload: '🎯 Ready to detect speech...' });
        dispatch({ type: 'isStreamingResponse', payload: true });
    };

    // Convert Float32Array to WAV Blob
    const float32ArrayToWav = (audioData: Float32Array, sampleRate: number): Blob => {
        const length = audioData.length;
        const arrayBuffer = new ArrayBuffer(44 + length * 2);
        const view = new DataView(arrayBuffer);

        // WAV header
        const writeString = (offset: number, string: string) => {
            for (let i = 0; i < string.length; i++) {
                view.setUint8(offset + i, string.charCodeAt(i));
            }
        };

        writeString(0, 'RIFF');
        view.setUint32(4, 36 + length * 2, true);
        writeString(8, 'WAVE');
        writeString(12, 'fmt ');
        view.setUint32(16, 16, true);
        view.setUint16(20, 1, true);
        view.setUint16(22, 1, true);
        view.setUint32(24, sampleRate, true);
        view.setUint32(28, sampleRate * 2, true);
        view.setUint16(32, 2, true);
        view.setUint16(34, 16, true);
        writeString(36, 'data');
        view.setUint32(40, length * 2, true);

        // Convert float32 to int16
        let offset = 44;
        for (let i = 0; i < length; i++) {
            const sample = Math.max(-1, Math.min(1, audioData[i]));
            view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7FFF, true);
            offset += 2;
        }

        return new Blob([arrayBuffer], { type: 'audio/wav' });
    };

    // Process transcribed text and generate AI response
    const processTranscribedText = async (transcribedText: string) => {
        if (!transcribedText.trim()) {
            setVadStatus('listening');
            dispatch({ type: 'isStreamingResponse', payload: false });
            dispatch({ type: 'streamingResponse', payload: '🎯 Ready to detect speech...' });
            return;
        }

        setVadStatus('processing');

        // Use the transcribed text as the question
        const question = transcribedText;

        // Display the question first  
        dispatch({ type: 'currentQuestion', payload: `🎤 Question: "${question}"` });
        dispatch({ type: 'currentResponse', payload: '' });
        dispatch({ type: 'isStreamingResponse', payload: true });

        // Show processing message
        dispatch({ type: 'streamingResponse', payload: '🤖 Generating AI response...' });

        try {
            // Generate streaming response using openai-streams with transcribed text as context
            let streamingText = '';
            await generateInterviewResponseStream(
                question,
                // onChunk: called for each piece of text received
                (chunk: string) => {
                    streamingText += chunk;
                    dispatch({
                        type: 'streamingResponse',
                        payload: streamingText
                    });
                },
                // onComplete: called when streaming is finished
                (fullResponse: string) => {
                    dispatch({ type: 'isStreamingResponse', payload: false });
                    dispatch({ type: 'currentResponse', payload: fullResponse });
                    dispatch({ type: 'streamingResponse', payload: '' });

                    // Add to conversation history
                    const conversationEntry = {
                        question: question,
                        answer: fullResponse,
                        timestamp: new Date()
                    };
                    dispatch({
                        type: 'conversationHistory',
                        payload: [...state.conversationHistory, conversationEntry]
                    });

                    // Clear current question and response after adding to history
                    setTimeout(() => {
                        dispatch({ type: 'currentQuestion', payload: '' });
                        dispatch({ type: 'currentResponse', payload: '' });
                        setVadStatus('listening');
                        dispatch({ type: 'streamingResponse', payload: '🎯 Ready to detect speech...' });
                        dispatch({ type: 'isStreamingResponse', payload: true });
                    }, 1500); // Reduced from 3000ms to 1500ms for faster cycling
                },
                // onError: called if there's an error
                (error: Error) => {
                    console.error('Error processing question:', error);
                    dispatch({ type: 'isStreamingResponse', payload: false });
                    dispatch({ type: 'isLoadingResponse', payload: false });
                    dispatch({ type: 'currentResponse', payload: 'Sorry, I encountered an error generating a response.' });

                    // Reset to listening state faster
                    setTimeout(() => {
                        setVadStatus('listening');
                        dispatch({ type: 'streamingResponse', payload: '🎯 Ready to detect speech...' });
                        dispatch({ type: 'isStreamingResponse', payload: true });
                    }, 1000); // Reduced from 2000ms to 1000ms for faster error recovery
                },
                transcribedText
            );

        } catch (error) {
            console.error('Error processing question:', error);
            dispatch({ type: 'isLoadingResponse', payload: false });
            dispatch({ type: 'isStreamingResponse', payload: false });
            dispatch({ type: 'currentResponse', payload: 'Sorry, I encountered an error generating a response.' });

            // Reset to listening state faster
            setTimeout(() => {
                setVadStatus('listening');
                dispatch({ type: 'streamingResponse', payload: '🎯 Ready to detect speech...' });
                dispatch({ type: 'isStreamingResponse', payload: true });
            }, 1000); // Reduced from 2000ms to 1000ms for faster error recovery
        }
    };

    // Cleanup function
    const cleanup = () => {
        // Stop VAD
        if (vadRef.current) {
            vadRef.current.destroy();
            vadRef.current = null;
        }
        
        // Stop microphone stream
        if (micStreamRef.current) {
            micStreamRef.current.getTracks().forEach(track => track.stop());
            micStreamRef.current = null;
        }
        
        // Stop recording
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
            mediaRecorderRef.current.stop();
        }
        
        // Stop screen stream
        if (screenStream) {
            screenStream.getTracks().forEach(track => track.stop());
        }
        
        // Clear accumulation timeout and reset state
        if (speechAccumulationTimeoutRef.current) {
            clearTimeout(speechAccumulationTimeoutRef.current);
            speechAccumulationTimeoutRef.current = null;
        }
        recentSpeechRef.current = '';
        lastSpeechTimeRef.current = 0;
    };

    // Cleanup on unmount
    React.useEffect(() => {
        return () => {
            cleanup();
        };
    }, []);

    // Handle screen sharing and VAD initialization
    const handleScreenShare = async () => {
        try {
            // if (!isPremium) {
            //     setIsOpenModal(true);
            //     return;
            // }

            if (screenStream) {
                // Stop everything
                cleanup();

                setScreenStream(null);
                setMicStream(null);

                // Reset state
                setVadStatus('idle');
                setIsSpeaking(false);
                setTranscribedText("");
                setIsTranscribing(false);
                isRecordingRef.current = false;
                audioChunksRef.current = [];

                dispatch({ type: 'currentQuestion', payload: '' });
                dispatch({ type: 'currentResponse', payload: '' });
                dispatch({ type: 'streamingResponse', payload: '' });
                dispatch({ type: 'isLoadingResponse', payload: false });
                dispatch({ type: 'isStreamingResponse', payload: false });
                dispatch({ type: 'isSharedScreen', payload: false });
            } else {
                // Start screen sharing - try to get audio first
                console.log("Starting screen sharing with audio...");
                const mediaStream = await navigator.mediaDevices.getDisplayMedia({
                    video: true,
                    audio: true // Try to get audio from screen share
                });

                setScreenStream(mediaStream);
                dispatch({ type: 'isSharedScreen', payload: true });

                // Check if screen share has audio tracks
                const audioTracks = mediaStream.getAudioTracks();
                console.log("Screen share audio tracks:", audioTracks.length);

                // Handle stream stop from browser UI
                mediaStream.getVideoTracks()[0].onended = () => {
                    cleanup();
                    setScreenStream(null);
                    setMicStream(null);
                    setVadStatus('idle');
                };

                // Initialize VAD with available audio
                setTimeout(async () => {
                    if (audioTracks.length > 0) {
                        console.log("Using screen share audio for VAD");
                        // Create audio-only stream from screen share
                        const audioStream = new MediaStream(audioTracks);
                        await initializeVADWithAudio(audioStream);
                    } else {
                        console.log("No audio in screen share, requesting separate microphone");
                        // Fall back to separate microphone
                        await initializeMicrophoneAndVAD();
                    }
                }, 1000);
            }
        } catch (err) {
            console.error("Error with screen share:", err);
            setVadStatus('idle');
            dispatch({ type: 'streamingResponse', payload: '⚠️ Error with screen sharing' });
        }
    };

    // Get status display info
    const getStatusDisplay = () => {
        switch (vadStatus) {
            case 'idle':
                return { text: 'Ready', color: 'bg-gray-400' };
            case 'requesting-permission':
                return { text: 'Requesting Microphone', color: 'bg-orange-500' };
            case 'listening':
                return { text: 'Listening for Speech', color: 'bg-blue-500' };
            case 'speaking':
                return { text: 'Recording Speech', color: 'bg-green-500' };
            case 'processing':
                return { text: 'Processing Speech', color: 'bg-yellow-500' };
            case 'accumulating':
                return { text: 'Accumulating Speech', color: 'bg-purple-500' };
            default:
                return { text: 'Ready', color: 'bg-gray-400' };
        }
    };

    const statusDisplay = getStatusDisplay();

    return (
        <div className="min-w-[150px] w-1/5">
            <div className="flex h-full flex-1 flex-col bg-slate-100">
                <div className="flex h-12 items-center rounded-t-lg border border-slate-100 bg-white px-4">
                    <div className="flex min-h-7 flex-1 items-center justify-between">
                        <div className="flex flex-row items-center text-sm font-semibold text-slate-900">
                            <p className="mr-2 flex-1">Interviewer says:</p>
                        </div>
                        <div className="flex items-center rounded-full border border-slate-100 px-2.5 py-1.5">
                            <span className="relative me-2 flex h-2 w-2">
                                <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${statusDisplay.color}`} />
                                <span className={`relative inline-flex h-2 w-2 rounded-full ${statusDisplay.color}`} />
                            </span>
                            <span className="text-sm font-medium text-slate-700">
                                {statusDisplay.text}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="relative flex items-center justify-center bg-black lg:h-44 lg:max-h-44 2xl:h-56 2xl:max-h-56 min-h-32">
                    {screenStream ? (
                        <div className="flex max-h-full w-full justify-center lg:h-44 lg:max-h-44 2xl:h-56 2xl:max-h-56">
                            <video
                                className="max-h-full object-contain"
                                autoPlay
                                ref={video => {
                                    if (video) {
                                        video.srcObject = screenStream;
                                    }
                                }}
                            />
                        </div>
                    ) : (
                        <div className="flex h-full flex-col items-center justify-center gap-2">
                            <p className="text-center text-md font-semibold text-slate-50">
                                Connect to your interview meeting room
                            </p>
                            <p className="text-center text-sm text-slate-300">
                                Screen sharing (with audio if available) for voice detection
                            </p>
                            <button
                                className={`flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium text-white px-5 py-2.5 bg-sky-600 hover:bg-sky-700`}
                                onClick={handleScreenShare}
                            >
                                <Icon icon={screenStream ? "Close" : "Cursor"} className="w-5 h-5 text-white" />
                                <span className="text-[#f8fafc]">
                                    {screenStream ? 'Stop Sharing' : 'Start'}
                                </span>
                            </button>
                        </div>
                    )}
                </div>
                <div className="flex min-h-52 h-full flex-col max-h-screen border border-slate-100 bg-white flex-[2]">
                    {screenStream ? (
                        <div className="flex h-full w-full flex-col p-4 overflow-y-auto">
                            <div className="mb-4">
                                <h4 className="text-sm font-semibold text-slate-700 mb-2">Real-time Voice Detection</h4>
                                <div className="p-3 bg-slate-50 rounded-lg border min-h-20">
                                    {vadStatus === 'requesting-permission' ? (
                                        <div className="flex items-center text-orange-600">
                                            <div className="animate-spin mr-2 h-4 w-4 border-2 border-orange-600 border-t-transparent rounded-full"></div>
                                            Requesting microphone permission...
                                        </div>
                                    ) : vadStatus === 'processing' && isTranscribing ? (
                                        <div className="flex items-center text-blue-600">
                                            <div className="animate-spin mr-2 h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full"></div>
                                            Converting speech to text...
                                        </div>
                                    ) : vadStatus === 'accumulating' ? (
                                        <div className="flex items-center text-purple-600">
                                            <div className="animate-pulse mr-2 h-3 w-3 bg-purple-500 rounded-full"></div>
                                            <span className="font-semibold">🔄 Accumulating speech segments...</span>
                                        </div>
                                    ) : vadStatus === 'speaking' ? (
                                        <div className="flex items-center text-green-600">
                                            <div className="animate-pulse mr-2 h-3 w-3 bg-green-500 rounded-full"></div>
                                            <span className="font-semibold">
                                                🎤 Recording speech from {
                                                    screenStream && screenStream.getAudioTracks().length > 0 ? 
                                                        'screen share audio' : 'microphone'
                                                }...
                                            </span>
                                        </div>
                                    ) : vadStatus === 'listening' ? (
                                        <div className="flex items-center text-blue-600">
                                            <div className="animate-pulse mr-2 h-3 w-3 bg-blue-500 rounded-full"></div>
                                            <span className="font-semibold">
                                                🎧 Listening for speech via {
                                                    screenStream && screenStream.getAudioTracks().length > 0 ? 
                                                        'screen share audio' : 'microphone'
                                                }...
                                            </span>
                                        </div>
                                    ) : transcribedText ? (
                                        <p className="text-sm text-slate-700">{transcribedText}</p>
                                    ) : (
                                        <p className="text-sm text-slate-500 italic">Voice detection ready...</p>
                                    )}
                                </div>
                            </div>

                            {/* Microphone Status */}
                            <div className="mb-4">
                                <h4 className="text-sm font-semibold text-slate-700 mb-2">Audio Sources</h4>
                                <div className="space-y-2">
                                    <div className="flex items-center text-sm">
                                        <div className={`w-2 h-2 rounded-full mr-2 ${screenStream ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                                        <span>Screen Share: {screenStream ? 'Active' : 'Inactive'}</span>
                                    </div>
                                    <div className="flex items-center text-sm">
                                        <div className={`w-2 h-2 rounded-full mr-2 ${micStream ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                                        <span>
                                            Audio Source: {micStream ?
                                                (screenStream && screenStream.getAudioTracks().length > 0 ?
                                                    'Screen Share Audio' : 'Microphone') :
                                                'Inactive'}
                                        </span>
                                    </div>
                                    <div className="flex items-center text-sm">
                                        <div className={`w-2 h-2 rounded-full mr-2 ${vadRef.current ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                                        <span>Voice Detection: {vadRef.current ? 'Active' : 'Inactive'}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Conversation History */}
                            {state.conversationHistory.length > 0 && (
                                <div className="flex-1">
                                    <h4 className="text-sm font-semibold text-slate-700 mb-2">Conversation History</h4>
                                    <div className="space-y-3">
                                        {state.conversationHistory.map((entry, index) => (
                                            <div key={index} className="border-l-2 border-blue-200 pl-3">
                                                <p className="text-xs text-slate-500 mb-1">Question:</p>
                                                <p className="text-sm text-slate-700 mb-2">{entry.question}</p>
                                                <p className="text-xs text-slate-500 mb-1">AI Response:</p>
                                                <p className="text-sm text-slate-600">{entry.answer}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex h-full w-full flex-col justify-center items-center text-slate-500 pt-2">
                            <div>
                                <h4 className="px-6 text-center text-sm font-medium">Once you start screen sharing</h4>
                                <h4 className="px-6 text-center text-sm font-medium">voice detection will use your screen share audio (if available)</h4>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {isOpenModal && <CreateStripePaymentModal setIsPremium={setIsPremium} handleScreenShare={handleScreenShare} isOpen={isOpenModal} onClose={() => setIsOpenModal(false)} stripePromise={stripePromise} />}
        </div>
    )
}

export default InterviewerSection;