import React, { createContext, useContext, useState, useEffect } from "react";
import {
  HospitalInfo,
  Doctor,
  Subpage,
  Consultation,
  Review,
  QuickAppointment,
  HeroSlide,
  Notice,
  AppUser,
} from "../types/hospital";
import {
  initialHospitalInfo,
  initialDoctors,
  initialSubpages,
  initialConsultations,
  initialReviews,
  initialQuickAppointments,
  initialNotices,
  initialHeroSlides,
} from "../data/mockHospitalData";

interface HospitalContextType {
  hospitalInfo: HospitalInfo;
  doctors: Doctor[];
  subpages: Subpage[];
  consultations: Consultation[];
  reviews: Review[];
  quickAppointments: QuickAppointment[];
  notices: Notice[];
  heroSlides: HeroSlide[];
  inlineContent: Record<string, string>;
  currentUser: AppUser | null;
  isCmsMode: boolean;
  isAppointmentModalOpen: boolean;
  login: (role: "patient" | "doctor" | "admin", name?: string) => void;
  logout: () => void;
  setIsCmsMode: (val: boolean) => void;
  openAppointmentModal: () => void;
  closeAppointmentModal: () => void;
  submitQuickAppointment: (data: Omit<QuickAppointment, "id" | "status" | "createdAt">) => Promise<boolean>;
  submitConsultation: (data: Omit<Consultation, "id" | "seq" | "views" | "status" | "createdAt">) => Promise<Consultation>;
  answerConsultation: (id: string, answer: string, doctorName: string, doctorId: string) => Promise<boolean>;
  submitReview: (data: Omit<Review, "id" | "seq" | "views" | "createdAt">) => Promise<Review>;
  updateReviewStatus: (id: string, status: "승인대기" | "승인완료") => Promise<boolean>;
  updateAppointmentStatus: (id: string, status: "신규접수" | "상담완료" | "예약확정" | "취소", notes?: string) => Promise<boolean>;
  updateHospitalInfo: (info: Partial<HospitalInfo>) => Promise<boolean>;
  updateInlineContent: (key: string, value: string) => Promise<void>;
  getInlineContent: (key: string, defaultVal: string) => string;
}

const HospitalContext = createContext<HospitalContextType | undefined>(undefined);

