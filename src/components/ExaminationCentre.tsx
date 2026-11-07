import React, { useState } from 'react';
import {
  GraduationCap,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  Award,
  HelpCircle,
  FileCheck,
  ArrowRight,
  Loader2
} from 'lucide-react';
import { EXAM_QUESTION_BANK } from '../data/curriculumData';
import { ExamQuestion } from '../types';
import { askCoachChat } from '../services/coachApi';

interface ExaminationCentreProps {
  onRecordScore: (quizId: string, score: number, maxScore: number) => void;
  onAskCoach?: (query: string) => void;
}

export const ExaminationCentre: React.FC<ExaminationCentreProps> = ({
  onRecordScore,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [isExamSubmitted, setIsExamSubmitted] = useState(false);
  const [showRemedial, setShowRemedial] = useState(false);
  const [remedialAdvice, setRemedialAdvice] = useState<string | null>(null);
  const [isLoadingRemedial, setIsLoadingRemedial] = useState(false);

  // Filter questions based on category
  const filteredQuestions: ExamQuestion[] =
    selectedCategory === 'All'
      ? EXAM_QUESTION_BANK
      : EXAM_QUESTION_BANK.filter((q) => q.category === selectedCategory);

  const totalQuestions = filteredQuestions.length;
  const currentQ = filteredQuestions[currentQuestionIndex] || filteredQuestions[0];
  const answeredCount = Object.keys(userAnswers).length;

  const handleSelectAnswer = (optionIdx: number) => {
    if (isExamSubmitted) return;
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: optionIdx,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    filteredQuestions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctIndex) {
        correct++;
      }
    });
    return correct;
  };

  const handleSubmitExam = () => {
    setIsExamSubmitted(true);
    const score = calculateScore();
    onRecordScore(`exam-${selectedCategory.toLowerCase()}`, score, totalQuestions);
  };

  const handleRestart = () => {
    setUserAnswers({});
    setIsExamSubmitted(false);
    setCurrentQuestionIndex(0);
    setShowRemedial(false);
    setRemedialAdvice(null);
  };

  const handleGetRemedialAdvice = async () => {
    setShowRemedial(true);
    if (remedialAdvice) return;
    setIsLoadingRemedial(true);
    try {
      const missed = filteredQuestions.filter((q, idx) => userAnswers[idx] !== q.correctIndex);
      const missedSummary = missed.map((m) => m.question).slice(0, 3).join('; ');
      const query = `Student completed ${selectedCategory} exam with score ${score}/${totalQuestions}. Missed questions: ${missedSummary || 'None'}. Provide 3 short, actionable remedial coaching tips (under 80 words total).`;
      const res = await askCoachChat(query, 'English', '1st Dan (Black Belt)');
      setRemedialAdvice(res.reply);
    } catch (e) {
      setRemedialAdvice(
        score >= totalQuestions * 0.75
          ? '• Maintain regular mental visualization of Poomsae line-of-movement and speed control.\n• Practice Korean command recognition daily.\n• Review WT Gam-jeom rule scenarios to eliminate avoidable penalties.'
          : '• Review the 8 Taegeuk trigram meanings and related stance transitions.\n• Memorize essential Korean kicking and blocking terminology.\n• Re-test after studying the correct explanations above.'
      );
    } finally {
      setIsLoadingRemedial(false);
    }
  };

  const score = calculateScore();
  const percentage = Math.round((score / totalQuestions) * 100);

  const categories = [
    'All',
    'Gup Theory',
    'Dan Mastery',
    'WT Referee Rules',
    'Korean Terminology',
    'Kyorugi Tactics',
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-widest mb-1">
              <GraduationCap className="w-4 h-4 text-amber-400" />
              <span>Standardized Examination & Assessment Centre</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-black uppercase tracking-wider text-white">
              Mock Promotion & Certification Exams
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mt-1">
              Test your knowledge against official Kukkiwon syllabus questions, WT referee scoring scenarios, and Korean terminology standards. Receive instant scoring and detailed master explanations.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-800 px-4 py-2.5 rounded-xl text-xs">
            <FileCheck className="w-4 h-4 text-amber-400" />
            <span className="text-slate-300">
              {answeredCount} of {totalQuestions} Answered
            </span>
          </div>
        </div>

        {/* Category Filters */}
        <div className="mt-5 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                handleRestart();
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-sm'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {!isExamSubmitted ? (
        /* Active Exam Card */
        <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
          {/* Question Header */}
          <div className="p-6 border-b border-slate-800 bg-slate-900/60 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-red-600/20 border border-red-500/40 text-red-300 font-display font-black text-sm flex items-center justify-center">
                #{currentQuestionIndex + 1}
              </span>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                  {currentQ.category}
                </span>
                <div className="text-xs text-slate-400">
                  Question {currentQuestionIndex + 1} of {totalQuestions}
                </div>
              </div>
            </div>

            {/* Stepper tracker */}
            <div className="flex items-center gap-1.5">
              {filteredQuestions.map((_, i) => (
                <div
                  key={i}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    userAnswers[i] !== undefined
                      ? 'bg-amber-400'
                      : i === currentQuestionIndex
                      ? 'bg-white ring-2 ring-amber-400'
                      : 'bg-slate-800'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Question text */}
          <div className="p-6">
            <h3 className="text-base sm:text-lg font-bold text-white mb-6 leading-relaxed">
              {currentQ.question}
            </h3>

            {/* Multiple Choice Options */}
            <div className="space-y-3 mb-8">
              {currentQ.options.map((option, idx) => {
                const isSelected = userAnswers[currentQuestionIndex] === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectAnswer(idx)}
                    className={`w-full text-left p-4 rounded-xl border transition-all text-xs sm:text-sm leading-relaxed flex items-center justify-between ${
                      isSelected
                        ? 'bg-amber-500/15 border-amber-400 text-amber-200 font-semibold shadow-md ring-1 ring-amber-400/40'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-850 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <span className="font-bold text-amber-400 mr-2.5">
                        {String.fromCharCode(65 + idx)}.
                      </span>
                      {option}
                    </div>
                    {isSelected && (
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 ml-2" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                onClick={handlePrev}
                disabled={currentQuestionIndex === 0}
                className="px-4 py-2 bg-slate-900 border border-slate-800 hover:bg-slate-800 disabled:opacity-30 rounded-lg text-xs font-bold uppercase tracking-wider text-slate-300"
              >
                Previous
              </button>

              <div className="flex items-center gap-3">
                {currentQuestionIndex < totalQuestions - 1 ? (
                  <button
                    onClick={handleNext}
                    className="px-5 py-2.5 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5"
                  >
                    <span>Next Question</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmitExam}
                    disabled={answeredCount === 0}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-emerald-950/40"
                  >
                    Submit Exam For Scoring
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Exam Results & Review Card */
        <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl p-6 sm:p-8">
          <div className="text-center max-w-lg mx-auto mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-600 via-amber-500 to-red-800 p-0.5 mx-auto mb-4 flex items-center justify-center shadow-xl">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Award className="w-8 h-8 text-amber-400" />
              </div>
            </div>
            <h3 className="text-2xl font-display font-black uppercase text-white tracking-wider">
              Examination Complete
            </h3>
            <div className="text-4xl font-display font-black text-amber-400 mt-2">
              {score} / {totalQuestions}{' '}
              <span className="text-xl text-slate-400 font-sans font-medium">({percentage}%)</span>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              {percentage >= 75
                ? 'Outstanding passing grade! Your theoretical foundation meets rigorous federation expectations.'
                : 'Keep studying the curriculum. Review the detailed explanations below to reinforce your knowledge.'}
            </p>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={handleRestart}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded-lg text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Examination</span>
              </button>
              <button
                onClick={handleGetRemedialAdvice}
                disabled={isLoadingRemedial}
                className="px-4 py-2 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 text-white rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-red-950/40 transition-all"
              >
                {isLoadingRemedial ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Sparkles className="w-3.5 h-3.5" />
                )}
                <span>{isLoadingRemedial ? 'Consulting Master Coach...' : 'Get Remedial Coaching'}</span>
              </button>
            </div>

            {/* Inline Remedial Coaching Box */}
            {showRemedial && (
              <div className="mt-5 text-left p-4 rounded-xl border border-amber-500/40 bg-slate-900/90 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span className="font-display uppercase text-xs font-bold text-amber-400 tracking-wider">
                      Master Coach Remedial Action Plan
                    </span>
                  </div>
                  <button
                    onClick={() => setShowRemedial(false)}
                    className="text-slate-400 hover:text-white text-xs px-2 py-0.5 rounded hover:bg-slate-800"
                  >
                    Close
                  </button>
                </div>

                {isLoadingRemedial ? (
                  <div className="flex items-center gap-2 text-xs text-amber-300 py-3">
                    <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                    <span>Analyzing your exam results and preparing high-impact advice...</span>
                  </div>
                ) : (
                  <div className="text-xs text-slate-200 leading-relaxed space-y-2 whitespace-pre-line">
                    {remedialAdvice}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Question Breakdown Review */}
          <div className="space-y-4 pt-6 border-t border-slate-800">
            <h4 className="font-display uppercase text-sm font-bold text-white tracking-wider mb-2">
              Detailed Question & Answer Review:
            </h4>

            {filteredQuestions.map((q, idx) => {
              const userChoice = userAnswers[idx];
              const isCorrect = userChoice === q.correctIndex;
              return (
                <div
                  key={q.id}
                  className={`p-4 rounded-xl border text-xs leading-relaxed ${
                    isCorrect
                      ? 'bg-slate-900/60 border-emerald-500/30 text-slate-300'
                      : 'bg-red-950/20 border-red-500/30 text-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <span className="font-bold text-white">
                      #{idx + 1}. {q.question}
                    </span>
                    <span
                      className={`font-bold uppercase text-[10px] shrink-0 px-2 py-0.5 rounded ${
                        isCorrect ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'
                      }`}
                    >
                      {isCorrect ? 'Correct' : 'Incorrect'}
                    </span>
                  </div>

                  <div className="space-y-1 mb-2 text-[11px]">
                    <div>
                      <strong className="text-slate-400">Your Answer: </strong>
                      <span className={isCorrect ? 'text-emerald-400 font-semibold' : 'text-red-400'}>
                        {userChoice !== undefined ? q.options[userChoice] : 'Not answered'}
                      </span>
                    </div>
                    {!isCorrect && (
                      <div>
                        <strong className="text-slate-400">Correct Answer: </strong>
                        <span className="text-emerald-400 font-semibold">{q.options[q.correctIndex]}</span>
                      </div>
                    )}
                  </div>

                  <div className="p-2.5 rounded bg-slate-950 border border-slate-800/80 text-[11px] text-slate-400">
                    <strong className="text-amber-400">Master Explanation: </strong>
                    {q.explanation}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
