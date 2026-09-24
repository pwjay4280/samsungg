import express, { Request, Response, NextFunction } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  initialHospitalInfo,
  initialDoctors,
  initialSubpages,
  initialConsultations,
  initialReviews,
  initialQuickAppointments,
  initialNotices,
  initialMediaArticles,
  initialYouTubeVideos,
  initialPopups,
  initialNonCoveredFees,
  initialHeroSlides,
} from "./src/data/mockHospitalData.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory data store with initial seed
let hospitalInfo = { ...initialHospitalInfo };
let doctors = [...initialDoctors];
let subpages = [...initialSubpages];
let consultations = [...initialConsultations];
let reviews = [...initialReviews];
let quickAppointments = [...initialQuickAppointments];
let notices = [...initialNotices];
let heroSlides = [...initialHeroSlides];
let inlineContentMap: Record<string, string> = {};

// 1. Trailing slash 301 redirection (spec: /consultation/14/ -> /consultation/14)
app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.path.length > 1 && req.path.endsWith("/")) {
    const query = req.url.slice(req.path.length);
    const safePath = req.path.slice(0, -1);
    return res.redirect(301, safePath + query);
  }
  next();
});

// 2. Robots.txt
app.get("/robots.txt", (_req: Request, res: Response) => {
  const siteUrl = hospitalInfo.siteUrl || "https://samsung-g-hospital.com";
  const robotsTxt = `User-agent: Yeti
Allow: /

User-agent: Googlebot
Allow: /

User-agent: Daumoa
Allow: /

User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/

Sitemap: ${siteUrl}/sitemap.xml
`;
  res.type("text/plain").send(robotsTxt);
});

// 3. Dynamic Sitemap.xml
app.get("/sitemap.xml", (_req: Request, res: Response) => {
  const siteUrl = hospitalInfo.siteUrl || "https://samsung-g-hospital.com";
  const currentDate = new Date().toISOString().split("T")[0];

  const staticUrls = [
    { loc: `${siteUrl}/`, priority: "1.0", changefreq: "daily" },
    { loc: `${siteUrl}/about`, priority: "0.9", changefreq: "monthly" },
    { loc: `${siteUrl}/system/one-stop`, priority: "0.9", changefreq: "weekly" },
    { loc: `${siteUrl}/system/day-hospital`, priority: "0.9", changefreq: "weekly" },
    { loc: `${siteUrl}/knee`, priority: "0.9", changefreq: "weekly" },
    { loc: `${siteUrl}/knee/osteoarthritis`, priority: "0.9", changefreq: "weekly" },
    { loc: `${siteUrl}/knee/meniscus`, priority: "0.9", changefreq: "weekly" },
    { loc: `${siteUrl}/knee/cruciate-ligament`, priority: "0.9", changefreq: "weekly" },
    { loc: `${siteUrl}/knee/cartilage`, priority: "0.9", changefreq: "weekly" },
    { loc: `${siteUrl}/knee/sports`, priority: "0.9", changefreq: "weekly" },
    { loc: `${siteUrl}/shoulder`, priority: "0.9", changefreq: "weekly" },
    { loc: `${siteUrl}/shoulder/rotator-cuff`, priority: "0.9", changefreq: "weekly" },
    { loc: `${siteUrl}/shoulder/frozen-shoulder`, priority: "0.9", changefreq: "weekly" },
    { loc: `${siteUrl}/shoulder/calcific-tendinitis`, priority: "0.9", changefreq: "weekly" },
    { loc: `${siteUrl}/shoulder/impingement`, priority: "0.9", changefreq: "weekly" },
    { loc: `${siteUrl}/shoulder/sports`, priority: "0.9", changefreq: "weekly" },
    { loc: `${siteUrl}/spine`, priority: "0.9", changefreq: "weekly" },
    { loc: `${siteUrl}/spine/disc`, priority: "0.9", changefreq: "weekly" },
    { loc: `${siteUrl}/spine/stenosis`, priority: "0.9", changefreq: "weekly" },
    { loc: `${siteUrl}/spine/spondylolisthesis`, priority: "0.9", changefreq: "weekly" },
    { loc: `${siteUrl}/spine/acute-pain`, priority: "0.9", changefreq: "weekly" },
    { loc: `${siteUrl}/spine/non-surgical`, priority: "0.9", changefreq: "weekly" },
    { loc: `${siteUrl}/cs`, priority: "0.8", changefreq: "daily" },
    { loc: `${siteUrl}/doctors`, priority: "0.9", changefreq: "weekly" },
    { loc: `${siteUrl}/consultation`, priority: "0.9", changefreq: "daily" },
    { loc: `${siteUrl}/reviews`, priority: "0.8", changefreq: "daily" },
    { loc: `${siteUrl}/non-covered`, priority: "0.7", changefreq: "monthly" },
    { loc: `${siteUrl}/location`, priority: "0.8", changefreq: "monthly" },
  ];

  const subpageUrls = subpages.map((sp) => ({
    loc: `${siteUrl}${sp.path}`,
    priority: "0.9",
    changefreq: "weekly",
  }));

  const consultationUrls = consultations
    .filter((c) => !c.isSecret)
    .map((c) => ({
      loc: `${siteUrl}/consultation/${c.seq}`,
      priority: "0.7",
      changefreq: "weekly",
    }));

  const reviewUrls = reviews.map((r) => ({
    loc: `${siteUrl}/reviews/${r.seq}`,
    priority: "0.7",
    changefreq: "monthly",
  }));

  const allUrls = [...staticUrls, ...subpageUrls, ...consultationUrls, ...reviewUrls];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  res.type("application/xml").send(xml);
});

