import React, { useState } from 'react';
import {
  ShieldAlert,
  Volume2,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Sparkles,
  BookOpen,
  Award,
  Video
} from 'lucide-react';
import { RefereeSignal, RefereeRulePoint } from '../types';
import { REFEREE_SIGNALS, WT_REFEREE_RULES } from '../data/curriculumData';
import { useSpeech } from '../hooks/useSpeech';

interface RefereeEducationProps {
  onAskCoach: (query: string) => void;
}

export const RefereeEducation: React.FC<RefereeEducationProps> = ({ onAskCoach }) => {
  const [selectedSignalIdx, setSelectedSignalIdx] = useState(0);
  const { speak } = useSpeech();

  const currentSignal: RefereeSignal = REFEREE_SIGNALS[selectedSignalIdx] || REFEREE_SIGNALS[0];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-widest mb-1">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <span>Official World Taekwondo (WT) Technical Standards</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-black uppercase tracking-wider text-white">
              Referee & Officiating Academy
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="px-2 py-0.5 rounded bg-red-950 border border-red-800 text-[11px] font-bold text-red-300">
                Verified Version: WT Competition Rules 2024–2026
              </span>
              <span className="text-xs text-slate-400">· Effective in Olympic & World Championships</span>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-4 py-2.5 rounded-xl text-xs">
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            <span className="text-slate-300 font-semibold">KTA & WT Official Officiating Syllabus</span>
          </div>
        </div>
      </div>

      {/* Point Scoring Reference Strip (Large, clear visual cards) */}
      <div>
        <h3 className="font-display uppercase text-sm font-bold text-slate-300 tracking-wider mb-3 flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-400" />
          WT Official Points Allocation System
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl text-center shadow-md">
            <span className="text-3xl font-black font-display text-white">1 PT</span>
            <div className="text-xs font-bold text-amber-400 mt-1 uppercase">Valid Punch</div>
            <p className="text-[11px] text-slate-400 mt-0.5">Straight punch to trunk PSS</p>
          </div>
          <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl text-center shadow-md">
            <span className="text-3xl font-black font-display text-blue-400">2 PTS</span>
            <div className="text-xs font-bold text-blue-400 mt-1 uppercase">Trunk Kick</div>
            <p className="text-[11px] text-slate-400 mt-0.5">Standard kick to trunk PSS</p>
          </div>
          <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl text-center shadow-md">
            <span className="text-3xl font-black font-display text-red-400">3 PTS</span>
            <div className="text-xs font-bold text-red-400 mt-1 uppercase">Head Kick</div>
            <p className="text-[11px] text-slate-400 mt-0.5">Direct kick to head protector</p>
          </div>
          <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl text-center shadow-md">
            <span className="text-3xl font-black font-display text-amber-400">4 PTS</span>
            <div className="text-xs font-bold text-amber-400 mt-1 uppercase">Turning Trunk</div>
            <p className="text-[11px] text-slate-400 mt-0.5">Spin back kick to trunk PSS</p>
          </div>
          <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl text-center shadow-md col-span-2 sm:col-span-1">
            <span className="text-3xl font-black font-display text-yellow-300">5 PTS</span>
            <div className="text-xs font-bold text-yellow-300 mt-1 uppercase">Turning Head</div>
            <p className="text-[11px] text-slate-400 mt-0.5">Spinning hook kick to head</p>
          </div>
        </div>
      </div>

      {/* Interactive Official Referee Hand Signals Deck */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-slate-800 bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Interactive Signal Training
            </span>
            <h3 className="text-xl font-bold text-white mt-0.5">
              Official Referee Commands & Hand Gestures
            </h3>
          </div>
          <div className="text-xs text-slate-400">
            Korean Command pronunciation + Urdu & Arabic translations
          </div>
        </div>

        {/* Signals Tabs */}
        <div className="overflow-x-auto p-4 border-b border-slate-800 bg-slate-900/40">
          <div className="flex items-center gap-2 min-w-max">
            {REFEREE_SIGNALS.map((sig, idx) => (
              <button
                key={sig.koreanCommand}
                onClick={() => setSelectedSignalIdx(idx)}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                  selectedSignalIdx === idx
                    ? 'bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-md'
                    : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {sig.koreanCommand}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Signal View */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-3xl font-black text-amber-400 font-display">
                  {currentSignal.koreanHangul}
                </span>
                <h4 className="text-xl font-bold text-white mt-0.5">
                  {currentSignal.koreanCommand}{' '}
                  <span className="text-sm font-normal text-slate-400">({currentSignal.englishMeaning})</span>
                </h4>
              </div>

              <button
                onClick={() => speak(currentSignal.koreanHangul, 'Korean')}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-lg text-xs font-bold transition-colors"
              >
                <Volume2 className="w-4 h-4" />
                <span>Hear Command</span>
              </button>
            </div>

            <div className="bg-slate-900/70 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                Required Official Hand Gesture:
              </span>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                {currentSignal.handGestureDescription}
              </p>
            </div>

            <div className="bg-slate-900/40 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                Context & Match Timing:
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {currentSignal.contextUsage}
              </p>
            </div>
          </div>

          {/* Multilingual translations */}
          <div className="bg-slate-900/60 p-5 rounded-xl border border-slate-800 space-y-4 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-2">
                Multilingual Interpretation
              </span>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-semibold">اردو ترجمہ (Urdu):</span>
                  <p className="text-slate-200 text-base font-medium mt-0.5">{currentSignal.urdu}</p>
                </div>

                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-semibold">الترجمة العربية (Arabic):</span>
                  <p className="text-slate-200 text-base font-medium mt-0.5">{currentSignal.arabic}</p>
                </div>
              </div>
            </div>

            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-[11px] text-slate-300">
              <strong className="text-amber-400 block mb-0.5">Referee Match Cue:</strong>
              Clear hand signal must precede vocal command. Maintain authoritative, neutral presence at court center.
            </div>
          </div>
        </div>
      </div>

      {/* Rules & Instant Video Replay (IVR) Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* WT Rule Articles */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 shadow-xl">
          <h3 className="font-display uppercase text-sm font-bold text-white tracking-wider mb-4 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-400" />
            Key Competition Rules Articles (WT 2024–2026)
          </h3>
          <div className="space-y-3">
            {WT_REFEREE_RULES.map((rule, idx) => (
              <div
                key={idx}
                className="bg-slate-900/60 p-3.5 rounded-lg border border-slate-800 text-xs"
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-bold text-white">{rule.ruleTitle}</span>
                  <span className="text-[11px] font-bold text-red-400">{rule.pointsOrPenalty}</span>
                </div>
                <p className="text-slate-300 leading-relaxed mb-2">{rule.details}</p>
                <span className="text-[10px] text-amber-400 font-semibold">{rule.officialRef}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Instant Video Replay (IVR) Protocol Guide */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="font-display uppercase text-sm font-bold text-white tracking-wider mb-2 flex items-center gap-2">
              <Video className="w-4 h-4 text-red-400" />
              Instant Video Replay (IVR) Protocol
            </h3>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              Under WT rules, coaches possess challenge quota cards to appeal referee decisions before the Review Jury.
            </p>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <strong className="text-amber-400 block mb-1">1. Quota & Retention:</strong>
                Coach has 1 challenge card per match. If the appeal is upheld, the card is returned. If rejected, the card is lost for the remainder of the match.
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <strong className="text-amber-400 block mb-1">2. Valid Appeal Scenarios:</strong>
                Head kick contact verification, uncalled falling by opponent, boundary exit before impact, or technical point additions.
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <strong className="text-amber-400 block mb-1">3. Non-Appeable Items:</strong>
                Valid electronic punch/trunk impact (PSS electronic judgment is final and cannot be appealed by card).
              </div>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-800">
            <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-900/40 text-xs text-amber-300">
              <strong className="text-amber-400 block mb-0.5">Strategic Coaching Tip:</strong>
              Reserve the IVR card for decisive final-round head kicks or point-differential incidents. Challenging early low-impact calls risks losing review rights for the championship round.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
