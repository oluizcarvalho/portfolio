import { Component, signal, afterNextRender, DestroyRef, inject } from '@angular/core';

@Component({
  selector: 'app-scroll-to-top',
  standalone: true,
  template: `
    @if (visible()) {
      <button class="scroll-top" (click)="scrollToTop()" aria-label="Scroll to top">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
      </button>
    }
  `,
  styles: `
    @use 'styles/variables' as *;

    .scroll-top {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: $gradient-primary;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: $z-modal;
      transition: all $transition-base;
      box-shadow: $glow-violet;
      animation: fadeInUp 0.3s ease-out;

      &:hover {
        transform: translateY(-3px);
        box-shadow: 0 0 30px rgba(108, 99, 255, 0.5);
      }
    }
  `,
})
export class ScrollToTopComponent {
  visible = signal(false);
  private destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      const handler = () => this.visible.set(window.scrollY > 500);
      window.addEventListener('scroll', handler, { passive: true });
      this.destroyRef.onDestroy(() => window.removeEventListener('scroll', handler));
    });
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
