// Mobile nav toggle
const toggle = document.getElementById("nav-toggle");
const links = document.getElementById("nav-links");

if (toggle && links) {
  toggle.addEventListener("click", () => {
    toggle.classList.toggle("open");
    links.classList.toggle("open");
  });
}

// Scroll observer for fade-up animations
const fadeNodes = document.querySelectorAll(".fade-up");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (fadeNodes.length) {
  if (!reduceMotion && "IntersectionObserver" in window) {
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

    fadeNodes.forEach((node) => observer.observe(node));
  } else {
    fadeNodes.forEach((node) => node.classList.add("visible"));
  }
}

// Nav background on scroll
const nav = document.getElementById("nav");

if (nav) {
  const updateNavBackground = () => {
    nav.style.background =
      window.scrollY > 40 ? "rgba(11,13,26,0.97)" : "rgba(11,13,26,0.88)";
  };

  updateNavBackground();
  window.addEventListener("scroll", updateNavBackground, { passive: true });
}
