// import { gsap } from "gsap";

// Function to select DOM elements with proper type annotation
const select = (selector: string): HTMLElement | null => {
  return document.querySelector(selector);
};

// Function to animate sections when they come into view
const animateSections = () => {
  // Create a GSAP timeline for animations
  const tl = gsap.timeline({ defaults: { duration: 1, ease: "power2.out" } });

  // Animate the profile section
  tl.from(".profile", {
    y: 50,
    opacity: 0,
    stagger: 0.3,
  });

  // Animate the experience section
  tl.from(".experience", {
    y: 50,
    opacity: 0,
    stagger: 0.3,
    delay: 0.5,
  });

  // Animate skill and hobbies sections
  tl.from(".section-wrapper", {
    x: -50,
    opacity: 0,
    stagger: 0.3,
    delay: 1,
  });

  // Optional: animate bubbles in the profile section
  gsap.fromTo(
    ".bubble0, .bubble1, .bubble2, .bubble3, .bubble4, .bubble5, .bubble6, .bubble7, .bubble8, .bubble9, .bubble10",
    { scale: 0.5, opacity: 0 },
    { scale: 1, opacity: 1, duration: 1.5, repeat: -1, yoyo: true }
  );
};

// Call the animation function when the page loads
window.addEventListener("load", animateSections);
