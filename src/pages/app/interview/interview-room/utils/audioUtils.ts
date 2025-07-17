import { AUDIO_CONFIG } from '../constants';

/**
 * Convert Float32Array to WAV Blob for API consumption
 */
export const float32ArrayToWav = (audioData: Float32Array, sampleRate: number): Blob => {
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

/**
 * Check if audio input devices are available
 */
export const hasAudioInputDevices = async (): Promise<boolean> => {
    try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        return devices.some(device => device.kind === 'audioinput');
    } catch (error) {
        console.warn('Could not enumerate devices:', error);
        return false;
    }
};

/**
 * Request microphone access with proper configuration and error handling
 */
export const requestMicrophoneAccess = async (): Promise<MediaStream | null> => {
    try {
        // First check if audio input devices are available
        const hasDevices = await hasAudioInputDevices();
        if (!hasDevices) {
            console.warn('No audio input devices found');
            return null;
        }

        console.log('Requesting microphone access...');
        
        const stream = await navigator.mediaDevices.getUserMedia({ 
            audio: {
                echoCancellation: AUDIO_CONFIG.echoCancellation,
                noiseSuppression: AUDIO_CONFIG.noiseSuppression,
                sampleRate: AUDIO_CONFIG.sampleRate,
            } 
        });
        
        console.log('Microphone access granted');
        return stream;
        
    } catch (error) {
        console.error('Error requesting microphone access:', error);
        
        if (error.name === 'NotFoundError') {
            console.warn('No microphone device found or device is already in use');
        } else if (error.name === 'NotAllowedError') {
            console.warn('Microphone access denied by user');
        } else if (error.name === 'NotReadableError') {
            console.warn('Microphone is already in use by another application');
        }
        
        return null;
    }
};

/**
 * Check if a MediaStream has audio tracks
 */
export const hasAudioTracks = (stream: MediaStream | null): boolean => {
    return stream ? stream.getAudioTracks().length > 0 : false;
};

/**
 * Extract audio tracks from a MediaStream
 */
export const extractAudioStream = (stream: MediaStream): MediaStream | null => {
    const audioTracks = stream.getAudioTracks();
    return audioTracks.length > 0 ? new MediaStream(audioTracks) : null;
};

/**
 * Get audio source description for UI
 */
export const getAudioSourceDescription = (
    screenStream: MediaStream | null, 
    micStream: MediaStream | null
): string => {
    if (!micStream) return 'Inactive';
    
    if (screenStream && hasAudioTracks(screenStream)) {
        return 'Screen Share Audio';
    }
    
    return 'Microphone';
}; 