import React, { useState, useRef, useEffect } from "react";
import { restApi } from "../../../../context/restApi";
import { showToast } from "../../../../context/helper";

interface AIAvatarSectionProps {
    currentQuestion: string;
    sessionCode: string;
    questionIndex: number;
    onQuestionAudioReady: (audioUrl: string) => void;
    onVoiceResponseReceived: (transcribedText: string) => void;
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
    
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);

    // Generate question audio when question changes
    useEffect(() => {
        if (currentQuestion && sessionCode) {
            generateQuestionAudio();
        }
    }, [currentQuestion, sessionCode, questionIndex]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (recordingIntervalRef.current) {
                clearInterval(recordingIntervalRef.current);
            }
            if (audioUrl) {
                URL.revokeObjectURL(audioUrl);
            }
        };
    }, []);

    const generateQuestionAudio = async () => {
        try {
            setIsLoadingAudio(true);
            const response = await restApi.getVoiceQuestionAudio(sessionCode, questionIndex);

            if (response?.data?.success) {
                const { audio_data } = response.data;
                
                // Convert base64 to blob and create URL
                const audioBlob = base64ToBlob(audio_data, 'audio/wav');
                const newAudioUrl = URL.createObjectURL(audioBlob);
                
                // Cleanup previous audio URL
                if (audioUrl) {
                    URL.revokeObjectURL(audioUrl);
                }
                
                setAudioUrl(newAudioUrl);
                onQuestionAudioReady(newAudioUrl);
            } else {
                showToast('Failed to generate question audio', 'error');
            }
        } catch (error) {
            console.error('Error generating question audio:', error);
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
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorderRef.current = new MediaRecorder(stream);
            audioChunksRef.current = [];

            mediaRecorderRef.current.ondataavailable = (event) => {
                audioChunksRef.current.push(event.data);
            };

            mediaRecorderRef.current.onstop = async () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
                await processVoiceResponse(audioBlob);
                
                // Stop all tracks
                stream.getTracks().forEach(track => track.stop());
            };

            mediaRecorderRef.current.start();
            setIsRecording(true);
            setRecordingTime(0);

            // Start recording timer
            recordingIntervalRef.current = setInterval(() => {
                setRecordingTime(prev => prev + 1);
            }, 1000);

        } catch (error) {
            console.error('Error starting recording:', error);
            showToast('Error accessing microphone', 'error');
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            
            if (recordingIntervalRef.current) {
                clearInterval(recordingIntervalRef.current);
                recordingIntervalRef.current = null;
            }
        }
    };

    const processVoiceResponse = async (audioBlob: Blob) => {
        try {
            setIsProcessingResponse(true);
            
            const response = await restApi.convertSpeechToText(audioBlob);

            if (response?.data?.success) {
                const transcribedText = response.data.transcribed_text;
                onVoiceResponseReceived(transcribedText);
                showToast('Voice response processed successfully', 'success');
            } else {
                showToast('Failed to process voice response', 'error');
            }
        } catch (error) {
            console.error('Error processing voice response:', error);
            showToast('Error processing voice response', 'error');
        } finally {
            setIsProcessingResponse(false);
            setRecordingTime(0);
        }
    };

    const formatTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="flex flex-col h-full bg-gradient-to-br from-blue-50 to-indigo-100">
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
            <div className="flex-1 flex items-center justify-center p-6">
                <div className="text-center">
                    <div className={`w-32 h-32 mx-auto mb-4 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isPlaying ? 'bg-gradient-to-r from-blue-500 to-purple-600 scale-110' :
                        isRecording ? 'bg-gradient-to-r from-red-500 to-pink-600 scale-110' :
                        'bg-gradient-to-r from-gray-400 to-gray-600'
                    }`}>
                        {isPlaying ? (
                            <svg className="w-16 h-16 text-white animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z"/>
                            </svg>
                        ) : isRecording ? (
                            <svg className="w-16 h-16 text-white animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C13.1 2 14 2.9 14 4V6.24C15.81 6.92 17 8.5 17 10.5V16C17 17.1 16.1 18 15 18H9C7.9 18 7 17.1 7 16V10.5C7 8.5 8.19 6.92 10 6.24V4C10 2.9 10.9 2 12 2M12 4V6H10V4H12M12 8C10.9 8 10 8.9 10 10V16H14V10C14 8.9 13.1 8 12 8Z"/>
                            </svg>
                        ) : (
                            <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C13.1 2 14 2.9 14 4V6.24C15.81 6.92 17 8.5 17 10.5V16C17 17.1 16.1 18 15 18H9C7.9 18 7 17.1 7 16V10.5C7 8.5 8.19 6.92 10 6.24V4C10 2.9 10.9 2 12 2M12 4V6H10V4H12M12 8C10.9 8 10 8.9 10 10V16H14V10C14 8.9 13.1 8 12 8Z"/>
                            </svg>
                        )}
                    </div>
                    
                    <div className="text-center">
                        {isPlaying && (
                            <p className="text-blue-600 font-medium">AI is asking the question...</p>
                        )}
                        {isRecording && (
                            <div className="text-red-600 font-medium">
                                <p>Recording your response...</p>
                                <p className="text-lg">{formatTime(recordingTime)}</p>
                            </div>
                        )}
                        {isProcessingResponse && (
                            <p className="text-purple-600 font-medium">Processing your response...</p>
                        )}
                        {!isPlaying && !isRecording && !isProcessingResponse && (
                            <p className="text-gray-600">Ready for voice interaction</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Voice Controls */}
            <div className="p-4 border-t bg-white">
                <div className="space-y-3">
                    {/* Question Audio Controls */}
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">Question Audio</span>
                        <button
                            onClick={playQuestionAudio}
                            disabled={isLoadingAudio || isPlaying || !audioUrl}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                                isPlaying || isLoadingAudio || !audioUrl
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    : 'bg-blue-600 text-white hover:bg-blue-700'
                            }`}
                        >
                            {isLoadingAudio ? 'Loading...' : isPlaying ? 'Playing...' : 'Play Question'}
                        </button>
                    </div>

                    {/* Voice Response Controls */}
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">Voice Response</span>
                        <button
                            onClick={isRecording ? stopRecording : startRecording}
                            disabled={isPlaying || isProcessingResponse}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                                isPlaying || isProcessingResponse
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    : isRecording
                                    ? 'bg-red-600 text-white hover:bg-red-700'
                                    : 'bg-green-600 text-white hover:bg-green-700'
                            }`}
                        >
                            {isRecording ? 'Stop Recording' : 'Start Recording'}
                        </button>
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