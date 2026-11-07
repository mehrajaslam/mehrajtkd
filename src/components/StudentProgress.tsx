import React, { useState } from 'react';
import {
  Award,
  User,
  Shield,
  CheckCircle2,
  Calendar,
  Printer,
  Sparkles,
  Trophy,
  Flame,
  ArrowRight,
  BookOpen
} from 'lucide-react';
import { UserProfile, BeltRank } from '../types';

interface StudentProgressProps {
  profile: UserProfile;
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
  onClose?: () => void;
  onAskCoach: (query: string) => void;
}

export const StudentProgress: React.FC<StudentProgressProps> = ({
  profile,
  onUpdateProfile,
  onClose,
  onAskCoach,
}) => {
  const [showCertificate, setShowCertificate] = useState(false);
  const [editingName, setEditingName] = useState(profile.studentName);
  const [editingClub, setEditingClub] = useState(profile.clubAffiliation);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const allBelts: BeltRank[] = [
    '10th Gup (White Belt)',
    '9th Gup (White/Yellow Stripe)',
    '8th Gup (Yellow Belt)',
    '7th Gup (Yellow/Green Stripe)',
    '6th Gup (Green Belt)',
    '5th Gup (Green/Blue Stripe)',
    '4th Gup (Blue Belt)',
    '3rd Gup (Blue/Red Stripe)',
    '2nd Gup (Red Belt)',
    '1st Gup (Red/Black Stripe / Cho Dan Bo)',
    '1st Dan (Black Belt)',
    '2nd Dan',
    '3rd Dan',
    '4th Dan (Sabomnim / Master)',
    '5th Dan',
    '6th Dan',
    '7th Dan',
    '8th Dan',
    '9th Dan (Grandmaster)',
  ];

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      studentName: editingName.trim() || 'Dedicated Taekwondo Practitioner',
      clubAffiliation: editingClub.trim() || 'PTF & World Strikers Academy',
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handlePrintCertificate = () => {
    window.print();
  };

  const completedCount = profile.completedLessons.length;
  const quizCount = profile.completedQuizzes.length;
  const averageQuizScore =
    quizCount > 0
      ? Math.round(
          (profile.completedQuizzes.reduce((acc, q) => acc + (q.score / q.maxScore) * 100, 0) /
            quizCount)
        )
      : 0;

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="relative overflow-hidden rounded-xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-widest mb-1">
              <User className="w-4 h-4 text-amber-400" />
              <span>Personalized Practitioner Profile & Records</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-black uppercase tracking-wider text-white">
              Student Progress & Belt Registry
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mt-1">
              Manage your rank level, track completed technical modules, examine mock testing scores, and generate your Certificate of Educational Completion.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowCertificate(!showCertificate)}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-all shadow-md"
            >
              <Award className="w-4 h-4" />
              <span>{showCertificate ? 'View Progress Stats' : 'View Completion Certificate'}</span>
            </button>
          </div>
        </div>
      </div>

      {showCertificate ? (
        /* Certificate View */
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-slate-400">
              Official Educational Diploma Preview (Printable)
            </span>
            <button
              onClick={handlePrintCertificate}
              className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-xs font-bold text-amber-400 uppercase tracking-wider transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save PDF</span>
            </button>
          </div>

          {/* Certificate Frame */}
          <div className="bg-[#0e1320] border-4 border-amber-500/80 rounded-2xl p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl">
            {/* Corner Decorative Borders */}
            <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-amber-400" />
            <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-amber-400" />
            <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-amber-400" />
            <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-amber-400" />

            {/* Federation Header */}
            <div className="max-w-xl mx-auto space-y-2 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-600 via-amber-500 to-red-800 p-0.5 mx-auto mb-2 flex items-center justify-center shadow-lg">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                  <Shield className="w-8 h-8 text-amber-400" />
                </div>
              </div>
              <h3 className="font-display font-black text-2xl sm:text-3xl text-amber-400 uppercase tracking-widest">
                Certificate of Educational Study
              </h3>
              <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                PTF & World Strikers AI Taekwondo Master Academy
              </p>
            </div>

            <div className="my-6 space-y-4">
              <p className="text-xs sm:text-sm text-slate-300 italic">
                This is to certify that the dedicated Taekwondo student:
              </p>
              <div className="text-2xl sm:text-4xl font-display font-black text-white tracking-wide underline decoration-amber-400/50 underline-offset-8">
                {profile.studentName || 'Student Practitioner'}
              </div>
              <p className="text-xs text-slate-400">
                Affiliated with: <strong className="text-slate-200">{profile.clubAffiliation}</strong>
              </p>
              <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed pt-2">
                Has diligently studied the standard Kukkiwon Poomsae curriculum, World Taekwondo (WT) competition regulations, sparring tactical counter-systems, and the 5 Tenets of Taekwondo for the registered grade of:
              </p>
              <div className="text-lg sm:text-xl font-display font-bold text-amber-400 uppercase tracking-wider bg-slate-900/80 inline-block px-6 py-2 rounded-xl border border-amber-500/30">
                {profile.currentBelt}
              </div>
            </div>

            {/* Signatures & Seal */}
            <div className="pt-8 border-t border-slate-800/80 mt-8 grid grid-cols-2 max-w-md mx-auto text-center gap-6">
              <div>
                <div className="text-xs font-serif italic text-amber-400 mb-1">Grandmaster Sabomnim AI</div>
                <div className="h-0.5 w-32 bg-slate-700 mx-auto mb-1" />
                <span className="text-[10px] text-slate-400 uppercase tracking-wider">
                  Master Coach Examiner
                </span>
              </div>
              <div>
                <div className="text-xs font-mono text-slate-300 mb-1">
                  {new Date().toLocaleDateString([], { year: 'numeric', month: 'short', day: 'numeric' })}
                </div>
                <div className="h-0.5 w-32 bg-slate-700 mx-auto mb-1" />
                <span className="text-[10px] text-slate-400 uppercase tracking-wider">Date of Verification</span>
              </div>
            </div>

            <p className="text-[10px] text-slate-400 mt-6 max-w-md mx-auto italic">
              Notice: Educational completion record only; does not substitute for official Kukkiwon or PTF testing certification.
            </p>
          </div>
        </div>
      ) : (
        /* Progress Dashboard & Profile Settings */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Form (1 col) */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 shadow-xl">
            <h3 className="font-display uppercase text-sm font-bold text-white tracking-wider mb-4 flex items-center gap-2">
              <User className="w-4 h-4 text-amber-400" />
              Practitioner Details
            </h3>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                  Student Name
                </label>
                <input
                  type="text"
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  placeholder="e.g. Ahmad Khan / Master Lee"
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                  Club / Dojang Affiliation
                </label>
                <input
                  type="text"
                  value={editingClub}
                  onChange={(e) => setEditingClub(e.target.value)}
                  placeholder="e.g. World Strikers Taekwondo Club"
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                  Current Belt Rank
                </label>
                <select
                  value={profile.currentBelt}
                  onChange={(e) => onUpdateProfile({ currentBelt: e.target.value as BeltRank })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                >
                  {allBelts.map((belt) => (
                    <option key={belt} value={belt}>
                      {belt}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-all"
              >
                {savedSuccess ? 'Saved Successfully!' : 'Update Profile'}
              </button>
            </form>

            <div className="mt-4 pt-4 border-t border-slate-800 text-[11px] text-slate-400 leading-relaxed">
              Privacy First: All data is stored locally in your browser (LocalStorage). No sensitive personal information is transmitted or harvested.
            </div>
          </div>

          {/* Progress Overview Stats (2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl text-center">
                <span className="text-3xl font-display font-black text-amber-400">{completedCount}</span>
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-1">
                  Lessons Completed
                </div>
              </div>
              <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl text-center">
                <span className="text-3xl font-display font-black text-emerald-400">{quizCount}</span>
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-1">
                  Quizzes Passed
                </div>
              </div>
              <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl text-center">
                <span className="text-3xl font-display font-black text-blue-400">{averageQuizScore}%</span>
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-1">
                  Exam Accuracy
                </div>
              </div>
              <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl text-center">
                <span className="text-3xl font-display font-black text-red-400">
                  {profile.streakDays || 1}
                </span>
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-1">
                  Training Streak
                </div>
              </div>
            </div>

            {/* Completed Modules Breakdown */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 shadow-xl">
              <h3 className="font-display uppercase text-sm font-bold text-white tracking-wider mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Curriculum Progression Checklist
              </h3>

              {profile.completedLessons.length === 0 ? (
                <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-400">
                  No lessons marked complete yet. Head over to Belt Training or Poomsae Academy and tap "Mark Lesson Complete" as you master each form and technique!
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {profile.completedLessons.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-900/70 border border-slate-800 text-xs text-slate-200"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="uppercase tracking-wider font-semibold">
                        {item.replace('gup-', '')} Gup Syllabus Mastery
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Examination Score History */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 shadow-xl">
              <h3 className="font-display uppercase text-sm font-bold text-white tracking-wider mb-3 flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-400" />
                Recent Examination Scores
              </h3>

              {profile.completedQuizzes.length === 0 ? (
                <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-400">
                  No mock exams recorded yet. Go to Exam Centre to challenge yourself against WT referee rules and belt promotion theory questions.
                </div>
              ) : (
                <div className="space-y-2">
                  {profile.completedQuizzes.slice(-5).map((q, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs"
                    >
                      <div>
                        <span className="font-bold text-white uppercase">{q.quizId}</span>
                        <span className="text-[10px] text-slate-400 block">{q.date}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-display font-black text-amber-400 text-sm">
                          {q.score} / {q.maxScore}
                        </span>
                        <span className="text-[10px] text-slate-400 block">
                          {Math.round((q.score / q.maxScore) * 100)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