// 4. REST API Endpoints
app.get("/api/hospital-info", (_req: Request, res: Response) => {
  res.json(hospitalInfo);
});

app.put("/api/hospital-info", (req: Request, res: Response) => {
  hospitalInfo = { ...hospitalInfo, ...req.body };
  res.json({ success: true, data: hospitalInfo });
});

app.get("/api/doctors", (_req: Request, res: Response) => {
  res.json(doctors);
});

app.post("/api/doctors", (req: Request, res: Response) => {
  const newDoctor = { ...req.body, id: `doc-${Date.now()}` };
  doctors.push(newDoctor);
  res.json(newDoctor);
});

app.put("/api/doctors/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  doctors = doctors.map((d) => (d.id === id ? { ...d, ...req.body } : d));
  res.json({ success: true });
});

app.get("/api/subpages", (_req: Request, res: Response) => {
  res.json(subpages);
});

app.put("/api/subpages/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  subpages = subpages.map((sp) =>
    sp.id === id ? { ...sp, ...req.body, updatedAt: new Date().toISOString() } : sp
  );
  res.json({ success: true });
});

app.get("/api/consultations", (_req: Request, res: Response) => {
  res.json(consultations);
});

app.post("/api/consultations", (req: Request, res: Response) => {
  const maxSeq = consultations.reduce((max, c) => Math.max(max, c.seq), 100);
  const newConsultation = {
    ...req.body,
    id: `cons-${Date.now()}`,
    seq: maxSeq + 1,
    views: 1,
    status: "접수완료",
    createdAt: new Date().toISOString(),
  };
  consultations.unshift(newConsultation);
  res.status(201).json(newConsultation);
});

app.post("/api/consultations/:id/answer", (req: Request, res: Response) => {
  const { id } = req.params;
  const { answer, answerDoctorName, answerDoctorId } = req.body;
  consultations = consultations.map((c) =>
    c.id === id || String(c.seq) === id
      ? {
          ...c,
          answer,
          answerDoctorName,
          answerDoctorId,
          status: "답변완료",
          answerCreatedAt: new Date().toISOString(),
        }
      : c
  );
  res.json({ success: true });
});

