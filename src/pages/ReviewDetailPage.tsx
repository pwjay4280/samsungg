import React, { useEffect } from "react";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import { ArrowLeft, Star, User, Clock, ShieldCheck, Eye } from "lucide-react";
import { useHospital } from "../context/HospitalContext";
import { useLanguage } from "../context/LanguageContext";

export const ReviewDetailPage: React.FC = () => {
  const { seq } = useParams<{ seq: string }>();
  const { reviews, currentUser } = useHospital();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const navPrefix = language === "en" ? "/en" : "";

  const review = reviews.find((r) => String(r.seq) === seq);

  useEffect(() => {
    // Medical Law Check
    if (!currentUser) {
      alert("의료법 규정에 따라 치료 후기는 회원 로그인 후 열람하실 수 있습니다.");
      navigate(`${navPrefix}/login`, {
        state: { returnTo: location.pathname },
        replace: true,
      });
    }
  }, [currentUser, navigate, location.pathname, navPrefix]);

  if (!currentUser) {
    return null;
  }

  if (!review) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-bold text-slate-800">해당 후기를 찾을 수 없습니다.</h2>
        <Link
          to={`${navPrefix}/reviews`}
          className="mt-4 inline-flex items-center gap-2 text-cyan-600 font-semibold"
        >
          <ArrowLeft className="w-4 h-4" /> 후기 목록으로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full bg-slate-50 min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-8">
        <Link
          to={`${navPrefix}/reviews`}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 mb-6 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>치료 후기 목록으로 돌아가기</span>
        </Link>

        <article className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <span className="font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded text-xs">
                {review.treatmentName}
              </span>
              <span className="text-xs font-semibold text-slate-400">#{review.seq}</span>
            </div>
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(review.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
          </div>

          <h1 className="text-2xl font-black text-slate-900 leading-snug">{review.title}</h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pb-2">
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5" />
              <span>작성자: {review.authorName}</span>
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{review.createdAt.split("T")[0]}</span>
            </span>
            <span className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" />
              <span>조회수 {review.views}</span>
            </span>
          </div>

          <div className="text-slate-700 text-sm sm:text-base leading-relaxed whitespace-pre-line pt-2">
            {review.content}
          </div>

          <div className="pt-6 border-t border-slate-100 text-[11px] text-slate-400 flex items-start gap-2 bg-slate-50 p-4 rounded-2xl">
            <ShieldCheck className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
            <p>
              본 후기는 치료를 완료한 실제 환자의 동의를 얻어 게재되었으며, 치료 경과는 환자의 연령, 기저질환, 골밀도 상태에 따라 개인차가 있을 수 있습니다.
            </p>
          </div>
        </article>
      </div>
    </div>
  );
};
