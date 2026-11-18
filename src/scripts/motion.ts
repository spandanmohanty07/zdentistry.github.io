import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// The inline head script adds .motion only when the user hasn't asked for reduced motion.
if (document.documentElement.classList.contains('motion')) {
  gsap.registerPlugin(ScrollTrigger);

  // Smooth wheel scrolling (touch keeps native scrolling); 80px offset matches the fixed header.
  const lenis = new Lenis({ anchors: { offset: -80 } });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // Homepage hero: text staggers in, image eases up with a gentle scale.
  const heroText = document.querySelectorAll('[data-hero-text] > *');
  const heroMedia = document.querySelector('[data-hero-media]');
  if (heroText.length) {
    gsap.timeline({ defaults: { ease: 'power3.out' } })
      .to(heroText, { opacity: 1, y: 0, duration: 0.8, stagger: 0.08 })
      .fromTo(heroMedia, { y: 40, scale: 0.96 }, { y: 0, scale: 1, duration: 1.1 }, 0.1);

    gsap.matchMedia().add('(min-width: 1024px)', () => {
      gsap.to('[data-hero-media] img', {
        yPercent: 8,
        ease: 'none',
        scrollTrigger: { trigger: heroMedia, start: 'top top', end: 'bottom top', scrub: true },
      });
    });
  }

  // Site-wide scroll reveals: section intros and grid items in every <main> section after the first.
  const candidates = document.querySelectorAll<HTMLElement>(
    'main > section:not(:first-child) .container-custom > :not(.grid), main > section:not(:first-child) .grid > *'
  );
  // Skip anything nested inside another revealed element so nothing animates twice.
  const targets = [...candidates].filter((el) => ![...candidates].some((p) => p !== el && p.contains(el)));

  gsap.set(targets, { opacity: 0, y: 32 });
  ScrollTrigger.batch(targets, {
    start: 'top 88%',
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1, overwrite: true }),
  });

  // Lazy images and opening FAQ <details> change page height; keep trigger positions accurate.
  window.addEventListener('load', () => ScrollTrigger.refresh());
  document.addEventListener('toggle', () => ScrollTrigger.refresh(), true);
}
