import { useState, useEffect, useRef, useCallback } from 'react';
import { Language } from '../types';

export interface UseSpeechOptions {
  language?: Language;
  onSpeechResult?: (transcript: string) => void;
  onError?: (error: string) => void;
}

export function useSpeech(options?: UseSpeechOptions) {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [recognitionSupported, setRecognitionSupported] = useState(false);
  const [currentUtterance, setCurrentUtterance] = useState<string | null>(null);

  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Check speech synthesis support
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setSpeechSupported(true);
    }

    // Check speech recognition support
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        setRecognitionSupported(true);
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onstart = () => {
          setIsListening(true);
        };

        recognition.onresult = (event: any) => {
          const transcript = event.results[0]?.[0]?.transcript || '';
          if (options?.onSpeechResult && transcript) {
            options.onSpeechResult(transcript);
          }
          setIsListening(false);
        };

        recognition.onerror = (event: any) => {
          console.warn('Speech recognition event error:', event?.error);
          setIsListening(false);
          if (options?.onError) {
            options.onError(event?.error || 'Speech recognition failed');
          }
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      }
    }
  }, [options]);

  // Start listening with chosen language
  const startListening = useCallback(
    (lang: Language = 'English') => {
      if (!recognitionRef.current) return;
      try {
        if (isSpeaking) {
          window.speechSynthesis?.cancel();
          setIsSpeaking(false);
        }

        // Map app language to BCP 47 language code
        let bcpLang = 'en-US';
        if (lang === 'Urdu') bcpLang = 'ur-PK';
        if (lang === 'Arabic') bcpLang = 'ar-SA';

        recognitionRef.current.lang = bcpLang;
        recognitionRef.current.start();
      } catch (err) {
        console.warn('Speech recognition start failed or already active:', err);
      }
    },
    [isSpeaking]
  );

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        // ignore
      }
      setIsListening(false);
    }
  }, []);

  // Text-to-speech speaker
  const speak = useCallback((text: string, lang: Language | 'Korean' = 'English') => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();
    if (!text.trim()) return;

    const utterance = new SpeechSynthesisUtterance(text);
    let langCode = 'en-US';
    if (lang === 'Urdu') langCode = 'ur-PK';
    else if (lang === 'Arabic') langCode = 'ar-SA';
    else if (lang === 'Korean') langCode = 'ko-KR';

    utterance.lang = langCode;
    utterance.rate = 0.95; // slightly deliberate cadence for martial arts coach
    utterance.pitch = 0.95;

    // Pick best matching voice if available
    const voices = window.speechSynthesis.getVoices();
    const matchedVoice = voices.find((v) => v.lang.startsWith(langCode.slice(0, 2)));
    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    utterance.onstart = () => {
      setIsSpeaking(true);
      setCurrentUtterance(text);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setCurrentUtterance(null);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setCurrentUtterance(null);
    };

    window.speechSynthesis.speak(utterance);
  }, []);

  const stopSpeaking = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setCurrentUtterance(null);
    }
  }, []);

  return {
    isListening,
    isSpeaking,
    speechSupported,
    recognitionSupported,
    startListening,
    stopListening,
    speak,
    stopSpeaking,
    currentUtterance
  };
}
