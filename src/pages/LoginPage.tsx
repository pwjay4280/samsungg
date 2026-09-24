import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import {
  Lock,
  User,
  ShieldCheck,
  HeartPulse,
  LogOut,
  ArrowRight,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { useHospital } from "../context/HospitalContext";
import { useLanguage } from "../context/LanguageContext";

export const LoginPage: React.FC = () => {
  const { login, logout, currentUser } = useHospital();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const navPrefix = language === "en" ? "/en" : "";

  const state = location.state as { returnTo?: string } | null;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleManualLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setErrorMsg("이메일과 비밀번호를 모두 입력해 주세요.");
      return;
    }

    let role: "patient" | "doctor" | "admin" = "patient";
    let name = email.split("@")[0];

    if (email.includes("admin")) {
      role = "admin";
      name = "총괄 최고관리자";
    } else if (email.includes("doctor") || email.includes("dr")) {
      role = "doctor";
      name = "구본진 대표원장";
    }

    login(role, name);

    // If admin or doctor and no specific returnTo, go directly to /admin
    if (role === "admin" || role === "doctor") {
      const dest = state?.returnTo || `${navPrefix}/admin`;
      navigate(dest, { replace: true });
    } else {
      const dest = state?.returnTo || `${navPrefix}/`;
      navigate(dest, { replace: true });
    }
  };

  const handleQuickLogin = (role: "patient" | "doctor" | "admin", name: string) => {
    login(role, name);
    if (role === "admin" || role === "doctor") {
      const dest = state?.returnTo || `${navPrefix}/admin`;
      navigate(dest, { replace: true });
    } else {
      const dest = state?.returnTo || `${navPrefix}/`;
      navigate(dest, { replace: true });
    }
  };

  // If already logged in, show status & direct navigation button
  if (currentUser) {
    return (
      <div className="w-full bg-slate-50 min-h-screen py-16 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl space-y-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto ring-8 ring-indigo-50">
            <ShieldCheck className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
              {currentUser.role === "admin"
                ? "총괄 최고 관리자"
                : currentUser.role === "doctor"
                ? "전문의"
                : "일반 환자"}
            </span>
            <h1 className="text-2xl font-black text-slate-900 mt-3">
              {currentUser.name} 님 환영합니다
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              현재 시스템에 정상 로그인되어 있습니다.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            {/* Primary Action: Jump to Admin Dashboard */}
            <Link
              to={`${navPrefix}/admin`}
              className="w-full py-3.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-indigo-600/25 transition flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>관리자 대시보드 (/admin) 이동</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to={`${navPrefix}/`}
              className="w-full py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition flex items-center justify-center gap-2"
            >
              <span>병원 메인 홈페이지로 이동</span>
            </Link>

            <button
              onClick={logout}
              className="w-full py-2.5 px-4 text-slate-400 hover:text-rose-600 font-medium text-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>다른 계정으로 로그인 (로그아웃)</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-slate-50 min-h-screen py-16 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-cyan-600 text-white flex items-center justify-center mx-auto shadow-md shadow-cyan-600/20">
            <HeartPulse className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            삼성G정형외과 로그인
          </h1>
          <p className="text-xs text-slate-500">
            치료 후기 열람 및 1:1 진료 상담 관리를 위해 로그인해 주세요.
          </p>
        </div>

        {/* Return to reminder notice if applicable */}
        {state?.returnTo && (
          <div className="p-3 bg-cyan-50 border border-cyan-200 rounded-xl text-xs text-cyan-800 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-cyan-600 shrink-0" />
            <span>로그인 완료 시 요청하신 페이지로 즉시 자동 이동합니다.</span>
          </div>
        )}

        {errorMsg && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700">
            {errorMsg}
          </div>
        )}

        {/* Standard Login Form */}
        <form onSubmit={handleManualLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">이메일 계정</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                placeholder="admin@samsungg.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">비밀번호</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow transition cursor-pointer"
          >
            로그인하기
          </button>
        </form>

        {/* 1-Click Fast Test Accounts */}
        <div className="pt-4 border-t border-slate-100 space-y-3">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider text-center">
            원클릭 테스트 계정 로그인
          </p>
          <div className="grid grid-cols-1 gap-2">
            <button
              type="button"
              onClick={() => handleQuickLogin("admin", "총괄 최고관리자")}
              className="p-3 rounded-2xl border-2 border-indigo-500 bg-indigo-50/70 hover:bg-indigo-100/80 text-left transition flex items-center justify-between shadow-sm cursor-pointer"
            >
              <div>
                <p className="text-xs font-black text-indigo-950 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-indigo-600" />
                  <span>최고 관리자 (통합 CMS)</span>
                </p>
                <p className="text-[10px] text-indigo-700 mt-0.5">
                  admin@samsungg.com (클릭 시 관리자 대시보드 자동 이동)
                </p>
              </div>
              <span className="text-xs font-bold text-white bg-indigo-600 px-2.5 py-1 rounded-lg shadow-sm">
                관리자 즉시 접속 ➔
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin("doctor", "구본진 대표원장")}
              className="p-2.5 rounded-xl border border-slate-200 hover:border-blue-500 bg-slate-50 hover:bg-blue-50/50 text-left transition flex items-center justify-between cursor-pointer"
            >
              <div>
                <p className="text-xs font-bold text-slate-800">전문의 (구본진 대표원장)</p>
                <p className="text-[10px] text-slate-500">doctor@samsungg.com</p>
              </div>
              <span className="text-[11px] font-bold text-blue-600">전문의 접속</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin("patient", "김지훈")}
              className="p-2.5 rounded-xl border border-slate-200 hover:border-cyan-500 bg-slate-50 hover:bg-cyan-50/50 text-left transition flex items-center justify-between cursor-pointer"
            >
              <div>
                <p className="text-xs font-bold text-slate-800">일반 환자 (김지훈 님)</p>
                <p className="text-[10px] text-slate-500">patient@samsungg.com</p>
              </div>
              <span className="text-[11px] font-bold text-cyan-600">환자 접속</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
