import {
  Directive,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
  input,
} from '@angular/core';
import { gsap } from 'gsap';

@Directive({
  selector: '[appTilt]',
})
export class TiltDirective {
  private readonly el = inject(ElementRef);
  private readonly destroyRef = inject(DestroyRef);

  maxRotation = input<number>(10);

  private onMouseMove?: (e: MouseEvent) => void;
  private onMouseLeave?: () => void;

  constructor() {
    afterNextRender(() => {
      const element = this.el.nativeElement as HTMLElement;
      const max = this.maxRotation();

      this.onMouseMove = (e: MouseEvent) => {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const percentX = (e.clientX - centerX) / (rect.width / 2);
        const percentY = (e.clientY - centerY) / (rect.height / 2);

        const rotateX = -percentY * max;
        const rotateY = percentX * max;

        gsap.to(element, {
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          duration: 0.3,
          ease: 'power2.out',
        });
      };

      this.onMouseLeave = () => {
        gsap.to(element, {
          transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
          duration: 0.5,
          ease: 'power2.out',
        });
      };

      element.addEventListener('mousemove', this.onMouseMove);
      element.addEventListener('mouseleave', this.onMouseLeave);

      this.destroyRef.onDestroy(() => {
        element.removeEventListener('mousemove', this.onMouseMove!);
        element.removeEventListener('mouseleave', this.onMouseLeave!);
      });
    });
  }
}
