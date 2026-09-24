import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HospitalProvider } from "./context/HospitalContext";
import { LanguageProvider, useLanguage } from "./context/LanguageContext";
import { Navbar } from "./components/common/Navbar";
import { Footer } from "./components/common/Footer";
import { QuickAppointmentModal } from "./components/common/QuickAppointmentModal";
import { LayerPopup } from "./components/common/LayerPopup";
import { HomePage } from "./pages/HomePage";
import { CenterSubpage } from "./pages/CenterSubpage";
import { DoctorsPage } from "./pages/DoctorsPage";
import { ConsultationsPage } from "./pages/ConsultationsPage";
import { ConsultationDetailPage } from "./pages/ConsultationDetailPage";
import { ReviewsPage } from "./pages/ReviewsPage";
import { ReviewDetailPage } from "./pages/ReviewDetailPage";
import { AboutHospitalLayout } from "./pages/AboutHospitalLayout";
import { SpecialSystemPage } from "./pages/SpecialSystemPage";
import { DiseaseDetailPage } from "./pages/DiseaseDetailPage";
import { CustomerCenterPage } from "./pages/CustomerCenterPage";
import { NonCoveredFeePage } from "./pages/NonCoveredFeePage";
import { LoginPage } from "./pages/LoginPage";
import { AdminDashboard } from "./pages/AdminDashboard";

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Language route synchronizer
function LanguageSync() {
  const { pathname } = useLocation();
  const { setLanguage } = useLanguage();

  useEffect(() => {
    if (pathname.startsWith("/en")) {
      setLanguage("en");
    } else {
      setLanguage("ko");
    }
  }, [pathname, setLanguage]);

  return null;
}

function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans antialiased selection:bg-cyan-500 selection:text-white">
      <ScrollToTop />
      <LanguageSync />
      <Navbar />

      <div className="flex-1">
        <Routes>
          {/* Korean Routes */}
          <Route path="/" element={<HomePage />} />

          {/* 1 Depth: 병원소개 */}
          <Route path="/about" element={<AboutHospitalLayout />} />
          <Route path="/about/:tab" element={<AboutHospitalLayout />} />
          <Route path="/location" element={<AboutHospitalLayout />} />

          {/* 1 Depth: 특화 진료시스템 (진료실 완결형, 낮병동 운영) */}
          <Route path="/system/:type" element={<SpecialSystemPage />} />

          {/* 1 Depth: 질환별 진료센터 (무릎, 어깨, 허리) */}
          <Route path="/knee" element={<DiseaseDetailPage forcedCategory="knee" />} />
          <Route path="/knee/:slug" element={<DiseaseDetailPage forcedCategory="knee" />} />

          <Route path="/shoulder" element={<DiseaseDetailPage forcedCategory="shoulder" />} />
          <Route path="/shoulder/:slug" element={<DiseaseDetailPage forcedCategory="shoulder" />} />

          <Route path="/spine" element={<DiseaseDetailPage forcedCategory="spine" />} />
          <Route path="/spine/:slug" element={<DiseaseDetailPage forcedCategory="spine" />} />
          <Route path="/back/:slug" element={<DiseaseDetailPage forcedCategory="spine" />} />

          {/* 1 Depth: 고객센터 */}
          <Route path="/cs" element={<CustomerCenterPage />} />
          <Route path="/cs/:tab" element={<CustomerCenterPage />} />

          {/* Existing direct URLs & Legacy compatibility */}
          <Route path="/centers/*" element={<CenterSubpage />} />
          <Route path="/doctors" element={<DoctorsPage />} />
          <Route path="/consultation" element={<ConsultationsPage />} />
          <Route path="/consultation/:seq" element={<ConsultationDetailPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/reviews/:seq" element={<ReviewDetailPage />} />
          <Route path="/non-covered" element={<NonCoveredFeePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminDashboard />} />

          {/* English Routes (/en) */}
          <Route path="/en" element={<HomePage />} />
          <Route path="/en/about" element={<AboutHospitalLayout />} />
          <Route path="/en/about/:tab" element={<AboutHospitalLayout />} />
          <Route path="/en/system/:type" element={<SpecialSystemPage />} />
          <Route path="/en/knee" element={<DiseaseDetailPage forcedCategory="knee" />} />
          <Route path="/en/knee/:slug" element={<DiseaseDetailPage forcedCategory="knee" />} />
          <Route path="/en/shoulder" element={<DiseaseDetailPage forcedCategory="shoulder" />} />
          <Route path="/en/shoulder/:slug" element={<DiseaseDetailPage forcedCategory="shoulder" />} />
          <Route path="/en/spine" element={<DiseaseDetailPage forcedCategory="spine" />} />
          <Route path="/en/spine/:slug" element={<DiseaseDetailPage forcedCategory="spine" />} />
          <Route path="/en/cs" element={<CustomerCenterPage />} />
          <Route path="/en/cs/:tab" element={<CustomerCenterPage />} />
          <Route path="/en/centers/*" element={<CenterSubpage />} />
          <Route path="/en/doctors" element={<DoctorsPage />} />
          <Route path="/en/consultation" element={<ConsultationsPage />} />
          <Route path="/en/consultation/:seq" element={<ConsultationDetailPage />} />
          <Route path="/en/reviews" element={<ReviewsPage />} />
          <Route path="/en/reviews/:seq" element={<ReviewDetailPage />} />
          <Route path="/en/non-covered" element={<NonCoveredFeePage />} />
          <Route path="/en/location" element={<AboutHospitalLayout />} />
          <Route path="/en/login" element={<LoginPage />} />
          <Route path="/en/admin" element={<AdminDashboard />} />

          {/* Catch-all */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </div>

      <Footer />
      <QuickAppointmentModal />
      <LayerPopup />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <HospitalProvider>
          <MainLayout />
        </HospitalProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}
