// Export all custom hooks for easier importing
export { useVAD } from './useVAD';
export { useSpeechAccumulation } from './useSpeechAccumulation';
export { useAudioRecording } from './useAudioRecording';
export { useScreenShare } from './useScreenShare';
export { useInterviewSession } from './useInterviewSession';

// Re-export types for convenience
export type { 
    VADStatus, 
    ConversationEntry, 
    UseVADReturn, 
    UseSpeechAccumulationReturn, 
    UseAudioRecordingReturn, 
    UseScreenShareReturn 
} from '../types'; 