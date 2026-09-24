import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Lock,
  User,
  Clock,
  Eye,
  CheckCircle2,
  Stethoscope,
  Send,
  ShieldCheck,
} from "lucide-react";
import { useHospital } from "../context/HospitalContext";
import { useLanguage } from "../context/LanguageContext";

export const ConsultationDetailPage: React.FC = () => {
  const { seq } = useParams<{ seq: string }>();
  const { consultations, currentUser, answerConsultation } = useHospital();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const navPrefix = language === "en" ? "/en" : "";

  const cons = consultations.find((c) => String(c.seq) === seq);

  const [enteredPassword, setEnteredPassword] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [answerText, setAnswerText] = useState("");
  const [isAnswering, setIsAnswering] = useState(false);

  // If secret and user is not admin/doctor
  const isPrivileged = currentUser?.role === "admin" || currentUser?.role === "doctor";
  const needsUnlock = cons?.isSecret && !isPrivileged && !isUnlocked;

  useEffect(() => {
    if (cons) {
      fetch(`/api/consultations/${cons.id}/view`, { method: "POST" }).catch(() => {});
    }
  }, [cons?.id]);

  if (!cons) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-bold text-slate-800">해당 상담글을 찾을 수 없습니다.</h2>
        <Link
          to={`${navPrefix}/consultation`}
          className="mt-4 inline-flex items-center gap-2 text-cyan-600 font-semibold"
        >
          <ArrowLeft className="w-4 h-4" /> 상담 목록으로 돌아가기
        </Link>
      </div>
    );
  }

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (enteredPassword === cons.password || enteredPassword === "123") {
      setIsUnlocked(true);
    } else {
      alert("비밀번호가 일치하지 않습니다.");
    }
  };

  const handleAnswerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!answerText.trim()) return;

    setIsAnswering(true);
    const doctorName = currentUser?.name || "구본진 대표원장";
    const doctorId = currentUser?.id || "doc-1";

    await answerConsultation(cons.id, answerText.trim(), doctorName, doctorId);
    setIsAnswering(false);
    setAnswerText("");
    alert("전문의 답변이 성공적으로 등록되었습니다.");
  };

  return (
    <div className="w-full bg-slate-50 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        {/* Back navigation */}
        <Link
          to={`${navPrefix}/consultation`}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 mb-6 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>상담 목록으로 돌아가기</span>
        </Link>

        {needsUnlock ? (
          /* Password gate for secret post */
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm text-center max-w-md mx-auto space-y-4">
            <div className="w-14 h-14 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
              <Lock className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">비밀글 보호 안내</h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              본 상담글은 환자의 개인정보 및 민감한 의료 정보를 보호하기 위해 비밀글로 설정되어 있습니다. 등록 시 입력하신 비밀번호를 입력해 주세요.
            </p>
            <form onSubmit={handleUnlock} className="space-y-3 pt-2">
              <input
                type="password"
                required
                placeholder="비밀번호 입력 (테스트: 123)"
                value={enteredPassword}
                onChange={(e) => setEnteredPassword(e.target.value)}
                className="w-full px-4 py-2.5 text-xs border border-slate-300 rounded-xl text-center focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              />
              <button
                type="submit"
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition"
              >
                확인 및 열람
              </button>
            </form>
          </div>
        ) : (
          /* Main Q&A Content */
          <div className="space-y-8">
            {/* Question Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-cyan-700 bg-cyan-50 px-2.5 py-0.5 rounded text-xs">
                    {cons.category}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">#{cons.seq}</span>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    cons.status === "답변완료"
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "bg-amber-50 text-amber-700 border border-amber-200"
                  }`}
                >
                  {cons.status}
                </span>
              </div>

              <h1 className="text-2xl font-black text-slate-900 leading-snug">{cons.title}</h1>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5" />
                  <span>{cons.authorName}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{cons.createdAt.split("T")[0]}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" />
                  <span>조회수 {cons.views}</span>
                </span>
              </div>

              <div className="text-slate-700 text-sm sm:text-base leading-relaxed whitespace-pre-line pt-2">
                {cons.content}
              </div>

              {/* Attached Image */}
              {cons.imageUrl && (
                <div className="pt-4 border-t border-slate-100">
                  <p className="text-xs font-bold text-slate-500 mb-2">환자 첨부자료 (X-ray/MRI)</p>
                  <div className="max-w-md rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
                    <img
                      src={cons.imageUrl}
                      alt="첨부 영상"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Answer Section */}
            {cons.answer ? (
              <div className="bg-cyan-50/50 rounded-3xl p-6 sm:p-10 border border-cyan-200 shadow-sm space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-cyan-600 text-white flex items-center justify-center">
                    <Stethoscope className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">
                      {cons.answerDoctorName || "삼성G정형외과 전문의"} 답변
                    </h3>
                    <p className="text-[11px] text-cyan-800">
                      답변 일자: {cons.answerCreatedAt?.split("T")[0] || cons.createdAt.split("T")[0]}
                    </p>
                  </div>
                </div>

                <div className="text-slate-800 text-sm sm:text-base leading-relaxed whitespace-pre-line pt-2">
                  {cons.answer}
                </div>

                <div className="pt-4 border-t border-cyan-100 text-[11px] text-slate-500">
                  * 본 온라인 상담 답변은 진단 목적의 진료를 대신할 수 없으며, 정확한 치료를 위해 내원 진료를 권장합니다.
                </div>
              </div>
            ) : (
              <div className="bg-amber-50/60 rounded-3xl p-6 border border-amber-200 text-center space-y-2">
                <h3 className="text-sm font-bold text-amber-900">전문의 답변 대기 중입니다</h3>
                <p className="text-xs text-amber-700">
                  담당 의료진이 환자분의 질문 내용을 검토 중이며 24시간 이내에 전문 답변이 등록됩니다.
                </p>
              </div>
            )}

            {/* Doctor/Admin Answer Form */}
            {isPrivileged && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-indigo-200 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-indigo-700 font-bold text-sm">
                  <ShieldCheck className="w-4 h-4" />
                  <span>의료진 답변 등록 / 수정 (전문의 & 관리자 전용)</span>
                </div>
                <form onSubmit={handleAnswerSubmit} className="space-y-3">
                  <textarea
                    rows={4}
                    required
                    placeholder="환자 질문에 대한 전문적인 의학 소견 및 추천 치료 방안을 작성해 주세요."
                    value={answerText}
                    onChange={(e) => setAnswerText(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={isAnswering}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow transition flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isAnswering ? "등록 중..." : "답변 저장하기"}</span>
                  </button>
                </form>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
