import React from 'react';
import { Shield, Award, BookOpen, AlertCircle } from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs">
      {/* Disclaimer Banner */}
      <div className="bg-red-950/40 border-b border-red-900/40 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p className="text-slate-300 leading-relaxed text-[11px] sm:text-xs">
            <strong className="text-amber-400 font-semibold uppercase tracking-wider">Educational Notice: </strong>
            PTF & World Strikers AI Taekwondo Master Coach is an educational and pedagogical preparation system. It is 
            <span className="text-white font-medium"> NOT an official examination or certification issuing authority</span> of Kukkiwon or the Pakistan Taekwondo Federation (PTF). Official Dan certificates, instructor licenses, and referee credentials are awarded exclusively through authorized Kukkiwon member federations and designated national committees.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Info */}
          <div className="space-y-3">
            <button onClick={() => onSelectTab('dashboard')} className="flex items-center gap-2 text-left group">
              <div className="w-7 h-7 rounded bg-red-600 flex items-center justify-center text-white group-hover:scale-105 transition-transform">
                <Shield className="w-4 h-4 text-amber-400" />
              </div>
              <span className="font-display font-bold text-lg text-white group-hover:text-amber-400 transition-colors uppercase tracking-wider">
                PTF & World Strikers
              </span>
            </button>
            <p className="text-xs text-slate-400 leading-relaxed">
              Global educational academy dedicated to the Olympic sport and traditional martial art of Taekwondo, nurturing champions through discipline, precision, and respect.
            </p>
            <div className="text-[11px] text-slate-400 flex items-center gap-2">
              <span className="text-amber-400 font-semibold">Standards:</span>
              <span>Kukkiwon Poomsae & WT 2024–2026 Rules</span>
            </div>
          </div>

          {/* Training Modules */}
          <div>
            <h4 className="font-display uppercase text-sm font-bold text-white tracking-wider mb-3">
              Training Modules
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onSelectTab('coach')} className="hover:text-amber-400 transition-colors">
                  AI Voice Coach (English/Urdu/Arabic)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('belts')} className="hover:text-amber-400 transition-colors">
                  10th Gup to 1st Gup Curriculum
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('dan')} className="hover:text-amber-400 transition-colors">
                  1st Dan to 9th Dan Preparation
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('poomsae')} className="hover:text-amber-400 transition-colors">
                  Poomsae Academy (Taegeuk 1–8 & Dan Forms)
                </button>
              </li>
            </ul>
          </div>

          {/* Tactical & Governance */}
          <div>
            <h4 className="font-display uppercase text-sm font-bold text-white tracking-wider mb-3">
              Tactics & Rules
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onSelectTab('kyorugi')} className="hover:text-amber-400 transition-colors">
                  Olympic Kyorugi & Sparring Simulator
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('referee')} className="hover:text-amber-400 transition-colors">
                  WT Competition Rules & Referee Signals
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('coach-edu')} className="hover:text-amber-400 transition-colors">
                  Coach Pedagogy & Periodization
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('exams')} className="hover:text-amber-400 transition-colors">
                  Examination Mock Tests & Scoring
                </button>
              </li>
            </ul>
          </div>

          {/* Tenets of Taekwondo */}
          <div className="border border-slate-800 bg-slate-900/60 p-4 rounded-lg">
            <h4 className="font-display uppercase text-xs font-bold text-amber-400 tracking-wider mb-2 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" /> 5 Tenets of Taekwondo
            </h4>
            <div className="space-y-1.5 text-[11px] text-slate-300">
              <p><span className="text-amber-400 font-semibold">1. Ye-Ui (예의):</span> Courtesy / احترام</p>
              <p><span className="text-amber-400 font-semibold">2. Yom-Chi (염치):</span> Integrity / دیانت</p>
              <p><span className="text-amber-400 font-semibold">3. In-Nae (인내):</span> Perseverance / صبر و استقلال</p>
              <p><span className="text-amber-400 font-semibold">4. Guk-Gi (극기):</span> Self-Control / ضبط نفس</p>
              <p><span className="text-amber-400 font-semibold">5. Baekjeol-Bulgul (백절불굴):</span> Indomitable Spirit / غیر متزلزل عزم</p>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            PTF & World Strikers AI Taekwondo Master Coach © {new Date().getFullYear()} · All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>WT Rules v2024–2026</span>
            <span>·</span>
            <span>Kukkiwon Standard</span>
            <span>·</span>
            <span>Client-Side Local Storage</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
