import React, { useState } from 'react';
import { Shield, Menu, X, Award, User, Volume2, Globe } from 'lucide-react';
import { Language, BeltRank } from '../types';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentBelt: BeltRank;
  language: Language;
  setLanguage: (lang: Language) => void;
  onOpenProfile: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  currentBelt,
  language,
  setLanguage,
  onOpenProfile,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'coach', label: 'AI Voice Coach' },
    { id: 'belts', label: 'Belt Training' },
    { id: 'dan', label: 'Dan Prep' },
    { id: 'poomsae', label: 'Poomsae' },
    { id: 'kyorugi', label: 'Kyorugi' },
    { id: 'referee', label: 'Referee' },
    { id: 'coach-edu', label: 'Coach Edu' },
    { id: 'exams', label: 'Exam Centre' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0B0F19]/95 backdrop-blur border-b border-slate-800 text-slate-100">
      {/* Top Federation Announcement Bar */}
      <div className="bg-gradient-to-r from-red-950 via-slate-900 to-amber-950 px-4 py-1.5 text-xs text-slate-300 border-b border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="text-amber-400 font-bold tracking-wider font-display uppercase">PTF & World Strikers</span>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <span className="hidden sm:inline text-slate-400">Official Educational Taekwondo Academy & AI Coach</span>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          {/* Language selector */}
          <div className="flex items-center gap-1 text-xs">
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            <button
              onClick={() => setLanguage('English')}
              className={`px-1.5 py-0.5 rounded transition-colors ${
                language === 'English' ? 'text-amber-400 font-semibold underline' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              EN
            </button>
            <span className="text-slate-600">/</span>
            <button
              onClick={() => setLanguage('Urdu')}
              className={`px-1.5 py-0.5 rounded transition-colors ${
                language === 'Urdu' ? 'text-amber-400 font-semibold underline' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              اردو
            </button>
            <span className="text-slate-600">/</span>
            <button
              onClick={() => setLanguage('Arabic')}
              className={`px-1.5 py-0.5 rounded transition-colors ${
                language === 'Arabic' ? 'text-amber-400 font-semibold underline' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              العربية
            </button>
          </div>
        </div>
      </div>

      {/* Main Top Bar strictly obeying Top Bar Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-8 h-16">
        {/* Zone 1: Single text wordmark */}
        <button
          onClick={() => setActiveTab('dashboard')}
          className="flex items-center gap-2.5 text-left whitespace-nowrap shrink-0 group focus:outline-none"
        >
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-red-600 via-amber-500 to-red-800 p-0.5 flex items-center justify-center shadow-md">
            <div className="w-full h-full bg-slate-950 rounded-[7px] flex items-center justify-center">
              <Shield className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <div>
            <span className="font-display font-black text-xl tracking-wider text-white uppercase block leading-none">
              World Strikers <span className="text-amber-400">TKD</span>
            </span>
            <span className="text-[10px] text-slate-400 tracking-wider uppercase font-semibold">
              Master Coach AI
            </span>
          </div>
        </button>

        {/* Zone 2: Concise single-line navigation links */}
        <nav className="hidden lg:flex items-center gap-5 text-xs font-semibold uppercase tracking-wider text-slate-300">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => setActiveTab(link.id)}
              className={`whitespace-nowrap transition-colors py-1 relative ${
                activeTab === link.id
                  ? 'text-amber-400 font-bold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              {link.label}
              {activeTab === link.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-500 to-amber-400 rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenProfile}
            className="flex items-center gap-2 px-3.5 py-2 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white rounded-lg text-xs font-bold tracking-wide uppercase shadow-lg shadow-red-950/40 transition-all whitespace-nowrap shrink-0"
          >
            <User className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{currentBelt.split('(')[0].trim()}</span>
            <span className="sm:hidden">Profile</span>
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-400 hover:text-white rounded-md hover:bg-slate-800 focus:outline-none"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950/98 border-b border-slate-800 px-4 py-4 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-800">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setActiveTab(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-3 py-2 rounded-md text-xs font-semibold tracking-wide uppercase transition-colors ${
                  activeTab === link.id
                    ? 'bg-amber-400/15 text-amber-300 border border-amber-400/30'
                    : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
            <span>Rank: {currentBelt}</span>
            <button
              onClick={() => {
                onOpenProfile();
                setMobileMenuOpen(false);
              }}
              className="text-amber-400 underline font-semibold"
            >
              Progress & Certificate
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
