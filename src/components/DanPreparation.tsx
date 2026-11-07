import React, { useState } from 'react';
import {
  Award,
  BookOpen,
  AlertCircle,
  FileText,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  GraduationCap,
  X,
  Loader2
} from 'lucide-react';
import { DanLevelInfo } from '../types';
import { DAN_LEVELS } from '../data/curriculumData';
import { askCoachChat } from '../services/coachApi';

interface DanPreparationProps {
  onAskCoach?: (query: string) => void;
}

export const DanPreparation: React.FC<DanPreparationProps> = () => {
  const [selectedDanIndex, setSelectedDanIndex] = useState(0);
  const [showDanCoach, setShowDanCoach] = useState(false);
  const [danAdvice, setDanAdvice] = useState<string | null>(null);
  const [loadingAdvice, setLoadingAdvice] = useState(false);

  const currentDan: DanLevelInfo = DAN_LEVELS[selectedDanIndex] || DAN_LEVELS[0];
  const totalDans = DAN_LEVELS.length;

  const handleNextDan = () => {
    if (selectedDanIndex < totalDans - 1) {
      setSelectedDanIndex((prev) => prev + 1);
      setDanAdvice(null);
      setShowDanCoach(false);
    }
  };

  const handlePrevDan = () => {
    if (selectedDanIndex > 0) {
      setSelectedDanIndex((prev) => prev - 1);
      setDanAdvice(null);
      setShowDanCoach(false);
    }
  };

  const handleConsultCoachInline = async () => {
    setShowDanCoach(true);
    if (danAdvice) return;

    setLoadingAdvice(true);
    try {
      const response = await askCoachChat(
        `Provide 3 concise master coaching keys and thesis tips for ${currentDan.title} (${currentDan.koreanTitle}).`,
        'English',
        '1st Dan (Black Belt)'
      );
      setDanAdvice(response.reply);
    } catch (e) {
      setDanAdvice(
        `Grandmaster Keys for ${currentDan.title}:\n• Ground your breath in the Danjeon (lower abdomen).\n• Poomsae ${currentDan.requiredPoomsae} demands total stillness before explosive acceleration.\n• Embody moral leadership in both dojang and daily life.`
      );
    } finally {
      setLoadingAdvice(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-widest mb-1">
              <GraduationCap className="w-4 h-4 text-amber-400" />
              <span>Higher Black Belt Educational Pathway</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-black uppercase tracking-wider text-white">
              Dan Preparation Academy (1st Dan to 9th Dan)
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mt-1">
              Curriculum studies, thesis research frameworks, philosophical foundations, and pedagogical training from novice black belt to senior Grandmaster level.
            </p>
          </div>

          <div className="p-3 bg-red-950/40 border border-red-800/60 rounded-xl max-w-md text-[11px] text-slate-300">
            <span className="font-bold text-amber-400 block mb-0.5">Educational Scope Disclaimer:</span>
            This module presents educational study materials based on traditional Kukkiwon syllabi. It does not replace official Kukkiwon promotion test panels or National Association regulatory requirements.
          </div>
        </div>
      </div>

      {/* Dan Selection Strip */}
      <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2">
        {DAN_LEVELS.map((dan, idx) => {
          const isSelected = idx === selectedDanIndex;
          return (
            <button
              key={dan.danNumber}
              onClick={() => {
                setSelectedDanIndex(idx);
                setShowDanCoach(false);
                setDanAdvice(null);
              }}
              className={`p-3 rounded-xl border text-center transition-all ${
                isSelected
                  ? 'bg-gradient-to-b from-slate-900 to-slate-950 border-amber-400 shadow-md ring-2 ring-amber-400/20'
                  : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-400'
              }`}
            >
              <div className="text-amber-400 font-display font-black text-xl leading-none">
                {dan.danNumber}
                <span className="text-xs ml-0.5 font-sans font-medium text-slate-400">DAN</span>
              </div>
              <div className="text-[10px] text-slate-400 font-medium truncate mt-1">
                {dan.koreanTitle}
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Dan Card */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
        {/* Dan Title Bar */}
        <div className="p-6 border-b border-slate-800 bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black text-amber-400 font-display">
                {currentDan.koreanHangul}
              </span>
              <span className="text-slate-600">·</span>
              <span className="text-sm font-semibold text-slate-300">{currentDan.title}</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-3xl italic">
              "{currentDan.philosophicalTheme}"
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleConsultCoachInline}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-all shadow-md shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{showDanCoach ? 'Hide Master Advice' : 'Master Advice for this Dan'}</span>
            </button>

            <button
              onClick={handlePrevDan}
              disabled={selectedDanIndex === 0}
              className="p-2.5 bg-slate-900 border border-slate-800 hover:bg-slate-800 disabled:opacity-30 rounded-lg text-slate-300"
              title="Previous Dan"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextDan}
              disabled={selectedDanIndex === totalDans - 1}
              className="p-2.5 bg-slate-900 border border-slate-800 hover:bg-slate-800 disabled:opacity-30 rounded-lg text-slate-300"
              title="Next Dan"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Collapsible Inline Coach for this Dan */}
        {showDanCoach && (
          <div className="bg-slate-900/90 border-b border-amber-500/30 p-5 animate-in fade-in duration-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Master Coach Insights ({currentDan.title})
              </span>
              <button onClick={() => setShowDanCoach(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            {loadingAdvice ? (
              <div className="flex items-center gap-2 text-xs text-slate-400 py-2">
                <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                <span>Generating high Dan technical criteria...</span>
              </div>
            ) : (
              <div className="text-xs text-slate-200 leading-relaxed whitespace-pre-wrap bg-slate-950 p-3 rounded-lg border border-slate-800">
                {danAdvice}
              </div>
            )}
          </div>
        )}

        {/* Content Breakdown */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Core Curriculum Topics */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 md:col-span-2">
            <h4 className="font-display uppercase text-sm font-bold text-white tracking-wider mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-400" />
              Core Educational Study Topics
            </h4>
            <div className="space-y-2.5">
              {currentDan.curriculumTopics.map((topic, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                  <span className="w-5 h-5 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] text-amber-400 font-bold shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="leading-relaxed">{topic}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Dan Requirements Summary */}
          <div className="space-y-4">
            {/* Required Poomsae */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block mb-1">
                Designated Poomsae
              </span>
              <div className="text-base font-bold text-white">{currentDan.requiredPoomsae}</div>
              <p className="text-[11px] text-slate-400 mt-1">
                Precision in tempo, breath regulation, and balance on center line.
              </p>
            </div>

            {/* Teaching Role */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block mb-1">
                Pedagogical Role
              </span>
              <div className="text-sm font-bold text-white">{currentDan.teachingRequirements}</div>
            </div>

            {/* Thesis Requirement */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block mb-1 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" /> Research / Thesis Topic
              </span>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                {currentDan.thesisTheme}
              </p>
            </div>
          </div>
        </div>

        {/* Kukkiwon Dan Time-in-Grade & Minimum Age Guidelines Table */}
        <div className="p-6 border-t border-slate-800 bg-slate-950/60">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-display uppercase text-xs font-bold text-slate-400 tracking-wider">
              Standard Educational Time-in-Grade Framework (General Kukkiwon Guidelines)
            </h4>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevDan}
                disabled={selectedDanIndex === 0}
                className="text-xs text-amber-400 hover:text-amber-300 font-bold uppercase tracking-wider disabled:opacity-30"
              >
                Previous Dan
              </button>
              <span className="text-slate-600">·</span>
              <button
                onClick={handleNextDan}
                disabled={selectedDanIndex === totalDans - 1}
                className="text-xs text-amber-400 hover:text-amber-300 font-bold uppercase tracking-wider disabled:opacity-30"
              >
                Next Dan
              </button>
            </div>
          </div>
          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-500 font-semibold uppercase text-[10px] tracking-wider">
                  <th className="py-2 px-3">Dan Rank</th>
                  <th className="py-2 px-3">Typical Time in Grade</th>
                  <th className="py-2 px-3">Minimum Age Standard</th>
                  <th className="py-2 px-3">Designated Poomsae</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr className={currentDan.danNumber === 1 ? 'bg-amber-500/10 text-amber-200' : ''}>
                  <td className="py-2 px-3 font-semibold">1st Dan (초단)</td>
                  <td className="py-2 px-3">1 Year</td>
                  <td className="py-2 px-3">15+ Years (or Poom if younger)</td>
                  <td className="py-2 px-3">Koryo</td>
                </tr>
                <tr className={currentDan.danNumber === 2 ? 'bg-amber-500/10 text-amber-200' : ''}>
                  <td className="py-2 px-3 font-semibold">2nd Dan (2단)</td>
                  <td className="py-2 px-3">2 Years</td>
                  <td className="py-2 px-3">16+ Years</td>
                  <td className="py-2 px-3">Keumgang</td>
                </tr>
                <tr className={currentDan.danNumber === 3 ? 'bg-amber-500/10 text-amber-200' : ''}>
                  <td className="py-2 px-3 font-semibold">3rd Dan (3단)</td>
                  <td className="py-2 px-3">3 Years</td>
                  <td className="py-2 px-3">18+ Years</td>
                  <td className="py-2 px-3">Taebaek</td>
                </tr>
                <tr className={currentDan.danNumber === 4 ? 'bg-amber-500/10 text-amber-200' : ''}>
                  <td className="py-2 px-3 font-semibold">4th Dan (사범)</td>
                  <td className="py-2 px-3">4 Years</td>
                  <td className="py-2 px-3">21+ Years (Master Instructor Course)</td>
                  <td className="py-2 px-3">Pyongwon</td>
                </tr>
                <tr className={currentDan.danNumber === 5 ? 'bg-amber-500/10 text-amber-200' : ''}>
                  <td className="py-2 px-3 font-semibold">5th Dan (고단자)</td>
                  <td className="py-2 px-3">5 Years</td>
                  <td className="py-2 px-3">25+ Years</td>
                  <td className="py-2 px-3">Sipjin</td>
                </tr>
                <tr className={currentDan.danNumber >= 6 ? 'bg-amber-500/10 text-amber-200' : ''}>
                  <td className="py-2 px-3 font-semibold">6th to 9th Dan</td>
                  <td className="py-2 px-3">6 to 9 Years per grade</td>
                  <td className="py-2 px-3">30+ to 60+ Years</td>
                  <td className="py-2 px-3">Jitae, Cheonkwon, Hansu, Ilyeo</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
