import React, { createContext, useContext, useState, useEffect } from 'react';
import { ModuleId, BadgeId, Badge, StudentProfile } from '../types';
import { BADGES_DATA } from '../data/learningContent';

interface ToastMessage {
  id: string;
  text: string;
  xp?: number;
}

interface LearningContextType {
  profile: StudentProfile;
  badges: Badge[];
  activeView: string;
  setActiveView: (view: string) => void;
  updateStudentName: (name: string) => void;
  addXP: (amount: number, reason: string) => void;
  completeModule: (moduleId: ModuleId) => void;
  unlockBadge: (badgeId: BadgeId) => void;
  recordQuizScore: (score: number) => void;
  resetProgress: () => void;
  toasts: ToastMessage[];
  dismissToast: (id: string) => void;
  openCertificate: boolean;
  setOpenCertificate: (open: boolean) => void;
  openGlossary: boolean;
  setOpenGlossary: (open: boolean) => void;
  openAbout: boolean;
  setOpenAbout: (open: boolean) => void;
}

const STORAGE_KEY = 'genai_explorer_student_profile_v1';

const defaultProfile: StudentProfile = {
  name: 'Siswa SMA Kelas 10',
  xp: 0,
  completedModules: [],
  badges: [],
  quizScore: null,
  quizCompleted: false,
};

const LearningContext = createContext<LearningContextType | undefined>(undefined);

export const LearningProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<StudentProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return defaultProfile;
  });

  const [activeView, setActiveView] = useState<string>('dashboard');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [openCertificate, setOpenCertificate] = useState<boolean>(false);
  const [openGlossary, setOpenGlossary] = useState<boolean>(false);
  const [openAbout, setOpenAbout] = useState<boolean>(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }, [profile]);

  const addToast = (text: string, xp?: number) => {
    const id = Date.now().toString() + Math.random().toString();
    setToasts((prev) => [...prev, { id, text, xp }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const updateStudentName = (name: string) => {
    const trimmed = name.trim() || 'Siswa SMA';
    setProfile((prev) => ({ ...prev, name: trimmed }));
    addToast(`Nama diperbarui: ${trimmed}`);
  };

  const unlockBadge = (badgeId: BadgeId) => {
    setProfile((prev) => {
      if (prev.badges.includes(badgeId)) return prev;
      const updatedBadges = [...prev.badges, badgeId];
      const targetBadge = BADGES_DATA.find((b) => b.id === badgeId);
      if (targetBadge) {
        addToast(`🎖️ Lencana Baru Terbuka: ${targetBadge.title}!`, 50);
      }
      return {
        ...prev,
        badges: updatedBadges,
        xp: prev.xp + 50,
      };
    });
  };

  const addXP = (amount: number, reason: string) => {
    setProfile((prev) => {
      const newXp = prev.xp + amount;
      addToast(reason, amount);

      // Check auto-badge criteria
      if (newXp >= 100 && !prev.badges.includes('ai-beginner')) {
        setTimeout(() => unlockBadge('ai-beginner'), 400);
      }

      return {
        ...prev,
        xp: newXp,
      };
    });
  };

  const completeModule = (moduleId: ModuleId) => {
    setProfile((prev) => {
      if (prev.completedModules.includes(moduleId)) return prev;
      const updatedModules = [...prev.completedModules, moduleId];
      
      if (moduleId === 1 && !prev.badges.includes('ai-beginner')) {
        setTimeout(() => unlockBadge('ai-beginner'), 500);
      }

      return {
        ...prev,
        completedModules: updatedModules,
      };
    });
  };

  const recordQuizScore = (score: number) => {
    setProfile((prev) => {
      const updated = {
        ...prev,
        quizScore: score,
        quizCompleted: true,
      };

      if (!prev.completedModules.includes(6)) {
        updated.completedModules = [...prev.completedModules, 6 as ModuleId];
      }

      if (score >= 80 && !prev.badges.includes('generative-ai-master')) {
        setTimeout(() => unlockBadge('generative-ai-master'), 600);
      }

      return updated;
    });
  };

  const resetProgress = () => {
    setProfile(defaultProfile);
    localStorage.removeItem(STORAGE_KEY);
    addToast('Progres pembelajaran berhasil di-reset.');
    setActiveView('dashboard');
  };

  const badges = BADGES_DATA.map((badge) => ({
    ...badge,
    unlocked: profile.badges.includes(badge.id),
  }));

  return (
    <LearningContext.Provider
      value={{
        profile,
        badges,
        activeView,
        setActiveView,
        updateStudentName,
        addXP,
        completeModule,
        unlockBadge,
        recordQuizScore,
        resetProgress,
        toasts,
        dismissToast,
        openCertificate,
        setOpenCertificate,
        openGlossary,
        setOpenGlossary,
        openAbout,
        setOpenAbout,
      }}
    >
      {children}
    </LearningContext.Provider>
  );
};

export const useLearning = () => {
  const context = useContext(LearningContext);
  if (!context) {
    throw new Error('useLearning must be used within a LearningProvider');
  }
  return context;
};