app.post("/api/consultations/:id/view", (req: Request, res: Response) => {
  const { id } = req.params;
  consultations = consultations.map((c) =>
    c.id === id || String(c.seq) === id ? { ...c, views: c.views + 1 } : c
  );
  res.json({ success: true });
});

app.get("/api/reviews", (_req: Request, res: Response) => {
  res.json(reviews);
});

app.post("/api/reviews", (req: Request, res: Response) => {
  const maxSeq = reviews.reduce((max, r) => Math.max(max, r.seq), 40);
  const newReview = {
    ...req.body,
    id: `rev-${Date.now()}`,
    seq: maxSeq + 1,
    views: 1,
    status: "승인완료", // default approved for test/instant feedback
    createdAt: new Date().toISOString(),
  };
  reviews.unshift(newReview);
  res.status(201).json(newReview);
});

app.put("/api/reviews/:id/status", (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  reviews = reviews.map((r) => (r.id === id ? { ...r, status } : r));
  res.json({ success: true });
});

app.get("/api/quick-appointments", (_req: Request, res: Response) => {
  res.json(quickAppointments);
});

app.post("/api/quick-appointments", (req: Request, res: Response) => {
  const newAppt = {
    ...req.body,
    id: `qa-${Date.now()}`,
    status: "신규접수",
    createdAt: new Date().toISOString(),
  };
  quickAppointments.unshift(newAppt);
  res.status(201).json(newAppt);
});

app.put("/api/quick-appointments/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  quickAppointments = quickAppointments.map((qa) =>
    qa.id === id ? { ...qa, ...req.body } : qa
  );
  res.json({ success: true });
});

app.get("/api/notices", (_req: Request, res: Response) => {
  res.json(notices);
});

app.get("/api/media", (_req: Request, res: Response) => {
  res.json(initialMediaArticles);
});

app.get("/api/youtube", (_req: Request, res: Response) => {
  res.json(initialYouTubeVideos);
});

app.get("/api/popups", (_req: Request, res: Response) => {
  res.json(initialPopups);
});

app.get("/api/non-covered-fees", (_req: Request, res: Response) => {
  res.json(initialNonCoveredFees);
});

app.get("/api/hero-slides", (_req: Request, res: Response) => {
  res.json(heroSlides);
});

app.get("/api/inline-content", (_req: Request, res: Response) => {
  res.json(inlineContentMap);
});

app.put("/api/inline-content", (req: Request, res: Response) => {
  inlineContentMap = { ...inlineContentMap, ...req.body };
  res.json({ success: true, data: inlineContentMap });
});

// Admin Stats
app.get("/api/stats", (_req: Request, res: Response) => {
  res.json({
    totalVisitors: 12450,
    todayVisitors: 348,
    totalConsultations: consultations.length,
    pendingConsultations: consultations.filter((c) => c.status === "접수완료").length,
    totalReviews: reviews.length,
    quickAppointmentsCount: quickAppointments.length,
    newAppointmentsCount: quickAppointments.filter((q) => q.status === "신규접수").length,
    categoryDistribution: [
      { name: "척추질환", value: 45 },
      { name: "관절질환", value: 35 },
      { name: "도수재활", value: 20 },
    ],
    weeklyTraffic: [
      { day: "월", visitors: 420, appointments: 12 },
      { day: "화", visitors: 380, appointments: 9 },
      { day: "수", visitors: 450, appointments: 15 },
      { day: "목", visitors: 390, appointments: 11 },
      { day: "금", visitors: 480, appointments: 18 },
      { day: "토", visitors: 510, appointments: 22 },
      { day: "일", visitors: 190, appointments: 5 },
    ],
  });
});

// 5. Bot Detector & SSR Prerenderer
function isBot(userAgent: string | undefined): boolean {
  if (!userAgent) return false;
  const botPattern = /yeti|googlebot|daumoa|bingbot|baiduspider|facebookexternalhit|twitterbot|linkedinbot|slackbot|kakaotalk-scrap/i;
  return botPattern.test(userAgent);
}

