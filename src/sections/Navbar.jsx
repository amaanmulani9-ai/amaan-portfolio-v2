import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Link } from "react-scroll";
import MagneticBtn from "../components/MagneticBtn";
import { profile, socials } from "../constants";

const sections = [
  { id: "home", label: "home" },
  { id: "about", label: "summary" },
  { id: "projects", label: "projects" },
  { id: "experience", label: "education" },
  { id: "contact", label: "contact" },
];

const Navbar = () => {
  const panelRef = useRef(null);
  const linksRef = useRef([]);
  const metaRef = useRef(null);
  const tlRef = useRef(null);
  const iconTopRef = useRef(null);
  const iconBotRef = useRef(null);
  const iconTl = useRef(null);
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);

  useGSAP(() => {
    gsap.set(panelRef.current, { yPercent: -100 });
    gsap.set([...linksRef.current.filter(Boolean), metaRef.current], {
      autoAlpha: 0,
      y: 24,
    });

    tlRef.current = gsap
      .timeline({ paused: true })
      .to(panelRef.current, {
        yPercent: 0,
        duration: 0.75,
        ease: "power4.inOut",
      })
      .to(
        linksRef.current.filter(Boolean),
        {
          autoAlpha: 1,
          y: 0,
          stagger: 0.06,
          duration: 0.55,
          ease: "power3.out",
        },
        "-=0.35"
      )
      .to(
        metaRef.current,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.45,
          ease: "power3.out",
        },
        "-=0.25"
      );

    iconTl.current = gsap
      .timeline({ paused: true })
      .to(iconTopRef.current, {
        rotate: 45,
        y: 4,
        duration: 0.3,
        ease: "power2.inOut",
      })
      .to(
        iconBotRef.current,
        {
          rotate: -45,
          y: -4,
          duration: 0.3,
          ease: "power2.inOut",
        },
        "<"
      );
  }, []);

  useEffect(() => {
    let lastScroll = 0;

    const onScroll = () => {
      const currentScroll = window.scrollY;
      setVisible(currentScroll < lastScroll || currentScroll < 60);
      lastScroll = currentScroll;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggle = () => {
    if (open) {
      tlRef.current.reverse();
      iconTl.current.reverse();
    } else {
      tlRef.current.play();
      iconTl.current.play();
    }

    setOpen((value) => !value);
  };

  return (
    <>
      <div
        ref={panelRef}
        className="fixed inset-0 z-50 flex flex-col px-8 md:px-16"
        style={{
          background:
            "linear-gradient(180deg, rgba(4,2,1,0.992) 0%, rgba(12,7,3,0.992) 100%)",
          paddingTop: 88,
          paddingBottom: 40,
          overflow: "hidden",
        }}
      >
        <nav className="flex flex-col justify-center flex-1 gap-0 min-h-0">
          {sections.map((section, index) => (
            <div
              key={section.id}
              ref={(element) => {
                linksRef.current[index] = element;
              }}
              className="border-b"
              style={{ borderColor: "rgba(240,237,230,0.06)" }}
            >
              <Link
                to={section.id}
                smooth
                offset={-60}
                duration={1600}
                onClick={toggle}
                className="group flex items-center justify-between cursor-none"
                style={{ padding: "12px 0" }}
                data-cursor
              >
                <span className="index-num mr-6 shrink-0">{String(index + 1).padStart(2, "0")}</span>
                <span
                  className="flex-1 uppercase transition-colors duration-300 group-hover:text-lime"
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "clamp(28px, 5.5vw, 72px)",
                    lineHeight: 1,
                    color: "#F0EDE6",
                  }}
                >
                  {section.label}
                </span>
                <span
                  className="text-lime opacity-0 group-hover:opacity-100 transition-all duration-300 shrink-0"
                  style={{ fontSize: "clamp(16px, 2vw, 24px)" }}
                >
                  {"->"}
                </span>
              </Link>
            </div>
          ))}
        </nav>

        <div
          ref={metaRef}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 shrink-0"
          style={{ paddingTop: 24, borderTop: "1px solid rgba(240,237,230,0.06)" }}
        >
          <div>
            <p className="label text-muted mb-3">Socials</p>
            <div className="flex flex-wrap gap-5">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="label transition-all duration-300"
                  style={{ color: "rgba(240,237,230,0.4)" }}
                  onMouseEnter={(event) => {
                    event.target.style.color = "var(--lime)";
                    event.target.style.letterSpacing = "0.26em";
                  }}
                  onMouseLeave={(event) => {
                    event.target.style.color = "rgba(240,237,230,0.4)";
                    event.target.style.letterSpacing = "0.2em";
                  }}
                >
                  {social.name} {"->"}
                </a>
              ))}
            </div>
          </div>
          <p className="label text-muted">© 2026 {profile.fullName}</p>
        </div>
      </div>

      <header
        className="fixed top-0 left-0 right-0 z-[60] flex items-center justify-between px-8 md:px-16 py-5 transition-transform duration-500"
        style={{
          transform: visible ? "translateY(0)" : "translateY(-110%)",
          background: "transparent",
        }}
      >
        <div className="label" style={{ color: "rgba(240,237,230,0.6)" }}>
          {profile.brand}
        </div>

        <MagneticBtn strength={0.45}>
          <button
            onClick={toggle}
            className="w-11 h-11 rounded-full flex flex-col items-center justify-center gap-[5px] border transition-all duration-300"
            style={{
              background: open ? "var(--lime)" : "var(--dim)",
              borderColor: open ? "var(--lime)" : "rgba(240,237,230,0.1)",
              cursor: "none",
            }}
            data-cursor
          >
            <span
              ref={iconTopRef}
              className="block w-5 h-px rounded-full origin-center"
              style={{
                background: open ? "var(--charcoal)" : "#F0EDE6",
                transition: "background 0.3s",
              }}
            />
            <span
              ref={iconBotRef}
              className="block w-5 h-px rounded-full origin-center"
              style={{
                background: open ? "var(--charcoal)" : "#F0EDE6",
                transition: "background 0.3s",
              }}
            />
          </button>
        </MagneticBtn>
      </header>
    </>
  );
};

export default Navbar;
