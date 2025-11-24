/* animations.js — Final Code with Enhancements */
document.addEventListener("DOMContentLoaded", () => {

  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  /* ===============================
    LAYOUT ENHANCEMENT: Background Parallax
  =============================== */
  // Subtle background parallax effect
  gsap.to("body", {
    scrollTrigger: {
      trigger: "body",
      start: "top top",
      end: "bottom top",
      scrub: 1,
    },
    y: -150,
    ease: "none"
  });


  /* ===============================
    HERO ENTRANCE (Timeline for controlled staging)
  =============================== */
  const heroTL = gsap.timeline({ defaults: { duration: 1.2, ease: "power3.out" } });

  // 1. Initial greeting appears
  heroTL.from(".greeting-text", { y: 20, opacity: 0, duration: 0.8 });

  // 2. Main title lines appear staggered
  heroTL.from(".hero-title .line", {
    y: 50,
    opacity: 0,
    stagger: 0.15,
  }, "<0.1");

  // 3. CTA button slides in
  heroTL.from(".primary-cta-btn", { y: 20, opacity: 0 }, "<0.4");


  /* ===============================
    HERO TITLE PARALLAX / FADE ON SCROLL
  =============================== */
  gsap.to(".hero-content", {
    scrollTrigger: {
      trigger: "#hero",
      start: "top top",
      end: "bottom top",
      scrub: 0.8,
    },
    y: -80,
    opacity: 0.2,
    ease: "none"
  });

  /* ===============================
    HEADER VISUALS (Hide/Show & Accent Border)
  =============================== */
  const header = document.querySelector(".site-header");
  let lastScroll = 0;

  ScrollTrigger.create({
    trigger: "body",
    start: "top -50",
    onUpdate: (self) => {
      // Logic for hiding/showing the header
      const current = self.scroll();

      if (current > lastScroll && current > 50) {
        header.classList.add("hidden");
      } else {
        header.classList.remove("hidden");
      }
      lastScroll = current;

      // Logic for adding accent border
      if (current > 50) {
        header.classList.add("scrolled-header");
      } else {
        header.classList.remove("scrolled-header");
      }
    }
  });


  /* ===============================
    SECTION REVEALS (Fade, Slide, and Scale)
  =============================== */
  document.querySelectorAll(".section-block").forEach(section => {
    // Targets all main content (social icons excluded for visibility check)
    const children = section.querySelectorAll(".section-title, .section-text, .section-link, .skill-item, .testimonial-card");

    gsap.from(children, {
      scrollTrigger: {
        trigger: section,
        start: "top 85%",
        toggleActions: "play none none none",
      },
      y: 50,
      opacity: 0,
      scale: 0.98,
      duration: 1.2,
      stagger: 0.1,
      ease: "power3.out"
    });

    // Special animation for work cards
    gsap.from(section.querySelectorAll(".work-card"), {
      scrollTrigger: {
        trigger: section.querySelector(".projects-grid"),
        start: "top 85%",
        toggleActions: "play none none none",
      },
      y: 80,
      opacity: 0,
      scale: 0.95,
      duration: 1.4,
      stagger: 0.15,
      ease: "power3.out"
    });
  });


  /* ===============================
    SMOOTH SCROLL ON NAV BUTTONS
  =============================== */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;

      gsap.to(window, {
        duration: 0.9,
        scrollTo: { y: target, offsetY: 80 },
        ease: "power3.inOut"
      });
    });
  });


  /* ===============================
    PROJECTS & SKILLS (Dynamic Injection)
  =============================== */
  const projContainer = document.getElementById("projects-container");
  if (projContainer) {
    const projects = [
      { title: "Custom E-Commerce Platform", desc: "A clean, minimalist platform with filter animations.", tag: "UX/Frontend" },
      { title: "Architectural Visualization", desc: "High-fidelity 3D renderings and fly-throughs.", tag: "3D/Motion" },
      { title: "Fan Edition Car Design", desc: "A fan-made spin on a classic, bold and loud.", tag: "CAD/Design" },
      { title: "Honda Civic Modification", desc: "From budget find to weekend cruiser—modified my 2008 Honda Civic.", tag: "Design/Engineering" },
    ];

    projContainer.innerHTML = projects.map(p => `
        <a href="#" class="work-card">
          <div class="work-img" style="background-color:#2a2a2a;"></div>
          <p class="work-desc">${p.tag}</p>
          <h3 class="work-title">${p.title}</h3>
        </a>
      `).join("");
  }


  const skillsContainer = document.getElementById("skills-container");
  if (skillsContainer) {
    const skills = [
      "SolidWorks", "Ansys", "After Effects",
      "Framer", "UI/UX Design", "GSAP", "Tailwind CSS", "React"
    ];

    skillsContainer.innerHTML = skills.map(s => `
        <div class="skill-item">${s}</div>
      `).join("");
  }


  /* ===============================
    WORK CARD PARALLAX HOVER EFFECT
  =============================== */
  const workCards = document.querySelectorAll(".work-card");

  const handleCardParallax = (e) => {
    const card = e.currentTarget;
    const img = card.querySelector(".work-img");

    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const moveX = (e.clientX - centerX) / 10;
    const moveY = (e.clientY - centerY) / 10;

    gsap.to(img, {
      x: moveX,
      y: moveY,
      rotationX: moveY / 2,
      rotationY: -moveX / 2,
      duration: 0.8,
      ease: "power2.out"
    });
  };

  const resetCardParallax = (e) => {
    const img = e.currentTarget.querySelector(".work-img");

    gsap.to(img, {
      x: 0,
      y: 0,
      rotationX: 0,
      rotationY: 0,
      duration: 0.6,
      ease: "power2.out"
    });
  };

  workCards.forEach(card => {
    card.addEventListener("mousemove", handleCardParallax);
    card.addEventListener("mouseleave", resetCardParallax);
  });


  /* ===============================
    BACK TO TOP BUTTON
  =============================== */
  const backToTopBtn = document.querySelector(".back-to-top");
  if (backToTopBtn) {

    window.addEventListener("scroll", () => {
      backToTopBtn.style.opacity = window.pageYOffset > 300 ? "0.8" : "0";
    });

    backToTopBtn.addEventListener("click", () => {
      gsap.to(window, {
        duration: 0.8,
        scrollTo: 0,
        ease: "power2.out"
      });
    });
  }

});