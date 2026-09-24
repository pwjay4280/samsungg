import React from "react";
import { useParams, Link } from "react-router-dom";
import {
  Stethoscope,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Phone,
  ArrowRight,
  Sparkles,
  Bed,
} from "lucide-react";
import { useHospital } from "../context/HospitalContext";
import { useLanguage } from "../context/LanguageContext";
import { oneStopSystemData, dayHospitalData } from "../data/hospitalContentData";

export const SpecialSystemPage: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  const { openAppointmentModal } = useHospital();
  const { language } = useLanguage();
  const navPrefix = language === "en" ? "/en" : "";

  const isOneStop = type === "one-stop" || !type;
  const data = isOneStop ? oneStopSystemData : dayHospitalData;

  return (
    <div className="w-full bg-slate-50 min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        {/* Sub Navigation Switcher */}
        <div className="flex items-center justify-center">
          <div className="bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-1">
            <Link
              to={`${navPrefix}/system/one-stop`}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
                isOneStop
                  ? "bg-cyan-600 text-white shadow-md shadow-cyan-600/20"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <Stethoscope className="w-4 h-4" />
              <span>진료실 완결형 시스템</span>
            </Link>

            <Link
              to={`${navPrefix}/system/day-hospital`}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
                !isOneStop
                  ? "bg-cyan-600 text-white shadow-md shadow-cyan-600/20"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <Bed className="w-4 h-4" />
              <span>낮병동 운영 (당일 입퇴원)</span>
            </Link>
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-950 text-white rounded-3xl p-8 sm:p-14 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="max-w-3xl space-y-4 relative z-10">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest bg-cyan-950 px-3 py-1 rounded-full border border-cyan-800">
              SPECIAL MEDICAL SYSTEM
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              {data.title}
            </h1>
            <p className="text-cyan-200 text-sm sm:text-base font-semibold">
              {data.subtitle}
            </p>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed whitespace-pre-line pt-2">
              {data.coreConcept}
            </p>
          </div>
        </div>

        {/* Core Benefits */}
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">KEY ADVANTAGES</span>
            <h2 className="text-2xl font-black text-slate-900 mt-1">시스템 특장점 및 환자 혜택</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.benefits.map((ben, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-3"
              >
                <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center font-black text-lg">
                  0{idx + 1}
                </div>
                <h3 className="font-bold text-slate-900 text-base">{ben.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{ben.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Detail Workflow or Procedure List */}
        {isOneStop && oneStopSystemData.flow && (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-8">
            <div className="max-w-2xl">
              <span className="text-xs font-bold text-cyan-600 bg-cyan-50 px-2.5 py-0.5 rounded">
                ONE-STOP WORKFLOW
              </span>
              <h2 className="text-2xl font-black text-slate-900 mt-2">
                진료실 완결형 원스톱 진료 프로세스
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                접수부터 처치까지 진료실 안에서 연속성 있게 종결됩니다.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {oneStopSystemData.flow.map((fl, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 relative"
                >
                  <span className="text-2xl font-black text-cyan-600">{fl.step}</span>
                  <h4 className="font-bold text-slate-900 text-sm">{fl.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{fl.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {!isOneStop && dayHospitalData.targetProcedures && (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-6">
            <div className="max-w-2xl">
              <span className="text-xs font-bold text-cyan-600 bg-cyan-50 px-2.5 py-0.5 rounded">
                TARGET PROCEDURES
              </span>
              <h2 className="text-2xl font-black text-slate-900 mt-2">
                낮병동 당일 시술 대상 항목
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                당일 시술 및 당일 퇴원이 가능한 최소침습 수술에 대해 6시간 낮병동을 활용합니다.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {dayHospitalData.targetProcedures.map((item, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-cyan-600 shrink-0" />
                  <span className="font-bold text-slate-900 text-xs sm:text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action CTA */}
        <div className="bg-cyan-50 rounded-3xl p-8 text-center border border-cyan-200 space-y-4">
          <h3 className="text-xl font-bold text-slate-900">
            빠르고 정확한 맞춤 진료를 원하시나요?
          </h3>
          <p className="text-xs text-slate-600">
            대표번호 1588-7520 또는 온라인 간편 빠른예약을 통해 대기 없이 상담받으실 수 있습니다.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={openAppointmentModal}
              className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs rounded-xl shadow transition cursor-pointer flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>간편 빠른예약 신청</span>
            </button>
            <a
              href="tel:1588-7520"
              className="px-6 py-3 bg-white hover:bg-slate-100 text-slate-800 font-bold text-xs rounded-xl border border-slate-200 shadow-sm transition flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>전화 예약 1588-7520</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
