import React, { useState } from 'react';
import { 
  UserCheck, 
  Sparkles, 
  Check, 
  Key, 
  RotateCcw, 
  Bell, 
  Save, 
  ShieldCheck, 
  BookOpen, 
  Building
} from 'lucide-react';
import { StudentProfile } from '../types';
import { GeminiService } from '../services/geminiService';
import { AnnouncementService } from '../services/announcementService';

interface ProfilePageProps {
  student: StudentProfile;
  onUpdateProfile: (updated: StudentProfile) => void;
  onResetDemoData: () => void;
}

const AVAILABLE_INTERESTS = [
  'Artificial Intelligence',
  'Hackathons',
  'Cloud Computing',
  'Product Design',
  'Placement Prep',
  'Robotics',
  'Web Development',
  'Cybersecurity',
  'Cultural Events',
  'Competitive Programming',
  'Sports',
  'Blockchain',
];

export const ProfilePage: React.FC<ProfilePageProps> = ({
  student,
  onUpdateProfile,
  onResetDemoData,
}) => {
  const [name, setName] = useState(student.name);
  const [department, setDepartment] = useState(student.department);
  const [year, setYear] = useState(student.year);
  const [college, setCollege] = useState(student.college);
  const [rollNumber, setRollNumber] = useState(student.rollNumber);
  const [selectedInterests, setSelectedInterests] = useState<string[]>(student.interests);
  const [notificationPreferences, setNotificationPreferences] = useState(
    student.notificationPreferences
  );

  const [apiKey, setApiKey] = useState(localStorage.getItem('campus_pulse_gemini_key') || '');
  const [isSaved, setIsSaved] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: StudentProfile = {
      ...student,
      name,
      department,
      year,
      college,
      rollNumber,
      interests: selectedInterests,
      notificationPreferences,
    };
    onUpdateProfile(updated);
    GeminiService.setApiKey(apiKey);

    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 mb-1 font-semibold text-xs">
            <UserCheck className="w-4 h-4" />
            <span>Student Personalization Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Profile & Preferences</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Campus Pulse AI uses these details to filter recommendations, tailor weekly briefings, and deliver high-priority notices.
          </p>
        </div>

        {isSaved && (
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            <Check className="w-3.5 h-3.5" />
            Preferences Saved!
          </span>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Academic Profile Card */}
        <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-5">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
            <img
              src={student.avatar}
              alt={student.name}
              className="w-12 h-12 rounded-2xl object-cover border border-indigo-500/40"
            />
            <div>
              <h3 className="text-base font-bold text-white">{name}</h3>
              <p className="text-xs text-slate-400">{department} • {year}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Full Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Roll / Student ID:</label>
              <input
                type="text"
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
                required
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Department / Major:</label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                required
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Academic Year:</label>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 focus:outline-none focus:border-indigo-500"
              >
                <option value="1st Year (B.Tech)">1st Year (B.Tech)</option>
                <option value="2nd Year (B.Tech)">2nd Year (B.Tech)</option>
                <option value="3rd Year (B.Tech)">3rd Year (B.Tech)</option>
                <option value="4th Year (B.Tech)">4th Year (B.Tech)</option>
                <option value="Postgraduate (M.Tech/MCA/MBA)">Postgraduate (M.Tech/MCA/MBA)</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-slate-300 font-semibold mb-1">University / College Institution:</label>
              <input
                type="text"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                required
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Interests & Recommendation Tags */}
        <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-4">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-bold text-white">Preferred Event Categories & Focus Interests</h3>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Select what matters most to your career and campus life. Our AI Engine uses this to personalize your feed.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {AVAILABLE_INTERESTS.map((interest) => {
              const isSelected = selectedInterests.includes(interest);
              return (
                <button
                  key={interest}
                  type="button"
                  onClick={() => toggleInterest(interest)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-600/30'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5" />}
                  <span>{interest}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-4">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-indigo-400" />
            <h3 className="text-sm font-bold text-white">Notification Alert Preferences</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800 cursor-pointer">
              <span className="text-slate-300 font-medium">Urgent Deadline Reminders (&lt; 48h)</span>
              <input
                type="checkbox"
                checked={notificationPreferences.urgentDeadlines}
                onChange={(e) =>
                  setNotificationPreferences({
                    ...notificationPreferences,
                    urgentDeadlines: e.target.checked,
                  })
                }
                className="w-4 h-4 accent-indigo-500 rounded"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800 cursor-pointer">
              <span className="text-slate-300 font-medium">Weekly AI Briefing Alerts</span>
              <input
                type="checkbox"
                checked={notificationPreferences.weeklyBriefing}
                onChange={(e) =>
                  setNotificationPreferences({
                    ...notificationPreferences,
                    weeklyBriefing: e.target.checked,
                  })
                }
                className="w-4 h-4 accent-indigo-500 rounded"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800 cursor-pointer">
              <span className="text-slate-300 font-medium">Hackathons & Technical Bootcamps</span>
              <input
                type="checkbox"
                checked={notificationPreferences.hackathonsAndWorkshops}
                onChange={(e) =>
                  setNotificationPreferences({
                    ...notificationPreferences,
                    hackathonsAndWorkshops: e.target.checked,
                  })
                }
                className="w-4 h-4 accent-indigo-500 rounded"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800 cursor-pointer">
              <span className="text-slate-300 font-medium">Corporate Placements & Internships</span>
              <input
                type="checkbox"
                checked={notificationPreferences.placementAlerts}
                onChange={(e) =>
                  setNotificationPreferences({
                    ...notificationPreferences,
                    placementAlerts: e.target.checked,
                  })
                }
                className="w-4 h-4 accent-indigo-500 rounded"
              />
            </label>
          </div>
        </div>

        {/* AI Key & Cloud Config */}
        <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Key className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-bold text-white">Google Gemini Cloud Credentials (Optional)</h3>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold">
              Live Fallback Engine Active
            </span>
          </div>

          <div>
            <label className="block text-xs text-slate-300 font-medium mb-1.5">
              API Key:
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="AIzaSy... (Leave empty to use built-in heuristic AI parser)"
              className="w-full text-xs p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 font-mono focus:outline-none focus:border-cyan-500"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Your key stays locally stored in your browser session. No external servers receive your key.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800 flex-wrap gap-4">
          <div>
            {showResetConfirm ? (
              <div className="flex items-center gap-2">
                <span className="text-xs text-rose-400">Confirm reset?</span>
                <button
                  type="button"
                  onClick={() => {
                    onResetDemoData();
                    setShowResetConfirm(false);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold"
                >
                  Yes, Reset
                </button>
                <button
                  type="button"
                  onClick={() => setShowResetConfirm(false)}
                  className="px-2 py-1 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowResetConfirm(true)}
                className="text-xs text-slate-400 hover:text-rose-400 flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Application to Demo State</span>
              </button>
            )}
          </div>

          <button
            type="submit"
            className="px-8 py-3.5 rounded-2xl glossy-button-gold text-slate-950 font-black text-xs shadow-xl transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4 text-slate-950" />
            <span>Save Student Preferences</span>
          </button>
        </div>
      </form>
    </div>
  );
};
