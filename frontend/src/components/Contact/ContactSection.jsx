import React, { useEffect, useRef, useState } from "react";
import { useLanguage } from "../LanguageContext";
import polygonLeft from "../../assets/Polygon8.png";
import polygonRight from "../../assets/Polygon7.png";
import groupShape from "../../assets/Group14.png";
import {
  Mail,
  MapPin,
  Phone,
  ArrowUpRight,
  CheckCircle2,
  XCircle,
  X,
} from "lucide-react";
import { sendContactMessage } from "../../hooks/useFetchQuery";

const translations = {
  fr: {
    heroTitle: "Contactez-nous",
    heroDescription:
      "Parlez-nous de votre projet, de vos besoins ou de vos objectifs. Notre équipe vous accompagne avec une approche claire, créative et adaptée à votre ambition.",
    formPlaceholderEmail: "Email",
    formPlaceholderSubject: "Sujet",
    formPlaceholderDepartment: "Service",
    formPlaceholderLastName: "Nom",
    formPlaceholderFirstName: "Prénom",
    formPlaceholderMessage: "Votre message",
    departmentTech: "Technologie",
    departmentMarketing: "Marketing & Brand",
    contactTitle: "Restons en contact",
    contactDescription:
      "Nous sommes disponibles pour répondre à vos questions, échanger autour de votre projet et vous orienter vers la solution la plus adaptée à vos besoins.",
    emailLabel: "Email",
    locationLabel: "Adresse",
    phoneLabel: "Téléphone",
    emailValue: [
      {
        label: "Technologie",
        email: "projects-studio@basogolhive.com",
      },
      {
        label: "Marketing & Brand",
        email: "projects-studio@basogolhive.com",
      },
    ],
    locationValue: "Douala, Cameroun",
    phoneValue: "+237 692548739",
    bottomTitle: "Construisons quelque chose de fort ensemble",
    bottomDescription:
      "Chaque collaboration commence par une conversation simple. Faites-nous part de votre besoin et donnons forme à une solution utile, élégante et durable.",
    submitLabel: "Envoyer",
    sendingLabel: "Envoi...",
    successMessage: "Votre message a bien été envoyé.",
    errorMessage: "Une erreur est survenue. Veuillez réessayer.",
    replyDelay: "Nous vous répondons sous 24h",
    popupSuccessTitle: "Message envoyé",
    popupErrorTitle: "Une erreur est survenue",
    popupClose: "Fermer",
  },
  en: {
    heroTitle: "Get in touch",
    heroDescription:
      "Tell us about your project, your needs or your goals. Our team supports you with a clear, creative approach tailored to your ambition.",
    formPlaceholderEmail: "Email",
    formPlaceholderSubject: "Subject",
    formPlaceholderDepartment: "Department",
    formPlaceholderLastName: "Last name",
    formPlaceholderFirstName: "First name",
    formPlaceholderMessage: "Your message",
    departmentTech: "Technology",
    departmentMarketing: "Marketing & Brand",
    contactTitle: "Let's stay connected",
    contactDescription:
      "We are available to answer your questions, discuss your project and guide you toward the solution that best fits your needs.",
    emailLabel: "Email",
    locationLabel: "Location",
    phoneLabel: "Phone",
    emailValue: [
      {
        label: "Technology",
        email: "projects-tech@basogolhive.com",
      },
      {
        label: "Marketing & Brand",
        email: "projects-studio@basogolhive.com",
      },
    ],
    locationValue: "Kinshasa, DRC",
    phoneValue: "+243 000 000 000",
    bottomTitle: "Let's build something meaningful together",
    bottomDescription:
      "Every collaboration starts with a simple conversation. Share your need with us and let's shape a useful, elegant and lasting solution.",
    submitLabel: "Send",
    sendingLabel: "Sending...",
    successMessage: "Your message has been sent successfully.",
    errorMessage: "Something went wrong. Please try again.",
    replyDelay: "We reply within 24h",
    popupSuccessTitle: "Message sent",
    popupErrorTitle: "Something went wrong",
    popupClose: "Close",
  },
};

const inputClass = `
  w-full rounded-[10px] border border-[#d8eaf3]
  bg-white/70 backdrop-blur-sm
  px-4 py-3.5 text-sm text-slate-800
  outline-none placeholder:text-slate-400
  transition-all duration-300
  focus:border-[#1f6c8c] focus:bg-white
  focus:shadow-[0_0_0_3px_rgba(31,108,140,0.08)]
  hover:border-[#a8d4e8]
`;

