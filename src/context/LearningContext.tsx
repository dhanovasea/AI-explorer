import React, { createContext, useContext, useState, useEffect } from 'react';
import { ModuleId, BadgeId, Badge, StudentProfile, PBLProject, PeerReview } from '../types';
import { BADGES_DATA, SAMPLE_PBL_PROJECTS } from '../data/learningContent';

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

  // PBL & Publication
  pblProjects: PBLProject[];
  addPBLProject: (project: Omit<PBLProject, 'id' | 'likes' | 'reviews' | 'createdAt'>) => string;
  likePBLProject: (projectId: string) => void;
  addPeerReview: (projectId: string, review: Omit<PeerReview, 'id' | 'createdAt'>) => void;
}

const STORAGE_KEY = 'genai_explorer_student_profile_v1';
const PBL_STORAGE_KEY = 'genai_explorer_pbl_projects_v1';

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

  const [pblProjects, setPblProjects] = useState<PBLProject[]>(() => {
    try {
      const saved = localStorage.getItem(PBL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // fallback
    }
    return SAMPLE_PBL_PROJECTS;
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

  useEffect(() => {
    try {
      localStorage.setItem(PBL_STORAGE_KEY, JSON.stringify(pblProjects));
    } catch (e) {
      console.error('Failed to save PBL to localStorage', e);
    }
  }, [pblProjects]);

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

  const addPBLProject = (projectData: Omit<PBLProject, 'id' | 'likes' | 'reviews' | 'createdAt'>): string => {
    const newId = `pbl-proj-${Date.now()}`;
    const dateFormatted = new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(new Date());

    const newProject: PBLProject = {
      ...projectData,
      id: newId,
      likes: 1,
      reviews: [],
      createdAt: dateFormatted,
      isStudentSubmission: true
    };

    setPblProjects((prev) => [newProject, ...prev]);
    addXP(100, `Karya PBL "${newProject.title}" berhasil dipublikasikan!`);
    unlockBadge('pbl-innovator');

    return newId;
  };

  const likePBLProject = (projectId: string) => {
    setPblProjects((prev) =>
      prev.map((proj) => {
        if (proj.id === projectId) {
          return { ...proj, likes: proj.likes + 1 };
        }
        return proj;
      })
    );
    addToast('Apresiasi berhasil diberikan ke proyek!');
  };

  const addPeerReview = (projectId: string, review: Omit<PeerReview, 'id' | 'createdAt'>) => {
    const newReview: PeerReview = {
      ...review,
      id: `rev-${Date.now()}`,
      createdAt: new Intl.DateTimeFormat('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }).format(new Date())
    };

    setPblProjects((prev) =>
      prev.map((proj) => {
        if (proj.id === projectId) {
          return {
            ...proj,
            reviews: [...proj.reviews, newReview]
          };
        }
        return proj;
      })
    );

    addXP(20, 'Ulasan sejawat berhasil ditambahkan!');
  };

  const resetProgress = () => {
    setProfile(defaultProfile);
    setPblProjects(SAMPLE_PBL_PROJECTS);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(PBL_STORAGE_KEY);
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
        pblProjects,
        addPBLProject,
        likePBLProject,
        addPeerReview
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
