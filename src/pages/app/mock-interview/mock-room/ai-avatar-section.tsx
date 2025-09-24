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
    const isProcessingRef = useRef<boolean>(false); // Prevent duplicate processing
    const noSpeechTimeoutRef = useRef<number | null>(null); // Timeout for no speech detection
    
    // VAD callbacks
    const vadCallbacks = {
        onSpeechStart: () => {
            // Don't start recording if interview is completed
            if (isInterviewCompleted) {
                console.log('❌ Interview completed - ignoring speech start');
                return;
            }
            
            // ✅ FIXED: Only allow recording AFTER AI voice has completely finished
            if (isPlaying || hasPlayedAudioRef.current !== audioUrl) {
                console.log('❌ VAD blocked - AI is playing or audio not yet played');
                return;
            }
            
            setIsRecording(true);
            setRecordingTime(0);
            setTranscribedText('');
            setVadStatusMessage('🎤 Recording your answer...');
            
            // Clear any existing no-speech timeout
            if (noSpeechTimeoutRef.current) {
                clearTimeout(noSpeechTimeoutRef.current);
                noSpeechTimeoutRef.current = null;
            }
            
            const interval = setInterval(() => {
                setRecordingTime(prev => prev + 1);
            }, 1000);
            recordingIntervalRef.current = interval;
            
            // ✅ ENHANCED: Set timeout for no speech (30 seconds)
            const NO_SPEECH_TIMEOUT_MS = 30000; // 30 seconds
            noSpeechTimeoutRef.current = setTimeout(() => {
                console.log('⏰ No speech timeout - user may not be responding');
                if (isRecording) {
                    setIsRecording(false);
                    setVadStatusMessage('⏰ No response detected - please try speaking again');
                    
                    // Clear recording interval
                    if (recordingIntervalRef.current) {
                        clearInterval(recordingIntervalRef.current);
                        recordingIntervalRef.current = null;
                    }
                }
            }, NO_SPEECH_TIMEOUT_MS);
        },
        
        onSpeechEnd: async (audio: Float32Array) => {
            console.log('🎤 Speech ended, audio length:', audio.length, 'ms:', (audio.length / 16000) * 1000);
            
            // Prevent duplicate processing - SET FLAG IMMEDIATELY
            if (isProcessingRef.current) {
                console.log('❌ Already processing - ignoring duplicate speech end event');
                return;
            }
            
            // Set processing lock IMMEDIATELY to prevent race conditions
            isProcessingRef.current = true;
            
            setIsRecording(false);
            
            if (recordingIntervalRef.current) {
                clearInterval(recordingIntervalRef.current);
                recordingIntervalRef.current = null;
            }
            
            // Clear no-speech timeout since user did speak
            if (noSpeechTimeoutRef.current) {
                clearTimeout(noSpeechTimeoutRef.current);
                noSpeechTimeoutRef.current = null;
            }
            
            // Don't process if interview is completed
            if (isInterviewCompleted) {
                console.log('❌ Interview completed - skipping audio processing');
                isProcessingRef.current = false; // Reset flag
                return;
            }
            
            if (isPlaying || isProcessingResponse) {
                console.log('❌ Skipping processing - isPlaying:', isPlaying, 'isProcessingResponse:', isProcessingResponse);
                isProcessingRef.current = false; // Reset flag
                return;
            }
            
            const audioLengthMs = (audio.length / 16000) * 1000;
            
            // ✅ ENHANCED: Check minimum speech duration (2 seconds)
            const MINIMUM_SPEECH_DURATION_MS = 2000; // 2 seconds minimum
            if (audioLengthMs < MINIMUM_SPEECH_DURATION_MS) {
                console.log(`❌ Audio too short: ${audioLengthMs}ms (minimum: ${MINIMUM_SPEECH_DURATION_MS}ms)`);
                setVadStatusMessage('🎤 Please speak for at least 2 seconds to provide a complete answer...');
                
                // Reset processing flag and allow user to try again
                isProcessingRef.current = false;
                return;
            }
            
            // ✅ ENHANCED: Wait 5 seconds after user stops speaking for thinking time
            const THINKING_TIME_MS = 5000; // 5 seconds
            setVadStatusMessage(`⏳ Waiting ${THINKING_TIME_MS/1000} seconds for you to continue or finish your answer...`);
            console.log(`⏳ Waiting ${THINKING_TIME_MS/1000} seconds after user speech for thinking time...`);
            
            // Set processing state but don't call API yet
            setIsProcessingResponse(true);
            
            // Wait 5 seconds before processing
            processingTimeoutRef.current = setTimeout(async () => {
                // Double-check if interview is still active
                if (isInterviewCompleted) {
                    console.log('❌ Interview completed during thinking period - cancelling processing');
                    setIsProcessingResponse(false);
                    isProcessingRef.current = false;
                    return;
                }
                
                console.log('⏰ Thinking period completed - now processing answer...');
                setVadStatusMessage('🔄 Processing your answer and moving to next question...');
                
                // Now call autoProcessSilence API
                await processVADAudio(audio);
            }, THINKING_TIME_MS);
        },
        
        onVADMisfire: () => {
            if (recordingIntervalRef.current) {
                clearInterval(recordingIntervalRef.current);
                recordingIntervalRef.current = null;
            }
            setRecordingTime(0);
            
            // ✅ ENHANCED: Handle case where user didn't speak at all
            if (isRecording) {
                console.log('🎤 VAD misfire - user may not have spoken, resetting recording state');
                setIsRecording(false);
                setVadStatusMessage('🎤 Ready to record your answer - please speak clearly');
            }
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
            isProcessingRef.current = false; // Release processing lock
        }
    }, [isInterviewCompleted]);

    // Process VAD audio
    const processVADAudio = async (vadAudio: Float32Array) => {
        const processingId = Math.random().toString(36).substr(2, 9);
        console.log(`🎵 [${processingId}] processVADAudio called with audio length:`, vadAudio.length);
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
            console.log(`🎵 [${processingId}] Created audio file:`, audioFile.name, 'size:', audioFile.size, 'bytes');
            
            const response = await restApi.autoProcessSilence(sessionCode, audioFile);;
            console.log(`🔍 [${processingId}] Auto-process silence response:`, response);

            if (response?.status === 200 && response.data?.data) {
                const result = response.data.data;
                console.log('🔍 Processing result:', result);
                
                if (result.status === 'completed') {
                    onVoiceResponseReceived(transcribedText, result);
                } else if (result.status === 'success') {
                    onVoiceResponseReceived(transcribedText, result);
                    
                    // ✅ FIXED: Load next question audio ONLY after autoProcessSilence completes
                    if (result.question_index !== undefined) {
                        console.log('🎵 Loading next question audio after autoProcessSilence completion');
                        await loadNextQuestionAudio(result.question_index);
                    }
                } else {
                    console.log('❌ Unexpected response status:', result.status);
                    showToast('Unexpected response from server', 'error');
                }
            } else {
                console.log('❌ Invalid response structure:', response);
                showToast('Failed to process response', 'error');
            }
        } catch (error) {
            console.error(`[${processingId}] Error processing VAD audio:`, error);
            
            // Handle timeout errors with controlled fallback
            if (error.message?.includes('timeout')) {
                console.log('⏰ API timeout occurred - attempting controlled fallback');
                showToast('Processing timeout - attempting recovery...', 'warning');
                
                // Limited fallback attempt with timeout protection
                try {
                    // Set a shorter timeout for the fallback request
                    const controller = new AbortController();
                    const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 second timeout
                    
                    const statusResponse = await restApi.getRealtimeStatus(sessionCode);
                    clearTimeout(timeoutId);
                    
                    if (statusResponse?.status === 200 && statusResponse.data?.data) {
                        const statusData = statusResponse.data.data;
                        if (statusData.current_question_index !== undefined) {
                            console.log('🔄 Fallback successful: Moving to question', statusData.current_question_index + 1);
                            showToast('Recovered - moving to next question', 'success');
                            onVoiceResponseReceived(transcribedText, {
                                status: 'success',
                                question_index: statusData.current_question_index
                            });
                            return;
                        }
                    }
                    
                    // If we get here, fallback didn't provide useful data
                    throw new Error('Fallback response invalid');
                    
                } catch (fallbackError) {
                    console.error('Controlled fallback failed:', fallbackError);
                    showToast('Recovery failed - please try speaking again or refresh', 'error');
                    
                    // Don't cascade further - just reset state and let user retry
                    return;
                }
            } else {
                // Non-timeout errors
                console.error('Non-timeout error processing audio:', error);
                showToast('Error processing audio - please try again', 'error');
            }
        } finally {
            // Always ensure we clean up processing state
            setIsProcessingResponse(false);
            isProcessingRef.current = false; // Release processing lock
            
            // Clear any pending timeouts to prevent further issues
            if (processingTimeoutRef.current) {
                clearTimeout(processingTimeoutRef.current);
                processingTimeoutRef.current = null;
            }
        }
    };

    // ✅ NEW: Function to load next question audio after autoProcessSilence
    const loadNextQuestionAudio = async (nextQuestionIndex: number) => {
        try {
            console.log(`🎵 Loading audio for next question ${nextQuestionIndex + 1}`);
            setIsLoadingAudio(true);
            setAudioUrl(null);
            hasPlayedAudioRef.current = null; // Reset played flag for new question
            
            const response = await restApi.getRealtimeMockInterviewVoice(sessionCode, nextQuestionIndex);
            console.log(`🎵 Next question audio API response:`, response);

            if (response?.data?.status === 'success' && response.data.data?.audio_data) {
                const audioBlob = base64ToBlob(response.data.data.audio_data, 'audio/wav');
                const newAudioUrl = URL.createObjectURL(audioBlob);
                
                if (audioUrl) {
                    URL.revokeObjectURL(audioUrl);
                }
                
                setAudioUrl(newAudioUrl);
                onQuestionAudioReady(newAudioUrl);
                console.log(`✅ Next question audio loaded and ready to play`);
            } else {
                console.error('❌ Failed to load next question audio:', response);
                showToast('Failed to load next question audio', 'error');
            }
        } catch (error) {
            console.error('Error loading next question audio:', error);
            showToast('Error loading next question audio', 'error');
        } finally {
            setIsLoadingAudio(false);
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
            // Clear all timeouts and intervals to prevent memory leaks
            if (recordingIntervalRef.current) {
                clearInterval(recordingIntervalRef.current);
                recordingIntervalRef.current = null;
            }
            if (processingTimeoutRef.current) {
                clearTimeout(processingTimeoutRef.current);
                processingTimeoutRef.current = null;
            }
            if (noSpeechTimeoutRef.current) {
                clearTimeout(noSpeechTimeoutRef.current);
                noSpeechTimeoutRef.current = null;
            }
            if (audioUrl) {
                URL.revokeObjectURL(audioUrl);
            }
            
            // Reset all refs to prevent memory leaks
            hasPlayedAudioRef.current = null;
            isProcessingRef.current = false;
            
            // Cleanup VAD resources
            vad.cleanup();
            
            // Reset component state to clean values
            setIsRecording(false);
            setIsProcessingResponse(false);
            setRecordingTime(0);
            setTranscribedText("");
            setVadStatusMessage("");
        };
    }, []); // Empty dependency array - only run on unmount

    // ✅ FIXED: Load question audio only for FIRST question (index 0)
    // Subsequent questions are loaded after autoProcessSilence completes
    useEffect(() => {
        if (isInterviewCompleted || !sessionCode || questionIndex !== 0 || !currentQuestion?.trim()) {
            console.log(`🚫 Skipping initial audio load - isInterviewCompleted: ${isInterviewCompleted}, sessionCode: ${!!sessionCode}, questionIndex: ${questionIndex}, currentQuestion: ${!!currentQuestion?.trim()}`);
            return;
        }
        
        const loadFirstQuestionAudio = async () => {
            try {
                console.log(`🎵 Starting audio load for FIRST question: "${currentQuestion.substring(0, 50)}..."`);
                setIsLoadingAudio(true);
                setAudioUrl(null);
                hasPlayedAudioRef.current = null; // Reset played flag when loading new question
                
                const response = await restApi.getRealtimeMockInterviewVoice(sessionCode, questionIndex);
                console.log(`🎵 Audio API response for first question:`, response);

                if (response?.data?.status === 'success' && response.data.data?.audio_data) {
                    const audioBlob = base64ToBlob(response.data.data.audio_data, 'audio/wav');
                    const newAudioUrl = URL.createObjectURL(audioBlob);
                    
                    if (audioUrl) {
                        URL.revokeObjectURL(audioUrl);
                    }
                    
                    setAudioUrl(newAudioUrl);
                    onQuestionAudioReady(newAudioUrl);
                    console.log(`✅ First question audio loaded and ready`);
                } else {
                    console.error('❌ Failed to generate first question audio:', response);
                    showToast('Failed to generate question audio', 'error');
                }
            } catch (error) {
                console.error('Error generating first question audio:', error);
                showToast('Error generating question audio', 'error');
            } finally {
                setIsLoadingAudio(false);
            }
        };

        // Add a small delay to ensure state is properly updated
        const timer = setTimeout(loadFirstQuestionAudio, 100);
        return () => clearTimeout(timer);
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
            if (noSpeechTimeoutRef.current) {
                clearTimeout(noSpeechTimeoutRef.current);
                noSpeechTimeoutRef.current = null;
            }
            // Stop recording if active
            setIsRecording(false);
            setIsProcessingResponse(false);
            isProcessingRef.current = false; // Reset processing lock
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
                    
                    // Ensure audio element is ready
                    if (audioRef.current) {
                        audioRef.current.currentTime = 0;
                        
                        // Set states before starting playback
                        onPlayStateChange(true);
                        vad.updatePlayingState(true);
                        
                        await audioRef.current.play();
                        console.log(`✅ Question ${questionIndex + 1} audio play initiated successfully`);
                        // Note: handleAudioPlay will be called by the audio element event
                    } else {
                        throw new Error('Audio ref not available');
                    }
                } catch (error) {
                    console.error('Error playing audio:', error);
                    showToast('Error playing question audio', 'error');
                    
                    // Ensure states are synchronized on error
                    onPlayStateChange(false);
                    vad.updatePlayingState(false);
                    hasPlayedAudioRef.current = null; // Reset on error so it can be retried
                    
                    // Update status message for manual retry option
                    if (!isInterviewCompleted) {
                        setVadStatusMessage('❌ Audio failed - will retry automatically');
                    }
                }
            };
            
            // Immediate playback for better responsiveness
            const timer = setTimeout(playAudio, 100);
            return () => clearTimeout(timer);
        }
    }, [audioUrl, isPlaying, isLoadingAudio, isInterviewCompleted, questionIndex]);

    // Audio event handlers with improved state synchronization
    const handleAudioEnded = useCallback(() => {
        console.log(`✅ Question ${questionIndex + 1} audio finished playing - updating all states`);
        
        // Synchronize all playing states
        onPlayStateChange(false);
        vad.updatePlayingState(false);
        
        // Update status message only if interview is still active
        if (!isInterviewCompleted) {
            setVadStatusMessage('🎤 Question finished - please provide your answer');
        }
        
        console.log(`🎤 Ready for user answer on question ${questionIndex + 1}`);
        // Note: hasPlayedAudioRef.current remains set to prevent re-playing
    }, [questionIndex, isInterviewCompleted, onPlayStateChange, vad]);

    const handleAudioError = useCallback((error: any) => {
        console.error('Audio playback error:', error);
        showToast('Error playing audio', 'error');
        
        // Synchronize all playing states on error
        onPlayStateChange(false);
        vad.updatePlayingState(false);
        
        // Reset played flag so audio can be retried
        hasPlayedAudioRef.current = null;
        
        // Update status message for retry
        if (!isInterviewCompleted) {
            setVadStatusMessage('❌ Audio error - will retry automatically');
        }
    }, [isInterviewCompleted, onPlayStateChange, vad]);

    // Add handler for when audio starts playing
    const handleAudioPlay = useCallback(() => {
        console.log(`🎵 Question ${questionIndex + 1} audio started playing`);
        
        // Ensure all states are synchronized when playback starts
        onPlayStateChange(true);
        vad.updatePlayingState(true);
        
        if (!isInterviewCompleted) {
            setVadStatusMessage('🎵 Playing question - please listen...');
        }
    }, [questionIndex, isInterviewCompleted, onPlayStateChange, vad]);

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
                onPlay={handleAudioPlay}
                onLoadStart={() => console.log('🎵 Audio loading started')}
                onCanPlay={() => console.log('🎵 Audio can play')}
                onPause={() => {
                    // Handle pause events to maintain state sync
                    console.log('🎵 Audio paused');
                    onPlayStateChange(false);
                    vad.updatePlayingState(false);
                }}
                preload="auto"
            />
        </div>
    );
};

export default AIAvatarSection; 