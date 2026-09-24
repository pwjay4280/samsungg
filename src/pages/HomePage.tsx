import React, { useEffect, useRef, useState } from "react";
import { useHospital } from "../context/HospitalContext";

interface LightboxState {
  isOpen: boolean;
  src: string;
  alt: string;
}

export const HomePage: React.FC = () => {
  const { openAppointmentModal } = useHospital();

  // 1. Hero text swap state
  const [heroSwapped, setHeroSwapped] = useState(false);
  const heroTransitionLocked = useRef(false);
  const heroRef = useRef<HTMLElement | null>(null);

  // 2. Focus Transition stage animation
  const focusTransitionRef = useRef<HTMLDivElement | null>(null);
  const focusStageRef = useRef<HTMLDivElement | null>(null);

  // 3. Space Photo Cloud & Lightbox state
  const spaceSectionRef = useRef<HTMLElement | null>(null);
  const [lightbox, setLightbox] = useState<LightboxState>({
    isOpen: false,
    src: "",
    alt: "",
  });

  // Clamp helper
  const clamp = (value: number, min = 0, max = 1) => Math.min(Math.max(value, min), max);

  useEffect(() => {
    // Reveal observer for elements with .reveal class
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    const revealElements = document.querySelectorAll(".reveal");
    revealElements.forEach((el) => observer.observe(el));

    // Focus Transition scroll update
    let animationFrame = 0;
    const updateFocusTransition = () => {
      animationFrame = 0;
      if (!focusTransitionRef.current || !focusStageRef.current) return;

      const bounds = focusTransitionRef.current.getBoundingClientRect();
      const scrollRange = Math.max(bounds.height - window.innerHeight, 1);
      const progress = clamp(-bounds.top / scrollRange);
      const expansion = clamp(progress / 0.62);
      const easedExpansion = 1 - Math.pow(1 - expansion, 3);
      const viewportWidth = document.documentElement.clientWidth;
      const compact = window.innerWidth <= 900;
      const narrow = window.innerWidth <= 560;

      const startWidth = compact
        ? Math.min(viewportWidth * (narrow ? 0.82 : 0.78), 390)
        : Math.min(500, viewportWidth * 0.78);
      const startHeight = startWidth * (669 / 500);
      const cardWidth = startWidth + (viewportWidth - startWidth) * easedExpansion;
      const cardHeight = startHeight + (window.innerHeight - startHeight) * easedExpansion;
      const focusFade = clamp((progress - 0.04) / 0.34);
      const captionFade = clamp(progress / 0.18);
      const shadeOpacity = clamp((progress - 0.62) / 0.2);
      const copyOpacity = clamp((progress - 0.82) / 0.16);

      focusStageRef.current.style.setProperty("--card-width", `${cardWidth.toFixed(2)}px`);
      focusStageRef.current.style.setProperty("--card-height", `${cardHeight.toFixed(2)}px`);
      focusStageRef.current.style.setProperty("--focus-fade", focusFade.toFixed(3));
      focusStageRef.current.style.setProperty("--caption-fade", captionFade.toFixed(3));
      focusStageRef.current.style.setProperty("--shade-opacity", shadeOpacity.toFixed(3));
      focusStageRef.current.style.setProperty("--copy-opacity", copyOpacity.toFixed(3));
    };

    const handleScroll = () => {
      if (window.scrollY <= 1 && heroSwapped && !heroTransitionLocked.current) {
        setHeroSwapped(false);
      }
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(updateFocusTransition);
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (!heroRef.current) return;
      const atHeroEntry = window.scrollY <= heroRef.current.offsetTop + 4;

      if (e.deltaY > 0 && atHeroEntry && (!heroSwapped || heroTransitionLocked.current)) {
        e.preventDefault();
        if (!heroSwapped) {
          setHeroSwapped(true);
          heroTransitionLocked.current = true;
          window.setTimeout(() => {
            heroTransitionLocked.current = false;
          }, 620);
        }
        return;
      }

      if (e.deltaY < 0 && window.scrollY <= 1 && heroSwapped) {
        e.preventDefault();
        if (!heroTransitionLocked.current) {
          setHeroSwapped(false);
          heroTransitionLocked.current = true;
          window.setTimeout(() => {
            heroTransitionLocked.current = false;
          }, 620);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    window.addEventListener("wheel", handleWheel, { passive: false });

    // Initial calculations
    updateFocusTransition();
    if (window.scrollY > 4) {
      setHeroSwapped(true);
    }

    // Space photo burst observer
    if (spaceSectionRef.current) {
      const spaceEl = spaceSectionRef.current;
      spaceEl.classList.add("burst-ready");

      const spaceObserver = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          const mainPhoto = spaceEl.querySelector(".space-main");
          const burstPhotos = spaceEl.querySelectorAll<HTMLElement>(".space-photo:not(.space-main)");

          if (mainPhoto) {
            const mainRect = mainPhoto.getBoundingClientRect();
            const originX = mainRect.left + mainRect.width / 2;
            const originY = mainRect.top + mainRect.height / 2;

            burstPhotos.forEach((photo, idx) => {
              const photoRect = photo.getBoundingClientRect();
              const photoX = photoRect.left + photoRect.width / 2;
              const photoY = photoRect.top + photoRect.height / 2;
              photo.style.setProperty("--burst-x", `${originX - photoX}px`);
              photo.style.setProperty("--burst-y", `${originY - photoY}px`);
              photo.style.setProperty("--burst-delay", `${idx * 70}ms`);
            });

            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                spaceEl.classList.add("burst-visible");
              });
            });
          }
          spaceObserver.unobserve(spaceEl);
        },
        { threshold: 0.12 }
      );
      spaceObserver.observe(spaceEl);
    }

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      window.removeEventListener("wheel", handleWheel);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [heroSwapped]);

  const openLightbox = (fullSrc: string, alt: string) => {
    setLightbox({ isOpen: true, src: fullSrc, alt });
    document.body.classList.add("lightbox-open");
  };

  const closeLightbox = () => {
    setLightbox({ isOpen: false, src: "", alt: "" });
    document.body.classList.remove("lightbox-open");
  };

  return (
    <main id="main">
      {/* 1. HERO SECTION */}
      <section
        ref={heroRef}
        className={`hero ${heroSwapped ? "is-scrolled" : ""}`}
        aria-labelledby="hero-title"
      >
        <div className="hero-shade"></div>
        <div className="hero-copy reveal">
          <p>통증의 원인은 더 정확히, 치료는 더 세심하게</p>
          <h1 id="hero-title">
            <span className="hero-line">작은 움직임의 불편함까지 살펴</span>
            <span className="hero-line hero-bracketed">
              <span className="hero-bracket" aria-hidden="true">[</span>
              <span className="hero-swap" aria-live="polite">
                <span className="hero-swap-item hero-swap-initial" aria-hidden={heroSwapped}>
                  원인을 제대로 살펴보면
                </span>
                <span className="hero-swap-item hero-swap-scrolled" aria-hidden={!heroSwapped}>
                  치료의 방향이 달라집니다.
                </span>
              </span>
              <span className="hero-bracket" aria-hidden="true">]</span>
            </span>
          </h1>
        </div>
        <div className="scroll-hint">
          <span></span>SCROLL
        </div>
      </section>

      {/* 2. FOCUS TRANSITION */}
      <div ref={focusTransitionRef} className="focus-transition">
        <div ref={focusStageRef} className="focus-stage">
          <section className="focus-panel" aria-label="병원 전경">
            <div className="focus-backdrop"></div>
            <div className="marquee" aria-hidden="true">
              <div className="marquee-track">
                <span>SAMSUNG G ORTHOPEDIC CLINIC</span>
                <span>SAMSUNG G ORTHOPEDIC CLINIC</span>
              </div>
            </div>
            <figure className="focus-card reveal">
              <img src="/assets/reception.webp" alt="삼성G정형외과 접수 데스크" />
              <figcaption>
                <strong>
                  진료의 차이가<br />
                  회복의 차이를 만듭니다
                </strong>
              </figcaption>
            </figure>
          </section>

          <section className="welcome" id="about" aria-labelledby="welcome-title">
            <div className="welcome-shade"></div>
            <div className="welcome-copy">
              <h2 id="welcome-title">
                더 편안한 움직임,<br />
                더 나은 일상을 위한<br />
                삼성G정형외과입니다.
              </h2>
            </div>
          </section>
        </div>
      </div>

      {/* 3. PRECISION */}
      <section className="precision" id="clinic" aria-labelledby="precision-title">
        <div className="section-inner">
          <div className="section-heading reveal">
            <p className="eyebrow">Joint & Spine Care</p>
            <h2 id="precision-title">척추와 관절, 회복까지 생각합니다</h2>
            <p>
              통증을 줄이는 것에서 그치지 않고, 다시 편안하게 움직일 수 있도록,<br />
              척추와 관절의 상태를 세심하게 살피고 회복의 과정까지 생각하는 진료를 이어갑니다.
            </p>
          </div>
          <div className="precision-collage">
            <figure className="photo-large reveal">
              <img src="/assets/clinic-room.webp" alt="정밀 진단 장비가 갖춰진 진료실" />
            </figure>
            <div className="line-symbol" aria-hidden="true">
              <span></span>
            </div>
            <figure className="photo-small reveal">
              <img src="/assets/consultation.webp" alt="의료진이 검사 결과를 설명하는 모습" />
            </figure>
            <div className="care-points reveal" aria-label="삼성G정형외과 진료 원칙">
              <div className="care-point">
                <strong>01</strong>
                <p>정확한 상태 확인</p>
              </div>
              <div className="care-point">
                <strong>02</strong>
                <p>충분한 설명과 맞춤 진료</p>
              </div>
              <div className="care-point">
                <strong>03</strong>
                <p>일상 복귀까지 이어지는 회복 관리</p>
              </div>
            </div>
          </div>
        </div>
        <div className="ghost-type" aria-hidden="true">
          <div className="ghost-track">
            <span>SAMSUNG G ORTHOPEDIC CLINIC</span>
            <span>SAMSUNG G ORTHOPEDIC CLINIC</span>
          </div>
        </div>
      </section>

      {/* 4. DOCTOR */}
      <section className="doctor" id="doctor" aria-labelledby="doctor-title">
        <div className="doctor-overlay"></div>
        <div className="doctor-inner">
          <div className="doctor-visual reveal">
            <img src="/assets/doctor-profile.webp" alt="이상철 정형외과 전문의" />
            <p className="doctor-name">
              <strong>이상철</strong>
              <span>대표원장</span>
            </p>
          </div>
          <div className="doctor-profile reveal">
            <p className="eyebrow light">Orthopedic Surgeon</p>
            <h2 id="doctor-title">정형외과 전문의</h2>
            <p className="lead">
              척추·관절을 바라보는<br />
              정형외과 전문의의 집요함,<br />
              진단부터 회복까지
            </p>
            <blockquote>
              제가 의사가 되고, 병을 치료하는 이유는 단 하나입니다.<br />
              지금 살아가시는 여러분들의 삶을 조금 더 재미있게,<br />
              하고 싶은 것을 조금 더 편하게 해드리기 위함입니다.
            </blockquote>
          </div>
          <div className="career reveal">
            <h3>약력 및 경력</h3>
            <ul>
              <li>경희대학교 의과대학 의학박사</li>
              <li>삼성서울병원 견관절 및 스포츠의학 전임의</li>
              <li>건국대학교 의과대학 정형외과 임상교수</li>
              <li>성균관대학교/경희대학교 의과대학 외래교수</li>
              <li>인도/태국 국제 정형외과학회 해외 수술 시연</li>
              <li>KLPGA 투어 주치의</li>
              <li>대한항공 점보스 배구팀 주치의</li>
              <li>국내외 20년 이상 의료봉사 이력</li>
              <li>대한 정형외과학회 추계학술대회 학술논문상 수상</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. SPACE */}
      <section ref={spaceSectionRef} className="space" aria-labelledby="space-title">
        <div className="space-inner">
          <img className="space-glow" src="/assets/place-glow-ring.png" alt="" aria-hidden="true" />
          <div className="section-heading centered space-heading">
            <p className="eyebrow">Place</p>
            <h2 id="space-title">공간을 넘어, 건강한 삶의 시작이 되는 곳</h2>
          </div>
          <figure
            className="space-photo space-main"
            onClick={() => openLightbox("/assets/place-full-main.jpg", "삼성G정형외과 넓은 로비")}
            role="button"
            tabIndex={0}
            aria-label="삼성G정형외과 넓은 로비 크게 보기"
          >
            <img src="/assets/place-main.png" alt="삼성G정형외과 넓은 로비" loading="lazy" />
          </figure>
          <figure
            className="space-photo space-left-large"
            onClick={() => openLightbox("/assets/place-full-left-large.jpg", "삼성G정형외과 복도와 대기 공간")}
            role="button"
            tabIndex={0}
            aria-label="삼성G정형외과 복도와 대기 공간 크게 보기"
          >
            <img src="/assets/place-left-large.png" alt="삼성G정형외과 복도와 대기 공간" loading="lazy" />
          </figure>
          <figure
            className="space-photo space-top"
            onClick={() => openLightbox("/assets/place-full-top.jpg", "삼성G정형외과 치료실")}
            role="button"
            tabIndex={0}
            aria-label="삼성G정형외과 치료실 크게 보기"
          >
            <img src="/assets/place-top.png" alt="삼성G정형외과 치료실" loading="lazy" />
          </figure>
          <figure
            className="space-photo space-top-right"
            onClick={() => openLightbox("/assets/place-full-top-right.jpg", "삼성G정형외과 밝은 진료 공간")}
            role="button"
            tabIndex={0}
            aria-label="삼성G정형외과 밝은 진료 공간 크게 보기"
          >
            <img src="/assets/place-top-right.png" alt="삼성G정형외과 밝은 진료 공간" loading="lazy" />
          </figure>
          <figure
            className="space-photo space-left-small"
            onClick={() => openLightbox("/assets/place-full-left-small.jpg", "삼성G정형외과 물리치료 공간")}
            role="button"
            tabIndex={0}
            aria-label="삼성G정형외과 물리치료 공간 크게 보기"
          >
            <img src="/assets/place-left-small.png" alt="삼성G정형외과 물리치료 공간" loading="lazy" />
          </figure>
          <figure
            className="space-photo space-right"
            onClick={() => openLightbox("/assets/place-full-right.jpg", "삼성G정형외과 검사실")}
            role="button"
            tabIndex={0}
            aria-label="삼성G정형외과 검사실 크게 보기"
          >
            <img src="/assets/place-right.png" alt="삼성G정형외과 검사실" loading="lazy" />
          </figure>
          <figure
            className="space-photo space-bottom-left"
            onClick={() => openLightbox("/assets/place-full-bottom-left.jpg", "삼성G정형외과 접수 공간")}
            role="button"
            tabIndex={0}
            aria-label="삼성G정형외과 접수 공간 크게 보기"
          >
            <img src="/assets/place-bottom-left.png" alt="삼성G정형외과 접수 공간" loading="lazy" />
          </figure>
          <figure
            className="space-photo space-bottom"
            onClick={() => openLightbox("/assets/place-full-bottom.jpg", "삼성G정형외과 의료 장비실")}
            role="button"
            tabIndex={0}
            aria-label="삼성G정형외과 의료 장비실 크게 보기"
          >
            <img src="/assets/place-bottom.png" alt="삼성G정형외과 의료 장비실" loading="lazy" />
          </figure>
        </div>
      </section>

      {/* 6. CONTACT US */}
      <section className="contact-us" id="contact-us" aria-labelledby="contact-us-title">
        <div className="contact-us-shade"></div>
        <div className="section-inner contact-us-inner reveal">
          <p className="eyebrow light">Contact Us</p>
          <h2 id="contact-us-title">상담문의</h2>
          <p>진료와 치료에 대한 궁금증을 편하게 문의해 주세요.</p>
          <div className="contact-us-links">
            <a className="contact-kakao" href="https://pf.kakao.com" target="_blank" rel="noreferrer">
              <svg viewBox="0 0 44 34" aria-hidden="true">
                <path d="M22 2C10.95 2 2 8.72 2 17c0 5.27 3.62 9.91 9.1 12.58L9 34l7.1-2.82c1.87.53 3.85.82 5.9.82 11.05 0 20-6.72 20-15S33.05 2 22 2Z" />
                <text x="22" y="21">TALK</text>
              </svg>
              <span>카카오톡 채널</span>
            </a>
            <a className="contact-phone" href="tel:0507-1452-3000">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6.6 10.8c1.7 3.4 3.2 4.9 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.3 1.2.4 2.4.6 3.7.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.7 21 3 13.3 3 3.8c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.7.1.4 0 .8-.3 1.1l-2.2 2.2Z" />
              </svg>
              <span>0507.1452.3000</span>
            </a>
            <a className="contact-naver" href="https://talk.naver.com" target="_blank" rel="noreferrer">
              <strong aria-hidden="true">N</strong>
              <span>네이버 톡톡</span>
            </a>
          </div>
        </div>
      </section>

      {/* 7. LOCATION */}
      <section className="location" id="location" aria-labelledby="location-title">
        <div className="section-inner location-grid">
          <div className="location-top">
            <div className="location-copy reveal">
              <p className="eyebrow">Location</p>
              <h2 id="location-title">삼성G정형외과 오시는 길</h2>
              <address>경기 군포시 군포로 522 4층</address>
              <p>군포새마을금고 건물 옆 넓은 주차타워에 편리하게 주차하실 수 있습니다.</p>
            </div>
            <div className="map-links">
              <a className="naver" href="https://map.naver.com" target="_blank" rel="noreferrer">
                <span aria-hidden="true">N</span>네이버 지도
              </a>
              <a className="kakao" href="https://map.kakao.com" target="_blank" rel="noreferrer">
                <svg aria-hidden="true" viewBox="0 0 24 30">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 8.6 12 18 12 18s12-9.4 12-18C24 5.37 18.63 0 12 0Z" />
                  <circle cx="12" cy="12" r="4" />
                </svg>
                카카오 지도
              </a>
              <a className="tmap" href="https://www.tmap.co.kr" target="_blank" rel="noreferrer">
                <span aria-hidden="true">T</span>T맵 지도
              </a>
            </div>
          </div>
          <div className="map-placeholder" aria-label="약도" style={{ position: "relative", overflow: "hidden" }}>
            <iframe
              title="삼성G정형외과 위치 지도"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3169.5786482161746!2d126.94523037648342!3d37.35243897209425!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357b6f634123b379%3A0xb355152a23ebf035!2z6rK96riw64-EIOq1sO2PrOyLnCDqt7Dtj6zrnowgNTIy!5e0!3m2!1sko!2skr!4v1700000000000!5m2!1sko!2skr"
              width="100%"
              height="100%"
              style={{ border: 0, position: "absolute", inset: 0 }}
              allowFullScreen={false}
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>

      {/* 8. PLACE LIGHTBOX */}
      {lightbox.isOpen && (
        <dialog
          className="place-lightbox"
          open
          aria-label="공간 이미지 크게 보기"
          onClick={closeLightbox}
        >
          <button
            className="place-lightbox-close"
            type="button"
            aria-label="확대 이미지 닫기"
            onClick={closeLightbox}
          >
            ×
          </button>
          <img
            className="place-lightbox-image"
            src={lightbox.src}
            alt={lightbox.alt}
            onClick={(e) => e.stopPropagation()}
          />
        </dialog>
      )}

      {/* 9. QUICK FLOATING MENU */}
      <aside className="quick-menu" aria-label="빠른 메뉴">
        <div className="quick-menu-main">
          <a
            className="quick-menu-item"
            href="https://pf.kakao.com"
            target="_blank"
            rel="noreferrer"
          >
            <svg className="quick-kakao" viewBox="0 0 44 34" aria-hidden="true">
              <path d="M22 2C10.95 2 2 8.72 2 17c0 5.27 3.62 9.91 9.1 12.58L9 34l7.1-2.82c1.87.53 3.85.82 5.9.82 11.05 0 20-6.72 20-15S33.05 2 22 2Z" />
              <text x="22" y="21">TALK</text>
            </svg>
            <span>카톡 상담</span>
          </a>
          <button
            className="quick-menu-item"
            type="button"
            style={{ width: "100%", background: "none", border: "none", cursor: "pointer" }}
            onClick={openAppointmentModal}
            title="1분 빠른예약"
          >
            <svg className="quick-naver" viewBox="0 0 42 45" aria-hidden="true">
              <path d="M7 0h3v8H7zm25 0h3v8h-3zM1 5h40v40H1z" />
              <path className="quick-naver-page" d="M6 14h30v26H6z" />
              <text x="21" y="35">N</text>
            </svg>
            <span>네이버 예약</span>
          </button>
          <a
            className="quick-menu-item"
            href="https://blog.naver.com"
            target="_blank"
            rel="noreferrer"
          >
            <svg className="quick-blog" viewBox="0 0 44 40" aria-hidden="true">
              <path d="M7 2h30a5 5 0 0 1 5 5v21a5 5 0 0 1-5 5H24l-8 6v-6H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Z" />
              <text x="22" y="22">blog</text>
            </svg>
            <span>블로그</span>
          </a>
        </div>
        <a
          className="quick-phone"
          href="tel:0507-1452-3000"
          aria-label="전화 상담 0507-1452-3000"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6.6 10.8c1.7 3.4 3.2 4.9 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.3 1.2.4 2.4.6 3.7.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.7 21 3 13.3 3 3.8c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.7.1.4 0 .8-.3 1.1l-2.2 2.2Z" />
          </svg>
          <span>0507<br />1452.3000</span>
        </a>
        <button
          className="quick-top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="맨 위로 이동"
          type="button"
          style={{ border: "none", cursor: "pointer" }}
        >
          <svg viewBox="0 0 76 76" aria-hidden="true">
            <path d="M20 34 38 16l18 18M38 16v44" />
          </svg>
        </button>
      </aside>
    </main>
  );
};
