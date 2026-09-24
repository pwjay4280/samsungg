import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  Star,
  ShieldCheck,
  Lock,
  PlusCircle,
  AlertCircle,
  Eye,
  CheckCircle,
  User,
  Clock,
  Sparkles,
  X,
} from "lucide-react";
import { useHospital } from "../context/HospitalContext";
import { useLanguage } from "../context/LanguageContext";

export const ReviewsPage: React.FC = () => {
  const { reviews, currentUser, submitReview } = useHospital();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const navPrefix = language === "en" ? "/en" : "";

  const [categoryFilter, setCategoryFilter] = useState("전체");
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);

  // Write form state
  const [title, setTitle] = useState("");
  const [treatmentName, setTreatmentName] = useState("양방향 척추내시경술 (UBE)");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(5);
  const [category, setCategory] = useState("척추센터");

  const categories = ["전체", "척추센터", "관절센터", "도수재활센터"];

  const filtered = reviews.filter((r) => {
    if (r.status !== "승인완료" && currentUser?.role !== "admin") return false;
    if (categoryFilter === "전체") return true;
    return r.category === categoryFilter;
  });

  const handleReviewClick = (seq: number) => {
    // Medical Law Compliance: Non-authenticated users must log in first!
    if (!currentUser) {
      alert("의료법 제56조(의료광고 금지 및 이용자 보호)에 의거하여, 치료 후기 열람은 본인 확인 및 회원 로그인 후 열람하실 수 있습니다. 로그인 페이지로 이동합니다.");
      navigate(`${navPrefix}/login`, {
        state: { returnTo: `${navPrefix}/reviews/${seq}` },
      });
      return;
    }

    navigate(`${navPrefix}/reviews/${seq}`);
  };

  const handleCreateReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      alert("치료 후기 작성은 회원 로그인 후 가능합니다.");
      navigate(`${navPrefix}/login`, {
        state: { returnTo: location.pathname },
      });
      return;
    }

    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 입력해 주세요.");
      return;
    }

    const maskedName =
      currentUser.name.length > 2
        ? `${currentUser.name[0]}*${currentUser.name.slice(2)}`
        : `${currentUser.name[0]}*`;

    await submitReview({
      title: title.trim(),
      treatmentName,
      content: content.trim(),
      authorName: maskedName,
      authorId: currentUser.id,
      rating,
      category,
      status: "승인완료",
    });

    setIsWriteModalOpen(false);
    setTitle("");
    setContent("");
    alert("소중한 치료 후기가 성공적으로 등록되었습니다.");
  };

  return (
    <div className="w-full bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Title Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-cyan-700 uppercase tracking-widest bg-cyan-50 px-3 py-1 rounded-full border border-cyan-200">
            REAL PATIENT REVIEWS
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3 tracking-tight">
            환자 생생 치료 후기
          </h1>
          <p className="text-sm text-slate-500 mt-2">
            삼성G정형외과에서 척추·관절 치료를 받고 건강한 일상을 되찾으신 환자분들의 자발적인 리얼 치료 후기입니다.
          </p>

          {/* Legal Compliance Banner */}
          <div className="mt-4 p-3 bg-amber-50/70 border border-amber-200 rounded-2xl flex items-center justify-center gap-2 text-xs text-amber-800">
            <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              [의료법 제56조 준수] 치료 후기는 비회원 열람이 제한되며, 로그인 후 안전하게 전체 열람하실 수 있습니다.
            </span>
          </div>
        </div>

        {/* Filter Bar & Action */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  categoryFilter === cat
                    ? "bg-cyan-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              if (!currentUser) {
                alert("치료 후기 작성은 로그인 후 가능합니다.");
                navigate(`${navPrefix}/login`, { state: { returnTo: location.pathname } });
              } else {
                setIsWriteModalOpen(true);
              }
            }}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow transition flex items-center gap-1.5 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4 text-cyan-400" />
            <span>치료 후기 작성하기</span>
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => handleReviewClick(item.seq)}
              className="group bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:border-cyan-400 hover:shadow-lg transition cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-cyan-700 bg-cyan-50 px-2.5 py-0.5 rounded-md">
                    {item.treatmentName}
                  </span>
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-cyan-600 transition line-clamp-2">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                  {item.content}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" />
                  <span>환자: {item.authorName}</span>
                </div>

                {!currentUser ? (
                  <span className="flex items-center gap-1 text-[11px] text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded">
                    <Lock className="w-3 h-3" /> 로그인 후 열람
                  </span>
                ) : (
                  <span className="text-cyan-600 font-bold flex items-center gap-1">
                    <span>전체 열람</span>
                    <Eye className="w-3 h-3" />
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Write Review Modal */}
      {isWriteModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-lg w-full p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsWriteModalOpen(false)}
              className="absolute top-5 right-5 p-1.5 text-slate-400 hover:text-slate-700 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-black text-slate-900 mb-1">치료 후기 작성</h3>
            <p className="text-xs text-slate-500 mb-4">
              치료 경험을 솔직하게 나눠주세요. 작성자명은 개인정보 보호를 위해 자동 마스킹 처리됩니다.
            </p>

            <form onSubmit={handleCreateReview} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">진료 센터</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                  >
                    <option value="척추센터">척추센터</option>
                    <option value="관절센터">관절센터</option>
                    <option value="도수재활센터">도수재활센터</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">별점 만족도</label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-cyan-500 focus:outline-none font-bold text-amber-500"
                  >
                    <option value={5}>★★★★★ (5점 매우만족)</option>
                    <option value={4}>★★★★☆ (4점 만족)</option>
                    <option value={3}>★★★☆☆ (3점 보통)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">시술 / 수술명</label>
                <input
                  type="text"
                  required
                  placeholder="예: 양방향 척추내시경술 (UBE), 마코 로봇인공관절"
                  value={treatmentName}
                  onChange={(e) => setTreatmentName(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">후기 제목</label>
                <input
                  type="text"
                  required
                  placeholder="예: 지옥 같던 다리 저림이 내시경 수술 후 씻은 듯이 사라졌습니다."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">후기 본문 내용</label>
                <textarea
                  rows={5}
                  required
                  placeholder="치료 전 증상, 시술 과정, 수술 후 회복 상태 및 의료진 소감 등을 자유롭게 적어주세요."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                />
              </div>

              <div className="text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-xl">
                작성자명: <strong>{currentUser?.name}</strong> (게시 시 자동으로 성*명 형태로 안전 마스킹됩니다)
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs rounded-xl shadow transition cursor-pointer"
              >
                후기 등록하기
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
