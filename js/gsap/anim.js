// js/gsap/anim.js
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// Respect reduced motion
const prefersReduced = () =>
  window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Simple text splitter (no paid plugin)
function splitLine(el) {
  const text = el.textContent;
  el.textContent = "";
  const frag = document.createDocumentFragment();
  for (const ch of text) {
    const span = document.createElement("span");
    span.className = "char";
    span.textContent = ch;
    frag.appendChild(span);
  }
  el.appendChild(frag);
  return el.querySelectorAll(".char");
}

export function heroIntro() {
  if (prefersReduced()) return;
  const lines = document.querySelectorAll(".hero__title-line");
  lines.forEach(splitLine);

  const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
  tl.from(".main-nav", { y: -20, autoAlpha: 0, duration: 0.4 })
    .from(".hero__title-line .char", { yPercent: 100, duration: 0.5, stagger: 0.015 }, "<")
    .from(".hero__subtitle", { autoAlpha: 0, y: 10, duration: 0.4 }, "-=0.2")
    .from(".hero__cta a", { autoAlpha: 0, y: 12, stagger: 0.08, duration: 0.4 }, "-=0.1");
}

export function cardsReveal() {
  const cards = gsap.utils.toArray(".artist-card");
  cards.forEach(card => {
    gsap.from(card, {
      autoAlpha: 0,
      y: 20,
      duration: prefersReduced() ? 0.001 : 0.5,
      scrollTrigger: { trigger: card, start: "top 80%" }
    });
  });
}
