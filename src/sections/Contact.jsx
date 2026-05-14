import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Marquee from "../components/Marquee";
import SplitLines from "../components/SplitLines";
import {
  contactMethods,
  marqueeTech,
  profile,
  resumeHighlights,
  socials,
} from "../constants";
import isMobile from "../utils/isMobile";

const ICONS = {
  GitHub: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  ),
  LinkedIn: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
};

const HANDLES = {
  GitHub: "amaanmulani9-ai",
  LinkedIn: "amaan-m-b51773312",
};

const primarySocials = socials.filter(
  (social) => social.name === "GitHub" || social.name === "LinkedIn"
);

const hiringActions = [
  {
    label: profile.resumeLabel,
    href: profile.resumeHref,
    download: profile.resumeFileName,
    primary: true,
  },
  {
    label: "View GitHub",
    href: primarySocials.find((social) => social.name === "GitHub")?.href,
    external: true,
  },
  {
    label: "LinkedIn",
    href: primarySocials.find((social) => social.name === "LinkedIn")?.href,
    external: true,
  },
].filter((item) => item.href);

const SocialCard = ({ social }) => {
  const cardRef = useRef(null);
  const arrowRef = useRef(null);

  const handleEnter = () => {
    gsap.to(cardRef.current, {
      y: -6,
      borderColor: "rgba(255,158,74,0.35)",
      boxShadow: "0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(244,194,79,0.12)",
      duration: 0.35,
      ease: "power3.out",
    });

    gsap.to(arrowRef.current, {
      x: 4,
      y: -4,
      opacity: 1,
      color: "var(--lime)",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleLeave = () => {
    gsap.to(cardRef.current, {
      y: 0,
      borderColor: "rgba(240,237,230,0.07)",
      boxShadow: "none",
      duration: 0.4,
      ease: "power3.out",
    });

    gsap.to(arrowRef.current, {
      x: 0,
      y: 0,
      opacity: 0.3,
      color: "#F0EDE6",
      duration: 0.35,
      ease: "power2.out",
    });
  };

  return (
    <a
      ref={cardRef}
      href={social.href}
      target="_blank"
      rel="noreferrer"
      data-cursor
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{
        display: "block",
        padding: "20px 24px",
        borderRadius: 16,
        background: "var(--dim)",
        border: "1px solid rgba(240,237,230,0.07)",
        textDecoration: "none",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: "rgba(244,194,79,0.08)",
              border: "1px solid rgba(255,158,74,0.18)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--lime)",
              flexShrink: 0,
            }}
          >
            {ICONS[social.name]}
          </div>

          <div>
            <p
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(18px,2vw,22px)",
                letterSpacing: "0.06em",
                color: "#F0EDE6",
                lineHeight: 1,
                marginBottom: 4,
              }}
            >
              {social.name}
            </p>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 12,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "rgba(240,237,230,0.3)",
                overflowWrap: "anywhere",
              }}
            >
              {HANDLES[social.name]}
            </p>
          </div>
        </div>

        <span
          ref={arrowRef}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 18,
            color: "#F0EDE6",
            opacity: 0.3,
            lineHeight: 1,
            flexShrink: 0,
            marginTop: 2,
          }}
        >
          {"->"}
        </span>
      </div>
    </a>
  );
};

