import React from "react";

import Icon from "../../../../components/icon";
import { useGlobalContext } from "../../../../context";
import CreateStripePaymentModal from "./create-stripe-payment-modal";
import { generateInterviewResponseStream } from "../../../../utils/openai";
import interviewQuestionsData from "../../../../data/interview-questions.json";

import { loadStripe } from "@stripe/stripe-js";
import { restApi } from "../../../../context/restApi";

const InterviewerSection = () => {
    const [state, { dispatch }] = useGlobalContext();
    const mediaRecorderRef = React.useRef<MediaRecorder | null>(null);
    const chunksRef = React.useRef<Blob[]>([]);

    const [screenStream, setScreenStream] = React.useState<MediaStream | null>(null);
    const [isOpenModal, setIsOpenModal] = React.useState(false);
    const [isPremium, setIsPremium] = React.useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
    const [isProcessingQuestion, setIsProcessingQuestion] = React.useState(false);
    const [audioChunks, setAudioChunks] = React.useState<Blob[]>([]);
    const [isTranscribing, setIsTranscribing] = React.useState(false);
    const [transcribedText, setTranscribedText] = React.useState("");

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

    // Function to transcribe audio using Whisper
    const transcribeAudio = async (audioBlob: Blob) => {
        try {
            setIsTranscribing(true);

            const formData = new FormData();
            formData.append('audio', audioBlob, 'audio.wav');

            const response = await restApi.postRequest('ai/speech-to-text', formData);

            if (response.data.success) {
                const transcribedText = response.data.transcribed_text;
                setTranscribedText(transcribedText);
                console.log('Transcribed text:', transcribedText);

                // Process the transcribed text as a question
                await processTranscribedText(transcribedText);
            }

        } catch (error) {
            console.error('Error transcribing audio:', error);
        } finally {
            setIsTranscribing(false);
        }
    };

    // Process transcribed text and generate AI response
    const processTranscribedText = async (transcribedText: string) => {
        if (!transcribedText.trim()) {
            return;
        }

        // Use the transcribed text as the question
        const question = transcribedText;

        // Display the question first
        dispatch({ type: 'currentQuestion', payload: question });
        dispatch({ type: 'currentResponse', payload: '' });
        dispatch({ type: 'isLoadingResponse', payload: true });

        try {
            // Start streaming response
            dispatch({ type: 'isLoadingResponse', payload: false });
            dispatch({ type: 'isStreamingResponse', payload: true });
            dispatch({ type: 'streamingResponse', payload: '' });

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
                    }, 3000);
                },
                // onError: called if there's an error
                (error: Error) => {
                    console.error('Error processing question:', error);
                    dispatch({ type: 'isStreamingResponse', payload: false });
                    dispatch({ type: 'isLoadingResponse', payload: false });
                    dispatch({ type: 'currentResponse', payload: 'Sorry, I encountered an error generating a response.' });
                },
                transcribedText
            );

        } catch (error) {
            console.error('Error processing question:', error);
            dispatch({ type: 'isLoadingResponse', payload: false });
            dispatch({ type: 'isStreamingResponse', payload: false });
            dispatch({ type: 'currentResponse', payload: 'Sorry, I encountered an error generating a response.' });
        }
    };

    // Handle continuous audio recording and transcription
    React.useEffect(() => {
        if (screenStream && mediaRecorderRef.current && !isProcessingQuestion) {
            setIsProcessingQuestion(true);

            // Set up continuous audio processing
            const processAudioChunks = () => {
                if (chunksRef.current.length > 0) {
                    const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
                    chunksRef.current = []; // Clear chunks after processing

                    // Transcribe the audio
                    transcribeAudio(audioBlob);
                }
            };

            // Process audio chunks every 10 seconds
            const audioProcessingInterval = setInterval(processAudioChunks, 10000);

            return () => {
                clearInterval(audioProcessingInterval);
            };
        }
    }, [screenStream, isProcessingQuestion]);

    const handleScreenShare = async () => {
        try {

            // if (!isPremium) {
            //     setIsOpenModal(true);
            //     return;
            // }

            if (screenStream) {
                // Stop recording if it's running
                if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
                    mediaRecorderRef.current.stop();
                }
                screenStream.getTracks().forEach(track => track.stop());
                setScreenStream(null);

                // Reset processing state
                setIsProcessingQuestion(false);
                setCurrentQuestionIndex(0);
                dispatch({ type: 'currentQuestion', payload: '' });
                dispatch({ type: 'currentResponse', payload: '' });
                dispatch({ type: 'streamingResponse', payload: '' });
                dispatch({ type: 'isLoadingResponse', payload: false });
                dispatch({ type: 'isStreamingResponse', payload: false });
                dispatch({ type: 'isSharedScreen', payload: false });
            } else {
                const mediaStream = await navigator.mediaDevices.getDisplayMedia({
                    video: true,
                    audio: true
                    // {
                    //     suppressLocalAudioPlayback: false,
                    //     mediaSource: 'desktop'
                    // }
                });

                setScreenStream(mediaStream);

                dispatch({ type: 'isSharedScreen', payload: true });

                // Set up MediaRecorder for audio
                const audioStream = new MediaStream(mediaStream.getAudioTracks());
                const mediaRecorder = new MediaRecorder(audioStream, {
                    mimeType: 'audio/webm'
                });

                mediaRecorderRef.current = mediaRecorder;
                chunksRef.current = [];

                mediaRecorder.ondataavailable = (event) => {
                    if (event.data.size > 0) {
                        chunksRef.current.push(event.data);
                    }
                };

                mediaRecorder.onstop = () => {
                    // Final transcription when recording stops
                    if (chunksRef.current.length > 0) {
                        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
                        transcribeAudio(audioBlob);
                    }
                    chunksRef.current = [];
                };

                // Start recording with timeslice for continuous chunks
                mediaRecorder.start(5000); // Get chunks every 5 seconds

                // Handle stream stop from browser UI
                mediaStream.getVideoTracks()[0].onended = () => {
                    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
                        mediaRecorderRef.current.stop();
                    }
                    setScreenStream(null);
                };

                // Play the audio
                const audioContext = new AudioContext();
                const source = audioContext.createMediaStreamSource(mediaStream);
                const audioDestination = audioContext.createMediaStreamDestination();
                source.connect(audioDestination);

                const audioElement = new Audio();
                audioElement.srcObject = mediaStream;
                audioElement.play();
            }
        } catch (err) {
            console.error("Error with screen share:", err);
        }
    };

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
                                <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${isTranscribing ? 'bg-blue-500' : 'bg-green-500'}`} />
                                <span className={`relative inline-flex h-2 w-2 rounded-full ${isTranscribing ? 'bg-blue-500' : 'bg-green-500'}`} />
                            </span>
                            <span className="text-sm font-medium text-slate-700">
                                {isTranscribing ? 'Transcribing...' : screenStream ? 'Listening' : 'Ready'}
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
                            <button
                                className={`flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium text-white px-5 py-2.5 bg-sky-600 hover:bg-sky-700`}
                                onClick={handleScreenShare}
                            >
                                <Icon icon={screenStream ? "Close" : "Cursor"} className="w-5 h-5 text-white" />
                                <span className="text-[#f8fafc]">
                                    {screenStream ? 'Stop Sharing' : 'Select'}
                                </span>
                            </button>
                        </div>
                    )}
                </div>
                <div className="flex min-h-52 h-full flex-col max-h-screen border border-slate-100 bg-white flex-[2]">
                    {screenStream ? (
                        <div className="flex h-full w-full flex-col p-4 overflow-y-auto">
                            <div className="mb-4">
                                <h4 className="text-sm font-semibold text-slate-700 mb-2">Live Transcription</h4>
                                <div className="p-3 bg-slate-50 rounded-lg border min-h-20">
                                    {isTranscribing ? (
                                        <div className="flex items-center text-blue-600">
                                            <div className="animate-spin mr-2 h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full"></div>
                                            Processing audio...
                                        </div>
                                    ) : transcribedText ? (
                                        <p className="text-sm text-slate-700">{transcribedText}</p>
                                    ) : (
                                        <p className="text-sm text-slate-500 italic">Listening for speech...</p>
                                    )}
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
                                <h4 className="px-6 text-center text-sm font-medium">Once you have selected the interview meeting room</h4>
                                <h4 className="px-6 text-center text-sm font-medium">live transcription will be displayed here.</h4>
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