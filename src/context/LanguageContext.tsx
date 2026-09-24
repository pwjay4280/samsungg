import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "ko" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  ko: {
    hospital_name: "삼성G정형외과",
    slogan: "정직한 진료, 바른 척추·관절 의학",
    nav_centers: "진료센터",
    nav_spine: "척추센터",
    nav_joint: "관절센터",
    nav_rehab: "도수재활센터",
    nav_doctors: "의료진 소개",
    nav_consultation: "전문의 상담",
    nav_reviews: "치료 후기",
    nav_about: "병원 안내",
    nav_location: "오시는 길",
    nav_non_covered: "비급여 수가표",
    nav_admin: "관리자 CMS",
    btn_quick_appoint: "간편 빠른예약",
    btn_call: "대표전화 문의",
    hours_weekday: "평일 09:00 ~ 18:00 (도수재활 20:00)",
    hours_sat: "토요일 09:00 ~ 14:00 (점심시간 없음)",
    hours_holiday: "일요일/공휴일 외래 휴진 (365일 응급수술/입원 가동)",
    quick_bar_appoint: "빠른예약",
    quick_bar_consult: "전문의상담",
    quick_bar_kakao: "카톡상담",
    quick_bar_naver: "네이버예약",
    quick_bar_map: "오시는길",
    quick_bar_noncovered: "비급여안내",
    login_notice_title: "의료법 제56조 준수 안내",
    login_notice_desc: "의료법에 따라 수술 및 치료 후기는 본인 확인 및 로그인 후 열람이 가능합니다.",
    btn_login: "로그인",
    btn_logout: "로그아웃",
    role_guest: "비회원",
    role_patient: "환자회원",
    role_doctor: "전문의",
    role_admin: "최고관리자",
    cms_mode_active: "실시간 인라인 편집 CMS 활성화 중",
    cms_mode_exit: "편집 모드 종료",
  },
  en: {
    hospital_name: "SAMSUNG G HOSPITAL",
    slogan: "Precision Spine & Joint Healthcare",
    nav_centers: "Clinical Centers",
    nav_spine: "Spine Center",
    nav_joint: "Joint Center",
    nav_rehab: "Rehab Center",
    nav_doctors: "Medical Staff",
    nav_consultation: "Online Q&A",
    nav_reviews: "Patient Reviews",
    nav_about: "About Hospital",
    nav_location: "Directions",
    nav_non_covered: "Fee Guide",
    nav_admin: "Admin CMS",
    btn_quick_appoint: "Quick Booking",
    btn_call: "Call Center",
    hours_weekday: "Mon-Fri 09:00 ~ 18:00 (Rehab until 20:00)",
    hours_sat: "Sat 09:00 ~ 14:00 (No lunch break)",
    hours_holiday: "Sun & Holidays Closed (24/7 Emergency available)",
    quick_bar_appoint: "Booking",
    quick_bar_consult: "Doctor Q&A",
    quick_bar_kakao: "Live Chat",
    quick_bar_naver: "Reservation",
    quick_bar_map: "Location",
    quick_bar_noncovered: "Fee Guide",
    login_notice_title: "Medical Compliance Notice",
    login_notice_desc: "In accordance with medical advertising laws, patient treatment reviews require member login.",
    btn_login: "Log In",
    btn_logout: "Log Out",
    role_guest: "Guest",
    role_patient: "Patient",
    role_doctor: "Specialist",
    role_admin: "Administrator",
    cms_mode_active: "Live Inline CMS Active",
    cms_mode_exit: "Exit Editor",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== "undefined" && window.location.pathname.startsWith("/en")) {
      return "en";
    }
    return "ko";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      const currentPath = window.location.pathname;
      if (lang === "en" && !currentPath.startsWith("/en")) {
        window.history.pushState({}, "", `/en${currentPath === "/" ? "" : currentPath}`);
      } else if (lang === "ko" && currentPath.startsWith("/en")) {
        const newPath = currentPath.replace(/^\/en/, "") || "/";
        window.history.pushState({}, "", newPath);
      }
    }
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
};
