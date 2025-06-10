import { useRef, useCallback } from 'react';
import { TIMING } from '../constants';
import type { UseSpeechAccumulationReturn } from '../types';

export const useSpeechAccumulation = (): UseSpeechAccumulationReturn => {
    const recentSpeechRef = useRef<string>('');
    const lastSpeechTimeRef = useRef<number>(0);
    const speechAccumulationTimeoutRef = useRef<number | null>(null);

    const addSpeechSegment = useCallback((text: string): void => {
        const currentTime = Date.now();
        const timeSinceLastSpeech = currentTime - lastSpeechTimeRef.current;
        const shouldAccumulate = timeSinceLastSpeech < TIMING.SPEECH_ACCUMULATION_WINDOW && recentSpeechRef.current.length > 0;

        if (shouldAccumulate) {
            // Accumulate with previous speech
            recentSpeechRef.current = `${recentSpeechRef.current} ${text}`;
        } else {
            // Fresh speech or too much time passed
            recentSpeechRef.current = text;
        }
        
        lastSpeechTimeRef.current = currentTime;
    }, []);

    const processAccumulated = useCallback((): string => {
        const result = recentSpeechRef.current.trim();
        return result;
    }, []);

    const reset = useCallback((): void => {
        recentSpeechRef.current = '';
        lastSpeechTimeRef.current = 0;
        
        if (speechAccumulationTimeoutRef.current) {
            clearTimeout(speechAccumulationTimeoutRef.current);
            speechAccumulationTimeoutRef.current = null;
        }
    }, []);

    const shouldAccumulate = useCallback((text: string): boolean => {
        const currentTime = Date.now();
        const timeSinceLastSpeech = currentTime - lastSpeechTimeRef.current;
        return timeSinceLastSpeech < TIMING.SPEECH_ACCUMULATION_WINDOW && recentSpeechRef.current.length > 0;
    }, []);

    const getCombinedText = useCallback((): string => {
        return recentSpeechRef.current;
    }, []);

    const setAccumulationTimeout = useCallback((callback: () => void, delay: number = TIMING.SPEECH_PROCESSING_DELAY): void => {
        if (speechAccumulationTimeoutRef.current) {
            clearTimeout(speechAccumulationTimeoutRef.current);
        }
        
        speechAccumulationTimeoutRef.current = setTimeout(callback, delay);
    }, []);

    return {
        accumulatedText: recentSpeechRef.current,
        isAccumulating: recentSpeechRef.current.length > 0,
        addSpeechSegment,
        processAccumulated,
        reset,
        shouldAccumulate,
        getCombinedText,
        setAccumulationTimeout,
    };
}; 