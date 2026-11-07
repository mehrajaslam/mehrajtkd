import React, { useState, useEffect } from 'react';
import {
  Mic,
  Award,
  Layers,
  Flame,
  ShieldAlert,
  GraduationCap,
  ClipboardList,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  User,
  BookOpen,
  Volume2,
  ChevronLeft,
  MessageSquare
} from 'lucide-react';
import { Language, BeltRank, UserProfile } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AiVoiceCoach } from './components/AiVoiceCoach';
import { BeltTraining } from './components/BeltTraining';
import { DanPreparation } from './components/DanPreparation';
import { PoomsaeAcademy } from './components/PoomsaeAcademy';
import { KyorugiTraining } from './components/KyorugiTraining';
import { RefereeEducation } from './components/RefereeEducation';
import { CoachEducation } from './components/CoachEducation';
import { ExaminationCentre } from './components/ExaminationCentre';
import { StudentProgress } from './components/StudentProgress';

const STORAGE_KEY = 'ptf_tkd_student_profile_v1';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [language, setLanguage] = useState<Language>('English');
  const [profile, setProfile] = useState<UserProfile>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.warn('Failed to parse saved student profile');
        }
      }
    }
    return {
      studentName: 'Dedicated Practitioner',
      clubAffiliation: 'World Strikers Taekwondo Academy',
      currentBelt: '8th Gup (Yellow Belt)',
      targetBelt: '1st Dan (Black Belt)',
      completedLessons: ['gup-10'],
      completedQuizzes: [],
      streakDays: 3,
      voiceAutoPlay: true,
      preferredLanguage: 'English',
    };
  });

  // Save profile to localStorage on updates
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    }
  }, [profile]);

  const handleUpdateProfile = (updated: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...updated }));
  };

  const handleToggleLessonComplete = (lessonId: string) => {
    setProfile((prev) => {
      const exists = prev.completedLessons.includes(lessonId);
      const newLessons = exists
        ? prev.completedLessons.filter((id) => id !== lessonId)
        : [...prev.completedLessons, lessonId];
      return { ...prev, completedLessons: newLessons };
    });
  };

  const handleRecordQuizScore = (quizId: string, score: number, maxScore: number) => {
    setProfile((prev) => ({
      ...prev,
      completedQuizzes: [
        ...prev.completedQuizzes,
        {
          quizId,
          score,
          maxScore,
          date: new Date().toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' }),
        },
      ],
    }));
  };

  const handleAskCoachPrompt = (prompt: string) => {
    setActiveTab('coach');
  };

  const dashboardModules = [
    {
      id: 'coach',
      title: 'AI Voice Coach',
      desc: 'Multilingual voice & chat assistant in English, Urdu, and Arabic with Korean terminology.',
      icon: Mic,
      color: 'from-red-600 to-amber-600',
      badge: 'Interactive Voice'
    },
    {
      id: 'belts',
      title: 'Belt Training (10th to 1st Gup)',
      desc: 'White belt to Cho Dan Bo syllabus: stances, blocks, hand strikes, kicks, and quizzes.',
      icon: Award,
      color: 'from-amber-600 to-yellow-600',
      badge: '10 Belt Levels'
    },
    {
      id: 'dan',
      title: 'Dan Preparation (1st to 9th Dan)',
      desc: 'Kukkiwon-aligned research, thesis topics, pedagogical hours, and Grandmaster philosophy.',
      icon: GraduationCap,
      color: 'from-slate-800 to-red-950',
      badge: 'Black Belt'
    },
    {
      id: 'poomsae',
      title: 'Poomsae Academy',
      desc: 'Taegeuk 1–8 and Dan forms (Koryo to Ilyeo) with step-by-step sequence viewer & quizzes.',
      icon: Layers,
      color: 'from-blue-700 to-indigo-900',
      badge: 'Forms & Trigrams'
    },
    {
      id: 'kyorugi',
      title: 'Olympic Kyorugi Sparring',
      desc: 'PSS electronic scoring tactics, counter-attacks (Bada Chagi), and interactive match simulator.',
      icon: Flame,
      color: 'from-red-700 to-rose-900',
      badge: 'Match Simulator'
    },
    {
      id: 'referee',
      title: 'Referee Education',
      desc: 'WT 2024–2026 rules, scoring table, Gam-jeom infractions, and official hand signals.',
      icon: ShieldAlert,
      color: 'from-amber-700 to-red-900',
      badge: 'WT Rules 2024–2026'
    },
    {
      id: 'coach-edu',
      title: 'Coach Pedagogy',
      desc: 'Session plan builder, PNF stretching protocols for high kicks, and LTAD stages.',
      icon: ClipboardList,
      color: 'from-emerald-700 to-teal-900',
      badge: 'Session Planner'
    },
    {
      id: 'exams',
      title: 'Examination Centre',
      desc: 'Promotion theory tests, referee rule evaluations, and Korean terminology speed drills.',
      icon: CheckCircle2,
      color: 'from-yellow-600 to-amber-800',
      badge: 'Mock Testing'
    },
  ];

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex flex-col selection:bg-red-600 selection:text-white">
      {/* Top Federation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentBelt={profile.currentBelt}
        language={language}
        setLanguage={setLanguage}
        onOpenProfile={() => setActiveTab('profile')}
      />

      {/* Main View Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8">
        {/* ======================================================== */}
        {/* DASHBOARD HOME VIEW (when activeTab === 'dashboard')    */}
        {/* ======================================================== */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Dynamic Championship Federation Hero Banner */}
            <div className="relative rounded-2xl border border-slate-800 overflow-hidden bg-slate-950 shadow-2xl">
              <div className="absolute inset-0 z-0 opacity-35">
                <img
                  src="/src/assets/images/tkd_championship_hero_1794042840454.jpg"
                  alt="World Taekwondo Championship Action"
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
              </div>

              <div className="relative z-10 p-6 sm:p-10 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/20 border border-red-500/40 text-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>PTF & World Strikers Global Academy</span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-wider text-white leading-tight">
                  AI Taekwondo <span className="text-amber-400">Master Coach</span>
                </h1>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                  Elevate your martial art from 10th Gup to 9th Dan. Real-time multilingual voice instruction in English, Urdu, and Arabic, Kukkiwon Poomsae sequences, WT competition refereeing, and tactical sparring simulations.
                </p>

                {/* Fast module selector buttons */}
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => {
                      setActiveTab('coach');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-5 py-2.5 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-red-950/50 flex items-center gap-2"
                  >
                    <Mic className="w-4 h-4 text-amber-300" />
                    <span>Talk to AI Coach</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('belts')}
                    className="px-5 py-2.5 bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-200 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2"
                  >
                    <Award className="w-4 h-4 text-amber-400" />
                    <span>Belt Curriculum</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('poomsae')}
                    className="px-5 py-2.5 bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-200 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2"
                  >
                    <Layers className="w-4 h-4 text-amber-400" />
                    <span>Poomsae Academy</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('referee')}
                    className="px-5 py-2.5 bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-200 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2"
                  >
                    <ShieldAlert className="w-4 h-4 text-red-400" />
                    <span>WT Rules 2024–2026</span>
                  </button>
                </div>
              </div>
            </div>

            {/* =============================================================== */}
            {/* 1. HIGH-PRIORITY PROMINENT AI COACH DASHBOARD CARD / BUTTON     */}
            {/* =============================================================== */}
            <div className="relative overflow-hidden rounded-2xl border-2 border-amber-500/80 bg-gradient-to-r from-red-950 via-slate-950 to-amber-950 p-6 sm:p-8 shadow-2xl shadow-red-950/50 group hover:border-amber-400 transition-all">
              <div className="absolute top-0 right-0 w-96 h-full bg-[radial-gradient(ellipse_at_top_right,_var(--color-tkd-red),transparent)] opacity-25 pointer-events-none" />

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                <div className="space-y-3 max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/30 border border-red-500/60 text-amber-300 text-xs font-bold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Grandmaster Sabomnim AI • Multilingual Voice</span>
                  </div>

                  <div className="flex items-start sm:items-center gap-4">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-red-600 via-amber-500 to-red-800 p-0.5 flex items-center justify-center shadow-xl shrink-0 group-hover:scale-105 transition-transform">
                      <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center gap-1.5">
                        <Mic className="w-6 h-6 text-amber-400 animate-pulse" />
                        <MessageSquare className="w-5 h-5 text-red-400" />
                      </div>
                    </div>
                    <div>
                      <h2 className="text-2xl sm:text-4xl font-display font-black uppercase tracking-wider text-white leading-tight">
                        TALK TO AI TAEKWONDO COACH
                      </h2>
                      <p className="text-xs sm:text-sm text-amber-200/90 font-medium mt-0.5">
                        Your personal Taekwondo instructor — available in three languages.
                      </p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Ask questions about stances, kicks, Poomsae forms, sparring tactics, WT rules, or conduct an interactive 1-question mock exam. Speak with your microphone or type in English, Urdu (اردو), or Arabic (العربية).
                  </p>

                  {/* Language indicators */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Available in:</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-amber-300 text-xs font-semibold">English</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-amber-300 text-xs font-semibold">اردو (Urdu)</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-amber-300 text-xs font-semibold">العربية (Arabic)</span>
                  </div>
                </div>

                {/* Primary Action Button */}
                <div className="shrink-0 flex flex-col items-stretch sm:items-end gap-2">
                  <button
                    onClick={() => {
                      setActiveTab('coach');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-8 py-4 bg-gradient-to-r from-red-600 via-amber-600 to-red-600 hover:from-red-500 hover:to-amber-500 text-white rounded-2xl text-sm font-display font-black tracking-wider uppercase transition-all shadow-xl shadow-red-950/60 flex items-center justify-center gap-3 group-hover:scale-105 active:scale-95"
                  >
                    <Mic className="w-5 h-5 text-amber-300" />
                    <MessageSquare className="w-5 h-5 text-white" />
                    <span>START CONVERSATION</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                  </button>
                  <span className="text-[11px] text-slate-400 text-center sm:text-right">
                    Instant voice & text • Streaming response
                  </span>
                </div>
              </div>
            </div>

            {/* All 8 Clickable Dashboard Modules Grid */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest mb-1">
                    <Award className="w-4 h-4" />
                    <span>Federation Curriculum Tracks</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-display font-black uppercase tracking-wider text-white">
                    Training Modules & Academies
                  </h2>
                  <p className="text-xs text-slate-400">
                    Click any module below to enter its dedicated learning curriculum, techniques, and quizzes.
                  </p>
                </div>
                <div className="text-xs text-amber-400 font-semibold uppercase tracking-wider bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-lg w-fit">
                  8 Interactive Tracks Available
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {dashboardModules.map((m) => {
                  const Icon = m.icon;
                  return (
                    <button
                      key={m.id}
                      onClick={() => {
                        setActiveTab(m.id);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="group relative p-5 rounded-2xl border border-slate-800 bg-slate-950 hover:border-amber-500/60 hover:bg-slate-900/90 transition-all text-left flex flex-col justify-between shadow-lg"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${m.color} p-0.5 flex items-center justify-center shadow-md`}>
                            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                              <Icon className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
                            </div>
                          </div>
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 group-hover:border-amber-500/40 group-hover:text-amber-300 transition-colors">
                            {m.badge}
                          </span>
                        </div>
                        <h3 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors leading-snug">
                          {m.title}
                        </h3>
                        <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                          {m.desc}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-amber-400">
                        <span>Open Curriculum</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* DEDICATED AI CONVERSATION SCREEN (activeTab === 'coach') */}
        {/* ======================================================== */}
        {activeTab === 'coach' && (
          <AiVoiceCoach
            currentBelt={profile.currentBelt}
            language={language}
            setLanguage={setLanguage}
            onBackToDashboard={() => {
              setActiveTab('dashboard');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onRecordStudyTime={() => {
              setProfile((p) => ({ ...p, streakDays: (p.streakDays || 1) }));
            }}
          />
        )}

        {/* ======================================================== */}
        {/* SUB-MODULE BREADCRUMBS (when activeTab !== dashboard & coach) */}
        {/* ======================================================== */}
        {activeTab !== 'dashboard' && activeTab !== 'coach' && (
          <div className="flex items-center justify-between bg-slate-950 border border-slate-800 px-4 py-2.5 rounded-xl shadow-md">
            <button
              onClick={() => {
                setActiveTab('dashboard');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-300 hover:text-amber-400 transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-amber-400" />
              <span>Back to Master Dashboard</span>
            </button>
            <div className="text-xs text-slate-400 font-medium hidden sm:block">
              Active Track: <span className="text-amber-400 font-bold uppercase">{dashboardModules.find((m) => m.id === activeTab)?.title || 'Curriculum'}</span>
            </div>
          </div>
        )}

        {/* Dedicated Modules Rendering */}
        {activeTab === 'belts' && (
          <BeltTraining
            completedLessons={profile.completedLessons}
            onToggleComplete={handleToggleLessonComplete}
            onAskCoach={handleAskCoachPrompt}
          />
        )}

        {activeTab === 'dan' && (
          <DanPreparation onAskCoach={handleAskCoachPrompt} />
        )}

        {activeTab === 'poomsae' && (
          <PoomsaeAcademy onAskCoach={handleAskCoachPrompt} />
        )}

        {activeTab === 'kyorugi' && (
          <KyorugiTraining onAskCoach={handleAskCoachPrompt} />
        )}

        {activeTab === 'referee' && (
          <RefereeEducation onAskCoach={handleAskCoachPrompt} />
        )}

        {activeTab === 'coach-edu' && (
          <CoachEducation onAskCoach={handleAskCoachPrompt} />
        )}

        {activeTab === 'exams' && (
          <ExaminationCentre
            onRecordScore={handleRecordQuizScore}
            onAskCoach={handleAskCoachPrompt}
          />
        )}

        {activeTab === 'profile' && (
          <StudentProgress
            profile={profile}
            onUpdateProfile={handleUpdateProfile}
            onClose={() => setActiveTab('dashboard')}
            onAskCoach={handleAskCoachPrompt}
          />
        )}

        {/* Quick Module Grid Navigation at Bottom of Sections */}
        {activeTab !== 'dashboard' && (
          <div className="pt-6 border-t border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display uppercase text-xs font-bold text-slate-400 tracking-wider">
                Quick Federation Modules Navigation
              </h3>
              <button
                onClick={() => {
                  setActiveTab('dashboard');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-xs text-amber-400 hover:underline font-semibold"
              >
                Return to Dashboard
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
              {dashboardModules.map((m) => {
                const Icon = m.icon;
                const isCurrent = activeTab === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => {
                      setActiveTab(m.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      isCurrent
                        ? 'bg-amber-500/10 border-amber-400 text-amber-300 font-bold'
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4 mb-2 text-amber-400" />
                    <div className="text-xs font-bold truncate leading-tight">{m.title}</div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </main>

      {/* Official Federation Footer */}
      <Footer onSelectTab={(tab) => {
        setActiveTab(tab);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }} />
    </div>
  );
}
