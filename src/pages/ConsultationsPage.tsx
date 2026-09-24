import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MessageSquare,
  Search,
  Lock,
  Eye,
  CheckCircle2,
  Clock,
  PlusCircle,
  X,
  Image as ImageIcon,
  User,
} from "lucide-react";
import { useHospital } from "../context/HospitalContext";
import { useLanguage } from "../context/LanguageContext";

export const ConsultationsPage: React.FC = () => {
  const { consultations, submitConsultation, currentUser } = useHospital();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const navPrefix = language === "en" ? "/en" : "";

  const [categoryFilter, setCategoryFilter] = useState("전체");
  const [searchTerm, setSearchTerm] = useState("");
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("척추질환");
  const [authorName, setAuthorName] = useState(currentUser?.name || "");
  const [isSecret, setIsSecret] = useState(false);
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = ["전체", "척추질환", "관절질환", "도수재활", "일반문의"];

  const filtered = consultations.filter((c) => {
    const matchCat = categoryFilter === "전체" || c.category === categoryFilter;
    const matchSearch =
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || !authorName.trim()) {
      alert("제목, 내용, 작성자명을 입력해 주세요.");
      return;
    }
    if (isSecret && !password.trim()) {
      alert("비밀글 설정을 위한 비밀번호를 입력해 주세요.");
      return;
    }

    setIsSubmitting(true);
    const newCons = await submitConsultation({
      title: title.trim(),
      content: content.trim(),
      category,
      authorName: authorName.trim().length > 1 ? `${authorName[0]}*${authorName.slice(2)}` : authorName,
      authorId: currentUser?.id || "guest",
      imageUrl: imageUrl.trim() || undefined,
      isSecret,
      password: isSecret ? password.trim() : undefined,
    });

    setIsSubmitting(false);
    setIsNewModalOpen(false);
    // Reset
    setTitle("");
    setContent("");
    setPassword("");
    setImageUrl("");
    alert("전문의 온라인 상담 질문이 성공적으로 등록되었습니다. 담당 전문의가 빠른 시일 내에 답변을 작성합니다.");
    navigate(`${navPrefix}/consultation/${newCons.seq}`);
  };

  return (
    <div className="w-full bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Title Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-cyan-700 uppercase tracking-widest bg-cyan-50 px-3 py-1 rounded-full border border-cyan-200">
            ONLINE DOCTOR CONSULTATION
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3 tracking-tight">
            전문의 1:1 온라인 상담실
          </h1>
          <p className="text-sm text-slate-500 mt-2">
            증상이나 MRI 판독 소견에 대해 질문해 주시면 삼성G정형외과 전문의가 직접 의학적 답변을 드립니다.
          </p>
        </div>

        {/* Filters & Action Bar */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
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

          {/* Search and Ask Button */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="제목 또는 내용 검색"
                className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              />
            </div>

            <button
              onClick={() => setIsNewModalOpen(true)}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow transition flex items-center gap-1.5 shrink-0 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 text-cyan-400" />
              <span>질문 작성하기</span>
            </button>
          </div>
        </div>

        {/* Consultations Table / List */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-100">
          {/* Desktop Table Header */}
          <div className="hidden md:grid grid-cols-12 py-3.5 px-6 bg-slate-50 text-slate-500 font-bold text-xs border-b border-slate-200">
            <div className="col-span-1 text-center">번호</div>
            <div className="col-span-2">진료분과</div>
            <div className="col-span-5">상담 제목</div>
            <div className="col-span-2 text-center">작성자</div>
            <div className="col-span-1 text-center">조회수</div>
            <div className="col-span-1 text-center">진행상태</div>
          </div>

          {/* List Items */}
          {filtered.length === 0 ? (
            <div className="py-16 text-center text-slate-400 text-sm">
              등록된 상담 내역이 없습니다.
            </div>
          ) : (
            filtered.map((item) => (
              <Link
                key={item.id}
                to={`${navPrefix}/consultation/${item.seq}`}
                className="block md:grid grid-cols-12 py-4 px-6 hover:bg-cyan-50/40 transition items-center text-xs"
              >
                <div className="hidden md:block col-span-1 text-center text-slate-400 font-semibold">
                  #{item.seq}
                </div>
                <div className="col-span-2 mb-1 md:mb-0">
                  <span className="font-bold text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded text-[11px]">
                    {item.category}
                  </span>
                </div>
                <div className="col-span-5 mb-2 md:mb-0">
                  <div className="flex items-center gap-2">
                    {item.isSecret && <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />}
                    <span className="font-bold text-slate-800 hover:text-cyan-600 text-sm line-clamp-1">
                      {item.title}
                    </span>
                    {item.imageUrl && (
                      <span title="사진 첨부">
                        <ImageIcon className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      </span>
                    )}
                  </div>
                  <p className="text-slate-400 text-[11px] line-clamp-1 mt-0.5 md:hidden">
                    {item.content}
                  </p>
                </div>
                <div className="col-span-2 text-left md:text-center text-slate-500">
                  <span>작성자: {item.authorName}</span>
                </div>
                <div className="col-span-1 text-left md:text-center text-slate-400 flex items-center md:justify-center gap-1">
                  <Eye className="w-3 h-3" />
                  <span>{item.views}</span>
                </div>
                <div className="col-span-1 text-left md:text-center mt-2 md:mt-0">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      item.status === "답변완료"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-amber-50 text-amber-700 border border-amber-200"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>

      {/* New Consultation Modal */}
      {isNewModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-lg w-full p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsNewModalOpen(false)}
              className="absolute top-5 right-5 p-1.5 text-slate-400 hover:text-slate-700 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-black text-slate-900 mb-1">전문의 1:1 온라인 상담 작성</h3>
            <p className="text-xs text-slate-500 mb-5">
              궁금하신 척추·관절 증상이나 치료법을 적어주시면 전문의가 직접 답변합니다.
            </p>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">상담 분과</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:outline-none bg-white font-medium"
                >
                  <option value="척추질환">척추질환 (디스크, 협착증, 척추내시경)</option>
                  <option value="관절질환">관절질환 (무릎인공관절, 어깨관절경, 퇴행성)</option>
                  <option value="도수재활">도수재활 (체형교정, 비수술 물리재활)</option>
                  <option value="일반문의">일반문의 (비용, 일정, 예약)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">작성자명</label>
                <input
                  type="text"
                  required
                  placeholder="홍길동"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">질문 제목</label>
                <input
                  type="text"
                  required
                  placeholder="예: 4-5번 디스크 파열 진단 후 내시경 시술 문의드립니다."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">상담 상세 내용</label>
                <textarea
                  rows={4}
                  required
                  placeholder="증상 발현 시기, 통증 부위, 타 병원 치료 이력 등을 상세히 작성해 주시면 더욱 정확한 진료 답변이 가능합니다."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  첨부 이미지 URL (X-ray / MRI 사진 등)
                </label>
                <input
                  type="text"
                  placeholder="https://..."
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                />
              </div>

              {/* Secret post checkbox & password */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
                  <input
                    type="checkbox"
                    checked={isSecret}
                    onChange={(e) => setIsSecret(e.target.checked)}
                    className="rounded text-cyan-600 focus:ring-cyan-500"
                  />
                  <span>비밀글로 등록 (본인과 의료진만 열람 가능)</span>
                </label>
                {isSecret && (
                  <input
                    type="password"
                    required
                    placeholder="조회용 4자리 숫자 비밀번호"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:outline-none bg-white"
                  />
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs rounded-xl shadow transition cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? "상담 등록 중..." : "상담 등록하기"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
