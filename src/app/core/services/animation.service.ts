import { Injectable } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Injectable({ providedIn: 'root' })
export class AnimationService {
  private registered = false;

  registerPlugins(): void {
    if (this.registered) return;
    gsap.registerPlugin(ScrollTrigger);
    this.registered = true;
  }

  createFadeSlideIn(
    element: HTMLElement,
    direction: 'left' | 'right' | 'up' | 'down' = 'up',
    trigger?: HTMLElement
  ): gsap.core.Tween {
    const dirs: Record<string, { x: number; y: number }> = {
      left: { x: -60, y: 0 },
      right: { x: 60, y: 0 },
      up: { x: 0, y: 60 },
      down: { x: 0, y: -60 },
    };
    const { x, y } = dirs[direction];
    return gsap.from(element, {
      x,
      y,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: trigger || element,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });
  }

  createStaggerIn(
    elements: HTMLElement[] | NodeListOf<Element>,
    delay = 0.1
  ): gsap.core.Tween {
    return gsap.from(elements, {
      y: 40,
      opacity: 0,
      duration: 0.6,
      stagger: delay,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: elements[0] || (elements as NodeListOf<Element>)[0],
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });
  }

  createTextReveal(element: HTMLElement): gsap.core.Timeline {
    const text = element.textContent || '';
    element.textContent = '';
    element.style.visibility = 'visible';
    const tl = gsap.timeline();

    text.split('').forEach((char) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.display = 'inline-block';
      span.style.opacity = '0';
      element.appendChild(span);
    });

    tl.from(element.children, {
      y: 20,
      opacity: 0,
      duration: 0.05,
      stagger: 0.03,
      ease: 'power2.out',
    });

    return tl;
  }
}
