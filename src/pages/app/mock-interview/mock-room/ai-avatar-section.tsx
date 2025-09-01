import React, { useState, useRef, useEffect, useCallback } from "react";
import { restApi } from "../../../../context/restApi";
import { showToast } from "../../../../context/helper";
import { useMockInterviewVAD } from './hooks/useMockInterviewVAD';
import { float32ArrayToWav } from '../../interview/interview-room/utils/audioUtils';
import MockInterviewVoiceDetectionStatus from './components/MockInterviewVoiceDetectionStatus';

interface AIAvatarSectionProps {
    currentQuestion: string;
    sessionCode: string;
    questionIndex: number;
    onQuestionAudioReady: (audioUrl: string) => void;
    onVoiceResponseReceived: (transcribedText: string, responseData?: any) => void;
    isPlaying: boolean;
    onPlayStateChange: (isPlaying: boolean) => void;
    isInterviewCompleted?: boolean;
}

const AIAvatarSection: React.FC<AIAvatarSectionProps> = ({
    currentQuestion,
    sessionCode,
    questionIndex,
    onQuestionAudioReady,
    onVoiceResponseReceived,
    isPlaying,
    onPlayStateChange,
    isInterviewCompleted = false
}) => {
    // Core state
    const [isLoadingAudio, setIsLoadingAudio] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [recordingTime, setRecordingTime] = useState(0);
    const [isProcessingResponse, setIsProcessingResponse] = useState(false);
    const [transcribedText, setTranscribedText] = useState("");
    const [vadStatusMessage, setVadStatusMessage] = useState("");
    
    // Refs
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const recordingIntervalRef = useRef<number | null>(null);
    const processingTimeoutRef = useRef<number | null>(null);
    const hasPlayedAudioRef = useRef<string | null>(null); // Track which audio has been played
    
    // VAD callbacks
    const vadCallbacks = {
        onSpeechStart: () => {
            // Don't start recording if interview is completed
            if (isInterviewCompleted) {
                console.log('❌ Interview completed - ignoring speech start');
                return;
            }
            
            if (isPlaying) return;
            
            setIsRecording(true);
            setRecordingTime(0);
            setTranscribedText('');
            setVadStatusMessage('🎤 Recording your answer...');
            
            const interval = setInterval(() => {
                setRecordingTime(prev => prev + 1);
            }, 1000);
            recordingIntervalRef.current = interval;
        },
        
        onSpeechEnd: async (audio: Float32Array) => {
            console.log('🎤 Speech ended, audio length:', audio.length, 'ms:', (audio.length / 16000) * 1000);
            setIsRecording(false);
            
            if (recordingIntervalRef.current) {
                clearInterval(recordingIntervalRef.current);
                recordingIntervalRef.current = null;
            }
            
            // Don't process if interview is completed
            if (isInterviewCompleted) {
                console.log('❌ Interview completed - skipping audio processing');
                return;
            }
            
            if (isPlaying || isProcessingResponse) {
                console.log('❌ Skipping processing - isPlaying:', isPlaying, 'isProcessingResponse:', isProcessingResponse);
                return;
            }
            
            const audioLengthMs = (audio.length / 16000) * 1000;
            if (audioLengthMs < 500) {
                console.log('❌ Audio too short:', audioLengthMs, 'ms');
                return;
            }
            
            setIsProcessingResponse(true);
            
            // Process after user finishes speaking - wait 5 seconds as requested
            const PROCESSING_DELAY_MS = 5000; // 5 seconds
            setVadStatusMessage(`⏳ Waiting ${PROCESSING_DELAY_MS/1000} seconds before moving to next question...`);
            console.log(`⏳ Waiting ${PROCESSING_DELAY_MS/1000} seconds before processing answer...`);
            
            processingTimeoutRef.current = setTimeout(async () => {
                // Double-check if interview is still active before processing
                if (isInterviewCompleted) {
                    console.log('❌ Interview completed during wait period - cancelling processing');
                    setIsProcessingResponse(false);
                    return;
                }
                
                console.log('⏰ Timeout triggered after', PROCESSING_DELAY_MS, 'ms');
                setVadStatusMessage('🔄 Processing your answer and moving to next question...');
                console.log('🔄 Processing user answer after wait period...');
                await processVADAudio(audio);
            }, PROCESSING_DELAY_MS);
        },
        
        onVADMisfire: () => {
            if (recordingIntervalRef.current) {
                clearInterval(recordingIntervalRef.current);
                recordingIntervalRef.current = null;
            }
            setRecordingTime(0);
        },
        
        onStatusUpdate: (status: string, message: string) => {
            if (isInterviewCompleted) {
                setVadStatusMessage('✅ Interview completed - no more processing');
                return;
            }
            
            if (status === 'listening' && !isRecording && !isProcessingResponse) {
                if (isPlaying) {
                    setVadStatusMessage('🎵 Listening to question - please wait...');
                } else {
                    setVadStatusMessage('🎤 Ready to record your answer');
                }
            } else {
                setVadStatusMessage(message);
            }
        }
    };

    const vad = useMockInterviewVAD(vadCallbacks, { isPlaying });

    // Clear processing timeout when interview is completed
    useEffect(() => {
        if (isInterviewCompleted && processingTimeoutRef.current) {
            console.log('🧹 Interview completed - clearing processing timeout');
            clearTimeout(processingTimeoutRef.current);
            processingTimeoutRef.current = null;
            setIsProcessingResponse(false);
        }
    }, [isInterviewCompleted]);

    // Process VAD audio
    const processVADAudio = async (vadAudio: Float32Array) => {
        console.log('🎵 processVADAudio called with audio length:', vadAudio.length);
        try {
            // Don't process if interview is completed
            if (isInterviewCompleted) {
                console.log('❌ Interview completed - skipping VAD audio processing and API call');
                return;
            }
            
            if (isPlaying) {
                console.log('❌ Skipping processVADAudio - isPlaying:', isPlaying);
                return;
            }
            
            const audioBlob = float32ArrayToWav(vadAudio, 16000);
            const audioFile = new File([audioBlob], 'audio.wav', { type: 'audio/wav' });
            console.log('🎵 Created audio file:', audioFile.name, 'size:', audioFile.size, 'bytes');
            
            const response = await restApi.autoProcessSilence(sessionCode, audioFile);
            console.log('🔍 Auto-process silence response:', response);

            if (response?.status === 200 && response.data?.data) {
                const result = response.data.data;
                console.log('🔍 Processing result:', result);
                
                if (result.status === 'completed') {
                    console.log('✅ Interview completed, calling onVoiceResponseReceived');
                    showToast('Interview completed!', 'success');
                    onVoiceResponseReceived(transcribedText, result);
                } else if (result.status === 'success') {
                    console.log('✅ Response processed successfully, calling onVoiceResponseReceived');
                    showToast('Response processed successfully', 'success');
                    onVoiceResponseReceived(transcribedText, result);
                } else {
                    console.log('❌ Unexpected response status:', result.status);
                    showToast('Unexpected response from server', 'error');
                }
            } else {
                console.log('❌ Invalid response structure:', response);
                showToast('Failed to process response', 'error');
            }
        } catch (error) {
            console.error('Error processing VAD audio:', error);
            showToast('Error processing audio', 'error');
        } finally {
            setIsProcessingResponse(false);
        }
    };

    // Initialize VAD
    useEffect(() => {
        const initializeVoiceDetection = async () => {
            try {
                const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
                await vad.initializeVAD(audioStream);
            } catch (error) {
                console.error('Error initializing voice detection:', error);
                showToast('Error accessing microphone', 'error');
            }
        };

        if (!isInterviewCompleted) {
            initializeVoiceDetection();
        }

        return () => {
            vad.cleanup();
        };
    }, [isInterviewCompleted]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (recordingIntervalRef.current) {
                clearInterval(recordingIntervalRef.current);
            }
            if (processingTimeoutRef.current) {
                clearTimeout(processingTimeoutRef.current);
            }
            if (audioUrl) {
                URL.revokeObjectURL(audioUrl);
            }
            hasPlayedAudioRef.current = null; // Reset played flag on cleanup
            vad.cleanup();
        };
    }, [audioUrl]);

    // Load question audio when question changes
    useEffect(() => {
        if (isInterviewCompleted || !sessionCode || questionIndex < 0 || !currentQuestion?.trim()) return;
        
        const loadQuestionAudio = async () => {
            try {
                setIsLoadingAudio(true);
                setAudioUrl(null);
                hasPlayedAudioRef.current = null; // Reset played flag when loading new question
                
                console.log(`🎵 Loading voice for question ${questionIndex + 1}: "${currentQuestion.substring(0, 50)}..."`);
                const response = await restApi.getRealtimeMockInterviewVoice(sessionCode, questionIndex);

                if (response?.data?.status === 'success' && response.data.data?.audio_data) {
                    const audioBlob = base64ToBlob(response.data.data.audio_data, 'audio/wav');
                    const newAudioUrl = URL.createObjectURL(audioBlob);
                    
                    if (audioUrl) {
                        URL.revokeObjectURL(audioUrl);
                    }
                    
                    setAudioUrl(newAudioUrl);
                    onQuestionAudioReady(newAudioUrl);
                    console.log(`✅ Audio loaded for question ${questionIndex + 1}, URL: ${newAudioUrl.substring(0, 50)}...`);
                } else {
                    console.error('❌ Failed to generate question audio:', response);
                    showToast('Failed to generate question audio', 'error');
                }
            } catch (error) {
                console.error('Error generating question audio:', error);
                showToast('Error generating question audio', 'error');
            } finally {
                setIsLoadingAudio(false);
            }
        };

        loadQuestionAudio();
    }, [sessionCode, questionIndex, currentQuestion, isInterviewCompleted]);
    
    // Reset audio state when question index changes
    useEffect(() => {
        console.log(`🔄 Question index changed to ${questionIndex}, resetting audio state`);
        setAudioUrl(null);
        hasPlayedAudioRef.current = null;
    }, [questionIndex]);
    
    // Cleanup when interview is completed
    useEffect(() => {
        if (isInterviewCompleted) {
            console.log('🏁 Interview completed - cleaning up audio processing');
            // Clear any pending processing timeout
            if (processingTimeoutRef.current) {
                clearTimeout(processingTimeoutRef.current);
                processingTimeoutRef.current = null;
            }
            // Stop recording if active
            setIsRecording(false);
            setIsProcessingResponse(false);
            // Clear recording interval
            if (recordingIntervalRef.current) {
                clearInterval(recordingIntervalRef.current);
                recordingIntervalRef.current = null;
            }
        }
    }, [isInterviewCompleted]);

    // Auto-play question audio when it's ready (prevent loops)
    useEffect(() => {
        console.log(`🎵 Auto-play check - audioUrl: ${!!audioUrl}, isPlaying: ${isPlaying}, isLoadingAudio: ${isLoadingAudio}, hasPlayed: ${hasPlayedAudioRef.current === audioUrl}`);
        
        if (audioUrl && 
            !isPlaying && 
            !isLoadingAudio && 
            audioRef.current && 
            !isInterviewCompleted &&
            hasPlayedAudioRef.current !== audioUrl) { // Only play if this audio hasn't been played yet
                
            console.log(`🎵 Auto-playing question ${questionIndex + 1} audio (new audio detected)...`);
            const playAudio = async () => {
                try {
                    hasPlayedAudioRef.current = audioUrl; // Mark this audio as played
                    onPlayStateChange(true);
                    vad.updatePlayingState(true);
                    audioRef.current!.currentTime = 0;
                    await audioRef.current!.play();
                    console.log(`✅ Question ${questionIndex + 1} audio started playing`);
                } catch (error) {
                    console.error('Error playing audio:', error);
                    showToast('Error playing question audio', 'error');
                    onPlayStateChange(false);
                    vad.updatePlayingState(false);
                    hasPlayedAudioRef.current = null; // Reset on error so it can be retried
                }
            };
            
            // Immediate playback for better responsiveness
            const timer = setTimeout(playAudio, 100);
            return () => clearTimeout(timer);
        }
    }, [audioUrl, isPlaying, isLoadingAudio, isInterviewCompleted, questionIndex]);

    // Audio event handlers
    const handleAudioEnded = () => {
        onPlayStateChange(false);
        vad.updatePlayingState(false);
        setVadStatusMessage('🎤 Question finished - please provide your answer');
        console.log(`✅ Question ${questionIndex + 1} audio finished playing - ready for user answer`);
        // Note: hasPlayedAudioRef.current remains set to prevent re-playing
    };

    const handleAudioError = () => {
        showToast('Error playing audio', 'error');
        onPlayStateChange(false);
        vad.updatePlayingState(false);
    };

    // Utility functions
    const base64ToBlob = (base64: string, mimeType: string): Blob => {
        const byteCharacters = atob(base64);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        return new Blob([byteArray], { type: mimeType });
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

                    {/* Voice Detection Status */}
                    <MockInterviewVoiceDetectionStatus
                        status={vad?.vadStatus || 'idle'}
                        isVADActive={vad?.isVADActive || false}
                        isRecording={isRecording}
                        recordingTime={recordingTime}
                        transcribedText={transcribedText}
                    />

                    {/* Voice Response Controls */}
                    {isProcessingResponse && (
                        <div className="flex items-center justify-center p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <div className="flex items-center space-x-2">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-600"></div>
                                <span className="text-sm text-yellow-700 font-medium">Processing your answer...</span>
                            </div>
                        </div>
                    )}

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
                onLoadStart={() => console.log('🎵 Audio loading started')}
                onCanPlay={() => console.log('🎵 Audio can play')}
                onPlay={() => console.log('🎵 Audio play event')}
                preload="auto"
            />
        </div>
    );
};

export default AIAvatarSection; 