import React, { useState } from 'react';
import {
  ClipboardList,
  Activity,
  HeartPulse,
  Flame,
  Clock,
  Sparkles,
  Copy,
  CheckCircle2,
  Calendar,
  Layers
} from 'lucide-react';

interface CoachEducationProps {
  onAskCoach: (query: string) => void;
}

export const CoachEducation: React.FC<CoachEducationProps> = ({ onAskCoach }) => {
  const [selectedDuration, setSelectedDuration] = useState<'60' | '90' | '120'>('90');
  const [sessionFocus, setSessionFocus] = useState<'poomsae' | 'kyorugi' | 'dan-prep' | 'all-round'>('kyorugi');
  const [copiedPlan, setCopiedPlan] = useState(false);

  const getPlanDetails = () => {
    if (sessionFocus === 'kyorugi') {
      return {
        title: `${selectedDuration}-Minute High-Performance Kyorugi Sparring Session`,
        warmup: '15 Min: Dynamic mobility, hip openers, lateral ladder footwork, light plyometric skips.',
        gibon: '20 Min: PSS fast cut kicks, lead-leg slide checks, 45° off-angle pivoting.',
        main:
          selectedDuration === '60'
            ? '15 Min: Tactical situational drills (open vs. closed stance counter-attacks).'
            : '35 Min: 3-round simulated match scenarios with electronic corner coach simulation and clinch exits.',
        conditioning:
          selectedDuration === '120'
            ? '30 Min: Anaerobic threshold kicking intervals (30s max speed Dollyo Chagi on shields x 6 rounds).'
            : '10 Min: Tabata kicking burst on heavy bags or kick shields.',
        cooldown: '10 Min: Static PNF hamstring/groin stretching and breathing meditation (Muknyeom).'
      };
    } else if (sessionFocus === 'poomsae') {
      return {
        title: `${selectedDuration}-Minute Kukkiwon Poomsae Precision Masterclass`,
        warmup: '15 Min: Ankle/knee joint stabilization, stance transitions, slow posture stretching.',
        gibon: '20 Min: Isolated Gibon Dongjak (Ap Koobi, Dwit Koobi, Beom Seogi) with 5-second isometric holds.',
        main:
          selectedDuration === '60'
            ? '15 Min: Taegeuk sequence rhythm, explosive chambering, and center-line return check.'
            : '35 Min: Form by form dissection: Taegeuk 1–8 and Koryo/Keumgang with mirror alignment.',
        conditioning:
          selectedDuration === '120'
            ? '30 Min: Core isometric plank stability, slow leg-extension balance holds (Hakdari Seogi).'
            : '10 Min: Lower back and adductor flexibility for side kick (Yeop Chagi) horizontal elevation.',
        cooldown: '10 Min: Guided deep breath cycle and martial etiquette reflection.'
      };
    } else if (sessionFocus === 'dan-prep') {
      return {
        title: `${selectedDuration}-Minute Dan Promotion Candidate Intensive (Cho Dan Bo)`,
        warmup: '15 Min: High intensity aerobic warmup, joint rotations, neck/wrist conditioning.',
        gibon: '20 Min: Multi-directional blocks (Santul Makgi, Gawi Makgi) and power hand strikes.',
        main:
          selectedDuration === '60'
            ? '15 Min: Review of required testing Poomsae under strict examination pacing.'
            : '35 Min: One-step sparring defense against punches/kicks, self-defense joint releases, and breaking drills.',
        conditioning:
          selectedDuration === '120'
            ? '30 Min: High Dan aerobic stamina testing: continuous kicking without rest for 10 minutes.'
            : '10 Min: Explosive jumping kick drills (Dubal Dangsang Chagi).',
        cooldown: '10 Min: Dan thesis Q&A and mental fortitude meditation.'
      };
    } else {
      return {
        title: `${selectedDuration}-Minute Comprehensive All-Round Taekwondo Class`,
        warmup: '15 Min: Cardiovascular jump rope, calisthenics, and active dynamic stretching.',
        gibon: '20 Min: Stance alignment, Arae/Momtong/Olgool blocks, and basic snap kicks.',
        main:
          selectedDuration === '60'
            ? '15 Min: Partner paddle kick combinations and target focus.'
            : '35 Min: Poomsae practice followed by controlled light sparring (Yaksok Kyorugi).',
        conditioning:
          selectedDuration === '120'
            ? '30 Min: Circuit training: pushups, squats, core tucks, and sprint bursts.'
            : '10 Min: Core endurance and abdominal burnout.',
        cooldown: '10 Min: PNF flexibility cooldown, dojang clean up, bow out.'
      };
    }
  };

  const plan = getPlanDetails();

  const handleCopyPlan = () => {
    const text = `
=== ${plan.title} ===
1. Warm-Up & Activation: ${plan.warmup}
2. Fundamentals (Gibon Dongjak): ${plan.gibon}
3. Main Technical Phase: ${plan.main}
4. Sport Conditioning: ${plan.conditioning}
5. Cool-Down & Meditation: ${plan.cooldown}
Generated via PTF & World Strikers Master Coach
    `.trim();

    navigator.clipboard.writeText(text);
    setCopiedPlan(true);
    setTimeout(() => setCopiedPlan(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-widest mb-1">
              <ClipboardList className="w-4 h-4 text-amber-400" />
              <span>International Coaching & Pedagogy Syllabus</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-black uppercase tracking-wider text-white">
              Coach Education & Lesson Planning
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mt-1">
              Athlete periodization models, Proprioceptive Neuromuscular Facilitation (PNF) flexibility, Long-Term Athlete Development (LTAD), and interactive session plan design.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-4 py-2.5 rounded-xl text-xs">
            <ClipboardList className="w-4 h-4 text-emerald-400" />
            <span className="text-slate-300 font-semibold">LTAD & Periodization Engine</span>
          </div>
        </div>
      </div>

      {/* Interactive Lesson Plan Generator */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-slate-800 bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Interactive Dojang Tool
            </span>
            <h3 className="text-xl font-bold text-white mt-0.5">
              Class Session Plan Builder
            </h3>
          </div>

          {/* Config Controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Duration */}
            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs">
              {(['60', '90', '120'] as const).map((dur) => (
                <button
                  key={dur}
                  onClick={() => setSelectedDuration(dur)}
                  className={`px-3 py-1 rounded font-bold transition-all ${
                    selectedDuration === dur
                      ? 'bg-amber-500 text-slate-950 shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {dur} Min
                </button>
              ))}
            </div>

            {/* Focus */}
            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs">
              <button
                onClick={() => setSessionFocus('kyorugi')}
                className={`px-2.5 py-1 rounded font-bold transition-all ${
                  sessionFocus === 'kyorugi' ? 'bg-red-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Sparring
              </button>
              <button
                onClick={() => setSessionFocus('poomsae')}
                className={`px-2.5 py-1 rounded font-bold transition-all ${
                  sessionFocus === 'poomsae' ? 'bg-red-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Poomsae
              </button>
              <button
                onClick={() => setSessionFocus('dan-prep')}
                className={`px-2.5 py-1 rounded font-bold transition-all ${
                  sessionFocus === 'dan-prep' ? 'bg-red-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Dan Prep
              </button>
              <button
                onClick={() => setSessionFocus('all-round')}
                className={`px-2.5 py-1 rounded font-bold transition-all ${
                  sessionFocus === 'all-round' ? 'bg-red-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                All-Round
              </button>
            </div>
          </div>
        </div>

        {/* Generated Plan Blueprint */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-400" />
              {plan.title}
            </h4>
            <button
              onClick={handleCopyPlan}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 rounded-lg text-xs font-semibold transition-colors"
            >
              {copiedPlan ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedPlan ? 'Copied to Clipboard' : 'Copy Plan'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-xs">
            <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-1.5">
              <span className="text-amber-400 font-bold block uppercase text-[10px]">1. Warmup & Joint Prep</span>
              <p className="text-slate-300 leading-relaxed">{plan.warmup}</p>
            </div>
            <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-1.5">
              <span className="text-amber-400 font-bold block uppercase text-[10px]">2. Fundamentals (Gibon)</span>
              <p className="text-slate-300 leading-relaxed">{plan.gibon}</p>
            </div>
            <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-1.5 md:col-span-1">
              <span className="text-amber-400 font-bold block uppercase text-[10px]">3. Technical Core Phase</span>
              <p className="text-slate-300 leading-relaxed">{plan.main}</p>
            </div>
            <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-1.5">
              <span className="text-amber-400 font-bold block uppercase text-[10px]">4. Conditioning & Speed</span>
              <p className="text-slate-300 leading-relaxed">{plan.conditioning}</p>
            </div>
            <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-1.5">
              <span className="text-amber-400 font-bold block uppercase text-[10px]">5. Cooldown & Ethics</span>
              <p className="text-slate-300 leading-relaxed">{plan.cooldown}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Athletic Protocols: Flexibility & LTAD */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* PNF Flexibility Protocol */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 shadow-xl">
          <h3 className="font-display uppercase text-sm font-bold text-white tracking-wider mb-2 flex items-center gap-2">
            <HeartPulse className="w-4 h-4 text-red-400" />
            PNF Flexibility Protocol for Head Kicks
          </h3>
          <p className="text-xs text-slate-400 mb-4 leading-relaxed">
            Proprioceptive Neuromuscular Facilitation (PNF) contract-relax stretching triggers the Golgi tendon reflex for immediate gains in high kick range.
          </p>

          <div className="space-y-3 text-xs text-slate-300">
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
              <strong className="text-amber-400 block mb-0.5">Phase 1: Passive Stretch (10 Seconds)</strong>
              Partner holds hamstring or adductor at threshold of mild discomfort.
            </div>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
              <strong className="text-amber-400 block mb-0.5">Phase 2: Isometric Contraction (6 Seconds)</strong>
              Athlete pushes leg back against partner's resistance at 70% max effort without moving joint.
            </div>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
              <strong className="text-amber-400 block mb-0.5">Phase 3: Relaxation & Deepening (30 Seconds)</strong>
              Exhale sharply and gently extend 2–4 inches deeper into new range of motion.
            </div>
          </div>
        </div>

        {/* Long-Term Athlete Development (LTAD) */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 shadow-xl">
          <h3 className="font-display uppercase text-sm font-bold text-white tracking-wider mb-2 flex items-center gap-2">
            <Layers className="w-4 h-4 text-amber-400" />
            Long-Term Athlete Development (LTAD)
          </h3>
          <p className="text-xs text-slate-400 mb-4 leading-relaxed">
            Structuring athlete progression across biological development stages.
          </p>

          <div className="space-y-3 text-xs text-slate-300">
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
              <div className="flex items-center justify-between font-bold text-white mb-0.5">
                <span className="text-amber-400">Cadet Stage (Ages 12–14)</span>
                <span className="text-[10px] text-slate-500">Skill Acquisition</span>
              </div>
              Focus on agility, reaction time, foundational poomsae balance, and friendly non-traumatic sparring. Avoid aggressive weight cutting.
            </div>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
              <div className="flex items-center justify-between font-bold text-white mb-0.5">
                <span className="text-amber-400">Junior Stage (Ages 15–17)</span>
                <span className="text-[10px] text-slate-500">Tactical Refinement</span>
              </div>
              Introduction of anaerobic interval training, electronic PSS sensor optimization, video match analysis, and sports nutrition.
            </div>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
              <div className="flex items-center justify-between font-bold text-white mb-0.5">
                <span className="text-amber-400">Senior Stage (Ages 18+)</span>
                <span className="text-[10px] text-slate-500">Peak Performance</span>
              </div>
              Maximum explosive power, complex counter-combinations, psychological pressure resilience for Olympic & World Grand Prix events.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
