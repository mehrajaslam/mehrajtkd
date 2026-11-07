import React, { useState } from 'react';
import {
  Award,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Volume2,
  BookOpen,
  ArrowRight,
  Shield,
  HelpCircle,
  Sparkles,
  Flame,
  AlertTriangle,
  RotateCcw,
  Target,
  Send,
  Loader2,
  X
} from 'lucide-react';
import { GupLesson, TerminologyItem } from '../types';
import { GUP_LESSONS } from '../data/curriculumData';
import { useSpeech } from '../hooks/useSpeech';
import { askCoachChat } from '../services/coachApi';

interface BeltTrainingProps {
  completedLessons: string[];
  onToggleComplete: (lessonId: string) => void;
  onAskCoach?: (query: string) => void;
}

export const BeltTraining: React.FC<BeltTrainingProps> = ({
  completedLessons,
  onToggleComplete,
}) => {
  // viewMode: 'levels' shows all 10 belts; 'lesson' opens the dedicated lesson page
  const [viewMode, setViewMode] = useState<'levels' | 'lesson'>('levels');
  const [selectedGupIndex, setSelectedGupIndex] = useState(0);

  // Quiz state for the 5-question quiz
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // In-lesson coach helper (keeps student on lesson page!)
  const [showInlineCoach, setShowInlineCoach] = useState(false);
  const [inlineCoachQuestion, setInlineCoachQuestion] = useState('');
  const [inlineCoachReply, setInlineCoachReply] = useState<string | null>(null);
  const [inlineCoachLoading, setInlineCoachLoading] = useState(false);

  const { speak } = useSpeech();

  const currentLesson: GupLesson = GUP_LESSONS[selectedGupIndex] || GUP_LESSONS[0];
  const lessonKey = `gup-${currentLesson.gupNumber}`;
  const isCompleted = completedLessons.includes(lessonKey);

  const totalBelts = GUP_LESSONS.length;
  const completedBeltsCount = completedLessons.filter((id) => id.startsWith('gup-')).length;
  const completionPercentage = Math.round((completedBeltsCount / totalBelts) * 100);

  const handleOpenLesson = (idx: number) => {
    setSelectedGupIndex(idx);
    setViewMode('lesson');
    setQuizAnswers({});
    setQuizSubmitted(false);
    setInlineCoachReply(null);
    setInlineCoachQuestion('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNextLesson = () => {
    if (selectedGupIndex < totalBelts - 1) {
      handleOpenLesson(selectedGupIndex + 1);
    } else {
      setViewMode('levels');
    }
  };

  const handlePrevLesson = () => {
    if (selectedGupIndex > 0) {
      handleOpenLesson(selectedGupIndex - 1);
    }
  };

  const handleQuizAnswer = (qIdx: number, optIdx: number) => {
    if (quizSubmitted) return;
    setQuizAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
  };

  const calculateQuizScore = () => {
    let correct = 0;
    currentLesson.quiz.forEach((q, idx) => {
      if (quizAnswers[idx] === q.correctIndex) {
        correct++;
      }
    });
    return correct;
  };

  const handleInlineAskCoach = async (e: React.FormEvent) => {
    e.preventDefault();
    const query = inlineCoachQuestion.trim();
    if (!query || inlineCoachLoading) return;

    setInlineCoachLoading(true);
    try {
      const response = await askCoachChat(
        `[${currentLesson.title}] Student question: ${query}`,
        'English',
        `${currentLesson.gupNumber}th Gup (${currentLesson.beltName})` as any
      );
      setInlineCoachReply(response.reply);
    } catch (err: any) {
      setInlineCoachReply('Maintain your core center, keep standing foot firmly pivoted, and breathe out sharply on impact!');
    } finally {
      setInlineCoachLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Federation Header */}
      <div className="relative overflow-hidden rounded-xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-widest mb-1">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Standard Kukkiwon Gup Curriculum (10th Gup to 1st Gup)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-black uppercase tracking-wider text-white">
              {viewMode === 'levels' ? 'Gup Belt Training Academy' : currentLesson.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mt-1">
              {viewMode === 'levels'
                ? 'Select any belt rank from 10th Gup to 1st Gup to open its complete, structured lesson syllabus.'
                : `Dedicated training syllabus for ${currentLesson.beltName}. Follow the 8 structured steps to master this rank.`}
            </p>
          </div>

          {/* Progress Tracker */}
          <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl shrink-0 min-w-[220px]">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-slate-400 font-medium">Curriculum Progress:</span>
              <span className="font-bold text-amber-400">{completedBeltsCount} / {totalBelts} Belts</span>
            </div>
            <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-red-600 to-amber-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
            <div className="text-[10px] text-slate-500 mt-1 text-right">{completionPercentage}% Completed</div>
          </div>
        </div>
      </div>

      {viewMode === 'levels' ? (
        /* ALL 10 BELT LEVELS GRID VIEW */
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display uppercase text-sm font-bold text-white tracking-wider flex items-center gap-2">
              <Shield className="w-4 h-4 text-amber-400" />
              All Belt Levels (10th Gup to 1st Gup)
            </h3>
            <span className="text-xs text-slate-400">Click any level to start or review the lesson</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {GUP_LESSONS.map((lesson, idx) => {
              const isDone = completedLessons.includes(`gup-${lesson.gupNumber}`);
              return (
                <div
                  key={lesson.gupNumber}
                  onClick={() => handleOpenLesson(idx)}
                  className={`group cursor-pointer bg-slate-950 border rounded-xl p-5 transition-all hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between ${
                    isDone
                      ? 'border-emerald-500/40 bg-emerald-950/10'
                      : 'border-slate-800 hover:border-amber-400/60'
                  }`}
                >
                  <div>
                    {/* Top Belt Strap Graphic & Status */}
                    <div className="flex items-center justify-between mb-3">
                      {/* Realistic Belt representation */}
                      <div
                        className="w-12 h-6 rounded border border-black/60 relative flex items-center justify-center shadow-md shrink-0"
                        style={{ backgroundColor: lesson.beltColorHex }}
                      >
                        {lesson.stripeColorHex && (
                          <div
                            className="absolute inset-x-0 h-1.5 border-y border-black/20"
                            style={{ backgroundColor: lesson.stripeColorHex }}
                          />
                        )}
                      </div>

                      {isDone ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/40">
                          <CheckCircle2 className="w-3 h-3" /> Done
                        </span>
                      ) : (
                        <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                          Ready
                        </span>
                      )}
                    </div>

                    <div className="font-display font-black text-lg text-white group-hover:text-amber-400 transition-colors">
                      {lesson.gupNumber}th Gup
                    </div>
                    <div className="text-xs font-semibold text-slate-300 mt-0.5">
                      {lesson.beltName}
                    </div>

                    <p className="text-[11px] text-slate-400 line-clamp-2 mt-2 leading-relaxed">
                      {lesson.explanation}
                    </p>

                    <div className="mt-3 pt-3 border-t border-slate-900 flex items-center justify-between text-[10px] text-slate-500">
                      <span>Poomsae: {lesson.poomsaeRequired.split('(')[0].trim()}</span>
                      <span>5 Quiz Qs</span>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenLesson(idx);
                    }}
                    className="w-full mt-4 py-2 bg-slate-900 group-hover:bg-gradient-to-r group-hover:from-red-600 group-hover:to-amber-600 text-slate-300 group-hover:text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>{isDone ? 'Review Lesson' : 'Open Lesson'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* DEDICATED STRUCTURED LESSON PAGE */
        <div className="space-y-6">
          {/* Top Navigation Bar: Back to All Belts + Previous/Next Buttons */}
          <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex items-center justify-between gap-4 shadow-md">
            <button
              onClick={() => setViewMode('levels')}
              className="flex items-center gap-2 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back to All Belts</span>
            </button>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-semibold hidden sm:inline">
                Lesson {totalBelts - selectedGupIndex} of {totalBelts}:
              </span>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wide">
                {currentLesson.beltName}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevLesson}
                disabled={selectedGupIndex === 0}
                className="flex items-center gap-1 px-3 py-2 bg-slate-900 hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed text-slate-300 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Previous</span>
              </button>
              <button
                onClick={handleNextLesson}
                disabled={selectedGupIndex === totalBelts - 1}
                className="flex items-center gap-1 px-3 py-2 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 disabled:opacity-30 disabled:cursor-not-allowed text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-all shadow-md"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 1. LESSON TITLE */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div
                className="w-10 h-20 rounded-md border-2 border-black/70 shadow-lg relative flex items-center justify-center shrink-0"
                style={{ backgroundColor: currentLesson.beltColorHex }}
              >
                {currentLesson.stripeColorHex && (
                  <div
                    className="absolute inset-x-0 h-4 border-y border-black/30"
                    style={{ backgroundColor: currentLesson.stripeColorHex }}
                  />
                )}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                    Step 1 of 8 · Lesson Title
                  </span>
                  {isCompleted && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                      <CheckCircle2 className="w-3 h-3" /> Mastered
                    </span>
                  )}
                </div>
                <h1 className="text-2xl sm:text-3xl font-display font-black uppercase text-white tracking-wide mt-1">
                  {currentLesson.title}
                </h1>
                <div className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                  <span>Required Poomsae: <strong className="text-white">{currentLesson.poomsaeRequired}</strong></span>
                  <span>·</span>
                  <span>Grade: <strong className="text-amber-400">{currentLesson.gupNumber}th Gup</strong></span>
                </div>
              </div>
            </div>

            {/* Quick Ask AI Coach helper button (stays on this page!) */}
            <button
              onClick={() => setShowInlineCoach(!showInlineCoach)}
              className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-850 border border-amber-400/50 hover:border-amber-400 text-amber-300 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shrink-0"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{showInlineCoach ? 'Close Coach' : 'Ask AI Coach About This Lesson'}</span>
            </button>
          </div>

          {/* Collapsible Inline Coach (Keeps student inside lesson page!) */}
          {showInlineCoach && (
            <div className="bg-slate-900 border border-amber-400/40 rounded-xl p-5 shadow-2xl animate-in fade-in duration-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase text-amber-400 tracking-wider">
                  <Sparkles className="w-4 h-4" />
                  <span>AI Master Coach Guidance ({currentLesson.beltName})</span>
                </div>
                <button
                  onClick={() => setShowInlineCoach(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleInlineAskCoach} className="flex gap-2">
                <input
                  type="text"
                  value={inlineCoachQuestion}
                  onChange={(e) => setInlineCoachQuestion(e.target.value)}
                  placeholder={`Ask Sabomnim any question about ${currentLesson.title}...`}
                  className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                />
                <button
                  type="submit"
                  disabled={inlineCoachLoading || !inlineCoachQuestion.trim()}
                  className="px-4 py-2.5 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-all disabled:opacity-40 flex items-center gap-1.5 shrink-0"
                >
                  {inlineCoachLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  <span>Ask</span>
                </button>
              </form>

              {inlineCoachLoading && (
                <div className="mt-3 p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center gap-2 text-xs text-slate-400">
                  <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                  <span>Grandmaster Sabomnim is providing concise technical advice...</span>
                </div>
              )}

              {inlineCoachReply && !inlineCoachLoading && (
                <div className="mt-3 p-4 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 leading-relaxed whitespace-pre-wrap">
                  <strong className="text-amber-400 block mb-1">Master Coach Cues:</strong>
                  {inlineCoachReply}
                </div>
              )}
            </div>
          )}

          {/* 2. LEARNING OBJECTIVES */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 shadow-xl">
            <h3 className="font-display uppercase text-sm font-bold text-amber-400 tracking-wider mb-3 flex items-center gap-2">
              <Target className="w-4 h-4 text-amber-400" />
              2. Learning Objectives
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {currentLesson.objectives.map((obj, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs text-slate-200 leading-relaxed"
                >
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{obj}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 3. EXPLANATION */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 shadow-xl">
            <h3 className="font-display uppercase text-sm font-bold text-white tracking-wider mb-2 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-400" />
              3. In-Depth Lesson Explanation & Martial Philosophy
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-900/40 p-4 rounded-xl border border-slate-800/80">
              {currentLesson.explanation}
            </p>

            {/* Korean Terminology for this belt */}
            <div className="mt-4 pt-4 border-t border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Mandatory Korean Terminology:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {currentLesson.terminology.map((t, i) => (
                  <div key={i} className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-black text-amber-400 text-base">{t.koreanHangul}</span>
                      <button
                        onClick={() => speak(t.koreanHangul, 'Korean')}
                        className="text-slate-400 hover:text-amber-400 p-1"
                        title="Pronounce"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="font-bold text-white text-xs">{t.romanized}</div>
                    <div className="text-[11px] text-slate-400">{t.englishMeaning}</div>
                    <div className="mt-1.5 pt-1.5 border-t border-slate-800/80 text-[10px] text-slate-500 flex justify-between">
                      <span>{t.urdu}</span>
                      <span>{t.arabic}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 4. STEP-BY-STEP TECHNIQUES */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 shadow-xl">
            <h3 className="font-display uppercase text-sm font-bold text-white tracking-wider mb-4 flex items-center gap-2">
              <Shield className="w-4 h-4 text-red-400" />
              4. Step-By-Step Techniques Breakdown
            </h3>

            <div className="space-y-4">
              {currentLesson.stepByStepTechniques.map((tech, idx) => (
                <div
                  key={idx}
                  className="bg-slate-900/70 border border-slate-800 rounded-xl p-5 space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-lg bg-red-600/20 border border-red-500/40 text-red-300 font-display font-black text-xs flex items-center justify-center">
                        #{idx + 1}
                      </span>
                      <div>
                        <h4 className="text-base font-bold text-white">{tech.name}</h4>
                        <span className="text-xs text-amber-400 font-semibold">{tech.koreanHangul} ({tech.romanized})</span>
                      </div>
                    </div>
                    <span className="px-2.5 py-0.5 rounded bg-slate-800 text-[10px] font-bold text-slate-300 uppercase tracking-wider self-start sm:self-center">
                      {tech.category}
                    </span>
                  </div>

                  <div className="text-xs text-amber-300/90 font-medium bg-amber-950/20 p-2.5 rounded-lg border border-amber-900/30">
                    <strong>Master Cue: </strong>{tech.cues}
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                      Execution Steps:
                    </span>
                    {tech.steps.map((st, sIdx) => (
                      <div key={sIdx} className="flex items-start gap-2 text-xs text-slate-300">
                        <span className="text-red-400 font-bold shrink-0">{sIdx + 1}.</span>
                        <span>{st}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 5. PRACTICAL TRAINING */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 shadow-xl">
            <h3 className="font-display uppercase text-sm font-bold text-white tracking-wider mb-4 flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-400" />
              5. Practical Training & Dojang Drills
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {currentLesson.practicalTraining.map((drill, idx) => (
                <div
                  key={idx}
                  className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block mb-1">
                      Drill #{idx + 1}
                    </span>
                    <h4 className="text-sm font-bold text-white mb-2">{drill.title}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed mb-3">
                      {drill.description}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-slate-800 text-[11px] font-semibold text-amber-400">
                    Reps: {drill.repetitions}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 6. COMMON MISTAKES */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 shadow-xl">
            <h3 className="font-display uppercase text-sm font-bold text-white tracking-wider mb-4 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              6. Common Mistakes & How to Correct Them
            </h3>

            <div className="space-y-3">
              {currentLesson.commonMistakes.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-slate-900/70 border border-slate-800 p-4 rounded-xl grid grid-cols-1 md:grid-cols-2 gap-3 text-xs"
                >
                  <div className="bg-red-950/20 border border-red-900/40 p-3 rounded-lg">
                    <span className="font-bold text-red-400 uppercase text-[10px] block mb-1 flex items-center gap-1">
                      <X className="w-3.5 h-3.5" /> Common Error:
                    </span>
                    <p className="text-slate-300 leading-relaxed">{item.mistake}</p>
                  </div>
                  <div className="bg-emerald-950/20 border border-emerald-900/40 p-3 rounded-lg">
                    <span className="font-bold text-emerald-400 uppercase text-[10px] block mb-1 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Master Correction:
                    </span>
                    <p className="text-slate-300 leading-relaxed">{item.correction}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 7. FIVE-QUESTION QUIZ */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display uppercase text-sm font-bold text-white tracking-wider flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-amber-400" />
                7. Five-Question Knowledge Quiz ({currentLesson.beltName})
              </h3>
              {quizSubmitted && (
                <span className="text-xs font-bold text-amber-400">
                  Score: {calculateQuizScore()} / 5 Correct
                </span>
              )}
            </div>

            <div className="space-y-6">
              {currentLesson.quiz.map((q, qIdx) => {
                const userChoice = quizAnswers[qIdx];
                const isAnswered = userChoice !== undefined;
                return (
                  <div
                    key={qIdx}
                    className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3 text-xs"
                  >
                    <div className="font-bold text-white text-sm">
                      #{qIdx + 1}. {q.question}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {q.options.map((opt, optIdx) => {
                        const isSelected = userChoice === optIdx;
                        const isCorrect = optIdx === q.correctIndex;
                        let btnStyle = 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-850';

                        if (quizSubmitted) {
                          if (isCorrect) {
                            btnStyle = 'bg-emerald-950/70 border-emerald-500 text-emerald-200 font-bold';
                          } else if (isSelected && !isCorrect) {
                            btnStyle = 'bg-red-950/70 border-red-500 text-red-200';
                          }
                        } else if (isSelected) {
                          btnStyle = 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold';
                        }

                        return (
                          <button
                            key={optIdx}
                            onClick={() => handleQuizAnswer(qIdx, optIdx)}
                            disabled={quizSubmitted}
                            className={`p-3 rounded-lg border text-left transition-all ${btnStyle}`}
                          >
                            <span className="font-bold text-amber-400 mr-2">
                              {String.fromCharCode(65 + optIdx)}.
                            </span>
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {quizSubmitted && (
                      <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-slate-400 leading-relaxed">
                        <strong className="text-amber-400 block mb-0.5">Explanation: </strong>
                        {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Submit Quiz button */}
            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
              {!quizSubmitted ? (
                <button
                  onClick={() => setQuizSubmitted(true)}
                  disabled={Object.keys(quizAnswers).length < 5}
                  className="px-6 py-2.5 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 disabled:opacity-40 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-all"
                >
                  Submit 5-Question Quiz For Evaluation
                </button>
              ) : (
                <button
                  onClick={() => {
                    setQuizAnswers({});
                    setQuizSubmitted(false);
                  }}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Quiz</span>
                </button>
              )}

              {Object.keys(quizAnswers).length < 5 && !quizSubmitted && (
                <span className="text-xs text-slate-500">
                  Answer all 5 questions to unlock score evaluation
                </span>
              )}
            </div>
          </div>

          {/* 8. LESSON COMPLETION */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-amber-500/40 rounded-xl p-6 shadow-2xl">
            <h3 className="font-display uppercase text-sm font-bold text-amber-400 tracking-wider mb-2 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              8. Lesson Completion & Belt Progression
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Mark this lesson complete once you have physically practiced the techniques and reviewed the theory. Your progress will be saved in your Student Profile.
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
              <button
                onClick={() => onToggleComplete(lessonKey)}
                className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-lg ${
                  isCompleted
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-950/50'
                    : 'bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 text-white shadow-red-950/50'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{isCompleted ? 'Lesson Mastered ✓ (Click to Toggle)' : 'Mark Lesson as Completed'}</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevLesson}
                  disabled={selectedGupIndex === 0}
                  className="px-4 py-3 bg-slate-900 hover:bg-slate-800 disabled:opacity-30 text-slate-300 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  Previous Lesson
                </button>

                {selectedGupIndex < totalBelts - 1 ? (
                  <button
                    onClick={handleNextLesson}
                    className="flex items-center gap-2 px-5 py-3 bg-slate-900 hover:bg-slate-800 border border-amber-400/60 text-amber-300 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md"
                  >
                    <span>Next Lesson ({GUP_LESSONS[selectedGupIndex + 1].beltName})</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => setViewMode('levels')}
                    className="flex items-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
                  >
                    <span>Finish Belt Syllabus</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
