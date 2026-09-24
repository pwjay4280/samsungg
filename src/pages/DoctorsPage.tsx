import React, { useState } from "react";
import {
  Calendar,
  Phone,
  Award,
  BookOpen,
  Clock,
  Check,
  X,
  MessageSquare,
  ChevronRight,
} from "lucide-react";
import { useHospital } from "../context/HospitalContext";
import { useLanguage } from "../context/LanguageContext";

export const DoctorsPage: React.FC = () => {
  const { doctors, openAppointmentModal } = useHospital();
  const { language } = useLanguage();
  const navPrefix = language === "en" ? "/en" : "";

  const [selectedDoctorId, setSelectedDoctorId] = useState<string>(doctors[0]?.id || "");

  const selectedDoctor = doctors.find((d) => d.id === selectedDoctorId) || doctors[0];

  const days: { key: "mon" | "tue" | "wed" | "thu" | "fri" | "sat"; label: string }[] = [
    { key: "mon", label: "월" },
    { key: "tue", label: "화" },
    { key: "wed", label: "수" },
    { key: "thu", label: "목" },
    { key: "fri", label: "금" },
    { key: "sat", label: "토" },
  ];

  return (
    <div className="w-full bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-cyan-700 uppercase tracking-widest bg-cyan-50 px-3 py-1 rounded-full border border-cyan-200">
            MEDICAL STAFF
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3 tracking-tight">
            삼성G정형외과 전문 의료진 소개
          </h1>
          <p className="text-sm text-slate-500 mt-2">
            서울대·삼성서울병원·세브란스 출신의 풍부한 수술 임상 경험과 학술 연구력을 바탕으로 환자 한 분 한 분을 정성껏 진료합니다.
          </p>
        </div>

        {/* Doctor Profiles List */}
        <div className="space-y-16">
          {doctors.map((doc) => (
            <div
              key={doc.id}
              id={doc.id}
              className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden p-6 sm:p-10"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                {/* Left: Doctor Photo */}
                <div className="lg:col-span-4 space-y-4">
                  <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-slate-100 shadow-md">
                    <img
                      src={doc.imageUrl}
                      alt={doc.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-center space-y-1">
                    <span className="text-xs font-bold text-cyan-600 bg-cyan-50 px-2.5 py-0.5 rounded-full">
                      {doc.title}
                    </span>
                    <h2 className="text-2xl font-black text-slate-900">{doc.name} 원장</h2>
                    <p className="text-xs text-slate-500 font-medium">{doc.specialty}</p>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={openAppointmentModal}
                      className="flex-1 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs rounded-xl shadow transition cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>원장 진료 예약</span>
                    </button>
                    <a
                      href={`tel:1588-7520`}
                      className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition flex items-center justify-center"
                    >
                      <Phone className="w-4 h-4 text-cyan-600" />
                    </a>
                  </div>
                </div>

                {/* Right: History, Treatise & Weekly Schedule */}
                <div className="lg:col-span-8 space-y-8">
                  {/* Specialty */}
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                      전문 진료 분야
                    </h3>
                    <p className="text-sm font-bold text-slate-900">{doc.specialty}</p>
                  </div>

                  {/* History */}
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-3">
                      <Award className="w-4 h-4 text-cyan-600" />
                      <span>주요 약력 및 학회 활동</span>
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 leading-relaxed">
                      {doc.history.map((h, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shrink-0 mt-1.5"></span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Treatise */}
                  {doc.treatise && doc.treatise.length > 0 && (
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-3">
                        <BookOpen className="w-4 h-4 text-cyan-600" />
                        <span>주요 학술 연구 및 논문 (SCI/KCI)</span>
                      </h3>
                      <ul className="space-y-1.5 text-xs text-slate-500">
                        {doc.treatise.map((t, i) => (
                          <li key={i} className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Weekly Clinic Timetable */}
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-3">
                      <Clock className="w-4 h-4 text-cyan-600" />
                      <span>주간 외래 진료 일정표</span>
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-center text-xs border border-slate-200 rounded-xl overflow-hidden">
                        <thead>
                          <tr className="bg-slate-100 text-slate-600">
                            <th className="py-2.5 px-3 border-b border-slate-200">구분</th>
                            {days.map((d) => (
                              <th key={d.key} className="py-2.5 px-3 border-b border-slate-200">
                                {d.label}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          <tr>
                            <td className="py-3 px-3 font-bold text-slate-700 bg-slate-50">
                              오전 (09:00~13:00)
                            </td>
                            {days.map((d) => {
                              const isAvail = doc.schedule[d.key]?.am;
                              return (
                                <td key={d.key} className="py-3 px-3">
                                  {isAvail ? (
                                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-cyan-100 text-cyan-800 font-bold">
                                      진료
                                    </span>
                                  ) : (
                                    <span className="text-slate-300 font-bold">-</span>
                                  )}
                                </td>
                              );
                            })}
                          </tr>
                          <tr>
                            <td className="py-3 px-3 font-bold text-slate-700 bg-slate-50">
                              오후 (14:00~18:00)
                            </td>
                            {days.map((d) => {
                              const isAvail = doc.schedule[d.key]?.pm;
                              return (
                                <td key={d.key} className="py-3 px-3">
                                  {isAvail ? (
                                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-blue-100 text-blue-800 font-bold">
                                      진료
                                    </span>
                                  ) : (
                                    <span className="text-slate-300 font-bold">-</span>
                                  )}
                                </td>
                              );
                            })}
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-2">
                      * 응급 수술 및 학회 일정에 따라 진료 일정이 사전 고지 없이 변경될 수 있으니 대표전화(1588-7520)로 사전 확인 바랍니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
