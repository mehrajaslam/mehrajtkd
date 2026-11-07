import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Send,
  Sparkles,
  BookOpen,
  RotateCcw,
  MessageSquare,
  HelpCircle,
  ChevronLeft,
  Loader2,
  Globe,
  Award
} from 'lucide-react';
import { Language, BeltRank, ChatMessage, TerminologyItem } from '../types';
import { useSpeech } from '../hooks/useSpeech';
import { streamCoachChat, lookupTerminology } from '../services/coachApi';
import { GENERAL_TERMINOLOGY } from '../data/curriculumData';

interface AiVoiceCoachProps {
  currentBelt: BeltRank;
  language: Language;
  setLanguage: (lang: Language) => void;
  onBackToDashboard?: () => void;
  onRecordStudyTime?: () => void;
}

export const AiVoiceCoach: React.FC<AiVoiceCoachProps> = ({
  currentBelt,
  language,
  setLanguage,
  onBackToDashboard,
  onRecordStudyTime,
}) => {
  const getInitialGreeting = (lang: Language): string => {
    switch (lang) {
      case 'Urdu':
        return `السلام علیکم! میں آپ کا تائیکوانڈو ماسٹر کوچ ہوں۔ آپ کے بیلٹ لیول (${currentBelt}) کے لیے بنیادی فارمز (Poomsae)، ککس (Chagi)، یا کورین اصطلاحات کے بارے میں پوچھیے۔ مائیکروفون دبائیں یا نیچے لکھیں۔`;
      case 'Arabic':
        return `مرحباً بك! أنا مدرب التايكوندو الذكي الخاص بك. يسعدني مساعدتك في تدريباتك لمستوى (${currentBelt})، وشرح حركات البومسي، والركلات، وقواعد التحكيم والمصطلحات الكورية.`;
      default:
        return `Welcome, Taekwondo practitioner! I am your AI Master Coach for ${currentBelt}. Ask me anything about stances (Seogi), kicks (Chagi), Poomsae sequences, referee regulations, or Korean terminology. You can speak into your microphone or type below.`;
    }
  };

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: getInitialGreeting(language),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      language,
    },
  ]);

  const [inputPrompt, setInputPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [streamingContent, setStreamingContent] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(true);
  const [activeTab, setActiveTab] = useState<'chat' | 'terminology'>('chat');

  // Terminology state
  const [searchTerm, setSearchTerm] = useState('');
  const [searchedTerminology, setSearchedTerminology] = useState<TerminologyItem | null>(null);
  const [isSearchingTerm, setIsSearchingTerm] = useState(false);

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    isListening,
    isSpeaking,
    speechSupported,
    recognitionSupported,
    startListening,
    stopListening,
    speak,
    stopSpeaking,
  } = useSpeech({
    language,
    onSpeechResult: (transcript) => {
      setInputPrompt(transcript);
      handleSendMessage(transcript);
    },
    onError: (err) => {
      console.warn('Speech error:', err);
    },
  });

  // Auto-scroll chat when messages update or streaming content arrives
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, streamingContent, loading]);

  // When language changes, update speech synthesis language
  useEffect(() => {
    if (isSpeaking) {
      stopSpeaking();
    }
  }, [language, isSpeaking, stopSpeaking]);

  const handleClearConversation = () => {
    if (isSpeaking) stopSpeaking();
    if (isListening) stopListening();
    setStreamingContent('');
    setIsStreaming(false);
    setLoading(false);
    setMessages([
      {
        id: Date.now().toString(),
        role: 'assistant',
        content: getInitialGreeting(language),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        language,
      },
    ]);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputPrompt).trim();
    if (!text || loading || isStreaming) return;

    if (isSpeaking) stopSpeaking();
    setInputPrompt('');

    const userMsgId = Date.now().toString();
    const newMsg: ChatMessage = {
      id: userMsgId,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      language,
    };

    setMessages((prev) => [...prev, newMsg]);
    setLoading(true);
    setIsStreaming(true);
    setStreamingContent('');

    try {
      const historyPayload = messages.slice(-4).map((m) => ({
        role: m.role,
        content: m.content,
      }));

      await streamCoachChat({
        message: text,
        language,
        beltLevel: currentBelt,
        history: historyPayload,
        onChunk: (accumulated) => {
          setLoading(false);
          setStreamingContent(accumulated);
        },
        onDone: (fullText) => {
          const assistantMsg: ChatMessage = {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: fullText.trim() || 'Focus on your stance, hip chamber, and clean execution.',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            language,
          };

          setMessages((prev) => [...prev, assistantMsg]);
          setIsStreaming(false);
          setStreamingContent('');

          if (autoSpeak) {
            speak(assistantMsg.content, language);
          }

          if (onRecordStudyTime) {
            onRecordStudyTime();
          }
        },
        onError: (err) => {
          console.error('Streaming failed:', err);
          const fallbackReply =
            language === 'Urdu'
              ? 'تائیکوانڈو کی ہر تکنیک میں توازن، ہپ روٹیشن، اور کیہاپ (Kihap) کے ساتھ سانس باہر نکالنے پر توجہ دیں۔ مسلسل مشق ہی مہارت کا راز ہے۔'
              : language === 'Arabic'
              ? 'واصل التركيز على ثبات الوقفات الأساسية (Seogi)، وقوة دوران الورك، والتنفس الانفجاري. الانضباط والاحترام هما جوهر التايكوندو.'
              : 'Focus on stable footwork (Seogi), precise hip chambering (Golban), and explosive breathing (Kihap) at impact. Train with perseverance!';

          const errorMsg: ChatMessage = {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: fallbackReply,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            language,
          };
          setMessages((prev) => [...prev, errorMsg]);
          setIsStreaming(false);
          setStreamingContent('');
          setLoading(false);
        },
      });
    } catch (err: any) {
      setIsStreaming(false);
      setStreamingContent('');
      setLoading(false);
    }
  };

  const handleMicToggle = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening(language);
    }
  };

  const handleSearchTerminology = async (termToLookup?: string) => {
    const query = (termToLookup || searchTerm).trim();
    if (!query) return;

    setIsSearchingTerm(true);
    try {
      const result = await lookupTerminology(query, language);
      setSearchedTerminology(result);
    } catch (e) {
      const local = GENERAL_TERMINOLOGY.find(
        (t) =>
          t.romanized.toLowerCase().includes(query.toLowerCase()) ||
          t.koreanHangul.includes(query) ||
          t.englishMeaning.toLowerCase().includes(query.toLowerCase())
      );
      if (local) {
        setSearchedTerminology(local);
      } else {
        setSearchedTerminology({
          koreanHangul: query,
          romanized: query,
          englishMeaning: 'Korean martial arts movement',
          technicalCues: 'Maintain posture, pivot standing foot, and balance center of gravity.',
          urdu: 'مارشل آرٹ کی اصطلاح',
          arabic: 'مصطلح تايكوندو حركي',
          category: 'General' as any,
        });
      }
    } finally {
      setIsSearchingTerm(false);
    }
  };

  const quickQuestions = [
    {
      en: 'Explain Ap Chagi (Front Kick) mechanics and mistakes',
      ur: 'سامنے والی کک (Ap Chagi) کے بنیادی اصول اور غلطیاں سمجھائیں',
      ar: 'اشرح ميكانيكية ركلة أب تشاجي الأمامية وأهم الأخطاء',
    },
    {
      en: 'What are the key differences between Ap Seogi and Ap Koobi?',
      ur: 'آپ سوگی اور آپ کوبی کے درمیان بنیادی فرق کیا ہے؟',
      ar: 'ما الفرق الدقيق بين وقفة أب سوغي وأب كوبي؟',
    },
    {
      en: 'How to score 4 points with a turning kick in WT Kyorugi?',
      ur: 'ڈبلیو ٹی فائٹنگ میں ٹرننگ کک سے 4 پوائنٹس کیسے حاصل کریں؟',
      ar: 'كيف تسجل 4 نقاط بالركلة الدائرية في قتال التايكوندو الأولمبي؟',
    },
    {
      en: 'Start a 1-question mock exam on belt promotion theory',
      ur: 'بیلٹ پروموشن تھیوری پر 1 سوال کا موک امتحان شروع کریں',
      ar: 'ابدأ اختباراً تجريبياً بسؤال واحد حول نظريات التايكوندو',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Dedicated AI Conversation Screen Header */}
      <div className="relative overflow-hidden rounded-2xl border-2 border-amber-500/70 bg-gradient-to-r from-red-950 via-slate-950 to-amber-950 p-5 sm:p-6 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {onBackToDashboard && (
              <button
                onClick={onBackToDashboard}
                className="p-2 bg-slate-900/90 hover:bg-slate-800 border border-slate-700 hover:border-amber-400 text-slate-300 hover:text-white rounded-xl transition-all shadow-md group shrink-0"
                title="Back to Main Dashboard"
              >
                <ChevronLeft className="w-5 h-5 text-amber-400 group-hover:-translate-x-0.5 transition-transform" />
              </button>
            )}

            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest mb-0.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Dedicated AI Taekwondo Master Coach</span>
              </div>
              <h1 className="text-xl sm:text-3xl font-display font-black uppercase tracking-wider text-white">
                Grandmaster Sabomnim AI
              </h1>
              <p className="text-xs text-slate-300">
                Personalized instruction for <strong className="text-amber-400">{currentBelt}</strong> in English, Urdu, and Arabic.
              </p>
            </div>
          </div>

          {/* Top Controls: 3 Language Buttons, Audio Toggle, and Clear Chat */}
          <div className="flex flex-wrap items-center gap-2">
            {/* 3 Language Options */}
            <div className="bg-slate-900/95 border border-slate-700/80 p-1 rounded-xl flex items-center gap-1 shadow-lg">
              <button
                onClick={() => setLanguage('English')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                  language === 'English'
                    ? 'bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-md ring-1 ring-amber-400/50'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                ENGLISH
              </button>
              <button
                onClick={() => setLanguage('Urdu')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  language === 'Urdu'
                    ? 'bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-md ring-1 ring-amber-400/50'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                اردو
              </button>
              <button
                onClick={() => setLanguage('Arabic')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  language === 'Arabic'
                    ? 'bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-md ring-1 ring-amber-400/50'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                العربية
              </button>
            </div>

            {/* Audio Toggle */}
            <button
              onClick={() => {
                if (isSpeaking) stopSpeaking();
                setAutoSpeak(!autoSpeak);
              }}
              title={autoSpeak ? 'Spoken AI responses active' : 'Spoken AI responses muted'}
              className={`p-2 sm:px-3 sm:py-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                autoSpeak
                  ? 'bg-amber-500/15 border-amber-500/50 text-amber-300 hover:bg-amber-500/25'
                  : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
              }`}
            >
              {autoSpeak ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4" />}
              <span className="hidden sm:inline">{autoSpeak ? 'Audio On' : 'Muted'}</span>
            </button>

            {/* Clear Conversation */}
            <button
              onClick={handleClearConversation}
              title="Clear conversation"
              className="p-2 sm:px-3 sm:py-2 rounded-xl border border-slate-800 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="hidden sm:inline">Clear Chat</span>
            </button>
          </div>
        </div>

        {/* View mode switcher */}
        <div className="mt-4 flex items-center gap-3 border-t border-slate-800/80 pt-3">
          <button
            onClick={() => setActiveTab('chat')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${
              activeTab === 'chat'
                ? 'bg-amber-400/15 text-amber-300 border border-amber-400/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>AI Voice & Chat Session</span>
          </button>
          <button
            onClick={() => setActiveTab('terminology')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${
              activeTab === 'terminology'
                ? 'bg-amber-400/15 text-amber-300 border border-amber-400/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Korean Terminology Lookup</span>
          </button>
        </div>
      </div>

      {activeTab === 'chat' ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Chat Conversation (3 cols) */}
          <div className="lg:col-span-3 bg-slate-950 border border-slate-800 rounded-2xl flex flex-col h-[640px] overflow-hidden shadow-2xl">
            {/* Chat Messages Area */}
            <div
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-gradient-to-b from-slate-950 via-slate-900/40 to-slate-950"
            >
              {messages.map((msg) => {
                const isAssistant = msg.role === 'assistant';
                const isRtl = msg.language === 'Urdu' || msg.language === 'Arabic';

                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-3 ${isAssistant ? 'justify-start' : 'justify-end'}`}
                  >
                    {isAssistant && (
                      <div className="w-9 h-9 rounded-xl bg-red-600/20 border border-red-500/40 flex items-center justify-center shrink-0 mt-0.5 text-amber-400 font-display font-black text-xs shadow-md">
                        사범
                      </div>
                    )}

                    <div
                      dir={isRtl ? 'rtl' : 'ltr'}
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-lg ${
                        isAssistant
                          ? 'bg-slate-900 border border-slate-800 text-slate-100 rounded-tl-sm'
                          : 'bg-gradient-to-r from-red-600 to-amber-600 text-white rounded-tr-sm'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-4 mb-1.5 text-[11px] opacity-75">
                        <span className="font-semibold uppercase tracking-wider">
                          {isAssistant ? 'Grandmaster Sabomnim AI' : 'Student Practitioner'}
                        </span>
                        <span className="text-[10px]">{msg.timestamp}</span>
                      </div>

                      <div className={`whitespace-pre-wrap leading-relaxed ${isRtl ? 'font-sans text-base' : 'font-sans text-sm'}`}>
                        {msg.content}
                      </div>

                      {/* Audio replay button for assistant messages */}
                      {isAssistant && (
                        <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center gap-2">
                          <button
                            onClick={() => speak(msg.content, msg.language || language)}
                            className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1.5 font-medium transition-colors"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                            <span>{msg.language === 'Urdu' ? 'آواز سنیں' : msg.language === 'Arabic' ? 'استمع للصوت' : 'Listen Spoken Audio'}</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Real-time Streaming message bubble */}
              {isStreaming && streamingContent && (
                <div className="flex items-start gap-3 justify-start animate-in fade-in duration-150">
                  <div className="w-9 h-9 rounded-xl bg-red-600/20 border border-red-500/40 flex items-center justify-center shrink-0 mt-0.5 text-amber-400 font-display font-black text-xs shadow-md">
                    사범
                  </div>
                  <div
                    dir={language === 'Urdu' || language === 'Arabic' ? 'rtl' : 'ltr'}
                    className="max-w-[85%] rounded-2xl rounded-tl-sm px-4 py-3 text-sm leading-relaxed shadow-lg bg-slate-900 border border-amber-500/40 text-slate-100"
                  >
                    <div className="flex items-center justify-between gap-4 mb-1.5 text-[11px] opacity-75">
                      <span className="font-semibold uppercase tracking-wider text-amber-400">
                        Grandmaster Sabomnim AI (Speaking...)
                      </span>
                      <Loader2 className="w-3 h-3 animate-spin text-amber-400" />
                    </div>
                    <div className="whitespace-pre-wrap leading-relaxed font-sans">
                      {streamingContent}
                      <span className="inline-block w-2 h-4 ml-1 bg-amber-400 animate-pulse align-middle" />
                    </div>
                  </div>
                </div>
              )}

              {/* Waiting for first token indicator */}
              {loading && !streamingContent && (
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-red-600/20 border border-red-500/40 flex items-center justify-center shrink-0 text-amber-400 font-display font-black text-xs animate-pulse">
                    사범
                  </div>
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl px-4 py-3 text-xs sm:text-sm text-slate-300 flex items-center gap-2.5 shadow-lg">
                    <Loader2 className="w-4 h-4 text-amber-400 animate-spin" />
                    <span>
                      {language === 'Urdu'
                        ? 'ماسٹر کوچ تکنیک کا تجزیہ کر رہے ہیں...'
                        : language === 'Arabic'
                        ? 'المدرب يقوم بصياغة التوجيهات الفنية...'
                        : 'Grandmaster Sabomnim AI is analyzing your technique...'}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Speaking active banner */}
            {isSpeaking && (
              <div className="bg-amber-950/60 border-t border-amber-800/80 px-4 py-2 flex items-center justify-between text-xs text-amber-200">
                <div className="flex items-center gap-2">
                  <Volume2 className="w-4 h-4 animate-bounce text-amber-400" />
                  <span>Coach voice synthesis active ({language})...</span>
                </div>
                <button
                  onClick={stopSpeaking}
                  className="px-2.5 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 rounded text-[11px] font-semibold"
                >
                  Stop Audio
                </button>
              </div>
            )}

            {/* Listening active banner */}
            {isListening && (
              <div className="bg-red-950/70 border-t border-red-800 px-4 py-2 flex items-center justify-between text-xs text-red-200 animate-pulse">
                <div className="flex items-center gap-2">
                  <Mic className="w-4 h-4 text-red-400 animate-spin" />
                  <span>Listening to microphone in {language}... Speak clearly.</span>
                </div>
                <button
                  onClick={stopListening}
                  className="px-2.5 py-1 bg-red-700 hover:bg-red-600 text-white rounded text-[11px] font-semibold"
                >
                  Done Speaking
                </button>
              </div>
            )}

            {/* Chat Input Bar */}
            <div className="p-3 sm:p-4 bg-slate-950 border-t border-slate-800">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                {/* Microphone button */}
                <button
                  type="button"
                  onClick={handleMicToggle}
                  title={
                    recognitionSupported
                      ? isListening
                        ? 'Stop listening'
                        : 'Start voice input (Speech to Text)'
                      : 'Speech recognition not supported in this browser'
                  }
                  disabled={!recognitionSupported || loading || isStreaming}
                  className={`p-3 rounded-xl transition-all shadow-md shrink-0 ${
                    isListening
                      ? 'bg-red-600 text-white ring-4 ring-red-600/30 animate-pulse'
                      : recognitionSupported
                      ? 'bg-slate-900 hover:bg-slate-850 text-amber-400 border border-slate-800 hover:border-amber-400/50'
                      : 'bg-slate-900/50 text-slate-600 cursor-not-allowed border border-slate-900'
                  }`}
                >
                  {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </button>

                {/* Text input */}
                <input
                  ref={inputRef}
                  type="text"
                  value={inputPrompt}
                  onChange={(e) => setInputPrompt(e.target.value)}
                  dir={language === 'Urdu' || language === 'Arabic' ? 'rtl' : 'ltr'}
                  placeholder={
                    isListening
                      ? 'Listening to your voice...'
                      : language === 'Urdu'
                      ? 'ماسٹر کوچ سے سوال پوچھیں یا موک امتحان شروع کریں...'
                      : language === 'Arabic'
                      ? 'اسأل مدرب التايكوندو أو ابدأ اختباراً تجريبياً...'
                      : `Ask Grandmaster Sabomnim (${currentBelt})...`
                  }
                  disabled={loading || isStreaming}
                  className="flex-1 bg-slate-900/90 border border-slate-800 text-slate-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400 transition-colors placeholder:text-slate-500 disabled:opacity-60"
                />

                {/* Send button */}
                <button
                  type="submit"
                  disabled={loading || isStreaming || !inputPrompt.trim()}
                  className="px-5 py-3 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md shrink-0 flex items-center gap-1.5"
                >
                  {loading || isStreaming ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  <span className="hidden sm:inline">Send</span>
                </button>
              </form>

              {!recognitionSupported && (
                <p className="text-[10px] text-slate-500 mt-1.5">
                  Voice input uses browser Web Speech recognition (Chrome, Edge, Safari). Type in English, Urdu, or Arabic above!
                </p>
              )}
            </div>
          </div>

          {/* Side Panel: Suggested Quick Inquiries & Curriculum Focus (1 col) */}
          <div className="space-y-4">
            {/* Quick Questions Card */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 shadow-xl">
              <h3 className="font-display uppercase text-sm font-bold text-white tracking-wider mb-2 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-amber-400" />
                <span>Suggested Inquiries</span>
              </h3>
              <p className="text-xs text-slate-400 mb-3">
                Tap any question below for immediate master instruction in {language}:
              </p>

              <div className="space-y-2">
                {quickQuestions.map((q, idx) => {
                  const text = language === 'Urdu' ? q.ur : language === 'Arabic' ? q.ar : q.en;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(text)}
                      disabled={loading || isStreaming}
                      className="w-full text-left p-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-amber-400/50 text-xs text-slate-300 hover:text-white transition-all leading-snug group"
                    >
                      <span className="text-amber-400 mr-1.5 font-bold group-hover:translate-x-0.5 inline-block transition-transform">
                        ›
                      </span>
                      {text}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Current Belt Focus */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-4 shadow-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Target Rank
                </span>
                <span className="text-[11px] text-amber-400 font-semibold">{currentBelt}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Coach answers emphasize proper stance angles (Seogi), hip snap (Golban), and Kihap breathing. Responses stream instantly using Gemini 3.8 Flash.
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* Terminology Glossary Tab */
        <div className="space-y-6">
          <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl shadow-lg flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search Korean term (e.g. Ap Chagi, Arae Makgi, Charyeot, Juchum Seogi)..."
              className="flex-1 bg-slate-900 border border-slate-800 text-slate-100 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-amber-400"
            />
            <button
              onClick={() => handleSearchTerminology()}
              disabled={isSearchingTerm || !searchTerm.trim()}
              className="px-5 py-2.5 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-all disabled:opacity-40"
            >
              {isSearchingTerm ? 'Searching...' : 'Lookup Term'}
            </button>
          </div>

          {searchedTerminology && (
            <div className="bg-slate-950 border border-amber-500/50 rounded-xl p-6 shadow-xl space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                    {searchedTerminology.category}
                  </span>
                  <h3 className="text-2xl font-display font-black text-white mt-1">
                    {searchedTerminology.romanized}{' '}
                    <span className="text-xl text-slate-400 font-normal">
                      ({searchedTerminology.koreanHangul})
                    </span>
                  </h3>
                  <div className="text-sm text-slate-300 font-semibold mt-1">
                    {searchedTerminology.englishMeaning}
                  </div>
                </div>

                <button
                  onClick={() => speak(searchedTerminology.romanized, 'Korean')}
                  className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-amber-400 rounded-lg text-xs font-bold flex items-center gap-1.5"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Pronounce</span>
                </button>
              </div>

              <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-300">
                <strong className="text-amber-400">Master Coaching Cue: </strong>
                {searchedTerminology.technicalCues}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-right font-sans">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1">
                    Urdu (اردو)
                  </span>
                  <span className="text-slate-200 text-sm">{searchedTerminology.urdu}</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-right font-sans">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1">
                    Arabic (العربية)
                  </span>
                  <span className="text-slate-200 text-sm">{searchedTerminology.arabic}</span>
                </div>
              </div>
            </div>
          )}

          {/* Quick Glossary Grid */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 shadow-lg">
            <h4 className="font-display uppercase text-xs font-bold text-slate-400 tracking-wider mb-3">
              Standard Korean Terminology Reference (Kukkiwon Standard)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {GENERAL_TERMINOLOGY.slice(0, 12).map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSearchedTerminology(item);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="p-3 rounded-lg bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-amber-400/40 text-left text-xs transition-colors flex items-center justify-between group"
                >
                  <div>
                    <div className="font-bold text-white group-hover:text-amber-400">
                      {item.romanized}
                    </div>
                    <div className="text-[11px] text-slate-400">{item.englishMeaning}</div>
                  </div>
                  <span className="text-xs text-slate-500 font-display">{item.koreanHangul}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