const ContactSection = () => {
  const { lang } = useLanguage();
  const t = translations[lang] || translations.fr;

  const sectionRef = useRef(null);
  const departmentRef = useRef(null);

  const [visible, setVisible] = useState(false);
  const [isDepartmentOpen, setIsDepartmentOpen] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    department: "tech",
    lastName: "",
    firstName: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [popup, setPopup] = useState({
    open: false,
    type: "",
    message: "",
  });

  const departmentOptions = [
    { value: "tech", label: t.departmentTech },
    { value: "marketing", label: t.departmentMarketing },
  ];

  const selectedDepartment =
    departmentOptions.find((item) => item.value === formData.department) ||
    departmentOptions[0];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.08 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        departmentRef.current &&
        !departmentRef.current.contains(event.target)
      ) {
        setIsDepartmentOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const contactItems = [
    { icon: Mail, label: t.emailLabel, value: t.emailValue },
    { icon: MapPin, label: t.locationLabel, value: t.locationValue },
    { icon: Phone, label: t.phoneLabel, value: t.phoneValue },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      email: "",
      subject: "",
      department: "tech",
      lastName: "",
      firstName: "",
      message: "",
    });
    setIsDepartmentOpen(false);
  };

  const closePopup = () => {
    setPopup({ open: false, type: "", message: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    setPopup({ open: false, type: "", message: "" });

    try {
      await sendContactMessage({
        email: formData.email,
        subject: formData.subject,
        department: formData.department,
        last_name: formData.lastName,
        first_name: formData.firstName,
        message: formData.message,
        language: lang,
      });

      setPopup({
        open: true,
        type: "success",
        message: t.successMessage,
      });

      resetForm();
    } catch (error) {
      console.error(error);
      setPopup({
        open: true,
        type: "error",
        message: error.message || t.errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#f7f7f5] py-20 lg:py-28"
    >
      <style>{`
        .cs-fade-up {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.22,1,0.36,1);
        }
        .cs-fade-up.show { opacity: 1; transform: translateY(0); }

        .cs-fade-left {
          opacity: 0;
          transform: translateX(-24px);
          transition: opacity 0.85s ease 0.12s, transform 0.85s cubic-bezier(0.22,1,0.36,1) 0.12s;
        }
        .cs-fade-left.show { opacity: 1; transform: translateX(0); }

        .cs-fade-right {
          opacity: 0;
          transform: translateX(24px);
          transition: opacity 0.85s ease 0.22s, transform 0.85s cubic-bezier(0.22,1,0.36,1) 0.22s;
        }
        .cs-fade-right.show { opacity: 1; transform: translateX(0); }

        .cs-form-card {
          background: rgba(255,255,255,0.72);
          backdrop-filter: blur(20px) saturate(155%);
          -webkit-backdrop-filter: blur(20px) saturate(155%);
          border: 1px solid rgba(255,255,255,0.70);
          box-shadow:
            0 12px 48px rgba(31,108,140,0.10),
            0 1px 0 rgba(255,255,255,0.80) inset;
        }

        .cs-info-card {
          background: linear-gradient(135deg, rgba(31,108,140,0.90) 0%, rgba(42,144,184,0.88) 100%);
          backdrop-filter: blur(20px) saturate(160%);
          -webkit-backdrop-filter: blur(20px) saturate(160%);
          border: 1px solid rgba(255,255,255,0.22);
          box-shadow:
            0 16px 52px rgba(31,108,140,0.22),
            0 1px 0 rgba(255,255,255,0.18) inset;
        }

        .cs-info-card::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: radial-gradient(ellipse 70% 50% at 80% 20%, rgba(255,255,255,0.10) 0%, transparent 60%);
          pointer-events: none;
        }

        .cs-contact-item {
          background: rgba(255,255,255,0.12);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.20);
          box-shadow: 0 2px 10px rgba(0,0,0,0.08), 0 1px 0 rgba(255,255,255,0.18) inset;
          transition: all 0.32s cubic-bezier(0.22,1,0.36,1);
        }

        .cs-contact-item:hover {
          background: rgba(255,255,255,0.22);
          transform: translateX(4px);
          box-shadow: 0 6px 18px rgba(0,0,0,0.12), 0 1px 0 rgba(255,255,255,0.25) inset;
        }

        .cs-icon-wrap {
          background: rgba(255,255,255,0.18);
          border: 1px solid rgba(255,255,255,0.28);
          flex-shrink: 0;
        }

        .cs-submit {
          background: linear-gradient(135deg, #1f6c8c 0%, #2a90b8 100%);
          border: 1px solid rgba(255,255,255,0.20);
          box-shadow:
            0 6px 20px rgba(31,108,140,0.32),
            0 1px 0 rgba(255,255,255,0.22) inset;
          transition: all 0.35s cubic-bezier(0.22,1,0.36,1);
        }

        .cs-submit:hover {
          transform: translateY(-2px);
          box-shadow:
            0 12px 30px rgba(31,108,140,0.42),
            0 1px 0 rgba(255,255,255,0.28) inset;
        }

        .cs-submit:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .cs-bottom-card {
          background: rgba(255,255,255,0.55);
          backdrop-filter: blur(16px) saturate(145%);
          -webkit-backdrop-filter: blur(16px) saturate(145%);
          border: 1px solid rgba(255,255,255,0.65);
          box-shadow: 0 8px 32px rgba(31,108,140,0.08), 0 1px 0 rgba(255,255,255,0.75) inset;
        }

        .cs-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(31,108,140,0.15), transparent);
        }

        .cs-label {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #64748b;
          margin-bottom: 6px;
          display: block;
          font-family: Literata, serif;
        }

        .cs-popup-overlay {
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
          animation: csFadeIn 0.28s ease;
        }

        .cs-popup-card {
          width: 100%;
          max-width: 460px;
          border-radius: 24px;
          padding: 30px 28px;
          background: rgba(255,255,255,0.78);
          backdrop-filter: blur(22px) saturate(160%);
          -webkit-backdrop-filter: blur(22px) saturate(160%);
          border: 1px solid rgba(255,255,255,0.72);
          box-shadow:
            0 24px 80px rgba(31,108,140,0.18),
            0 1px 0 rgba(255,255,255,0.85) inset;
          animation: csPopIn 0.32s cubic-bezier(0.22,1,0.36,1);
          position: relative;
          overflow: hidden;
        }

        .cs-popup-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at top right, rgba(42,144,184,0.14), transparent 42%);
          pointer-events: none;
        }

        .cs-popup-icon {
          width: 62px;
          height: 62px;
          border-radius: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 18px;
          box-shadow: 0 10px 24px rgba(31,108,140,0.16);
        }

        .cs-popup-success {
          background: linear-gradient(135deg, rgba(16,185,129,0.16), rgba(5,150,105,0.10));
          border: 1px solid rgba(16,185,129,0.18);
        }

        .cs-popup-error {
          background: linear-gradient(135deg, rgba(239,68,68,0.14), rgba(220,38,38,0.10));
          border: 1px solid rgba(239,68,68,0.18);
        }

        .cs-popup-button {
          background: linear-gradient(135deg, #1f6c8c 0%, #2a90b8 100%);
          border: 1px solid rgba(255,255,255,0.2);
          box-shadow:
            0 8px 24px rgba(31,108,140,0.28),
            0 1px 0 rgba(255,255,255,0.20) inset;
          transition: all 0.3s cubic-bezier(0.22,1,0.36,1);
        }

        .cs-popup-button:hover {
          transform: translateY(-1px);
          box-shadow:
            0 12px 30px rgba(31,108,140,0.35),
            0 1px 0 rgba(255,255,255,0.24) inset;
        }

        .cs-select-dropdown {
          background: rgba(255,255,255,0.88);
          backdrop-filter: blur(18px) saturate(160%);
          -webkit-backdrop-filter: blur(18px) saturate(160%);
          border: 1px solid rgba(255,255,255,0.78);
          box-shadow:
            0 18px 40px rgba(31,108,140,0.14),
            0 1px 0 rgba(255,255,255,0.75) inset;
          animation: csPopIn 0.22s cubic-bezier(0.22,1,0.36,1);
        }

        .cs-select-option {
          color: #1e293b;
          background: transparent;
          font-family: Literata, serif;
        }

        .cs-select-option:hover {
          background: rgba(31,108,140,0.08);
        }

        .cs-select-option-active {
          background: linear-gradient(135deg, rgba(31,108,140,0.14), rgba(42,144,184,0.10));
          color: #0f172a;
          font-weight: 700;
        }

        @keyframes csFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes csPopIn {
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

      {popup.open && (
        <div className="cs-popup-overlay" onClick={closePopup}>
          <div className="cs-popup-card" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={closePopup}
              className="absolute right-4 top-4 rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
              aria-label={t.popupClose}
            >
              <X className="h-4 w-4" />
            </button>

            <div
              className={`cs-popup-icon ${
                popup.type === "success" ? "cs-popup-success" : "cs-popup-error"
              }`}
            >
              {popup.type === "success" ? (
                <CheckCircle2 className="h-8 w-8 text-emerald-600" />
              ) : (
                <XCircle className="h-8 w-8 text-red-500" />
              )}
            </div>

            <h3
              className="text-2xl font-bold text-slate-900"
              style={{ fontFamily: "Literata, serif" }}
            >
              {popup.type === "success"
                ? t.popupSuccessTitle
                : t.popupErrorTitle}
            </h3>

            <div
              className="mt-3 h-[2px] w-10 rounded-full"
              style={{ background: "linear-gradient(90deg, #1f6c8c, #a8d4e8)" }}
            />

            <p
              className="mt-5 text-sm leading-7 text-slate-600"
              style={{ fontFamily: "Literata, serif" }}
            >
              {popup.message}
            </p>

            <div className="mt-7 flex justify-end">
              <button
                type="button"
                onClick={closePopup}
                className="cs-popup-button rounded-[12px] px-5 py-3 text-sm font-semibold text-white"
                style={{ fontFamily: "Literata, serif" }}
              >
                {t.popupClose}
              </button>
            </div>
          </div>
        </div>
      )}

      <img
        src={polygonLeft}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-[-20px] top-[20px] hidden w-[470px] max-w-none opacity-60 lg:block"
      />
      <img
        src={polygonRight}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-30px] right-[-10px] hidden w-[520px] max-w-none opacity-60 lg:block"
      />
      <img
        src={groupShape}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-[90px] top-[360px] hidden w-[120px] max-w-none opacity-10 lg:block"
      />

      <div className="page-container relative z-10">
        <div className={`cs-fade-up max-w-[560px] ${visible ? "show" : ""}`}>
          <h2
            className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl"
            style={{ fontFamily: "Literata, serif" }}
          >
            {t.heroTitle}
          </h2>
          <div
            className="mt-4 h-[2px] w-10 rounded-full"
            style={{ background: "linear-gradient(90deg, #1f6c8c, #a8d4e8)" }}
          />
          <p
            className="mt-5 max-w-[500px] text-sm leading-7 text-slate-500 sm:text-[15px]"
            style={{ fontFamily: "Literata, serif" }}
          >
            {t.heroDescription}
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
          <div
            className={`cs-fade-left cs-form-card rounded-[20px] p-7 sm:p-8 ${
              visible ? "show" : ""
            }`}
          >
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="cs-label">{t.formPlaceholderEmail}</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="vous@email.com"
                    className={inputClass}
                    required
                  />
                </div>

                <div>
                  <label className="cs-label">{t.formPlaceholderSubject}</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder={t.formPlaceholderSubject}
                    className={inputClass}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="cs-label">{t.formPlaceholderLastName}</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder={t.formPlaceholderLastName}
                    className={inputClass}
                    required
                  />
                </div>

                <div>
                  <label className="cs-label">
                    {t.formPlaceholderFirstName}
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder={t.formPlaceholderFirstName}
                    className={inputClass}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="cs-label">{t.formPlaceholderMessage}</label>
                <textarea
                  rows={5}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t.formPlaceholderMessage}
                  className={inputClass}
                  style={{ resize: "none" }}
                  required
                />
              </div>
 <div>
                <label className="cs-label">
                  {t.formPlaceholderDepartment}
                </label>

                <div className="relative" ref={departmentRef}>
                  <button
                    type="button"
                    onClick={() => setIsDepartmentOpen((prev) => !prev)}
                    className={`${inputClass} flex w-full items-center justify-between pr-4 text-left`}
                  >
                    <span>{selectedDepartment.label}</span>

                    <svg
                      className={`h-4 w-4 text-[#1f6c8c] transition-transform duration-300 ${
                        isDepartmentOpen ? "rotate-180" : ""
                      }`}
                      viewBox="0 0 20 20"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M5 7.5L10 12.5L15 7.5"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  {isDepartmentOpen && (
                    <div className="cs-select-dropdown absolute left-0 right-0 top-[calc(100%+8px)] z-30 overflow-hidden rounded-[14px]">
                      {departmentOptions.map((option) => {
                        const isActive = formData.department === option.value;

                        return (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => {
                              setFormData((prev) => ({
                                ...prev,
                                department: option.value,
                              }));
                              setIsDepartmentOpen(false);
                            }}
                            className={`cs-select-option w-full px-4 py-3 text-left text-sm transition ${
                              isActive ? "cs-select-option-active" : ""
                            }`}
                          >
                            {option.label}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
              <div className="cs-divider" />

              <div className="flex items-center justify-between">
                <p
                  className="text-[11px] text-slate-400"
                  style={{ fontFamily: "Literata, serif" }}
                >
                  {t.replyDelay}
                </p>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="cs-submit inline-flex items-center gap-2 rounded-[10px] px-6 py-3 text-sm font-semibold text-white"
                  style={{ fontFamily: "Literata, serif" }}
                >
                  {isSubmitting ? t.sendingLabel : t.submitLabel}
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>

          <div
            className={`cs-fade-right cs-info-card relative overflow-hidden rounded-[20px] p-7 sm:p-8 ${
              visible ? "show" : ""
            }`}
          >
            <h3
              className="text-2xl font-bold text-white sm:text-3xl"
              style={{ fontFamily: "Literata, serif" }}
            >
              {t.contactTitle}
            </h3>

            <div
              className="mt-2 h-[2px] w-8 rounded-full"
              style={{ background: "rgba(255,255,255,0.35)" }}
            />

            <p
              className="mt-5 text-sm leading-7 text-white/78 sm:text-[15px]"
              style={{ fontFamily: "Literata, serif" }}
            >
              {t.contactDescription}
            </p>

            <div className="mt-8 space-y-3">
              {contactItems.map(({ icon: Icon, label, value }, i) => (
                <div
                  key={i}
                  className="cs-contact-item flex items-center gap-4 rounded-[12px] px-4 py-3.5"
                >
                  <div className="cs-icon-wrap flex h-9 w-9 items-center justify-center rounded-[8px]">
                    <Icon className="h-4 w-4 text-white" />
                  </div>

                  <div>
                    <div
                      className="text-[10px] font-semibold uppercase tracking-widest text-white/50"
                      style={{ fontFamily: "Literata, serif" }}
                    >
                      {label}
                    </div>

                    <div
  className="mt-0.5 text-sm font-medium text-white/90"
  style={{ fontFamily: "Literata, serif" }}
>
  {Array.isArray(value) ? (
    <div className="space-y-3 notranslate" translate="no">
      {value.map((item, index) => (
        <div key={index}>
          <div
            className="text-sm font-semibold text-white notranslate"
            style={{ fontFamily: "Literata, serif" }}
            translate="no"
          >
            {item.label}
          </div>
          <div
            className="text-sm text-white/80 notranslate"
            style={{ fontFamily: "Literata, serif" }}
            translate="no"
          >
            {item.email}
          </div>
        </div>
      ))}
    </div>
  ) : (
    <span className="notranslate" translate="no">
      {value}
    </span>
  )}
</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pointer-events-none absolute -bottom-10 -right-10 opacity-10">
              <svg width="180" height="180" viewBox="0 0 180 180" fill="none">
                <circle cx="90" cy="90" r="80" stroke="white" strokeWidth="1" />
                <circle cx="90" cy="90" r="55" stroke="white" strokeWidth="1" />
                <circle cx="90" cy="90" r="30" stroke="white" strokeWidth="1" />
              </svg>
            </div>
          </div>
        </div>

        <div
          className={`cs-fade-up cs-bottom-card mt-8 rounded-[20px] p-8 sm:p-10 ${
            visible ? "show" : ""
          }`}
          style={{ transitionDelay: "0.3s" }}
        >
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12">
            <div>
              <h3
                className="text-2xl font-bold leading-tight text-slate-900 sm:text-3xl"
                style={{ fontFamily: "Literata, serif" }}
              >
                {t.bottomTitle}
              </h3>
              <p
                className="mt-4 max-w-[520px] text-sm leading-7 text-slate-500 sm:text-[15px]"
                style={{ fontFamily: "Literata, serif" }}
              >
                {t.bottomDescription}
              </p>
            </div>

            <div className="hidden lg:flex items-center gap-3">
              {[Mail, Phone, MapPin].map((Icon, i) => (
                <div
                  key={i}
                  className="flex h-12 w-12 items-center justify-center rounded-full"
                  style={{
                    background: "rgba(31,108,140,0.08)",
                    border: "1px solid rgba(31,108,140,0.14)",
                  }}
                >
                  <Icon className="h-4 w-4 text-[#1f6c8c]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;