const ContactCard = ({ method }) => (
  <a
    href={method.href}
    target={method.href.startsWith("http") ? "_blank" : undefined}
    rel={method.href.startsWith("http") ? "noreferrer" : undefined}
    className="rounded-xl p-5 block"
    style={{
      background: "var(--dim)",
      border: "1px solid rgba(240,237,230,0.07)",
      textDecoration: "none",
      transition: "border-color 0.3s, transform 0.3s",
    }}
    onMouseEnter={(event) => {
      event.currentTarget.style.borderColor = "rgba(255,158,74,0.35)";
      event.currentTarget.style.transform = "translateY(-3px)";
    }}
    onMouseLeave={(event) => {
      event.currentTarget.style.borderColor = "rgba(240,237,230,0.07)";
      event.currentTarget.style.transform = "translateY(0)";
    }}
  >
    <p className="label text-muted mb-3">{method.label}</p>
    <p style={{ color: "#F0EDE6", lineHeight: 1.7, overflowWrap: "anywhere" }}>{method.value}</p>
  </a>
);

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const pinnedRef = useRef(null);
  const bigTextRef = useRef(null);
  const dotRef = useRef(null);
  const actionsRef = useRef(null);
  const infoSectionRef = useRef(null);
  const footerRef = useRef(null);
  const [mobileLayout, setMobileLayout] = useState(() =>
    typeof window !== "undefined" ? isMobile() : false
  );

  useEffect(() => {
    const onResize = () => {
      setMobileLayout(isMobile());
    };

    onResize();
    window.addEventListener("resize", onResize);

    return () => window.removeEventListener("resize", onResize);
  }, []);

  useGSAP(() => {
    if (!mobileLayout) {
      ScrollTrigger.create({
        trigger: pinnedRef.current,
        start: "top top",
        end: "+=700",
        pin: true,
        pinSpacing: true,
      });

      gsap.to(bigTextRef.current, {
        yPercent: -12,
        ease: "none",
        scrollTrigger: {
          trigger: pinnedRef.current,
          start: "top top",
          end: "+=700",
          scrub: 1.5,
        },
      });
    }

    gsap.to(dotRef.current, {
      scale: 1.6,
      repeat: -1,
      yoyo: true,
      duration: 0.9,
      ease: "power1.inOut",
    });

    if (actionsRef.current) {
      gsap.fromTo(
        actionsRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: actionsRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    if (infoSectionRef.current) {
      gsap.fromTo(
        infoSectionRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: infoSectionRef.current,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    if (footerRef.current) {
      gsap.fromTo(
        footerRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 95%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, { dependencies: [mobileLayout] });

  return (
    <section
      id="contact"
      style={{
        background:
          "linear-gradient(180deg, rgba(5,3,1,0.995) 0%, rgba(14,8,3,0.985) 100%)",
      }}
    >
      <div
        ref={pinnedRef}
        className="flex min-h-[100svh] flex-col justify-between overflow-hidden px-5 py-12 pt-24 sm:px-8 md:min-h-screen md:px-16 md:py-16"
      >
        <Marquee
          items={marqueeTech}
          className="opacity-20 py-2"
          style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(16px,2vw,24px)" }}
        />

        <div ref={bigTextRef} className="flex min-h-[45svh] flex-1 items-center py-10 md:py-12" style={{ zIndex: 1 }}>
          <div className="max-w-4xl">
            <SplitLines
              text={`LET'S\nBUILD.`}
              className="display-xl text-offwhite uppercase leading-none select-none"
              trigger={false}
              delay={0}
            />
            <div className="mt-8 flex flex-wrap items-center gap-3 md:mt-10 md:gap-4">
              <div
                ref={dotRef}
                className="w-3 h-3 rounded-full"
                style={{ background: "var(--lime)", boxShadow: "0 0 12px rgba(244,194,79,0.6)" }}
              />
              <span className="label text-muted">{profile.availability}</span>
            </div>

            <p
              className="mt-6 max-w-2xl"
              style={{
                color: "rgba(240,237,230,0.48)",
                lineHeight: 1.8,
                fontSize: "clamp(15px,1.6vw,19px)",
              }}
            >
              If you are hiring for internships, entry-level roles, or freelance builds, the
              fastest next step is the resume download or a direct message on email or LinkedIn.
            </p>

            <div ref={actionsRef} className="mt-8 flex flex-wrap gap-3 md:mt-10 md:gap-4">
              {hiringActions.map((action) => (
                <a
                  key={action.label}
                  href={action.href}
                  target={action.external ? "_blank" : "_self"}
                  rel={action.external ? "noreferrer" : undefined}
                  download={action.download}
                  className="label inline-flex items-center gap-3 rounded-full px-5 py-3 transition-all duration-300"
                  style={{
                    color: action.primary ? "var(--charcoal)" : "rgba(240,237,230,0.54)",
                    background: action.primary
                      ? "linear-gradient(135deg, #ffd977 0%, #f4c24f 100%)"
                      : "rgba(240,237,230,0.02)",
                    border: action.primary
                      ? "1px solid rgba(255,217,119,0.85)"
                      : "1px solid rgba(240,237,230,0.08)",
                    boxShadow: action.primary ? "0 16px 40px rgba(244,194,79,0.18)" : "none",
                    textDecoration: "none",
                  }}
                  data-cursor
                >
                  {action.label} {"->"}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-end md:gap-6" style={{ zIndex: 1 }}>
          <div className="flex flex-wrap gap-4">
            {primarySocials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="label transition-all duration-300"
                style={{ color: "rgba(240,237,230,0.3)" }}
                onMouseEnter={(event) => {
                  event.target.style.color = "var(--lime)";
                  event.target.style.letterSpacing = "0.28em";
                }}
                onMouseLeave={(event) => {
                  event.target.style.color = "rgba(240,237,230,0.3)";
                  event.target.style.letterSpacing = "0.2em";
                }}
                data-cursor
              >
                {social.name} {"->"}
              </a>
            ))}
          </div>
          <a
            href={`mailto:${profile.email}`}
            className="label break-all transition-colors duration-300"
            style={{ color: "rgba(240,237,230,0.3)" }}
            onMouseEnter={(event) => {
              event.target.style.color = "var(--lime)";
            }}
            onMouseLeave={(event) => {
              event.target.style.color = "rgba(240,237,230,0.3)";
            }}
            data-cursor
          >
            {profile.email}
          </a>
        </div>
      </div>

      <div
        ref={infoSectionRef}
        className="px-5 py-20 sm:px-8 md:px-16 md:py-24"
        style={{ borderTop: "1px solid rgba(240,237,230,0.06)" }}
      >
        <div className="mb-12 flex items-center gap-4 md:mb-16">
          <span className="index-num">05</span>
          <div className="rule flex-1" />
          <span className="label text-muted">Hire</span>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-24">
          <div>
            <h3
              className="text-offwhite uppercase mb-6"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(32px,5vw,72px)",
                lineHeight: 1,
              }}
            >
              Hiring For Practical Full-Stack Work
            </h3>
            <p className="body-lg" style={{ color: "rgba(240,237,230,0.38)", lineHeight: 1.8 }}>
              I am looking for internships, entry-level roles, and freelance work where I can
              contribute across product UI, frontend execution, Python-backed systems, and
              shipping-focused delivery.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="label inline-flex items-center gap-3 rounded-full px-5 py-3"
                style={{
                  color: "var(--charcoal)",
                  background: "linear-gradient(135deg, #ffd977 0%, #f4c24f 100%)",
                  border: "1px solid rgba(255,217,119,0.85)",
                  textDecoration: "none",
                }}
                data-cursor
              >
                Email Me {"->"}
              </a>
              <a
                href={`tel:${profile.phone.replace(/\s+/g, "")}`}
                className="label inline-flex items-center gap-3 rounded-full px-5 py-3"
                style={{
                  color: "rgba(240,237,230,0.54)",
                  background: "rgba(240,237,230,0.02)",
                  border: "1px solid rgba(240,237,230,0.08)",
                  textDecoration: "none",
                }}
                data-cursor
              >
                Call {"->"}
              </a>
            </div>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {primarySocials.map((social) => (
                <SocialCard key={social.name} social={social} />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div
              className="rounded-2xl p-6"
              style={{
                background: "var(--dim)",
                border: "1px solid rgba(240,237,230,0.07)",
              }}
            >
              <span className="label text-muted">Direct contact</span>
              <div className="grid grid-cols-1 gap-3 mt-5">
                {contactMethods.map((method) => (
                  <ContactCard key={method.label} method={method} />
                ))}
              </div>
            </div>

            <div
              className="rounded-2xl p-6"
              style={{
                background: "var(--dim)",
                border: "1px solid rgba(240,237,230,0.07)",
              }}
            >
              <span className="label text-muted">Resume & recruiter notes</span>
              <h4
                className="text-offwhite uppercase mt-4"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "clamp(28px,3.6vw,44px)",
                  lineHeight: 1,
                }}
              >
                Ready To Review
              </h4>
              <p className="mt-4" style={{ color: "rgba(240,237,230,0.42)", lineHeight: 1.8 }}>
                The main resume action now downloads directly, while email remains open for
                follow-up questions, interviews, or requests for the latest version.
              </p>
              <ul className="mt-6 space-y-3">
                {resumeHighlights.map((highlight) => (
                  <li key={highlight} style={{ color: "rgba(240,237,230,0.54)", lineHeight: 1.7 }}>
                    {highlight}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={profile.resumeHref}
                  download={profile.resumeFileName}
                  className="inline-flex items-center gap-3 label"
                  style={{
                    color: "var(--charcoal)",
                    textDecoration: "none",
                    letterSpacing: "0.24em",
                    background: "linear-gradient(135deg, #ffd977 0%, #f4c24f 100%)",
                    border: "1px solid rgba(255,217,119,0.85)",
                    borderRadius: 999,
                    padding: "12px 18px",
                  }}
                  data-cursor
                >
                  {profile.resumeLabel} {"->"}
                </a>
                <a
                  href={profile.resumeRequestHref}
                  className="inline-flex items-center gap-3 label"
                  style={{
                    color: "rgba(240,237,230,0.48)",
                    textDecoration: "none",
                    letterSpacing: "0.22em",
                    border: "1px solid rgba(240,237,230,0.08)",
                    borderRadius: 999,
                    padding: "12px 18px",
                  }}
                  data-cursor
                >
                  Request Update {"->"}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={footerRef}
        className="flex flex-col items-center justify-between gap-3 px-5 py-8 text-center sm:px-8 md:flex-row md:gap-4 md:px-16 md:text-left"
        style={{ borderTop: "1px solid rgba(240,237,230,0.06)" }}
      >
        <span className="label text-muted">© 2026 {profile.fullName}</span>
        <span className="label text-muted">Built with React + GSAP + Lenis</span>
        <span className="label text-muted">{profile.location}</span>
      </div>
    </section>
  );
};

export default Contact;
