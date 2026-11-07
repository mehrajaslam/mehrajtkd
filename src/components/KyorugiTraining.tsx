import React, { useState } from 'react';
import {
  Flame,
  Zap,
  Target,
  Trophy,
  Shield,
  Sparkles,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { KYORUGI_SCENARIOS } from '../data/curriculumData';
import { KyorugiScenario } from '../types';

interface KyorugiTrainingProps {
  onAskCoach: (query: string) => void;
}

export const KyorugiTraining: React.FC<KyorugiTrainingProps> = ({ onAskCoach }) => {
  const [activeTab, setActiveTab] = useState<'tactics' | 'simulator'>('tactics');
  const [currentScenarioIdx, setCurrentScenarioIdx] = useState(0);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);
  const [matchScore, setMatchScore] = useState<{ blue: number; red: number }>({ blue: 0, red: 0 });

  const currentScenario: KyorugiScenario = KYORUGI_SCENARIOS[currentScenarioIdx] || KYORUGI_SCENARIOS[0];

  const handleScenarioOption = (idx: number) => {
    setSelectedOptionIdx(idx);
    const chosen = currentScenario.tacticalOptions[idx];
    if (chosen.isOptimal) {
      setMatchScore((prev) => ({ ...prev, blue: prev.blue + 3 }));
    } else {
      setMatchScore((prev) => ({ ...prev, red: prev.red + 1 }));
    }
  };

  const handleNextScenario = () => {
    setSelectedOptionIdx(null);
    setCurrentScenarioIdx((prev) => (prev + 1) % KYORUGI_SCENARIOS.length);
  };

  const tacticalCategories = [
    {
      title: '1. Footwork & Ring Dominance (Step & Angle)',
      description: 'The foundation of Olympic sparring is continuous mobility. Flat-footed fighters get intercepted by electronic scoring cut kicks.',
      drills: [
        'Bouncing Cadence: Stay on balls of feet; absorb impacts in calf spring.',
        '45° Angle Stepping: Never retreat straight back; escape towards open boundary.',
        'Fast Switch (Bakkwo Seogi): Switch stance instantly to invert open/closed guard.',
        'Mikkureojigi (Sliding): Slide forward without hopping to bridge distance.'
      ]
    },
    {
      title: '2. High-Percentage WT Scoring Kicks',
      description: 'Understanding PSS (Protector and Scoring System) threshold sensor activation.',
      drills: [
        'Lead Cut Kick (Bada Chagi): Stop forward rush, score 2 trunk points.',
        'Rear Leg Turning Kick (Dollyo Chagi): Explosive 2-point power blow to trunk.',
        'Turning Back Kick (Dwi Chagi): 4 Points! Lethal counter to rushing opponents.',
        'Head Scorpion / Axe Kick (Naeryeo Chagi): 3 Points to head protector.',
        'Spinning Hook Kick (Dwi Huryeo Chagi): 5 Points! Highest scoring single kick.'
      ]
    },
    {
      title: '3. Stance Dynamics: Open vs. Closed Guard',
      description: 'Open stance (mirrored feet) vs Closed stance (same feet forward) fundamentally alters your kicking vectors.',
      drills: [
        'Open Guard: Direct trajectory for rear-leg round kick to open chest protector.',
        'Closed Guard: Ideal for lead-leg cut kicks and back kick counter-rotations.',
        'Baiting: Intentionally drop lead arm to invite head kick, then slip and counter.'
      ]
    },
    {
      title: '4. Golden Point & Final 10 Seconds Tactics',
      description: 'Sudden death management under official WT 2024–2026 guidelines.',
      drills: [
        'If tied in Golden Point, winner is decided by registered hits, turning points, or Gam-jeom count.',
        'Never clinch passively when trailing: referee will issue stalling Gam-jeom.',
        'Commit to double-combination attacks: first kick to body, second kick to head.'
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Banner with Generated Kyorugi Sparring Photography */}
      <div className="relative rounded-2xl border border-slate-800 overflow-hidden bg-slate-950 shadow-2xl">
        <div className="absolute inset-0 z-0 opacity-30">
          <img
            src="/src/assets/images/tkd_kyorugi_sparring_1794042840573.jpg"
            alt="Taekwondo Kyorugi Olympic Sparring"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/85 to-transparent" />
        </div>

        <div className="relative z-10 p-6 sm:p-8">
          <div className="flex items-center gap-2 text-xs font-semibold text-red-400 uppercase tracking-widest mb-1.5">
            <Flame className="w-4 h-4 text-red-400" />
            <span>Olympic & World Taekwondo Sparring Division</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-display font-black uppercase tracking-wider text-white">
            Kyorugi Training & Match Tactics
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-1 leading-relaxed">
            High-level sparring drills, PSS electronic scoring mechanics, counter-attacks (Bada Chagi), clinch defense, and match situation mastery.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveTab('tactics')}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'tactics'
                  ? 'bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-md'
                  : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              Tactical Syllabus & Drills
            </button>
            <button
              onClick={() => setActiveTab('simulator')}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                activeTab === 'simulator'
                  ? 'bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-md'
                  : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              <Target className="w-4 h-4 text-amber-400" />
              <span>Interactive Sparring Simulator</span>
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'tactics' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tacticalCategories.map((cat, idx) => (
            <div
              key={idx}
              className="bg-slate-950 border border-slate-800 rounded-xl p-6 shadow-xl flex flex-col justify-between"
            >
              <div>
                <h3 className="font-display uppercase text-base font-bold text-white tracking-wide mb-2 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-400" />
                  {cat.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {cat.description}
                </p>

                <div className="space-y-2">
                  {cat.drills.map((drill, dIdx) => (
                    <div
                      key={dIdx}
                      className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80 text-xs text-slate-300 leading-relaxed"
                    >
                      <span className="text-red-400 font-bold mr-1.5">›</span>
                      {drill}
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between text-xs text-amber-400 font-semibold">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> High-Performance Olympic Protocol
                </span>
                <span className="text-slate-400 font-normal">Practice 3-5 rounds daily</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Interactive Sparring Simulator */
        <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
          {/* Simulated Scoreboard Header */}
          <div className="bg-slate-900 p-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-display uppercase font-black text-xs tracking-wider text-amber-400">
                WT Sparring Decision Simulator
              </span>
              <span className="text-xs text-slate-400">
                Scenario {currentScenarioIdx + 1} of {KYORUGI_SCENARIOS.length}
              </span>
            </div>

            {/* Electronic Scoreboard Pill */}
            <div className="flex items-center gap-4 bg-slate-950 px-4 py-1.5 rounded-lg border border-slate-800">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold text-blue-400">CHEONG (YOU)</span>
                <span className="font-mono font-bold text-base text-blue-400">{matchScore.blue}</span>
              </div>
              <span className="text-slate-600">:</span>
              <div className="flex items-center gap-1.5">
                <span className="font-mono font-bold text-base text-red-400">{matchScore.red}</span>
                <span className="text-[10px] font-bold text-red-400">HONG (OPPONENT)</span>
              </div>
            </div>
          </div>

          {/* Scenario Situation */}
          <div className="p-6">
            <div className="bg-gradient-to-r from-red-950/40 via-slate-900 to-slate-950 p-4 rounded-xl border border-red-900/40 mb-6">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-400 mb-1">
                <AlertTriangle className="w-4 h-4" />
                <span>Live Bout Situation</span>
              </div>
              <h4 className="text-lg font-bold text-white mb-1">{currentScenario.title}</h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                {currentScenario.situation}
              </p>
              <div className="text-xs text-slate-400">
                <strong className="text-amber-400">Opponent Action: </strong>
                {currentScenario.opponentAction}
              </div>
            </div>

            {/* Tactical Choices */}
            <h5 className="font-display uppercase text-xs font-bold text-slate-400 tracking-wider mb-3">
              Select Your Immediate Counter-Action:
            </h5>

            <div className="space-y-3 mb-6">
              {currentScenario.tacticalOptions.map((opt, idx) => {
                const isSelected = selectedOptionIdx === idx;
                let btnStyle = 'bg-slate-900 border-slate-800 text-slate-200 hover:bg-slate-850';

                if (selectedOptionIdx !== null) {
                  if (opt.isOptimal) {
                    btnStyle = 'bg-emerald-950/70 border-emerald-500 text-emerald-200';
                  } else if (isSelected && !opt.isOptimal) {
                    btnStyle = 'bg-red-950/70 border-red-500 text-red-200';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleScenarioOption(idx)}
                    disabled={selectedOptionIdx !== null}
                    className={`w-full text-left p-4 rounded-xl border transition-all text-xs sm:text-sm leading-relaxed ${btnStyle}`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="font-bold text-amber-400 mr-2">Option {String.fromCharCode(65 + idx)}:</span>
                        {opt.action}
                      </div>
                      {selectedOptionIdx !== null && (
                        <span
                          className={`font-bold text-xs shrink-0 ${
                            opt.isOptimal ? 'text-emerald-400' : 'text-red-400'
                          }`}
                        >
                          {opt.scoreOutcome}
                        </span>
                      )}
                    </div>

                    {selectedOptionIdx !== null && isSelected && (
                      <div className="mt-2 pt-2 border-t border-slate-800/80 text-xs text-slate-300">
                        <strong className="text-amber-400">Tactical Analysis: </strong>
                        {opt.tacticalRationale}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Next Scenario Button */}
            {selectedOptionIdx !== null && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-800">
                <div className="text-xs text-amber-300 bg-amber-950/20 px-3 py-2 rounded-lg border border-amber-900/30">
                  <span className="font-bold text-amber-400">Coach Insight: </span>
                  {currentScenario.tacticalOptions[selectedOptionIdx].isOptimal
                    ? 'Excellent tactical choice! You capitalized on opponent momentum and ring angle.'
                    : 'Tactical correction: In Olympic WT bouts, avoid stationary trades; angle off and strike high.'}
                </div>

                <button
                  onClick={handleNextScenario}
                  className="px-5 py-2.5 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 shrink-0"
                >
                  <span>Next Sparring Scenario</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
