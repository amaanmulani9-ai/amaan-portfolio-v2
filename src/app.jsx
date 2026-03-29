import ReactLenis from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react";
import isMobile from "./utils/isMobile";

import Preloader      from "./components/Preloader";
import RibbonCursor   from "./components/RibbonCursor";
import ScrollProgress from "./components/ScrollProgress";
import Navbar         from "./sections/Navbar";
import Hero           from "./sections/Hero";
import About          from "./sections/About";
import Projects       from "./sections/Projects";
import Experience     from "./sections/Experience";
import Contact        from "./sections/Contact";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const orbRef    = useRef(null);
  const [preloadDone, setPreloadDone] = useState(false);
  const [mobileLayout, setMobileLayout] = useState(() => isMobile());

  useEffect(() => {
    const handleResize = () => {
      setMobileLayout(isMobile());
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useGSAP(() => {
    if (!preloadDone) return;

    // Page-load curtain lift — fires after preloader completes
    gsap.to("#page-cover", {
      scaleY: 0,
      transformOrigin: "top",
      duration: 1.1,
      ease: "power4.inOut",
      delay: 0.1,
    });

    // Global orb travels right → left as user scrolls
    if (!mobileLayout) {
      gsap.to(orbRef.current, {
        left: "-10%",
        top: "70%",
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 3,
        },
      });
    }
  }, { dependencies: [preloadDone, mobileLayout] });

  return (
    <>
      {/* Preloader — unmounts itself via opacity but stays in DOM briefly */}
      {!preloadDone && (
        <Preloader onComplete={() => setPreloadDone(true)} />
      )}

      <ReactLenis
        root
        options={
          mobileLayout
            ? {
                duration: 1,
                smoothWheel: false,
                syncTouch: true,
                touchMultiplier: 1,
              }
            : {
                lerp: 0.07,
                duration: 1.5,
                smoothTouch: false,
              }
        }
      >
        {!mobileLayout && <ScrollProgress />}

        {/* Page cover */}
        <div id="page-cover" style={{
          position: "fixed", inset: 0,
          background: "var(--charcoal)",
          zIndex: 999999,
          transformOrigin: "bottom",
        }} />

        {/* Global ambient orb */}
        <div
          ref={orbRef}
          style={{
            position: "fixed",
            left: mobileLayout ? "68%" : "85%",
            top: mobileLayout ? "18%" : "20%",
            transform: "translate(-50%, -50%)",
            width: mobileLayout ? 440 : 800,
            height: mobileLayout ? 440 : 800,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,191,73,0.11) 0%, rgba(255,140,61,0.04) 42%, transparent 70%)",
            pointerEvents: "none",
            zIndex: 0,
            willChange: "left, top",
          }}
        />

        <RibbonCursor />
        <Navbar />

        <main style={{ position: "relative", zIndex: 1 }}>
          <Hero />
          <About />
          <Projects />
          <Experience />
          <Contact />
        </main>
      </ReactLenis>
    </>
  );
};

export default App;
