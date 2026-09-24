import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Activity,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Calendar,
  Phone,
  ArrowRight,
  ShieldCheck,
  Stethoscope,
  Sparkles,
} from "lucide-react";
import { useHospital } from "../context/HospitalContext";
import { useLanguage } from "../context/LanguageContext";
import { diseaseItems, DiseaseItem } from "../data/hospitalContentData";

interface DiseaseDetailPageProps {
  forcedCategory?: "knee" | "shoulder" | "spine";
}

export const DiseaseDetailPage: React.FC<DiseaseDetailPageProps> = ({ forcedCategory }) => {
  const params = useParams<{ category?: string; slug?: string }>();
  const { openAppointmentModal } = useHospital();
  const { language } = useLanguage();
  const navPrefix = language === "en" ? "/en" : "";

  const categorySlug = forcedCategory || (params.category === "back" ? "spine" : (params.category as "knee" | "shoulder" | "spine") || "knee");
  const slug = params.slug;

  const categoryItems = diseaseItems.filter((d) => d.categorySlug === categorySlug);
  const currentItem = slug
    ? categoryItems.find((d) => d.slug === slug) || categoryItems[0]
    : categoryItems[0];

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const categoryNames = {
    knee: "무릎 진료센터",
    shoulder: "어깨 진료센터",
    spine: "허리·척추 진료센터",
  };

  return (
    <div className="w-full bg-slate-50 min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        {/* Category Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-cyan-700 uppercase tracking-widest bg-cyan-50 px-3 py-1 rounded-full border border-cyan-200">
            {categorySlug.toUpperCase()} CLINIC
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            삼성G정형외과 {categoryNames[categorySlug]}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            정확한 3.0T MRI 영상 판독과 단계별 비수술·최소침습 수술 솔루션을 제공합니다.
          </p>
        </div>

        {/* 2-Depth Disease Selection Tabs */}
        <div className="flex items-center justify-center">
          <div className="bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-center gap-1">
            {categoryItems.map((item) => (
              <Link
                key={item.id}
                to={`${navPrefix}/${categorySlug}/${item.slug}`}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition ${
                  currentItem.slug === item.slug
                    ? "bg-cyan-600 text-white shadow-md shadow-cyan-600/20"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl space-y-4 relative z-10">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest bg-cyan-950 px-3 py-1 rounded-full border border-cyan-800">
              {currentItem.enName}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
              {currentItem.name}
            </h2>
            <p className="text-cyan-200 text-sm sm:text-base font-medium">
              {currentItem.subtitle}
            </p>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed whitespace-pre-line pt-2">
              {currentItem.summary}
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={openAppointmentModal}
                className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-xs rounded-xl shadow transition cursor-pointer flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>이 질환 진료 빠른예약</span>
              </button>
              <Link
                to={`${navPrefix}/consultation`}
                className="px-5 py-2.5 bg-slate-800/80 hover:bg-slate-700 text-cyan-300 font-bold text-xs rounded-xl border border-cyan-800 transition flex items-center gap-2"
              >
                <span>전문의 1:1 온라인 상담</span>
              </Link>
            </div>
          </div>

          <div className="w-full lg:w-80 aspect-[4/3] rounded-2xl overflow-hidden border-2 border-slate-700 shadow-lg shrink-0">
            <img
              src={currentItem.imageUrl}
              alt={currentItem.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* 1. Symptoms & Causes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Symptoms Checklist */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">주요 의심 증상 체크리스트</h3>
                <p className="text-xs text-slate-500">다음 중 2개 이상 해당된다면 전문의 진단이 필요합니다.</p>
              </div>
            </div>

            <ul className="space-y-3 text-xs sm:text-sm">
              {currentItem.symptoms.map((sym, idx) => (
                <li key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <CheckCircle2 className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span className="text-slate-800 font-medium leading-relaxed">{sym}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Causes & Diagnosis */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
                <Stethoscope className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">발병 원인 및 정밀 진단 프로세스</h3>
                <p className="text-xs text-slate-500">원인에 따른 대학병원급 정밀 검사를 시행합니다.</p>
              </div>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <span className="font-bold text-slate-700 block mb-2">주요 원인</span>
                <ul className="space-y-1.5 pl-2">
                  {currentItem.causes.map((c, i) => (
                    <li key={i} className="flex items-center gap-2 text-slate-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-600"></span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <span className="font-bold text-slate-700 block mb-2">정밀 진단 장비</span>
                <div className="flex flex-wrap gap-2">
                  {currentItem.diagnosis.map((d, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-xl bg-cyan-50 text-cyan-800 font-semibold border border-cyan-200"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Treatments: Non-Surgical vs Minimally Invasive */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-8">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-cyan-600 bg-cyan-50 px-2.5 py-0.5 rounded">
              TREATMENT SOLUTIONS
            </span>
            <h3 className="text-2xl font-black text-slate-900 mt-2">
              삼성G정형외과 맞춤형 치료 솔루션
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              비수술 치료를 우선하며, 수술이 불가피한 경우 정상 조직을 보존하는 최소침습을 시행합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Non-Surgical Plan */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-cyan-100 pb-3">
                <span className="text-xs font-bold text-cyan-700 bg-cyan-100 px-2.5 py-1 rounded-lg">
                  STEP 01
                </span>
                <h4 className="font-bold text-slate-900 text-base">보존적 비수술 집중 치료</h4>
              </div>

              <div className="space-y-3">
                {currentItem.nonSurgicalTreatments.map((tr, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-cyan-50/50 border border-cyan-100 space-y-1">
                    <h5 className="font-bold text-cyan-950 text-xs sm:text-sm">{tr.title}</h5>
                    <p className="text-xs text-slate-600 leading-relaxed">{tr.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Surgical Plan */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-indigo-100 pb-3">
                <span className="text-xs font-bold text-indigo-700 bg-indigo-100 px-2.5 py-1 rounded-lg">
                  STEP 02
                </span>
                <h4 className="font-bold text-slate-900 text-base">최소침습 정밀 수술 치료</h4>
              </div>

              {currentItem.surgicalTreatments.length === 0 ? (
                <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 text-center text-xs text-slate-500">
                  해당 질환은 100% 비수술 보존 치료 및 도수재활로 완치가 가능하여 수술이 필요하지 않습니다.
                </div>
              ) : (
                <div className="space-y-3">
                  {currentItem.surgicalTreatments.map((tr, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100 space-y-1">
                      <h5 className="font-bold text-indigo-950 text-xs sm:text-sm">{tr.title}</h5>
                      <p className="text-xs text-slate-600 leading-relaxed">{tr.desc}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 3. Prevention & FAQ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Prevention */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <h4 className="font-bold text-slate-900 text-base">예방 및 재발 방지 생활수칙</h4>
            <ul className="space-y-2.5 text-xs text-slate-600">
              {currentItem.prevention.map((prev, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{prev}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* FAQ Accordion */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h4 className="font-bold text-slate-900 text-base">자주 묻는 질문 (FAQ)</h4>
            <div className="space-y-2">
              {currentItem.faqs.map((faq, idx) => (
                <div key={idx} className="border border-slate-100 rounded-2xl overflow-hidden">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-4 text-left flex items-center justify-between gap-2 hover:bg-slate-50 transition cursor-pointer"
                  >
                    <span className="font-bold text-xs sm:text-sm text-slate-800 flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-cyan-600 shrink-0" />
                      <span>{faq.q}</span>
                    </span>
                    {openFaqIndex === idx ? (
                      <ChevronUp className="w-4 h-4 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    )}
                  </button>
                  {openFaqIndex === idx && (
                    <div className="p-4 pt-0 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA Banner (Retaining Quick Appointment) */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 text-center space-y-4">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest bg-cyan-950 px-3 py-1 rounded-full border border-cyan-800">
            1-MINUTE QUICK APPOINTMENT
          </span>
          <h3 className="text-2xl sm:text-3xl font-black">
            {currentItem.name}, 더 이상 참지 마시고 전문의와 상의하세요
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            1분 간편 빠른예약 접수 시 전담 상담 간호사가 연락드려 가장 빠른 진료 일정을 조율해 드립니다.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={openAppointmentModal}
              className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-xs rounded-xl shadow-lg shadow-cyan-500/25 transition cursor-pointer flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>간편 빠른예약 신청</span>
            </button>
            <a
              href="tel:1588-7520"
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl border border-slate-700 transition flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>대표전화 1588-7520</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
