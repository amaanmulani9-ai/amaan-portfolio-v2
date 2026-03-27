import { useRef } from "react";
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
  Instagram: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  ),
};

const HANDLES = {
  GitHub: "amaan0920",
  LinkedIn: "amaan-m-b51773312",
  Instagram: "@amaan.mulani_",
};

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
    <p style={{ color: "#F0EDE6", lineHeight: 1.7 }}>{method.value}</p>
  </a>
);

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const pinnedRef = useRef(null);
  const bigTextRef = useRef(null);
  const dotRef = useRef(null);
  const infoSectionRef = useRef(null);
  const footerRef = useRef(null);

  useGSAP(() => {
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

    gsap.to(dotRef.current, {
      scale: 1.6,
      repeat: -1,
      yoyo: true,
      duration: 0.9,
      ease: "power1.inOut",
    });

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
  });

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
        className="min-h-screen flex flex-col justify-between py-16 px-8 md:px-16 overflow-hidden"
      >
        <Marquee
          items={marqueeTech}
          className="opacity-20 py-2"
          style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(16px,2vw,24px)" }}
        />

        <div ref={bigTextRef} className="flex-1 flex items-center py-12" style={{ zIndex: 1 }}>
          <div>
            <SplitLines
              text={`LET'S\nCONNECT.`}
              className="display-xl text-offwhite uppercase leading-none select-none"
              trigger={false}
              delay={0}
            />
            <div className="mt-10 flex items-center gap-4">
              <div
                ref={dotRef}
                className="w-3 h-3 rounded-full"
                style={{ background: "var(--lime)", boxShadow: "0 0 12px rgba(244,194,79,0.6)" }}
              />
              <span className="label text-muted">{profile.availability}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6" style={{ zIndex: 1 }}>
          <div className="flex flex-wrap gap-4">
            {socials.map((social) => (
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
            className="label transition-colors duration-300"
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
        className="py-24 px-8 md:px-16"
        style={{ borderTop: "1px solid rgba(240,237,230,0.06)" }}
      >
        <div className="flex items-center gap-4 mb-16">
          <span className="index-num">05</span>
          <div className="rule flex-1" />
          <span className="label text-muted">Contact</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div>
            <h3
              className="text-offwhite uppercase mb-6"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(32px,5vw,72px)",
                lineHeight: 1,
              }}
            >
              Reach Out
            </h3>
            <p className="body-lg" style={{ color: "rgba(240,237,230,0.38)", lineHeight: 1.8 }}>
              If you want to discuss internships, entry-level opportunities, collaborations, or project work, the fastest way to reach Amaan is by email or phone.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <div style={{ width: 20, height: 1, background: "var(--lime)" }} />
              <a
                href={`mailto:${profile.email}`}
                className="label transition-colors duration-300"
                style={{ color: "rgba(240,237,230,0.4)" }}
                onMouseEnter={(event) => {
                  event.target.style.color = "var(--lime)";
                }}
                onMouseLeave={(event) => {
                  event.target.style.color = "rgba(240,237,230,0.4)";
                }}
                data-cursor
              >
                {profile.email}
              </a>
            </div>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {socials.map((social) => (
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
              <span className="label text-muted">Resume</span>
              <h4
                className="text-offwhite uppercase mt-4"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "clamp(28px,3.6vw,44px)",
                  lineHeight: 1,
                }}
              >
                Profile Summary
              </h4>
              <p className="mt-4" style={{ color: "rgba(240,237,230,0.42)", lineHeight: 1.8 }}>
                The live site references a resume, but no public PDF is currently available from that deployment. This section keeps the portfolio honest and points visitors to request the latest copy directly.
              </p>
              <ul className="mt-6 space-y-3">
                {resumeHighlights.map((highlight) => (
                  <li key={highlight} style={{ color: "rgba(240,237,230,0.54)", lineHeight: 1.7 }}>
                    {highlight}
                  </li>
                ))}
              </ul>
              <a
                href={profile.resumeHref}
                className="inline-flex items-center gap-3 mt-8 label"
                style={{
                  color: "var(--lime)",
                  textDecoration: "none",
                  letterSpacing: "0.24em",
                }}
                data-cursor
              >
                {profile.resumeLabel} {"->"}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={footerRef}
        className="px-8 md:px-16 py-8 flex flex-col md:flex-row items-center justify-between gap-4"
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
