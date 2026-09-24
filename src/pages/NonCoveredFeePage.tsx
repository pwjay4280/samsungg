import React, { useState, useEffect } from "react";
import { Search, FileText, AlertCircle } from "lucide-react";
import { NonCoveredFeeItem } from "../types/hospital";
import { initialNonCoveredFees } from "../data/mockHospitalData";

export const NonCoveredFeePage: React.FC = () => {
  const [fees, setFees] = useState<NonCoveredFeeItem[]>(initialNonCoveredFees);
  const [categoryFilter, setCategoryFilter] = useState("전체");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/non-covered-fees")
      .then((res) => res.json())
      .then((data) => setFees(data))
      .catch(() => {});
  }, []);

  const categories = ["전체", "자기공명영상진단(MRI)", "도수치료", "체외충격파치료(ESWT)", "주사치료"];

  const filtered = fees.filter((f) => {
    const matchCat = categoryFilter === "전체" || f.category === categoryFilter;
    const matchSearch =
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.code.toLowerCase().includes(search.toLowerCase()) ||
      f.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="w-full bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-cyan-700 uppercase tracking-widest bg-cyan-50 px-3 py-1 rounded-full border border-cyan-200">
            TRANSPARENCY & COMPLIANCE
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3 tracking-tight">
            비급여 진료비용 고지
          </h1>
          <p className="text-sm text-slate-500 mt-2">
            의료법 제45조 및 비급여 진료비용 등의 고지 기준에 의거하여 삼성G정형외과의 비급여 진료 항목과 비용을 투명하게 안내합니다.
          </p>
        </div>

        {/* Filter bar */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  categoryFilter === cat
                    ? "bg-cyan-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="항목명 또는 코드 검색"
              className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Fee Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                  <th className="py-3 px-4">분류</th>
                  <th className="py-3 px-4">코드</th>
                  <th className="py-3 px-4">항목명</th>
                  <th className="py-3 px-4 text-center">단위</th>
                  <th className="py-3 px-4 text-right">기준비용(원)</th>
                  <th className="py-3 px-4 text-right">최저~최고비용(원)</th>
                  <th className="py-3 px-4">세부 설명</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((item, idx) => (
                  <tr key={idx} className="hover:bg-cyan-50/30 transition">
                    <td className="py-3 px-4 font-semibold text-cyan-800">{item.category}</td>
                    <td className="py-3 px-4 text-slate-400 font-mono">{item.code}</td>
                    <td className="py-3 px-4 font-bold text-slate-800">{item.name}</td>
                    <td className="py-3 px-4 text-center text-slate-500">{item.unit}</td>
                    <td className="py-3 px-4 text-right font-black text-slate-900">
                      {item.cost.toLocaleString()}원
                    </td>
                    <td className="py-3 px-4 text-right text-slate-500">
                      {item.minCost ? `${item.minCost.toLocaleString()} ~ ${item.maxCost?.toLocaleString()}` : "-"}
                    </td>
                    <td className="py-3 px-4 text-slate-500">{item.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 p-4 bg-slate-100 rounded-2xl text-[11px] text-slate-500 space-y-1">
          <p>• 비급여 진료비용은 환자의 상태, 부위, 검사 난이도에 따라 차이가 발생할 수 있습니다.</p>
          <p>• 정확한 진료비용은 담당 의료진과의 진료 및 상담 후 안내받으실 수 있습니다.</p>
        </div>
      </div>
    </div>
  );
};
