import React, { useState } from 'react';
import {
  BookOpen,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  HelpCircle,
  Volume2,
  CheckCircle2,
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';
import { PoomsaeDetail } from '../types';
import { POOMSAE_DATABASE } from '../data/curriculumData';
import { useSpeech } from '../hooks/useSpeech';

interface PoomsaeAcademyProps {
  onAskCoach: (query: string) => void;
}

export const PoomsaeAcademy: React.FC<PoomsaeAcademyProps> = ({ onAskCoach }) => {
  const [selectedPoomsaeId, setSelectedPoomsaeId] = useState<string>('taegeuk-1');
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlayingSequence, setIsPlayingSequence] = useState<boolean>(false);
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);
  const [showQuizResult, setShowQuizResult] = useState<boolean>(false);

  const { speak } = useSpeech();

  const currentPoomsae: PoomsaeDetail =
    POOMSAE_DATABASE.find((p) => p.id === selectedPoomsaeId) || POOMSAE_DATABASE[0];

  const totalSteps = currentPoomsae.steps.length;
  const currentStep = currentPoomsae.steps[currentStepIndex] || currentPoomsae.steps[0];

  const handleSelectPoomsae = (id: string) => {
    setSelectedPoomsaeId(id);
    setCurrentStepIndex(0);
    setIsPlayingSequence(false);
    setSelectedQuizAnswer(null);
    setShowQuizResult(false);
  };

  const handleNextStep = () => {
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      setCurrentStepIndex(0);
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  // Black belt forms vs Color belt forms
  const colorBeltForms = [
    { id: 'taegeuk-1', name: 'Taegeuk 1 (Keon - Sky)' },
    { id: 'taegeuk-2', name: 'Taegeuk 2 (Tae - Lake)' },
    { id: 'taegeuk-3', name: 'Taegeuk 3 (Ri - Fire)' },
    { id: 'taegeuk-4', name: 'Taegeuk 4 (Jin - Thunder)' },
    { id: 'taegeuk-5', name: 'Taegeuk 5 (Seon - Wind)' },
    { id: 'taegeuk-6', name: 'Taegeuk 6 (Gam - Water)' },
    { id: 'taegeuk-7', name: 'Taegeuk 7 (Gan - Mountain)' },
    { id: 'taegeuk-8', name: 'Taegeuk 8 (Gon - Earth)' },
  ];

  const blackBeltForms = [
    { id: 'koryo', name: 'Koryo (1st Dan)' },
    { id: 'keumgang', name: 'Keumgang (2nd Dan)' },
    { id: 'taebaek', name: 'Taebaek (3rd Dan)' },
    { id: 'pyongwon', name: 'Pyongwon (4th Dan)' },
    { id: 'sipjin', name: 'Sipjin (5th Dan)' },
    { id: 'jitae', name: 'Jitae (6th Dan)' },
    { id: 'cheonkwon', name: 'Cheonkwon (7th Dan)' },
    { id: 'hansu', name: 'Hansu (8th Dan)' },
    { id: 'ilyeo', name: 'Ilyeo (9th Dan)' },
  ];

  return (
    <div className="space-y-6">
      {/* Visual Hero Card with Generated Poomsae Mastery Photo */}
      <div className="relative rounded-2xl border border-slate-800 overflow-hidden bg-slate-950 shadow-2xl">
        <div className="absolute inset-0 z-0 opacity-25">
          <img
            src="/src/assets/images/tkd_poomsae_mastery_1794042841449.jpg"
            alt="Poomsae Master Form Demonstration"
            className="w-full h-full object-cover object-top"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
        </div>

        <div className="relative z-10 p-6 sm:p-8">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-widest mb-1.5">
            <Layers className="w-4 h-4 text-amber-400" />
            <span>Kukkiwon Standard Forms & Trigram Philosophy</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-display font-black uppercase tracking-wider text-white">
            Poomsae Academy
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-1 leading-relaxed">
            From Taegeuk 1 Jang to Ilyeo. Explore step-by-step movement breakdowns, target height alignments (Arae, Momtong, Olgool), and trigram metaphysical principles.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onAskCoach(`Explain the deep philosophy and execution of ${currentPoomsae.name}`)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-all shadow-lg"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ask Coach About {currentPoomsae.name.split('(')[0].trim()}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Forms Selector Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Color Belt Forms: Taegeuk 1–8 */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-display uppercase text-xs font-bold text-amber-400 tracking-wider">
              Taegeuk Forms (Color Belts: 1–8)
            </h3>
            <span className="text-[11px] text-slate-400">Palgwae Trigrams</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {colorBeltForms.map((f) => (
              <button
                key={f.id}
                onClick={() => handleSelectPoomsae(f.id)}
                className={`p-2.5 rounded-lg border text-xs font-medium transition-all text-left truncate ${
                  selectedPoomsaeId === f.id
                    ? 'bg-amber-500/15 border-amber-400 text-amber-300 font-bold'
                    : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-900'
                }`}
              >
                {f.name}
              </button>
            ))}
          </div>
        </div>

        {/* Black Belt Dan Forms */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-display uppercase text-xs font-bold text-red-400 tracking-wider">
              Dan Black Belt Forms (1st to 9th Dan)
            </h3>
            <span className="text-[11px] text-slate-400">Kukkiwon Dan Standard</span>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-3 gap-2">
            {blackBeltForms.map((f) => (
              <button
                key={f.id}
                onClick={() => handleSelectPoomsae(f.id)}
                className={`p-2.5 rounded-lg border text-xs font-medium transition-all text-left truncate ${
                  selectedPoomsaeId === f.id
                    ? 'bg-red-600/20 border-red-500 text-red-200 font-bold'
                    : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-900'
                }`}
              >
                {f.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Selected Form Detail Box */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
        {/* Title bar */}
        <div className="p-6 border-b border-slate-800 bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-slate-900 border border-amber-500/40 flex items-center justify-center text-2xl font-black text-amber-400 shrink-0 shadow-inner">
              {currentPoomsae.trigramSymbol}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-display font-black text-white tracking-wide">
                  {currentPoomsae.name}
                </span>
                <button
                  onClick={() => speak(currentPoomsae.koreanHangul, 'Korean')}
                  className="p-1 text-slate-400 hover:text-amber-400"
                  title="Listen Korean pronunciation"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
              <div className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                <span className="text-amber-400 font-semibold">{currentPoomsae.trigramMeaning}</span>
                <span>·</span>
                <span>{currentPoomsae.totalMovements} Movements</span>
                <span>·</span>
                <span>Grade: {currentPoomsae.recommendedGrade}</span>
              </div>
            </div>
          </div>

          <div className="text-xs text-slate-300 bg-slate-900/80 px-4 py-2 rounded-lg border border-slate-800 shrink-0">
            <span className="text-slate-500 block text-[10px] uppercase font-semibold">Element</span>
            <span className="font-bold text-amber-400">{currentPoomsae.natureElement}</span>
          </div>
        </div>

        {/* Overview */}
        <div className="p-6 border-b border-slate-800/80 bg-slate-900/30">
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl">
            {currentPoomsae.overview}
          </p>

          <div className="mt-4 flex flex-wrap gap-4 text-xs">
            <div>
              <span className="text-slate-500 font-semibold uppercase text-[10px] block">Key Stances:</span>
              <span className="text-slate-200">{currentPoomsae.keyStances.join(', ')}</span>
            </div>
            <span className="text-slate-700">|</span>
            <div>
              <span className="text-slate-500 font-semibold uppercase text-[10px] block">Key Techniques:</span>
              <span className="text-slate-200">{currentPoomsae.keyTechniques.join(', ')}</span>
            </div>
          </div>
        </div>

        {/* Interactive Step-by-Step Sequence Player */}
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-display uppercase text-sm font-bold text-white tracking-wider flex items-center gap-2">
              <Play className="w-4 h-4 text-amber-400" />
              Interactive Movement Sequence (Step {currentStepIndex + 1} of {totalSteps})
            </h4>

            {/* Stepper controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevStep}
                disabled={currentStepIndex === 0}
                className="p-2 bg-slate-900 border border-slate-800 hover:bg-slate-800 disabled:opacity-30 rounded-lg text-slate-300"
              >
                <SkipBack className="w-4 h-4" />
              </button>
              <button
                onClick={handleNextStep}
                className="px-3 py-1.5 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5"
              >
                <span>{currentStepIndex === totalSteps - 1 ? 'Restart' : 'Next Step'}</span>
                <SkipForward className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Current Step Display Card */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-950 border border-amber-500/30 rounded-xl p-5 shadow-lg">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3 mb-3">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-red-600 text-white font-display font-black text-sm flex items-center justify-center">
                  #{currentStep.stepNumber}
                </span>
                <div>
                  <h5 className="text-base font-bold text-white">{currentStep.technique}</h5>
                  <span className="text-xs text-amber-400 font-semibold">{currentStep.koreanName}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 font-medium">
                  Stance: {currentStep.stance}
                </span>
                <span className="px-2.5 py-1 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30 font-medium">
                  Target: {currentStep.targetArea}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {currentStep.description}
            </p>

            <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
              <span>Direction: <strong className="text-white">{currentStep.direction}</strong></span>
              <button
                onClick={() => speak(currentStep.koreanName, 'Korean')}
                className="text-amber-400 hover:text-amber-300 flex items-center gap-1 font-semibold"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Hear Korean Command</span>
              </button>
            </div>
          </div>
        </div>

        {/* Poomsae Quiz Check */}
        <div className="p-6 bg-slate-950/80">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
            <HelpCircle className="w-4 h-4" />
            <span>Poomsae Theory Quiz ({currentPoomsae.name.split('(')[0].trim()})</span>
          </div>
          <h4 className="text-sm font-semibold text-white mb-3">
            {currentPoomsae.quizQuestion.question}
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-3">
            {currentPoomsae.quizQuestion.options.map((option, idx) => {
              const isSelected = selectedQuizAnswer === idx;
              const isCorrect = idx === currentPoomsae.quizQuestion.correctIndex;
              let style = 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800';

              if (showQuizResult) {
                if (isCorrect) style = 'bg-emerald-950/70 border-emerald-500 text-emerald-200 font-bold';
                else if (isSelected && !isCorrect) style = 'bg-red-950/70 border-red-500 text-red-200';
              }

              return (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedQuizAnswer(idx);
                    setShowQuizResult(true);
                  }}
                  className={`p-3 rounded-lg border text-xs text-left transition-all ${style}`}
                >
                  <span className="font-bold mr-2 text-amber-400">{String.fromCharCode(65 + idx)}.</span>
                  {option}
                </button>
              );
            })}
          </div>

          {showQuizResult && (
            <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 text-xs leading-relaxed">
              <span className="font-bold text-amber-400 block mb-1">
                {selectedQuizAnswer === currentPoomsae.quizQuestion.correctIndex
                  ? '✓ Correct Assessment!'
                  : 'Correction:'}
              </span>
              <p className="text-slate-300">{currentPoomsae.quizQuestion.explanation}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