function buildSeoMeta(urlPath: string) {
  const baseUrl = hospitalInfo.siteUrl || "https://samsung-g-hospital.com";
  // Canonical unification rule: if path starts with /en, strip /en for canonical
  const canonicalPath = urlPath.startsWith("/en") ? urlPath.replace(/^\/en/, "") || "/" : urlPath;
  const canonicalUrl = `${baseUrl}${canonicalPath}`;

  // Default SEO
  let title = hospitalInfo.seoTitle || "삼성G정형외과 - 관절·척추·정형외과 전문 웹 플랫폼 & CMS";
  let description = hospitalInfo.seoDescription || "삼성G정형외과 공식 웹사이트. 척추내시경, 로봇인공관절, 1:1 도수재활.";
  let ogImage = hospitalInfo.seoOgImage || "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80";
  let jsonLd: any = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    name: "삼성G정형외과",
    url: baseUrl,
    logo: `${baseUrl}/logo-samsung-g.svg`,
    image: ogImage,
    description: description,
    telephone: hospitalInfo.mainNumber,
    address: {
      "@type": "PostalAddress",
      streetAddress: hospitalInfo.footerAddress,
      addressCountry: "KR",
    },
  };

  let prerenderContent = `
    <div class="prerender-seo-content" style="display:none;" data-ssr="bot-prerender">
      <h1>${title}</h1>
      <p>${description}</p>
      <address>${hospitalInfo.footerAddress} | 대표전화: ${hospitalInfo.mainNumber}</address>
    </div>
  `;

  // Subpage check
  const sub = subpages.find((sp) => canonicalPath === sp.path);
  if (sub) {
    title = `${sub.title} | ${hospitalInfo.name} ${sub.categoryName}`;
    description = sub.introDescription.slice(0, 160);
    if (sub.images.hero) ogImage = sub.images.hero;

    jsonLd = {
      "@context": "https://schema.org",
      "@type": "MedicalProcedure",
      name: sub.title,
      procedureType: "SurgicalProcedure",
      description: sub.introDescription,
      relevantSpecialty: {
        "@type": "MedicalSpecialty",
        name: sub.categoryName,
      },
      howPerformed: sub.treatments.map((t) => t.title).join(", "),
      followup: sub.postcare.map((p) => p.title).join(", "),
    };

    if (sub.faqs && sub.faqs.length > 0) {
      jsonLd = [
        jsonLd,
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: sub.faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: f.answer,
            },
          })),
        },
      ];
    }

    prerenderContent = `
      <div class="prerender-seo-content" style="display:none;" data-ssr="bot-prerender">
        <h1>${sub.title} - ${sub.subtitle || ""}</h1>
        <p>${sub.introDescription}</p>
        <h2>주요 증상</h2>
        <ul>${sub.symptoms.map((s) => `<li>${s}</li>`).join("")}</ul>
        <h2>치료 장점</h2>
        <ul>${sub.advantages.map((a) => `<li><strong>${a.title}</strong>: ${a.items.join(", ")}</li>`).join("")}</ul>
        <h2>자주 묻는 질문</h2>
        ${sub.faqs.map((f) => `<dl><dt>${f.question}</dt><dd>${f.answer}</dd></dl>`).join("")}
      </div>
    `;
  }

  // Consultation check: /consultation/:seq
  const consMatch = canonicalPath.match(/^\/consultation\/(\d+)$/);
  if (consMatch) {
    const seq = parseInt(consMatch[1], 10);
    const cons = consultations.find((c) => c.seq === seq);
    if (cons && !cons.isSecret) {
      title = `${cons.title} | 삼성G정형외과 전문의 1:1 상담`;
      description = cons.content.slice(0, 150);

      jsonLd = {
        "@context": "https://schema.org",
        "@type": "QAPage",
        mainEntity: {
          "@type": "Question",
          name: cons.title,
          text: cons.content,
          dateCreated: cons.createdAt,
          author: {
            "@type": "Person",
            name: cons.authorName,
          },
          acceptedAnswer: cons.answer
            ? {
                "@type": "Answer",
                text: cons.answer,
                dateCreated: cons.answerCreatedAt || cons.createdAt,
                author: {
                  "@type": "Person",
                  name: cons.answerDoctorName || "삼성G정형외과 전문의",
                },
              }
            : undefined,
        },
      };

      prerenderContent = `
        <article class="prerender-seo-content" style="display:none;" data-ssr="bot-prerender">
          <h1>${cons.title}</h1>
          <p>분류: ${cons.category} | 작성자: ${cons.authorName}</p>
          <div class="question-body">${cons.content}</div>
          ${
            cons.answer
              ? `<div class="doctor-answer"><h3>답변: ${cons.answerDoctorName || "전문의"}</h3><p>${cons.answer}</p></div>`
              : ""
          }
        </article>
      `;
    }
  }

  // Doctors page check
  if (canonicalPath === "/doctors") {
    title = `의료진 소개 | 삼성G정형외과 척추·관절·재활 전문의`;
    description = "서울대·삼성서울병원·세브란스 출신 척추 및 관절 전문 의료진. 1:1 책임 진료 및 양방향 척추내시경, 로봇 수술.";
    jsonLd = {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      mainEntity: doctors.map((d) => ({
        "@type": "Physician",
        name: d.name,
        jobTitle: d.title,
        medicalSpecialty: d.specialty,
        image: d.imageUrl,
      })),
    };
  }

  return { title, description, ogImage, canonicalUrl, jsonLd, prerenderContent };
}

