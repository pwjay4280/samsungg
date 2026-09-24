import React, { useState, useEffect } from "react";
import { useSearchParams, Link, useNavigate, useLocation } from "react-router-dom";
import {
  Bell,
  MessageSquare,
  Star,
  Newspaper,
  BookOpen,
  FileCheck2,
  DollarSign,
  Search,
  Lock,
  ChevronRight,
  Eye,
  Calendar,
  ExternalLink,
  ShieldCheck,
  Download,
  AlertCircle,
} from "lucide-react";
import { useHospital } from "../context/HospitalContext";
import { useLanguage } from "../context/LanguageContext";
import {
  initialResearchActivities,
  initialCertificates,
  initialMediaArticles,
} from "../data/hospitalContentData";
import { NonCoveredFeePage } from "./NonCoveredFeePage";
import { ConsultationsPage } from "./ConsultationsPage";
import { ReviewsPage } from "./ReviewsPage";

type CsTab =
  | "notices"
  | "consultation"
  | "reviews"
  | "media"
  | "research"
  | "certificates"
  | "non-covered";

export const CustomerCenterPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = (searchParams.get("tab") as CsTab) || "notices";
  const [activeTab, setActiveTab] = useState<CsTab>(tabParam);

  const { notices, currentUser } = useHospital();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const navPrefix = language === "en" ? "/en" : "";

  // Notice modal state
  const [selectedNotice, setSelectedNotice] = useState<any | null>(null);

  useEffect(() => {
    if (
      tabParam &&
      [
        "notices",
        "consultation",
        "reviews",
        "media",
        "research",
        "certificates",
        "non-covered",
      ].includes(tabParam)
    ) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  const handleTabChange = (tab: CsTab) => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  const tabs = [
    { id: "notices", label: "공지사항", icon: Bell },
    { id: "consultation", label: "전문의 상담", icon: MessageSquare },
    { id: "reviews", label: "치료 후기", icon: Star },
    { id: "media", label: "언론보도", icon: Newspaper },
    { id: "research", label: "연구 / 학회 활동", icon: BookOpen },
    { id: "certificates", label: "증명서 발급", icon: FileCheck2 },
    { id: "non-covered", label: "비급여 안내", icon: DollarSign },
  ];

  return (
    <div className="w-full bg-slate-50 min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-cyan-700 uppercase tracking-widest bg-cyan-50 px-3 py-1 rounded-full border border-cyan-200">
            CUSTOMER CENTER
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            삼성G정형외과 고객센터
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            공지사항, 전문의 1:1 상담, 치료 후기 및 각종 원내 제증명 발급을 편리하게 이용하세요.
          </p>
        </div>

        {/* 7 Submenu Tabs */}
        <div className="flex items-center justify-center">
          <div className="bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-center gap-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id as CsTab)}
                  className={`px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    activeTab === tab.id
                      ? "bg-slate-900 text-white shadow-md shadow-slate-900/20"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 1. TAB: 공지사항 (Notices) */}
        {activeTab === "notices" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">삼성G정형외과 공지사항</h3>
                  <p className="text-xs text-slate-500">진료 일정 변경, 원내 소식 및 주요 안내사항입니다.</p>
                </div>
                <span className="text-xs font-bold text-cyan-700 bg-cyan-50 px-2.5 py-1 rounded-full">
                  총 {notices.length}건
                </span>
              </div>

              <div className="divide-y divide-slate-100">
                {notices.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => setSelectedNotice(n)}
                    className="p-5 hover:bg-slate-50/80 transition flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        {n.isImportant && (
                          <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                            중요공지
                          </span>
                        )}
                        <h4 className="text-sm font-bold text-slate-900 hover:text-cyan-600 transition">
                          {n.title}
                        </h4>
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-1">{n.content}</p>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-slate-400 shrink-0">
                      <span className="font-mono">{n.createdAt}</span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5" />
                        <span>{n.views}</span>
                      </span>
                      <ChevronRight className="w-4 h-4 text-slate-300" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Notice Detail Modal */}
            {selectedNotice && (
              <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-4 shadow-2xl animate-scaleUp">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <span className="text-xs font-bold text-cyan-700 bg-cyan-50 px-2.5 py-0.5 rounded">
                      원내 공지
                    </span>
                    <button
                      onClick={() => setSelectedNotice(null)}
                      className="text-slate-400 hover:text-slate-700 text-sm font-bold"
                    >
                      ✕ 닫기
                    </button>
                  </div>

                  <h3 className="text-lg font-black text-slate-900">{selectedNotice.title}</h3>
                  <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                    <span>작성일: {selectedNotice.createdAt}</span>
                    <span>조회수: {selectedNotice.views}</span>
                  </div>

                  <div className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl whitespace-pre-line border border-slate-100">
                    {selectedNotice.content}
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => setSelectedNotice(null)}
                      className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl"
                    >
                      확인
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 2. TAB: 전문의 상담 (Consultation) */}
        {activeTab === "consultation" && (
          <div className="animate-fadeIn">
            <ConsultationsPage />
          </div>
        )}

        {/* 3. TAB: 치료 후기 (Reviews) */}
        {activeTab === "reviews" && (
          <div className="animate-fadeIn">
            <ReviewsPage />
          </div>
        )}

        {/* 4. TAB: 언론보도 (Media) */}
        {activeTab === "media" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="border-b border-slate-200 pb-4">
              <h3 className="text-xl font-black text-slate-900">언론보도 및 언론 속 삼성G정형외과</h3>
              <p className="text-xs text-slate-500 mt-1">
                주요 일간지 및 방송 미디어에 소개된 삼성G정형외과의 앞선 치료 기술과 의료진 인터뷰입니다.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {initialMediaArticles.map((art) => (
                <div
                  key={art.id}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition"
                >
                  <div className="aspect-[16/9] bg-slate-100 overflow-hidden relative">
                    <img src={art.imageUrl} alt={art.title} className="w-full h-full object-cover" />
                    <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      {art.pressName}
                    </span>
                  </div>

                  <div className="p-6 space-y-2">
                    <span className="text-[11px] font-mono text-slate-400">{art.createdAt}</span>
                    <h4 className="text-base font-bold text-slate-900 leading-snug">{art.title}</h4>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{art.content}</p>

                    <div className="pt-3 flex items-center justify-between border-t border-slate-100">
                      <span className="text-[11px] text-slate-400 flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5" />
                        <span>{art.views}회 조회</span>
                      </span>
                      {art.articleUrl && (
                        <a
                          href={art.articleUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs font-bold text-cyan-600 hover:text-cyan-700 flex items-center gap-1"
                        >
                          <span>기사 원문 보기</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. TAB: 연구 / 학회 활동 (Research) */}
        {activeTab === "research" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="border-b border-slate-200 pb-4">
              <h3 className="text-xl font-black text-slate-900">연구 및 국내외 학회 활동</h3>
              <p className="text-xs text-slate-500 mt-1">
                끊임없이 연구하고 발전하는 의원의 정신으로 검증된 선진 치료법만을 환자에게 전합니다.
              </p>
            </div>

            <div className="space-y-4">
              {initialResearchActivities.map((res) => (
                <div
                  key={res.id}
                  className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-cyan-700 bg-cyan-50 px-2.5 py-0.5 rounded-full border border-cyan-200">
                        {res.category}
                      </span>
                      <span className="font-bold text-slate-700">{res.publication}</span>
                    </div>
                    <span className="font-mono text-slate-400">{res.date}</span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 leading-snug">{res.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    {res.description}
                  </p>

                  <div className="text-[11px] text-slate-400 font-medium">
                    연구자: {res.authors}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. TAB: 증명서 발급 (Certificates) */}
        {activeTab === "certificates" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="border-b border-slate-200 pb-4">
              <h3 className="text-xl font-black text-slate-900">증명서 발급 안내</h3>
              <p className="text-xs text-slate-500 mt-1">
                의료법 제45조 및 관련 시행규칙에 의거하여 제증명 발급 절차와 수수료를 공지합니다.
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                      <th className="py-3.5 px-4">증명서 종류</th>
                      <th className="py-3.5 px-4 text-center">발급 수수료</th>
                      <th className="py-3.5 px-4 text-center">소요 시간</th>
                      <th className="py-3.5 px-4">필요 구비 서류</th>
                      <th className="py-3.5 px-4">발급 기준 및 참고사항</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {initialCertificates.map((cert) => (
                      <tr key={cert.id} className="hover:bg-slate-50/50 transition">
                        <td className="py-3.5 px-4 font-bold text-slate-900">{cert.name}</td>
                        <td className="py-3.5 px-4 text-center font-bold text-cyan-800 font-mono">
                          {cert.fee}
                        </td>
                        <td className="py-3.5 px-4 text-center text-slate-600">{cert.period}</td>
                        <td className="py-3.5 px-4 text-slate-600">{cert.requiredDocuments}</td>
                        <td className="py-3.5 px-4 text-slate-500">{cert.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="p-4 bg-slate-100 rounded-2xl text-[11px] text-slate-500 space-y-1">
              <p>• 환자 본인 신청 시 신분증(주민등록증, 운전면허증, 여권 등)을 반드시 지참하셔야 합니다.</p>
              <p>• 대리인(가족) 신청 시 위임장, 환자 신분증 사본, 대리인 신분증, 가족관계증명서 원본(3개월 이내)이 필요합니다.</p>
            </div>
          </div>
        )}

        {/* 7. TAB: 비급여 안내 (Non-Covered) */}
        {activeTab === "non-covered" && (
          <div className="animate-fadeIn">
            <NonCoveredFeePage />
          </div>
        )}
      </div>
    </div>
  );
};
