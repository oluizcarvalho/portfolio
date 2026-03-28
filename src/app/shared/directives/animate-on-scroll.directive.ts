import {
  Directive,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
  input,
} from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimationService } from '../../core/services/animation.service';

@Directive({
  selector: '[appAnimateOnScroll]',
})
export class AnimateOnScrollDirective {
  private readonly el = inject(ElementRef);
  private readonly animationService = inject(AnimationService);
  private readonly destroyRef = inject(DestroyRef);

  animation = input<'fadeUp' | 'fadeLeft' | 'fadeRight' | 'scaleIn'>('fadeUp');
  delay = input<number>(0);
  duration = input<number>(0.8);

  private tween?: gsap.core.Tween;

  constructor() {
    afterNextRender(() => {
      this.animationService.registerPlugins();
      const element = this.el.nativeElement as HTMLElement;

      switch (this.animation()) {
        case 'fadeUp':
          this.tween = gsap.from(element, {
            y: 60,
            opacity: 0,
            duration: this.duration(),
            delay: this.delay(),
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          });
          break;

        case 'fadeLeft':
          this.tween = gsap.from(element, {
            x: -60,
            opacity: 0,
            duration: this.duration(),
            delay: this.delay(),
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          });
          break;

        case 'fadeRight':
          this.tween = gsap.from(element, {
            x: 60,
            opacity: 0,
            duration: this.duration(),
            delay: this.delay(),
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          });
          break;

        case 'scaleIn':
          this.tween = gsap.from(element, {
            scale: 0.8,
            opacity: 0,
            duration: this.duration(),
            delay: this.delay(),
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: element,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          });
          break;
      }

      this.destroyRef.onDestroy(() => {
        if (this.tween) {
          const st = this.tween.scrollTrigger;
          if (st) {
            st.kill();
          }
          this.tween.kill();
        }
      });
    });
  }
}
