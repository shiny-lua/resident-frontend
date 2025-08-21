import React, { useState, useRef, useEffect } from "react";
import { restApi } from "../../../../context/restApi";
import { showToast } from "../../../../context/helper";

// TypeScript declaration for SpeechRecognition
declare global {
    interface Window {
        SpeechRecognition: any;
        webkitSpeechRecognition: any;
    }
}

interface AIAvatarSectionProps {
    currentQuestion: string;
    sessionCode: string;
    questionIndex: number;
    onQuestionAudioReady: (audioUrl: string) => void;
    onVoiceResponseReceived: (transcribedText: string, responseData?: any) => void;
    isPlaying: boolean;
    onPlayStateChange: (isPlaying: boolean) => void;
}

const AIAvatarSection: React.FC<AIAvatarSectionProps> = ({
    currentQuestion,
    sessionCode,
    questionIndex,
    onQuestionAudioReady,
    onVoiceResponseReceived,
    isPlaying,
    onPlayStateChange
}) => {
    const [isLoadingAudio, setIsLoadingAudio] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [recordingTime, setRecordingTime] = useState(0);
    const [isProcessingResponse, setIsProcessingResponse] = useState(false);
    const [transcribedText, setTranscribedText] = useState("");

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const recognitionRef = useRef<any>(null);

    // Generate question audio when question changes
    useEffect(() => {
        console.log('Audio generation useEffect triggered:', { 
            currentQuestion, 
            sessionCode, 
            questionIndex,
            hasQuestion: !!currentQuestion,
            questionLength: currentQuestion?.length || 0
        });
        
        if (currentQuestion && currentQuestion.trim() && sessionCode) {
            console.log('Triggering generateQuestionAudio for question:', currentQuestion.substring(0, 100) + '...');
            generateQuestionAudio();
        } else {
            console.log('Missing required props for audio generation:', { 
                currentQuestion: !!currentQuestion, 
                sessionCode: !!sessionCode,
                questionNotEmpty: currentQuestion?.trim()?.length > 0
            });
        }
    }, [currentQuestion, sessionCode, questionIndex]);

    // Auto-play question audio when it's ready
    useEffect(() => {
        if (audioUrl && !isPlaying && !isRecording) {
            const timer = setTimeout(() => {
                playQuestionAudio();
            }, 500); // Small delay to ensure audio is loaded

            return () => clearTimeout(timer);
        }
    }, [audioUrl, isPlaying, isRecording]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (recordingIntervalRef.current) {
                clearInterval(recordingIntervalRef.current);
            }
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
            if (audioUrl) {
                URL.revokeObjectURL(audioUrl);
            }
        };
    }, []);

    const generateQuestionAudio = async () => {
        try {
            console.log('Generating question audio for:', { sessionCode, questionIndex, currentQuestion });
            setIsLoadingAudio(true);
            
            // Add validation before API call
            if (!sessionCode || questionIndex < 0) {
                console.error('Invalid parameters for audio generation:', { sessionCode, questionIndex });
                showToast('Invalid session parameters', 'error');
                return;
            }
            
            const response = await restApi.getRealtimeVoiceQuestionAudio(sessionCode, questionIndex);

            console.log('Audio API response:', response);
            console.log('Response status:', response?.status);
            console.log('Response data:', response?.data);

            if (response?.data?.status === 'success') {
                const { audio_data } = response.data.data;
                console.log('Audio data received, length:', audio_data?.length);

                if (!audio_data) {
                    console.error('No audio data received from API');
                    showToast('No audio data received', 'error');
                    return;
                }

                // Convert base64 to blob and create URL
                const audioBlob = base64ToBlob(audio_data, 'audio/wav');
                const newAudioUrl = URL.createObjectURL(audioBlob);

                // Cleanup previous audio URL
                if (audioUrl) {
                    URL.revokeObjectURL(audioUrl);
                }

                setAudioUrl(newAudioUrl);
                onQuestionAudioReady(newAudioUrl);
                console.log('Audio URL generated successfully:', newAudioUrl);
            } else {
                console.error('API response error:', response);
                console.error('Response status:', response?.status);
                console.error('Response data:', response?.data);
                showToast('Failed to generate question audio', 'error');
            }
        } catch (error: any) {
            console.error('Error generating question audio:', error);
            console.error('Error details:', {
                message: error.message,
                stack: error.stack,
                sessionCode,
                questionIndex,
                currentQuestion
            });
            showToast('Error generating question audio', 'error');
        } finally {
            setIsLoadingAudio(false);
        }
    };

    const base64ToBlob = (base64: string, mimeType: string): Blob => {
        const byteCharacters = atob(base64);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        return new Blob([byteArray], { type: mimeType });
    };

    const playQuestionAudio = async () => {
        if (!audioUrl) return;

        try {
            onPlayStateChange(true);
            if (audioRef.current) {
                audioRef.current.currentTime = 0;
                await audioRef.current.play();
            }
        } catch (error) {
            console.error('Error playing audio:', error);
            showToast('Error playing question audio', 'error');
            onPlayStateChange(false);
        }
    };

    const handleAudioEnded = () => {
        onPlayStateChange(false);
    };

    const handleAudioError = () => {
        showToast('Error playing audio', 'error');
        onPlayStateChange(false);
    };

    const startRecording = async () => {
        try {
            console.log('startRecording called, getting user media...');
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            console.log('User media stream obtained');
            
            mediaRecorderRef.current = new MediaRecorder(stream);
            audioChunksRef.current = [];

            mediaRecorderRef.current.ondataavailable = (event) => {
                console.log('Media recorder data available, chunk size:', event.data.size);
                audioChunksRef.current.push(event.data);
            };

            mediaRecorderRef.current.onstop = async () => {
                console.log('Media recorder onstop triggered, processing audio...');
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
                console.log('Audio blob created, size:', audioBlob.size, 'bytes');
                await processVoiceResponse(audioBlob);

                // Stop all tracks
                stream.getTracks().forEach(track => track.stop());
            };

            mediaRecorderRef.current.start();
            console.log('Media recorder started');
            setIsRecording(true);
            setRecordingTime(0);
            setTranscribedText("");

            // Start recording timer
            recordingIntervalRef.current = setInterval(() => {
                setRecordingTime(prev => prev + 1);
            }, 1000);

            // Start speech recognition to detect "That is all"
            startSpeechRecognition();

        } catch (error) {
            console.error('Error starting recording:', error);
            showToast('Error accessing microphone', 'error');
        }
    };

    const startSpeechRecognition = () => {
        try {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (!SpeechRecognition) {
                console.warn('Speech recognition not supported');
                return;
            }

            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = true;
            recognitionRef.current.interimResults = true;
            recognitionRef.current.lang = 'en-US';

            recognitionRef.current.onresult = (event: any) => {
                let finalTranscript = '';
                let interimTranscript = '';

                for (let i = event.resultIndex; i < event.results.length; i++) {
                    const transcript = event.results[i][0].transcript;
                    if (event.results[i].isFinal) {
                        finalTranscript += transcript;
                    } else {
                        interimTranscript += transcript;
                    }
                }

                const fullText = finalTranscript + interimTranscript;
                console.log('Speech recognition result:', { finalTranscript, interimTranscript, fullText });
                setTranscribedText(fullText);

                // Check if "That is all" is said
                if (fullText.toLowerCase().includes('that is all') || 
                    fullText.toLowerCase().includes("that's all") ||
                    fullText.toLowerCase().includes('that is it') ||
                    fullText.toLowerCase().includes("that's it")) {
                    console.log('Detected "That is all" - stopping recording');
                    stopRecording();
                }
            };

            recognitionRef.current.onerror = (event: any) => {
                console.error('Speech recognition error:', event.error);
            };

            recognitionRef.current.start();
            console.log('Speech recognition started');
        } catch (error) {
            console.error('Error starting speech recognition:', error);
        }
    };

    const stopRecording = () => {
        console.log('stopRecording called, current state:', { 
            hasMediaRecorder: !!mediaRecorderRef.current, 
            isRecording, 
            hasAudioChunks: audioChunksRef.current.length 
        });
        
        if (mediaRecorderRef.current && isRecording) {
            console.log('Stopping media recorder...');
            mediaRecorderRef.current.stop();
            setIsRecording(false);

            if (recordingIntervalRef.current) {
                clearInterval(recordingIntervalRef.current);
                recordingIntervalRef.current = null;
            }

            if (recognitionRef.current) {
                recognitionRef.current.stop();
                recognitionRef.current = null;
            }
            
            console.log('Recording stopped, audio chunks:', audioChunksRef.current.length);
        } else {
            console.log('Cannot stop recording - conditions not met');
        }
    };

    // Auto-start recording when question changes
    useEffect(() => {
        console.log('Auto-start recording useEffect triggered:', {
            currentQuestion: !!currentQuestion,
            sessionCode: !!sessionCode,
            isRecording,
            isProcessingResponse,
            audioUrl: !!audioUrl,
            hasValidQuestion: currentQuestion?.trim()?.length > 0,
            questionText: currentQuestion?.substring(0, 50) + '...'
        });
        
        if (currentQuestion?.trim() && sessionCode && !isRecording && !isProcessingResponse && audioUrl) {
            // Small delay to ensure question audio has played
            console.log('All conditions met, starting recording in 2 seconds...');
            const timer = setTimeout(() => {
                console.log('Starting recording after delay...');
                startRecording();
            }, 2000); // 2 second delay after question loads

            return () => clearTimeout(timer);
        } else {
            console.log('Recording conditions not met:', {
                hasQuestion: !!currentQuestion?.trim(),
                hasSessionCode: !!sessionCode,
                notRecording: !isRecording,
                notProcessing: !isProcessingResponse,
                hasAudioUrl: !!audioUrl
            });
        }
    }, [currentQuestion, sessionCode, isRecording, isProcessingResponse, audioUrl]);

    const processVoiceResponse = async (audioBlob: Blob) => {
        try {
            setIsProcessingResponse(true);
            console.log('Processing voice response...');

            // Convert Blob to File for the API
            const audioFile = new File([audioBlob], 'response.wav', { type: 'audio/wav' });
            
            // Use the real-time processing endpoint
            const response = await restApi.processRealtimeResponse(sessionCode, audioFile);

            console.log('Voice response processing result:', response);

            if (response?.status === 200 && response.data?.data) {
                const result = response.data.data;
                
                if (result.status === 'completed') {
                    // Interview completed - show final feedback
                    showToast('Interview completed!', 'success');
                    // Notify parent component with response data
                    onVoiceResponseReceived(transcribedText, result);
                } else if (result.status === 'success') {
                    // Response processed successfully, next question generated
                    showToast('Response processed successfully', 'success');
                    console.log('Next question data:', result.next_question);
                    console.log('Question index:', result.question_index);
                    
                    // Notify parent component with the transcribed text and response data
                    onVoiceResponseReceived(transcribedText, result);
                } else {
                    console.error('Unexpected response status:', result.status);
                    showToast('Unexpected response from server', 'error');
                }
            } else {
                console.error('Failed to process voice response:', response);
                showToast('Failed to process voice response', 'error');
            }
        } catch (error) {
            console.error('Error processing voice response:', error);
            showToast('Error processing voice response', 'error');
        } finally {
            setIsProcessingResponse(false);
            setRecordingTime(0);
            setTranscribedText(""); // Clear transcribed text after processing
        }
    };

    const formatTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="flex flex-col justify-between h-full bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* AI Avatar Header */}
            <div className="p-4 border-b bg-white">
                <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">AI Interviewer</h3>
                        <p className="text-sm text-gray-600">Your virtual interview assistant</p>
                    </div>
                </div>
            </div>

            {/* AI Avatar Visual */}
            <div className="min-w-[150px] flex-1">
                <div className="relative flex h-full flex-1 flex-col justify-center items-center bg-slate-900">
                    <video
                        src="/video/avatar.mp4"
                        className="w-full h-full rounded-xl"
                        autoPlay={true}
                        playsInline={true}
                        loop={true}
                    />
                </div>
            </div>

            {/* Voice Controls */}
            <div className="p-4 border-t bg-white">
                <div className="space-y-3">
                    {/* Debug Test Button */}
                    <div className="flex justify-center">
                        <button
                            onClick={() => {
                                console.log('Manual test: Processing voice response...');
                                const testBlob = new Blob(['test audio data'], { type: 'audio/wav' });
                                processVoiceResponse(testBlob);
                            }}
                            className="px-3 py-1 bg-yellow-500 text-white text-xs rounded hover:bg-yellow-600"
                        >
                            Test Voice Processing
                        </button>
                    </div>
                    
                    {/* Question Audio Status */}
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">Question Audio</span>
                        <div className="flex items-center space-x-2">
                            {isLoadingAudio && (
                                <div className="flex items-center space-x-2">
                                    <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-blue-600"></div>
                                    <span className="text-sm text-blue-600 font-medium">Loading...</span>
                                </div>
                            )}
                            {isPlaying && (
                                <div className="flex items-center space-x-2">
                                    <div className="animate-pulse w-3 h-3 bg-blue-500 rounded-full"></div>
                                    <span className="text-sm text-blue-600 font-medium">Playing...</span>
                                </div>
                            )}
                            {!isLoadingAudio && !isPlaying && audioUrl && (
                                <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                    <span className="text-sm text-green-600 font-medium">Ready</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Voice Response Controls */}
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">Voice Response</span>
                        <div className="flex items-center space-x-2">
                            {isRecording && (
                                <>
                                    <div className="flex items-center space-x-2">
                                        <div className="animate-pulse w-3 h-3 bg-red-500 rounded-full"></div>
                                        <span className="text-sm text-red-600 font-medium">Recording</span>
                                        <span className="text-sm text-gray-500 font-mono">
                                            {formatTime(recordingTime)}
                                        </span>
                                        <span className="text-xs text-blue-600 font-medium">
                                            (Say "That is all" when finished)
                                        </span>
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        Recording until you say "That is all"
                                    </div>
                                    {transcribedText && (
                                        <div className="mt-2 p-2 bg-gray-50 rounded text-xs text-gray-700 max-h-20 overflow-y-auto">
                                            <strong>Live transcript:</strong> {transcribedText}
                                        </div>
                                    )}
                                </>
                            )}
                            {isProcessingResponse && (
                                <div className="flex items-center space-x-2">
                                    <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-blue-600"></div>
                                    <span className="text-sm text-blue-600 font-medium">Processing...</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Status Indicators */}
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <div className="flex items-center space-x-1">
                            <div className={`w-2 h-2 rounded-full ${audioUrl ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                            <span>Audio Ready</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <div className={`w-2 h-2 rounded-full ${isRecording ? 'bg-red-500' : 'bg-gray-300'}`}></div>
                            <span>Recording</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Hidden Audio Element */}
            <audio
                ref={audioRef}
                src={audioUrl || undefined}
                onEnded={handleAudioEnded}
                onError={handleAudioError}
                preload="auto"
            />
        </div>
    );
};

export default AIAvatarSection; 