// VAD Configuration Constants
export const VAD_CONFIG = {
    preSpeechPadFrames: 2,
    redemptionFrames: 15,
    frameSamples: 1536,
    positiveSpeechThreshold: 0.25,
    negativeSpeechThreshold: 0.15,
    minSpeechFrames: 8,
    submitUserSpeechOnPause: false,
} as const;

// Timing Constants (in milliseconds)
export const TIMING = {
    SPEECH_ACCUMULATION_WINDOW: 3000,
    SPEECH_PROCESSING_DELAY: 2000,
    RESPONSE_CYCLE_DELAY: 1500,
    ERROR_RECOVERY_DELAY: 1000,
    VAD_INITIALIZATION_DELAY: 1000,
} as const;

// Audio Configuration
export const AUDIO_CONFIG = {
    echoCancellation: true,
    noiseSuppression: true,
    sampleRate: 16000,
    mimeType: 'audio/webm',
} as const;

// Text Processing
export const TEXT_CONFIG = {
    MIN_SPEECH_LENGTH: 3,
} as const;

// Status Messages
export const MESSAGES = {
    INITIALIZING: '🎤 Initializing voice detection...',
    SETUP_AUDIO: '🔄 Setting up audio processing...',
    REQUESTING_MIC: '🎤 Requesting microphone permission...',
    ALLOW_MIC: '🔒 Please allow microphone access for voice detection',
    VOICE_ACTIVE: '🎧 Voice detection active',
    READY_DETECT: '🎯 Ready to detect speech from audio...',
    LISTENING: '🎤 Listening...',
    SPEAKER_DETECTED: '🎙️ Speaker detected, recording...',
    PROCESSING: '🔄 Processing speech...',
    SPEECH_ENDED: '🔄 Speech ended, processing audio...',
    CONVERTING: '🔄 Converting speech to text...',
    TRANSCRIBED: '🎙️ Speech Transcribed',
    ACCUMULATING_SPEECH: '🔄 Accumulating speech...',
    GENERATING_AI: '🤖 Generating AI response...',
    ERROR_VOICE_DETECTION: '⚠️ Error initializing voice detection. Please check permissions.',
    ERROR_MIC_ACCESS: '⚠️ Error accessing microphone. Please check permissions.',
    ERROR_SCREEN_SHARE: '⚠️ Error with screen sharing',
    NO_AUDIO_DEVICES: '⚠️ No audio input devices found. Please connect a microphone or ensure screen sharing includes audio.',
    NO_AUDIO_INPUT: '⚠️ No audio input available. Voice detection disabled. Screen sharing will work without audio.',
} as const; 