import { gsap, TimelineMax, TweenMax, Elastic } from "gsap";

// Function to select DOM elements with proper type annotation
const select = (s: string): HTMLElement | null => {
  return document.querySelector(s);
};

// Function to generate random numbers between min and max
function randomBetween(min: number, max: number): number {
  const number = Math.floor(Math.random() * (max - min + 1) + min);

  // Return the number, ensuring no 0 value is returned
  return number !== 0 ? number : 0.5;
}

// Create a new timeline
const tl = new TimelineMax();

// Loop to create and add tweens to the timeline
for (let i = 0; i < 20; i++) {
  const bubble = select(`.bubble${i}`);

  if (bubble) {
    const t = TweenMax.to(bubble, randomBetween(1, 1.5), {
      x: randomBetween(12, 15) * randomBetween(-1, 1),
      y: randomBetween(12, 15) * randomBetween(-1, 1),
      repeat: -1,
      repeatDelay: randomBetween(0.2, 0.5),
      yoyo: true,
      ease: Elastic.easeOut.config(1, 0.5),
    });

    tl.add(t, (i + 1) / 0.6);
  }
}

// Start the timeline at the 50th frame
tl.seek(50);
