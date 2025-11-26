
document.addEventListener("DOMContentLoaded", () => {

  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);


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


  const profileImage = document.querySelector('.hero-profile-img');

  if (profileImage) {

    gsap.to(profileImage, {
      y: "+=20",
      rotation: 0.5,
      duration: 4,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1
    });

    
    gsap.from(profileImage, {
      opacity: 0,
      scale: 0.8,
      duration: 1.5,
      delay: 0.5,
      ease: "power3.out"
    });
  }

  const heroTL = gsap.timeline({ defaults: { duration: 1.2, ease: "power3.out" } });

  heroTL.from(".greeting-text", { y: 20, opacity: 0, duration: 0.8 });

  heroTL.from(".hero-title-main .line", {
    y: 50,
    opacity: 0,
    stagger: 0.15,
  }, "<0.1");

  heroTL.from(".primary-cta-btn", { y: 20, opacity: 0 }, "<0.4");


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


  const header = document.querySelector(".site-header");
  let lastScroll = 0;

  ScrollTrigger.create({
    trigger: "body",
    start: "top -50",
    onUpdate: (self) => {
      const current = self.scroll();

      if (current > lastScroll && current > 50) {
        header.classList.add("hidden");
      } else {
        header.classList.remove("hidden");
      }
      lastScroll = current;

      if (current > 50) {
        header.classList.add("scrolled-header");
      } else {
        header.classList.remove("scrolled-header");
      }
    }
  });


  document.querySelectorAll(".section-block").forEach(section => {

    const children = section.querySelectorAll(".section-title, .section-text, .section-link, .skill-item, .testimonial-card, .large-greeting-text, .large-email-text");

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

  
    const aboutContent = section.querySelectorAll(".about-content-col p, .about-content-col a, .download-links-group a");
    gsap.from(aboutContent, {
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        toggleActions: "play none none none",
      },
      y: 50,
      opacity: 0,
      scale: 0.98,
      duration: 1.2,
      stagger: 0.15,
      delay: 0.2, 
      ease: "power3.out",
    });


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


    if (section.id === "contact") {
      gsap.from(section.querySelectorAll(".social-icon-link"), {
        scrollTrigger: {
          trigger: section,
          start: "center 85%",
          toggleActions: "play none none none",
        },
        y: 30,
        opacity: 1,
        scale: 0.9,
        duration: 0.9,
        stagger: 0.15,
        ease: "back.out(1.7)"
      });
    }
  });


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


  const projContainer = document.getElementById("projects-container");
  if (projContainer) {
    const projects = [
      {
        title: "Flavor Pairer", desc: "A clean, minimalist platform with filter animations.", tag: "HTML", repoUrl: "https://github.com/Takshsingh313/The-flavor-Pairer",
        imageUrl: "assets/images/flavor.png"
      },
      {
        title: "Probability Simulator", desc: "High-fidelity 3D renderings and fly-throughs.", tag: "JavaScript", repoUrl: "https://github.com/Takshsingh313/Probability-Simulator",
        imageUrl: "assets/images/logo.png"
      },
      {
        title: "ScrollFolio", desc: "A fan-made spin on a classic, bold and loud.", tag: "HTML", repoUrl: "https://github.com/Takshsingh313/Scrollfolio",
        imageUrl: "assets/images/newlogo.png",
      }
    ];

    projContainer.innerHTML = projects.map(p => `
        <a href="${p.repoUrl}" target="_blank" class="work-card">
          <div class="work-img-container"> <img src="${p.imageUrl}" alt="${p.title} Logo" class="work-img-logo">
          </div>
          <div class="work-details">
            <p class="work-desc">${p.tag}</p>
            <h3 class="work-title">${p.title}</h3>
          </div>
       </a>
      `).join("");
  }

  const skillsContainer = document.getElementById("skills-container");
  if (skillsContainer) {

    const skillsData = [
      { name: "Capcut Pro", icon: "fas fa-video", color: "#32C8C8" },
      { name: "Da Vinci Resolve", icon: "fas fa-camera", color: "#FF6154" },
      { name: "Java", icon: "fab fa-java", color: "#E05050" },
      { name: "C Language", icon: "fas fa-cuttlefish", color: "#555D87" },
      { name: "HTML", icon: "fab fa-html5", color: "#E44D26" },
      { name: "UI/UX Design", icon: "fas fa-bezier-curve", color: "#9354FF" },
      { name: "GSAP", icon: "fas fa-bolt", color: "#88CE02" },
      { name: "CSS", icon: "fab fa-css3-alt", color: "#1572B6" }
    ];

    skillsContainer.innerHTML = skillsData.map(s => `
      <div class="skill-item" style="border-color: ${s.color}66;">
        <i class="skill-icon ${s.icon}" style="color: ${s.color};"></i>
        <div class="skill-name">${s.name}</div>
      </div>
    `).join("");
  }

  const workCards = document.querySelectorAll(".work-card");

  const handleCardParallax = (e) => {
    const card = e.currentTarget;
    const img = card.querySelector(".work-img-logo");

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
    const img = e.currentTarget.querySelector(".work-img-logo");

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



  const chatBtn = document.querySelector(".chat-contact-btn");
  if (chatBtn) {

    chatBtn.style.transition = "transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease, color 0.3s ease";

    gsap.set(chatBtn, {
      bottom: "auto",
      top: "120px", 
      right: "30px",
      autoAlpha: 1
    });

    gsap.to(chatBtn, {
      top: "calc(100vh - 100px)", 
      ease: "none", 
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1, 
      }
    });
  }


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
