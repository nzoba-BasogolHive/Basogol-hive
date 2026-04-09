import React, { useEffect, useRef, useState } from "react";
import { subscribeNewsletter } from "../hooks/useFetchQuery";

import {
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Mail,
  Send,
  CheckCircle2,
  Info,
  XCircle,
  X,
} from "lucide-react";

import { Link } from "react-router-dom";
import logo from "../assets/basogollogo.png";
import leftTopMain from "../assets/Untitled.png";
import leftBottomShape from "../assets/Untitlevcwevabd.png";
import rightShape from "../assets/Untitlevabd.png";
import { useLanguage } from "./LanguageContext";

const translations = {
  fr: {
    brandSubtitle: "Tech & studio Creatif",
    navLinks: [
      { label: "Accueil", href: "/" },
      { label: "Marketing & Brand", href: "/marketing-brand" },
      { label: "Technologie", href: "/technology" },
      { label: "Processus", href: "/process" },
      { label: "À propos", href: "/about" },
    ],
    marketingTitle: "Marketing & Brand",
    marketingItems: [
      {
        label: "Stratégie de marque & positionnement",
        href: "/marketing-brand#service-brand-strategy-positioning",
      },
      {
        label: "Recherche & insights",
        href: "/marketing-brand#service-research-insights",
      },
      {
        label: "Identité visuelle & branding",
        href: "/marketing-brand#service-visual-identity-branding",
      },
      {
        label: "Design produit & expérience (UI/UX)",
        href: "/marketing-brand#service-product-experience-design-ui-ux",
      },
      {
        label: "Web design & développement",
        href: "/marketing-brand#service-web-design-development",
      },
      {
        label: "Stratégie de contenu & direction créative",
        href: "/marketing-brand#service-content-strategy-creative-direction",
      },
      {
        label: "Production de contenu",
        href: "/marketing-brand#service-content-production",
      },
      {
        label: "Croissance, social & publicité",
        href: "/marketing-brand#service-growth-social-paid-media",
      },
    ],
    technologyTitle: "Technologie",
    technologyItems: [
      {
        label: "UX/UI & design systems",
        href: "/technology#service-ux-ui-design-systems",
      },
      {
        label: "Sites web & plateformes",
        href: "/technology#service-websites-platforms",
      },
      {
        label: "e-commerce",
        href: "/technology#service-e-commerce",
      },
      {
        label: "Développement full-stack & applications métier",
        href: "/technology#service-full-stack-development-business-applications",
      },
      {
        label: "Solutions transport, logistique & B2B",
        href: "/technology#service-transport-logistics-b2b-solutions",
      },
      {
        label: "Audit, optimisation & qualité",
        href: "/technology#service-audit-optimisation-quality",
      },
      {
        label: "Maintenance, Support & Hébergement",
        href: "/technology#service-maintenance-support-hosting",
      },
    ],
    inputPlaceholder: "entrez votre email",
    newsletterText: "Abonnez-vous à notre newsletter",
    subscribeButton: "S'abonner",
    newsletterLoading: "Inscription...",
    newsletterSuccess: "Merci, votre email a bien été ajouté.",
    newsletterError: "Une erreur est survenue. Veuillez réessayer.",
    newsletterInvalid: "Veuillez entrer une adresse email valide.",
    newsletterAlreadySubscribed: "Vous êtes déjà abonné à la newsletter.",
    newsletterPopupSuccessTitle: "Abonnement réussi",
    newsletterPopupInfoTitle: "Déjà abonné",
    newsletterPopupErrorTitle: "Une erreur est survenue",
    popupClose: "Fermer",
    socialLinks: [
      { label: "Facebook", href: "#" },
      { label: "Instagram", href: "#" },
      { label: "LinkedIn", href: "#" },
    ],
    bottomLinks: [
      { label: "Email", href: "mailto:contact@basogol.com" },
      { label: "WhatsApp", href: "#" },
      { label: "YouTube", href: "#" },
    ],
    copyright: "© 2025 Basogol-Hive. Tous droits réservés.",
  },
  en: {
    brandSubtitle: "Tech & Creative studio",
    navLinks: [
      { label: "Home", href: "/" },
      { label: "Marketing & Brand", href: "/marketing-brand" },
      { label: "Technology", href: "/technology" },
      { label: "Process", href: "/process" },
      { label: "About", href: "/about" },
    ],
    marketingTitle: "Marketing & Brand",
    marketingItems: [
      {
        label: "Brand strategy & positioning",
        href: "/marketing-brand#service-brand-strategy-positioning",
      },
      {
        label: "Research & insights",
        href: "/marketing-brand#service-research-insights",
      },
      {
        label: "Visual identity & branding",
        href: "/marketing-brand#service-visual-identity-branding",
      },
      {
        label: "Product & experience design (UI/UX)",
        href: "/marketing-brand#service-product-experience-design-ui-ux",
      },
      {
        label: "Web design & development",
        href: "/marketing-brand#service-web-design-development",
      },
      {
        label: "Content strategy & creative direction",
        href: "/marketing-brand#service-content-strategy-creative-direction",
      },
      {
        label: "Content production",
        href: "/marketing-brand#service-content-production",
      },
      {
        label: "Growth, social & paid media",
        href: "/marketing-brand#service-growth-social-paid-media",
      },
    ],
    technologyTitle: "Technology",
    technologyItems: [
      {
        label: "UX/UI & design systems",
        href: "/technology#service-ux-ui-design-systems",
      },
      {
        label: "Websites & platforms",
        href: "/technology#service-websites-platforms",
      },
      {
        label: "e-commerce",
        href: "/technology#service-e-commerce",
      },
      {
        label: "Full-stack development & business applications",
        href: "/technology#service-full-stack-development-business-applications",
      },
      {
        label: "Transport, logistics & B2B solutions",
        href: "/technology#service-transport-logistics-b2b-solutions",
      },
      {
        label: "Audit, optimisation & quality",
        href: "/technology#service-audit-optimisation-quality",
      },
      {
        label: "Maintenance, Support & Hosting",
        href: "/technology#service-maintenance-support-hosting",
      },
    ],
    inputPlaceholder: "enter your email",
    newsletterText: "Subscribe to our newsletter",
    subscribeButton: "Subscribe",
    newsletterLoading: "Subscribing...",
    newsletterSuccess: "Thank you, your email has been added.",
    newsletterError: "Something went wrong. Please try again.",
    newsletterInvalid: "Please enter a valid email address.",
    newsletterAlreadySubscribed: "You are already subscribed to the newsletter.",
    newsletterPopupSuccessTitle: "Subscription successful",
    newsletterPopupInfoTitle: "Already subscribed",
    newsletterPopupErrorTitle: "Something went wrong",
    popupClose: "Close",
    socialLinks: [
      { label: "Facebook", href: "#" },
      { label: "Instagram", href: "#" },
      { label: "LinkedIn", href: "#" },
    ],
    bottomLinks: [
      { label: "Email", href: "mailto:contact@basogol.com" },
      { label: "WhatsApp", href: "#" },
      { label: "YouTube", href: "#" },
    ],
    copyright: "© 2025 Basogol-Hive. All rights reserved.",
  },
};