export const HospitalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hospitalInfo, setHospitalInfo] = useState<HospitalInfo>(initialHospitalInfo);
  const [doctors, setDoctors] = useState<Doctor[]>(initialDoctors);
  const [subpages, setSubpages] = useState<Subpage[]>(initialSubpages);
  const [consultations, setConsultations] = useState<Consultation[]>(initialConsultations);
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [quickAppointments, setQuickAppointments] = useState<QuickAppointment[]>(initialQuickAppointments);
  const [notices, setNotices] = useState<Notice[]>(initialNotices);
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(initialHeroSlides);
  const [inlineContent, setInlineContent] = useState<Record<string, string>>({});
  const [currentUser, setCurrentUser] = useState<AppUser | null>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("samsung_g_user");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return null;
        }
      }
    }
    return null;
  });

  const [isCmsMode, setIsCmsMode] = useState<boolean>(false);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState<boolean>(false);

  // Initial fetch from API
  useEffect(() => {
    fetch("/api/hospital-info")
      .then((res) => res.json())
      .then((data) => setHospitalInfo(data))
      .catch(() => {});

    fetch("/api/doctors")
      .then((res) => res.json())
      .then((data) => setDoctors(data))
      .catch(() => {});

    fetch("/api/subpages")
      .then((res) => res.json())
      .then((data) => setSubpages(data))
      .catch(() => {});

    fetch("/api/consultations")
      .then((res) => res.json())
      .then((data) => setConsultations(data))
      .catch(() => {});

    fetch("/api/reviews")
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch(() => {});

    fetch("/api/quick-appointments")
      .then((res) => res.json())
      .then((data) => setQuickAppointments(data))
      .catch(() => {});

    fetch("/api/notices")
      .then((res) => res.json())
      .then((data) => setNotices(data))
      .catch(() => {});

    fetch("/api/inline-content")
      .then((res) => res.json())
      .then((data) => setInlineContent(data))
      .catch(() => {});
  }, []);

  const login = (role: "patient" | "doctor" | "admin", name?: string) => {
    let user: AppUser;
    if (role === "admin") {
      user = {
        id: "admin-root",
        name: name || "총괄 관리자",
        email: "admin@samsung-g-hospital.com",
        role: "admin",
      };
    } else if (role === "doctor") {
      user = {
        id: "doc-1",
        name: name || "구본진 대표원장",
        email: "bonjin.koo@samsung-g-hospital.com",
        role: "doctor",
      };
    } else {
      user = {
        id: "user-test-1",
        name: name || "김환자",
        email: "patient@example.com",
        role: "patient",
        phone: "010-9876-5432",
      };
    }
    setCurrentUser(user);
    if (typeof window !== "undefined") {
      localStorage.setItem("samsung_g_user", JSON.stringify(user));
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setIsCmsMode(false);
    if (typeof window !== "undefined") {
      localStorage.removeItem("samsung_g_user");
    }
  };

  const openAppointmentModal = () => setIsAppointmentModalOpen(true);
  const closeAppointmentModal = () => setIsAppointmentModalOpen(false);

  const submitQuickAppointment = async (
    data: Omit<QuickAppointment, "id" | "status" | "createdAt">
  ): Promise<boolean> => {
    try {
      const res = await fetch("/api/quick-appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const newAppt = await res.json();
      setQuickAppointments((prev) => [newAppt, ...prev]);
      return true;
    } catch {
      const fallbackAppt: QuickAppointment = {
        ...data,
        id: `qa-${Date.now()}`,
        status: "신규접수",
        createdAt: new Date().toISOString(),
      };
      setQuickAppointments((prev) => [fallbackAppt, ...prev]);
      return true;
    }
  };

  const submitConsultation = async (
    data: Omit<Consultation, "id" | "seq" | "views" | "status" | "createdAt">
  ): Promise<Consultation> => {
    try {
      const res = await fetch("/api/consultations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const newCons = await res.json();
      setConsultations((prev) => [newCons, ...prev]);
      return newCons;
    } catch {
      const maxSeq = consultations.reduce((max, c) => Math.max(max, c.seq), 100);
      const fallbackCons: Consultation = {
        ...data,
        id: `cons-${Date.now()}`,
        seq: maxSeq + 1,
        views: 1,
        status: "접수완료",
        createdAt: new Date().toISOString(),
      };
      setConsultations((prev) => [fallbackCons, ...prev]);
      return fallbackCons;
    }
  };

  const answerConsultation = async (
    id: string,
    answer: string,
    doctorName: string,
    doctorId: string
  ): Promise<boolean> => {
    try {
      await fetch(`/api/consultations/${id}/answer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answer, answerDoctorName: doctorName, answerDoctorId: doctorId }),
      });
    } catch {}

    setConsultations((prev) =>
      prev.map((c) =>
        c.id === id || String(c.seq) === id
          ? {
              ...c,
              answer,
              answerDoctorName: doctorName,
              answerDoctorId: doctorId,
              status: "답변완료",
              answerCreatedAt: new Date().toISOString(),
            }
          : c
      )
    );
    return true;
  };

  const submitReview = async (
    data: Omit<Review, "id" | "seq" | "views" | "createdAt">
  ): Promise<Review> => {
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const newRev = await res.json();
      setReviews((prev) => [newRev, ...prev]);
      return newRev;
    } catch {
      const maxSeq = reviews.reduce((max, r) => Math.max(max, r.seq), 40);
      const fallbackRev: Review = {
        ...data,
        id: `rev-${Date.now()}`,
        seq: maxSeq + 1,
        views: 1,
        status: "승인완료",
        createdAt: new Date().toISOString(),
      };
      setReviews((prev) => [fallbackRev, ...prev]);
      return fallbackRev;
    }
  };

  const updateReviewStatus = async (
    id: string,
    status: "승인대기" | "승인완료"
  ): Promise<boolean> => {
    try {
      await fetch(`/api/reviews/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
    } catch {}
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    return true;
  };

  const updateAppointmentStatus = async (
    id: string,
    status: "신규접수" | "상담완료" | "예약확정" | "취소",
    notes?: string
  ): Promise<boolean> => {
    try {
      await fetch(`/api/quick-appointments/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, notes }),
      });
    } catch {}
    setQuickAppointments((prev) =>
      prev.map((qa) => (qa.id === id ? { ...qa, status, notes: notes ?? qa.notes } : qa))
    );
    return true;
  };

  const updateHospitalInfo = async (info: Partial<HospitalInfo>): Promise<boolean> => {
    try {
      const res = await fetch("/api/hospital-info", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(info),
      });
      const result = await res.json();
      if (result.data) {
        setHospitalInfo(result.data);
      } else {
        setHospitalInfo((prev) => ({ ...prev, ...info }));
      }
      return true;
    } catch {
      setHospitalInfo((prev) => ({ ...prev, ...info }));
      return true;
    }
  };

  const updateInlineContent = async (key: string, value: string) => {
    setInlineContent((prev) => ({ ...prev, [key]: value }));
    try {
      await fetch("/api/inline-content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [key]: value }),
      });
    } catch {}
  };

  const getInlineContent = (key: string, defaultVal: string): string => {
    return inlineContent[key] !== undefined ? inlineContent[key] : defaultVal;
  };

  return (
    <HospitalContext.Provider
      value={{
        hospitalInfo,
        doctors,
        subpages,
        consultations,
        reviews,
        quickAppointments,
        notices,
        heroSlides,
        inlineContent,
        currentUser,
        isCmsMode,
        isAppointmentModalOpen,
        login,
        logout,
        setIsCmsMode,
        openAppointmentModal,
        closeAppointmentModal,
        submitQuickAppointment,
        submitConsultation,
        answerConsultation,
        submitReview,
        updateReviewStatus,
        updateAppointmentStatus,
        updateHospitalInfo,
        updateInlineContent,
        getInlineContent,
      }}
    >
      {children}
    </HospitalContext.Provider>
  );
};

export const useHospital = () => {
  const context = useContext(HospitalContext);
  if (!context) {
    throw new Error("useHospital must be used within HospitalProvider");
  }
  return context;
};
