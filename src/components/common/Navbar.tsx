import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useHospital } from "../../context/HospitalContext";
import { useLanguage } from "../../context/LanguageContext";

export const Navbar: React.FC = () => {
  const { currentUser, logout } = useHospital();
  const { language, setLanguage } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navPrefix = language === "en" ? "/en" : "";

  const toggleLanguage = () => {
    setLanguage(language === "ko" ? "en" : "ko");
  };

  return (
    <header className="site-header" id="top">
      <div className="utility-bar">
        {/* Left: Search Pill */}
        <button className="search-pill" type="button" aria-label="검색 열기">
          <span className="search-divider" aria-hidden="true"></span>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="11" cy="11" r="6"></circle>
            <path d="m16 16 4 4"></path>
          </svg>
        </button>

        {/* Center: Brand Logo */}
        <Link className="brand" to={`${navPrefix}/`} aria-label="삼성G정형외과 홈">
          <img src="/assets/logo-color.svg" alt="삼성G정형외과" />
        </Link>

        {/* Right: Utility Actions */}
        <div className="utility-actions">
          <button className="language" type="button" onClick={toggleLanguage}>
            <img className="language-flag" src="/assets/flag-kr.svg" alt="" aria-hidden="true" />
            <span>{language === "ko" ? "KOR" : "ENG"}</span>
            <span className="language-chevron" aria-hidden="true">⌄</span>
          </button>

          {currentUser ? (
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontWeight: 600, color: "#1756ae" }}>{currentUser.name}님</span>
              <Link
                to={`${navPrefix}/admin`}
                style={{
                  background: "#1756ae",
                  color: "#fff",
                  padding: "4px 10px",
                  borderRadius: "14px",
                  fontWeight: 700,
                  fontSize: "11px",
                }}
                title="관리자 대시보드로 이동"
              >
                관리자 이동
              </Link>
              <button
                onClick={logout}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#777",
                  cursor: "pointer",
                  fontSize: "11px",
                  padding: 0,
                }}
              >
                로그아웃
              </button>
            </div>
          ) : (
            <>
              <Link to={`${navPrefix}/login`} state={{ returnTo: location.pathname }}>
                로그인
              </Link>
              <Link to={`${navPrefix}/login`}>회원가입</Link>
            </>
          )}

          <button
            className="menu-toggle"
            type="button"
            aria-label={isMobileMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Main Nav matching exact spacing & typography */}
      <nav className={`main-nav ${isMobileMenuOpen ? "open" : ""}`} aria-label="주요 메뉴">
        <Link to={`${navPrefix}/about`} onClick={() => setIsMobileMenuOpen(false)}>
          병원소개
        </Link>
        <Link to={`${navPrefix}/about?tab=staff`} onClick={() => setIsMobileMenuOpen(false)}>
          의료진소개
        </Link>
        <Link to={`${navPrefix}/spine`} onClick={() => setIsMobileMenuOpen(false)}>
          척추센터
        </Link>
        <Link to={`${navPrefix}/knee`} onClick={() => setIsMobileMenuOpen(false)}>
          관절센터
        </Link>
        <Link to={`${navPrefix}/cs`} onClick={() => setIsMobileMenuOpen(false)}>
          고객센터
        </Link>
      </nav>
    </header>
  );
};
