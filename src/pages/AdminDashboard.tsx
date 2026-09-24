import React, { useState } from "react";
import {
  ShieldCheck,
  Calendar,
  MessageSquare,
  Star,
  Settings,
  TrendingUp,
  Users,
  Download,
  CheckCircle,
  Clock,
  Trash2,
  Sparkles,
  Save,
  Check,
  FileSpreadsheet,
  AlertCircle,
  Phone,
} from "lucide-react";
import { useHospital } from "../context/HospitalContext";
import { QuickAppointment, Consultation, Review, HospitalInfo } from "../types/hospital";

export const AdminDashboard: React.FC = () => {
  const {
    hospitalInfo,
    updateHospitalInfo,
    quickAppointments,
    updateAppointmentStatus,
    consultations,
    answerConsultation,
    reviews,
    updateReviewStatus,
    currentUser,
    isCmsMode,
    setIsCmsMode,
  } = useHospital();

  const [activeTab, setActiveTab] = useState<
    "overview" | "appointments" | "consultations" | "reviews" | "hospitalSettings"
  >("overview");

  // Form for Hospital Settings
  const [settingsForm, setSettingsForm] = useState<HospitalInfo>({ ...hospitalInfo });
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Status Filter for Appointments
  const [appointmentFilter, setAppointmentFilter] = useState("전체");

  // Stats calculation
  const totalAppointments = quickAppointments.length;
  const newAppointments = quickAppointments.filter((a) => a.status === "신규접수").length;
  const pendingConsultations = consultations.filter((c) => c.status === "접수완료").length;
  const approvedReviews = reviews.filter((r) => r.status === "승인완료").length;

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateHospitalInfo(settingsForm);
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 3000);
  };

  const exportAppointmentsCsv = () => {
    const headers = ["ID", "성명", "연락처", "진료분야", "희망일자", "희망시간", "증상메모", "진행상태", "접수일시"];
    const rows = quickAppointments.map((a) => [
      a.id,
      a.name,
      a.phone,
      a.category,
      a.preferredDate,
      a.preferredTime,
      `"${(a.symptomDescription || "").replace(/"/g, '""')}"`,
      a.status,
      a.createdAt,
    ]);

    const csvContent = "\uFEFF" + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `삼성G정형외과_간편예약접수목록_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredAppointments = quickAppointments.filter((a) => {
    if (appointmentFilter === "전체") return true;
    return a.status === appointmentFilter;
  });

  return (
    <div className="w-full bg-slate-100 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        {/* Top Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
                <ShieldCheck className="w-6 h-6" />
              </span>
              <div>
                <h1 className="text-2xl font-black text-slate-900">삼성G정형외과 통합 관리자 CMS</h1>
                <p className="text-xs text-slate-500">
                  실시간 환자 예약 접수, 전문의 1:1 상담, 치료 후기 승인 및 SEO 메타를 일괄 관리합니다.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Live Inline CMS Switcher */}
            <button
              onClick={() => setIsCmsMode(!isCmsMode)}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition cursor-pointer shadow-sm ${
                isCmsMode
                  ? "bg-amber-400 text-slate-950 ring-4 ring-amber-200"
                  : "bg-slate-900 text-white hover:bg-slate-800"
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>{isCmsMode ? "인라인 CMS 편집 활성화됨" : "인라인 화면 편집 모드 켜기"}</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
              activeTab === "overview"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                : "bg-white text-slate-600 hover:bg-slate-200"
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>대시보드 종합</span>
          </button>

          <button
            onClick={() => setActiveTab("appointments")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
              activeTab === "appointments"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                : "bg-white text-slate-600 hover:bg-slate-200"
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>빠른예약 관리 ({newAppointments}건 대기)</span>
          </button>

          <button
            onClick={() => setActiveTab("consultations")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
              activeTab === "consultations"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                : "bg-white text-slate-600 hover:bg-slate-200"
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>전문의 상담 관리 ({pendingConsultations}건 대기)</span>
          </button>

          <button
            onClick={() => setActiveTab("reviews")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
              activeTab === "reviews"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                : "bg-white text-slate-600 hover:bg-slate-200"
            }`}
          >
            <Star className="w-4 h-4" />
            <span>치료 후기 검수</span>
          </button>

          <button
            onClick={() => setActiveTab("hospitalSettings")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
              activeTab === "hospitalSettings"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                : "bg-white text-slate-600 hover:bg-slate-200"
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>병원 정보 & SEO 설정</span>
          </button>
        </div>

        {/* 1. OVERVIEW TAB */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* KPI Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
                <span className="text-xs font-bold text-slate-400">신규 빠른예약 접수</span>
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-black text-slate-900">{newAppointments}건</span>
                  <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
                    대기중
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">총 접수 누적 {totalAppointments}건</p>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
                <span className="text-xs font-bold text-slate-400">전문의 상담 미답변</span>
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-black text-slate-900">{pendingConsultations}건</span>
                  <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                    답변요망
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">총 질문 {consultations.length}건</p>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
                <span className="text-xs font-bold text-slate-400">게시 중인 치료 후기</span>
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-black text-slate-900">{approvedReviews}건</span>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                    게시완료
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">평균 만족도 4.9점 / 5.0</p>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
                <span className="text-xs font-bold text-slate-400">일일 웹사이트 방문자</span>
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-black text-slate-900">1,482명</span>
                  <span className="text-xs font-bold text-cyan-600 bg-cyan-50 px-2 py-0.5 rounded">
                    +18.4%
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">네이버/구글 검색 유입 74%</p>
              </div>
            </div>

            {/* Weekly Appointments & Traffic Trends */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900">주간 예약 접수 및 상담 트렌드</h3>
                  <p className="text-xs text-slate-500">최근 7일간의 온라인 접수 건수 추이</p>
                </div>
                <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
                  실시간 집계 중
                </span>
              </div>

              <div className="h-48 flex items-end justify-between gap-3 pt-8 px-4 border-b border-slate-100">
                {[
                  { day: "월", count: 18, height: "65%" },
                  { day: "화", count: 24, height: "85%" },
                  { day: "수", count: 21, height: "75%" },
                  { day: "목", count: 28, height: "95%" },
                  { day: "금", count: 25, height: "90%" },
                  { day: "토", count: 15, height: "55%" },
                  { day: "일(금일)", count: 12, height: "45%" },
                ].map((bar, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                    <span className="text-xs font-bold text-slate-600">{bar.count}건</span>
                    <div
                      style={{ height: bar.height }}
                      className="w-full max-w-[48px] bg-gradient-to-t from-indigo-600 to-cyan-500 rounded-t-xl transition-all duration-500 hover:opacity-90"
                    ></div>
                    <span className="text-xs font-semibold text-slate-400">{bar.day}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 2. APPOINTMENTS TAB */}
        {activeTab === "appointments" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-slate-900">간편 빠른예약 접수 대장</h2>
                <p className="text-xs text-slate-500">
                  환자가 홈페이지에서 접수한 1분 빠른 예약 리스트입니다.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={appointmentFilter}
                  onChange={(e) => setAppointmentFilter(e.target.value)}
                  className="px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white font-bold text-slate-700"
                >
                  <option value="전체">전체 상태</option>
                  <option value="신규접수">신규접수</option>
                  <option value="상담완료">상담완료</option>
                  <option value="예약확정">예약확정</option>
                  <option value="취소">취소</option>
                </select>

                <button
                  onClick={exportAppointmentsCsv}
                  className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow transition flex items-center gap-1.5 cursor-pointer"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>엑셀(CSV) 다운로드</span>
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                    <th className="py-3 px-4">환자명</th>
                    <th className="py-3 px-4">연락처</th>
                    <th className="py-3 px-4">진료분과</th>
                    <th className="py-3 px-4">희망일시</th>
                    <th className="py-3 px-4">증상 메모</th>
                    <th className="py-3 px-4">접수시간</th>
                    <th className="py-3 px-4 text-center">상태 변경</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredAppointments.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-slate-400">
                        접수 내역이 없습니다.
                      </td>
                    </tr>
                  ) : (
                    filteredAppointments.map((app) => (
                      <tr key={app.id} className="hover:bg-slate-50 transition">
                        <td className="py-3 px-4 font-bold text-slate-900">{app.name}</td>
                        <td className="py-3 px-4 font-mono font-medium text-slate-700">
                          <a href={`tel:${app.phone}`} className="hover:text-cyan-600">
                            {app.phone}
                          </a>
                        </td>
                        <td className="py-3 px-4 font-semibold text-cyan-800">{app.category}</td>
                        <td className="py-3 px-4 text-slate-700">
                          {app.preferredDate} ({app.preferredTime})
                        </td>
                        <td className="py-3 px-4 text-slate-500 max-w-xs truncate" title={app.symptomDescription}>
                          {app.symptomDescription || "-"}
                        </td>
                        <td className="py-3 px-4 text-slate-400 text-[11px]">
                          {app.createdAt.split("T")[0]}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <select
                            value={app.status}
                            onChange={(e) =>
                              updateAppointmentStatus(
                                app.id,
                                e.target.value as "신규접수" | "상담완료" | "예약확정" | "취소"
                              )
                            }
                            className={`px-2 py-1 rounded-lg text-xs font-bold border ${
                              app.status === "신규접수"
                                ? "bg-rose-50 text-rose-700 border-rose-200"
                                : app.status === "상담완료"
                                ? "bg-amber-50 text-amber-700 border-amber-200"
                                : app.status === "예약확정"
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                : "bg-slate-50 text-slate-500 border-slate-200"
                            }`}
                          >
                            <option value="신규접수">신규접수</option>
                            <option value="상담완료">상담완료</option>
                            <option value="예약확정">예약확정</option>
                            <option value="취소">취소</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 3. CONSULTATIONS TAB */}
        {activeTab === "consultations" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div>
              <h2 className="text-xl font-black text-slate-900">전문의 1:1 온라인 상담 관리</h2>
              <p className="text-xs text-slate-500">
                환자가 등록한 질문에 대해 답변을 달고 상태를 관리합니다.
              </p>
            </div>

            <div className="space-y-4">
              {consultations.map((c) => (
                <div
                  key={c.id}
                  className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3"
                >
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded">
                        {c.category}
                      </span>
                      <span className="font-bold text-slate-800">#{c.seq}</span>
                      <span className="font-medium text-slate-500">작성자: {c.authorName}</span>
                    </div>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        c.status === "답변완료"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-amber-50 text-amber-700 border border-amber-200"
                      }`}
                    >
                      {c.status}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-sm">{c.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed bg-white p-3 rounded-xl border border-slate-200">
                    {c.content}
                  </p>

                  {c.answer && (
                    <div className="bg-cyan-50/60 p-3 rounded-xl border border-cyan-100 text-xs text-slate-800">
                      <strong className="text-cyan-900 block mb-1">
                        [기존 답변] {c.answerDoctorName}:
                      </strong>
                      {c.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. REVIEWS TAB */}
        {activeTab === "reviews" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div>
              <h2 className="text-xl font-black text-slate-900">치료 후기 승인 및 검수 관리</h2>
              <p className="text-xs text-slate-500">
                의료법 준수를 위해 승인된 후기만 홈페이지에 노출됩니다.
              </p>
            </div>

            <div className="divide-y divide-slate-100">
              {reviews.map((r) => (
                <div key={r.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1 max-w-2xl">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                        {r.treatmentName}
                      </span>
                      <span className="text-xs font-bold text-slate-900">{r.title}</span>
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-1">{r.content}</p>
                    <div className="text-[11px] text-slate-400">
                      작성자: {r.authorName} • 별점: {r.rating}점 • 일시: {r.createdAt.split("T")[0]}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <select
                      value={r.status}
                      onChange={(e) =>
                        updateReviewStatus(r.id, e.target.value as "승인대기" | "승인완료")
                      }
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border ${
                        r.status === "승인완료"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : "bg-amber-50 text-amber-700 border-amber-200"
                      }`}
                    >
                      <option value="승인완료">승인완료 (공개)</option>
                      <option value="승인대기">승인대기 (비공개)</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. HOSPITAL SETTINGS & SEO TAB */}
        {activeTab === "hospitalSettings" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-slate-900">병원 기본 정보 & SEO 메타 태그 설정</h2>
                <p className="text-xs text-slate-500">
                  네이버 서치어드바이저 및 구글봇 검색엔진 최적화(SEO)와 푸터 고지 정보를 관리합니다.
                </p>
              </div>

              {settingsSaved && (
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                  <Check className="w-4 h-4" />
                  <span>설정이 성공적으로 저장되었습니다!</span>
                </div>
              )}
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">의료기관명</label>
                  <input
                    type="text"
                    value={settingsForm.name}
                    onChange={(e) => setSettingsForm({ ...settingsForm, name: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">대표자 (병원장 성명)</label>
                  <input
                    type="text"
                    value={settingsForm.representativeName}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, representativeName: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">대표 예약 전화</label>
                  <input
                    type="text"
                    value={settingsForm.mainNumber}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, mainNumber: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">사업자등록번호</label>
                  <input
                    type="text"
                    value={settingsForm.businessNumber}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, businessNumber: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">병원 도로명 주소</label>
                <input
                  type="text"
                  value={settingsForm.footerAddress}
                  onChange={(e) =>
                    setSettingsForm({ ...settingsForm, footerAddress: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              {/* SEO Configurations */}
              <div className="pt-6 border-t border-slate-200 space-y-4">
                <h3 className="font-bold text-sm text-slate-900">
                  SEO 검색엔진 최적화 메타 설정 (네이버 & 구글)
                </h3>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    메타 타이틀 (&lt;title&gt;)
                  </label>
                  <input
                    type="text"
                    value={settingsForm.seoTitle}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, seoTitle: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    메타 디스크립션 (&lt;meta name="description"&gt;)
                  </label>
                  <textarea
                    rows={2}
                    value={settingsForm.seoDescription}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, seoDescription: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    검색 키워드 (쉼표 구분)
                  </label>
                  <input
                    type="text"
                    value={settingsForm.seoKeywords}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, seoKeywords: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>설정 저장하기</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