const socialIcons = {
  Facebook,
  Instagram,
  LinkedIn: Linkedin,
  Email: Mail,
  WhatsApp: Send,
  YouTube: Youtube,
};

const FooterSection = () => {
  const { lang } = useLanguage();
  const t = translations[lang] || translations.fr;
  const footerRef = useRef(null);
  const [visible, setVisible] = useState(false);

  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterLoading, setNewsletterLoading] = useState(false);
  const [newsletterStatus, setNewsletterStatus] = useState({
    type: "",
    message: "",
  });
const [newsletterPopup, setNewsletterPopup] = useState({
  open: false,
  type: "",
  title: "",
  message: "",
});
const closeNewsletterPopup = () => {
  setNewsletterPopup({
    open: false,
    type: "",
    title: "",
    message: "",
  });
};

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.08 }
    );
    if (footerRef.current) observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
const handleNewsletterSubmit = async (e) => {
  e.preventDefault();

  setNewsletterStatus({ type: "", message: "" });

  const cleanEmail = newsletterEmail.trim().toLowerCase();

  if (!isValidEmail(cleanEmail)) {
    setNewsletterPopup({
      open: true,
      type: "error",
      title: t.newsletterPopupErrorTitle,
      message: t.newsletterInvalid,
    });
    return;
  }

  setNewsletterLoading(true);

  try {
    const response = await subscribeNewsletter({
      email: cleanEmail,
      language: lang,
    });

    if (response?.already_subscribed) {
      setNewsletterPopup({
        open: true,
        type: "info",
        title: t.newsletterPopupInfoTitle,
        message: response.message || t.newsletterAlreadySubscribed,
      });
    } else {
      setNewsletterPopup({
        open: true,
        type: "success",
        title: t.newsletterPopupSuccessTitle,
        message: response.message || t.newsletterSuccess,
      });
      setNewsletterEmail("");
    }
  } catch (error) {
    console.error("Newsletter subscribe error:", error);
    setNewsletterPopup({
      open: true,
      type: "error",
      title: t.newsletterPopupErrorTitle,
      message: error.message || t.newsletterError,
    });
  } finally {
    setNewsletterLoading(false);
  }
};

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden text-white"
      style={{
        background:
          "linear-gradient(135deg, #1a5f7a 0%, #1f739b 45%, #1a6688 100%)",
      }}
    >
      <style>{`
        @keyframes shapeFloatLeft {
          0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
          33% { transform: translateY(-12px) rotate(1.2deg) scale(1.015); }
          66% { transform: translateY(6px) rotate(-0.8deg) scale(0.988); }
        }
        @keyframes shapeFloatRight {
          0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
          33% { transform: translateY(10px) rotate(-1deg) scale(1.012); }
          66% { transform: translateY(-8px) rotate(0.6deg) scale(0.992); }
        }
        @keyframes shapeFloatBottom {
          0%, 100% { transform: translateX(0px) translateY(0px); }
          50% { transform: translateX(-8px) translateY(-6px); }
        }

        .shape-left-top {
          animation: shapeFloatLeft 9s ease-in-out infinite;
          transform-origin: center center;
        }
        .shape-left-bottom {
          animation: shapeFloatBottom 11s ease-in-out infinite;
          transform-origin: bottom left;
        }
        .shape-right {
          animation: shapeFloatRight 10s ease-in-out infinite;
          transform-origin: bottom right;
        }

        .footer-entry {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.85s ease, transform 0.85s cubic-bezier(0.22,1,0.36,1);
        }
        .footer-entry.show {
          opacity: 1;
          transform: translateY(0);
        }

        .footer-col-1 { transition-delay: 0.05s; }
        .footer-col-2 { transition-delay: 0.15s; }
        .footer-col-3 { transition-delay: 0.25s; }
        .footer-col-4 { transition-delay: 0.35s; }

        .footer-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.20), transparent);
        }

        .footer-col-title {
          position: relative;
          padding-bottom: 10px;
        }
        .footer-col-title::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 28px;
          height: 2px;
          border-radius: 999px;
          background: rgba(255,255,255,0.45);
        }

        .footer-list-item {
          position: relative;
          padding-left: 0;
          transition: padding-left 0.25s ease, color 0.25s ease;
          cursor: pointer;
        }
        .footer-list-item:hover {
          padding-left: 8px;
          color: rgba(255,255,255,1);
        }
        .footer-list-item::before {
          content: "";
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%) scaleX(0);
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: rgba(255,255,255,0.7);
          transition: transform 0.25s ease, opacity 0.25s ease;
          opacity: 0;
        }
        .footer-list-item:hover::before {
          transform: translateY(-50%) scaleX(1);
          opacity: 1;
        }

        .footer-input {
          background: rgba(255,255,255,0.12);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.25);
          color: #fff;
          transition: border-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
          box-shadow: 0 2px 12px rgba(0,0,0,0.10), 0 1px 0 rgba(255,255,255,0.12) inset;
        }
        .footer-input::placeholder { color: rgba(255,255,255,0.50); }
        .footer-input:focus {
          outline: none;
          border-color: rgba(255,255,255,0.50);
          background: rgba(255,255,255,0.18);
          box-shadow: 0 0 0 3px rgba(255,255,255,0.10), 0 2px 12px rgba(0,0,0,0.12);
        }

        .footer-subscribe-btn {
          background: rgba(255,255,255,0.18);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.35);
          box-shadow: 0 4px 14px rgba(0,0,0,0.15), 0 1px 0 rgba(255,255,255,0.20) inset;
          transition: all 0.32s cubic-bezier(0.22,1,0.36,1);
        }
        .footer-subscribe-btn:hover {
          background: rgba(255,255,255,0.28);
          transform: translateY(-2px);
          box-shadow: 0 8px 22px rgba(0,0,0,0.20), 0 1px 0 rgba(255,255,255,0.28) inset;
        }
        .footer-subscribe-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .footer-logo-wrap {
          background: rgba(255,255,255,0.12);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(255,255,255,0.22);
          box-shadow: 0 4px 18px rgba(0,0,0,0.15), 0 1px 0 rgba(255,255,255,0.18) inset;
          transition: all 0.3s ease;
        }
        .footer-logo-wrap:hover {
          background: rgba(255,255,255,0.20);
          box-shadow: 0 8px 26px rgba(0,0,0,0.20), 0 1px 0 rgba(255,255,255,0.25) inset;
        }

        .footer-social-icon {
          background: rgba(255,255,255,0.10);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.20);
          box-shadow: 0 2px 10px rgba(0,0,0,0.12);
          transition: all 0.30s cubic-bezier(0.22,1,0.36,1);
        }
        .footer-social-icon:hover {
          background: rgba(255,255,255,0.24);
          border-color: rgba(255,255,255,0.40);
          transform: translateY(-3px) scale(1.08);
          box-shadow: 0 8px 20px rgba(0,0,0,0.20);
        }

        .footer-bottom-link {
          transition: all 0.25s ease;
          padding: 6px 12px;
          border-radius: 6px;
        }
        .footer-bottom-link:hover {
          background: rgba(255,255,255,0.10);
          color: #fff;
        }

        .footer-halo {
          background: radial-gradient(
            ellipse 70% 60% at 70% 50%,
            rgba(255,255,255,0.04) 0%,
            transparent 70%
          );
        }

       .newsletter-popup-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.32);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  z-index: 9999;
  animation: newsletterFadeIn 0.28s ease;
}

.newsletter-popup-card {
  width: 100%;
  max-width: 460px;
  border-radius: 24px;
  padding: 30px 28px;
  background: rgba(255,255,255,0.92);
  backdrop-filter: blur(22px) saturate(160%);
  -webkit-backdrop-filter: blur(22px) saturate(160%);
  border: 1px solid rgba(255,255,255,0.72);
  box-shadow:
    0 24px 80px rgba(15,23,42,0.16),
    0 1px 0 rgba(255,255,255,0.85) inset;
  animation: newsletterPopIn 0.32s cubic-bezier(0.22,1,0.36,1);
  position: relative;
  overflow: hidden;
}

.newsletter-popup-icon {
  width: 62px;
  height: 62px;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 18px;
}

.newsletter-popup-success {
  background: linear-gradient(135deg, rgba(16,185,129,0.16), rgba(5,150,105,0.10));
  border: 1px solid rgba(16,185,129,0.18);
}

.newsletter-popup-info {
  background: linear-gradient(135deg, rgba(59,130,246,0.16), rgba(37,99,235,0.10));
  border: 1px solid rgba(59,130,246,0.18);
}

.newsletter-popup-error {
  background: linear-gradient(135deg, rgba(239,68,68,0.14), rgba(220,38,38,0.10));
  border: 1px solid rgba(239,68,68,0.18);
}

.newsletter-popup-button {
  background: rgba(26, 95, 122, 1);
  border: 1px solid rgba(255,255,255,0.2);
  box-shadow:
    0 8px 24px rgba(26,95,122,0.24),
    0 1px 0 rgba(255,255,255,0.20) inset;
  transition: all 0.3s cubic-bezier(0.22,1,0.36,1);
}

.newsletter-popup-button:hover {
  transform: translateY(-1px);
}

@keyframes newsletterFadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes newsletterPopIn {
  from {
    opacity: 0;
    transform: translateY(18px) scale(0.97);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
} 
      `}</style>
{newsletterPopup.open && (
  <div className="newsletter-popup-overlay" onClick={closeNewsletterPopup}>
    <div
      className="newsletter-popup-card"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        onClick={closeNewsletterPopup}
        className="absolute right-4 top-4 rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
        aria-label={t.popupClose}
      >
        <X className="h-4 w-4" />
      </button>

      <div
        className={`newsletter-popup-icon ${
          newsletterPopup.type === "success"
            ? "newsletter-popup-success"
            : newsletterPopup.type === "info"
            ? "newsletter-popup-info"
            : "newsletter-popup-error"
        }`}
      >
        {newsletterPopup.type === "success" ? (
          <CheckCircle2 className="h-8 w-8 text-emerald-600" />
        ) : newsletterPopup.type === "info" ? (
          <Info className="h-8 w-8 text-blue-600" />
        ) : (
          <XCircle className="h-8 w-8 text-red-500" />
        )}
      </div>

      <h3
        className="text-2xl font-bold text-slate-900"
        style={{ fontFamily: "Literata, serif" }}
      >
        {newsletterPopup.title}
      </h3>

      <div
        className="mt-3 h-[2px] w-10 rounded-full"
        style={{ background: "linear-gradient(90deg, #1a5f7a, #7dd3fc)" }}
      />

      <p
        className="mt-5 text-sm leading-7 text-slate-600"
        style={{ fontFamily: "Literata, serif" }}
      >
        {newsletterPopup.message}
      </p>

      <div className="mt-7 flex justify-end">
        <button
          type="button"
          onClick={closeNewsletterPopup}
          className="newsletter-popup-button rounded-[12px] px-5 py-3 text-sm font-semibold text-white"
          style={{ fontFamily: "Literata, serif" }}
        >
          {t.popupClose}
        </button>
      </div>
    </div>
  </div>
)}

      <div className="footer-halo pointer-events-none absolute inset-0 z-0" />

      <img
        src={leftTopMain}
        alt=""
        aria-hidden="true"
        className="shape-left-top pointer-events-none absolute -left-2 top-0 z-0 hidden w-[250px] opacity-80 md:block lg:w-[300px] xl:w-[360px]"
      />

      <img
        src={leftBottomShape}
        alt=""
        aria-hidden="true"
        className="shape-left-bottom pointer-events-none absolute bottom-0 left-0 z-0 hidden w-[220px] opacity-80 md:block lg:w-[270px] xl:w-[320px]"
      />

      <img
        src={rightShape}
        alt=""
        aria-hidden="true"
        className="shape-right pointer-events-none absolute bottom-0 right-0 z-0 hidden w-[320px] opacity-80 md:block lg:w-[430px] xl:w-[560px]"
      />

      <div className="page-container relative z-10 py-14 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.15fr_1.15fr_1fr] xl:gap-14">
          <div className={`footer-entry footer-col-1 ${visible ? "show" : ""}`}>
            <div className="flex items-center gap-4">
              <div className="footer-logo-wrap flex h-16 w-16 items-center justify-center rounded-xl">
                <img
                  src={logo}
                  alt="Basogol Hive"
                  className="h-11 w-auto object-contain"
                />
              </div>
              <div>
                <h3
                  className="text-xl font-semibold notranslate"
                  translate="no"
                  style={{ fontFamily: "Literata, serif" }}
                >
                  Basogol-Hive
                </h3>
                <p className="text-sm text-white/70">{t.brandSubtitle}</p>
              </div>
            </div>

            <ul
              className="mt-8 space-y-3 text-[15px] font-medium text-white/85"
              style={{ fontFamily: "Literata, serif" }}
            >
              {t.navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="footer-list-item inline-block transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={`footer-entry footer-col-2 ${visible ? "show" : ""}`}>
            <h4
              className="footer-col-title text-[18px] font-semibold"
              style={{ fontFamily: "Literata, serif" }}
            >
              {t.marketingTitle}
            </h4>
            <ul
              className="mt-5 space-y-3 text-sm leading-6 text-white/80"
              style={{ fontFamily: "Literata, serif" }}
            >
              {t.marketingItems.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="footer-list-item inline-block text-white/80 transition hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={`footer-entry footer-col-3 ${visible ? "show" : ""}`}>
            <h4
              className="footer-col-title text-[18px] font-semibold"
              style={{ fontFamily: "Literata, serif" }}
            >
              {t.technologyTitle}
            </h4>
            <ul
              className="mt-5 space-y-3 text-sm leading-6 text-white/80"
              style={{ fontFamily: "Literata, serif" }}
            >
              {t.technologyItems.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="footer-list-item inline-block text-white/80 transition hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={`footer-entry footer-col-4 ${visible ? "show" : ""}`}>
            <h4
              className="footer-col-title text-[18px] font-semibold"
              style={{ fontFamily: "Literata, serif" }}
            >
              {t.newsletterText}
            </h4>

            <form
              onSubmit={handleNewsletterSubmit}
              className="mt-5 flex flex-col gap-3"
            >
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder={t.inputPlaceholder}
                className="footer-input h-12 w-full rounded-[10px] px-4 text-sm"
                style={{ fontFamily: "Literata, serif" }}
                required
              />

              <button
                type="submit"
                disabled={newsletterLoading}
                className="footer-subscribe-btn w-full rounded-[10px] py-3 text-sm font-semibold text-white"
                style={{ fontFamily: "Literata, serif" }}
              >
                {newsletterLoading ? t.newsletterLoading : t.subscribeButton}
              </button>
            </form>

            <div className="footer-divider my-7" />

            <div className="flex items-center gap-3">
              {t.socialLinks.map((item) => {
                const Icon = socialIcons[item.label];
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className="footer-social-icon flex h-11 w-11 items-center justify-center rounded-full text-white"
                    aria-label={item.label}
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-14">
          <div className="footer-divider" />
          <div className="mt-5 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <p
              className="text-xs text-white/55"
              style={{ fontFamily: "Literata, serif" }}
            >
              {t.copyright}
            </p>

            <div className="flex items-center gap-1">
              {t.bottomLinks.map((item) => {
                const Icon = socialIcons[item.label];
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className="footer-bottom-link inline-flex items-center gap-2 text-xs text-white/60 hover:text-white"
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span style={{ fontFamily: "Literata, serif" }}>
                      {item.label}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
    
  );
};

export default FooterSection;