// 6. Vite middleware integration for Single-Port Dev & SSR
async function setupServer() {
  const { createServer: createViteServer } = await import("vite");

  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "spa",
  });

  app.use(vite.middlewares);

  // Catch-all HTML rendering with Bot Prerender injection
  app.use("*", async (req: Request, res: Response) => {
    const url = req.originalUrl;
    const ua = req.headers["user-agent"] || "";

    try {
      let template = fs.readFileSync(path.resolve(__dirname, "index.html"), "utf-8");
      template = await vite.transformIndexHtml(url, template);

      const seo = buildSeoMeta(req.path);

      // Replace title & meta
      template = template.replace(/<title>.*?<\/title>/, `<title>${seo.title}</title>`);
      template = template.replace(
        /<meta name="description" content=".*?" \/>/,
        `<meta name="description" content="${seo.description}" />\n    <link rel="canonical" href="${seo.canonicalUrl}" />`
      );
      template = template.replace(
        /<meta property="og:title" content=".*?" \/>/,
        `<meta property="og:title" content="${seo.title}" />`
      );
      template = template.replace(
        /<meta property="og:description" content=".*?" \/>/,
        `<meta property="og:description" content="${seo.description}" />\n    <meta property="og:url" content="${seo.canonicalUrl}" />`
      );
      template = template.replace(
        /<meta property="og:image" content=".*?" \/>/,
        `<meta property="og:image" content="${seo.ogImage}" />`
      );

      // Inject JSON-LD Schema
      const jsonLdString = `<script type="application/ld+json">\n${JSON.stringify(seo.jsonLd, null, 2)}\n</script>`;
      template = template.replace("</head>", `  ${jsonLdString}\n</head>`);

      // If crawler bot, inject pre-rendered HTML content into <!--app-html-->
      if (isBot(ua)) {
        template = template.replace("<!--app-html-->", seo.prerenderContent);
      }

      res.status(200).set({ "Content-Type": "text/html" }).end(template);
    } catch (e: any) {
      vite.ssrFixStacktrace(e);
      console.error(e);
      res.status(500).end(e.message);
    }
  });

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🏥 Samsung G Hospital Server running at http://localhost:${PORT}`);
  });
}

setupServer();
