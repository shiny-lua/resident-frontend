// Core Types
export type VADStatus = 'idle' | 'requesting-permission' | 'listening' | 'speaking' | 'processing' | 'accumulating';

export interface ConversationEntry {
    question: string;
    answer: string;
    timestamp: Date;
}

export interface AudioDeviceInfo {
    deviceId: string;
    label: string;
}

// VAD Configuration
export interface VADConfig {
    preSpeechPadFrames: number;
    redemptionFrames: number;
    frameSamples: number;
    positiveSpeechThreshold: number;
    negativeSpeechThreshold: number;
    minSpeechFrames: number;
    submitUserSpeechOnPause: boolean;
    stream?: MediaStream;
    onSpeechStart?: () => void;
    onSpeechEnd?: (audio: Float32Array) => void;
    onVADMisfire?: () => void;
}

// Speech Processing
export interface SpeechSegment {
    text: string;
    timestamp: number;
    isComplete: boolean;
}

export interface SpeechAccumulation {
    segments: SpeechSegment[];
    combinedText: string;
    lastUpdateTime: number;
    isActive: boolean;
}

// API Response Types
export interface TranscriptionResponse {
    success: boolean;
    transcribed_text: string;
    error?: string;
}

export interface APIResponse<T = any> {
    data: T;
    success: boolean;
    error?: string;
}

// Component Props
export interface VoiceDetectionStatusProps {
    status: VADStatus;
    isTranscribing: boolean;
    transcribedText: string;
    screenStream: MediaStream | null;
}

export interface AudioSourcesPanelProps {
    screenStream: MediaStream | null;
    micStream: MediaStream | null;
    vadActive: boolean;
}

export interface ConversationHistoryProps {
    conversations: ConversationEntry[];
}

// Hook Return Types
export interface UseVADReturn {
    vadRef: React.MutableRefObject<any>;
    vadStatus: VADStatus;
    initializeVAD: (audioStream: MediaStream | null) => Promise<void>;
    cleanup: () => void;
    pause: () => void;
    resume: () => void;
}

export interface UseSpeechAccumulationReturn {
    accumulatedText: string;
    isAccumulating: boolean;
    addSpeechSegment: (text: string) => void;
    processAccumulated: () => string;
    reset: () => void;
    shouldAccumulate: (text: string) => boolean;
    getCombinedText: () => string;
    setAccumulationTimeout: (callback: () => void, delay?: number) => void;
}

export interface UseAudioRecordingReturn {
    isRecording: boolean;
    startRecording: (stream: MediaStream) => void;
    stopRecording: () => void;
    cleanup: () => void;
    getRecordedBlob: () => Blob | null;
    clearRecording: () => void;
}

export interface UseScreenShareReturn {
    screenStream: MediaStream | null;
    startScreenShare: () => Promise<MediaStream | null>;
    stopScreenShare: () => void;
    hasAudio: () => boolean;
    getAudioStream: () => MediaStream | null;
} 