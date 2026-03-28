import { Component, ElementRef, viewChild, afterNextRender, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ParticlesBgComponent } from './particles-bg/particles-bg';
import { AnimationService } from '../../core/services/animation.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [TranslateModule, ParticlesBgComponent],
  template: `
    <section id="hero" class="hero">
      <app-particles-bg />

      <div class="hero-content" #heroContent>
        <p class="hero-greeting">{{ 'hero.greeting' | translate }}</p>
        <h1 class="hero-name" #heroName>Luiz Carvalho</h1>
        <p class="hero-role" #heroRole>{{ 'hero.role' | translate }}</p>

        <div class="hero-social" #heroSocial>
          <a href="https://github.com/oluizcarvalho" target="_blank" rel="noopener noreferrer" aria-label="GitHub" class="social-link">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/oluizcarvalho" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" class="social-link">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <a href="mailto:luizandre.ita&#64;gmail.com" aria-label="Email" class="social-link">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2"></rect>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
            </svg>
          </a>
        </div>

        <a class="hero-cta" (click)="scrollToProjects()">
          {{ 'hero.cta' | translate }}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M7 17l9.2-9.2M17 17V7.8H7.8"/>
          </svg>
        </a>
      </div>

      <div class="scroll-indicator" #scrollIndicator>
        <div class="scroll-mouse">
          <div class="scroll-wheel"></div>
        </div>
        <span>{{ 'hero.scrollDown' | translate }}</span>
      </div>
    </section>
  `,
  styles: `
    @use 'styles/variables' as *;
    @use 'styles/mixins' as *;
    @use 'styles/breakpoints' as *;

    .hero {
      position: relative;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      background: radial-gradient(ellipse at 50% 50%, rgba(108, 99, 255, 0.08) 0%, transparent 70%);
    }

    .hero-content {
      position: relative;
      z-index: $z-content;
      text-align: center;
      padding: $space-xl;
    }

    .hero-greeting {
      font-size: $font-size-lg;
      color: $accent-cyan;
      font-weight: 500;
      margin-bottom: $space-sm;
      opacity: 0;
    }

    .hero-name {
      font-size: $font-size-hero;
      font-weight: 800;
      @include gradient-text;
      line-height: 1.1;
      margin-bottom: $space-md;
      opacity: 0;
    }

    .hero-role {
      font-size: $font-size-xl;
      color: $text-secondary;
      font-weight: 400;
      margin-bottom: $space-2xl;
      font-family: $font-family-mono;
      opacity: 0;

      @include mobile {
        font-size: $font-size-base;
      }
    }

    .hero-social {
      display: flex;
      justify-content: center;
      gap: $space-lg;
      margin-bottom: $space-2xl;
      opacity: 0;
    }

    .social-link {
      color: $text-secondary;
      padding: $space-sm;
      border-radius: 50%;
      border: 1px solid $border-subtle;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all $transition-base;

      &:hover {
        color: $accent-cyan;
        border-color: $accent-cyan;
        box-shadow: $glow-cyan;
        transform: translateY(-3px);
      }
    }

    .hero-cta {
      display: inline-flex;
      align-items: center;
      gap: $space-sm;
      padding: $space-sm $space-xl;
      border-radius: $radius-full;
      font-weight: 600;
      font-size: $font-size-base;
      color: $text-heading;
      cursor: pointer;
      transition: all $transition-base;
      @include gradient-border;
      opacity: 0;

      &:hover {
        background: rgba(108, 99, 255, 0.1);
        transform: translateY(-2px);
      }
    }

    .scroll-indicator {
      position: absolute;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: $space-sm;
      opacity: 0;
      z-index: $z-content;

      span {
        font-size: $font-size-xs;
        color: $text-secondary;
        text-transform: uppercase;
        letter-spacing: 2px;
      }
    }

    .scroll-mouse {
      width: 24px;
      height: 38px;
      border: 2px solid $text-secondary;
      border-radius: 12px;
      display: flex;
      justify-content: center;
      padding-top: 6px;
    }

    .scroll-wheel {
      width: 3px;
      height: 8px;
      background: $accent-violet;
      border-radius: $radius-full;
      animation: bounce 2s infinite;
    }
  `,
})
export class HeroComponent {
  private heroContent = viewChild.required<ElementRef>('heroContent');
  private heroName = viewChild.required<ElementRef>('heroName');
  private heroSocial = viewChild.required<ElementRef>('heroSocial');
  private scrollIndicator = viewChild.required<ElementRef>('scrollIndicator');
  private animationService = inject(AnimationService);

  constructor() {
    afterNextRender(() => {
      this.animationService.registerPlugins();
      this.initAnimations();
    });
  }

  private async initAnimations(): Promise<void> {
    const content = this.heroContent().nativeElement;
    const greeting = content.querySelector('.hero-greeting') as HTMLElement;
    const name = this.heroName().nativeElement;
    const role = content.querySelector('.hero-role') as HTMLElement;
    const social = this.heroSocial().nativeElement;
    const cta = content.querySelector('.hero-cta') as HTMLElement;
    const scroll = this.scrollIndicator().nativeElement;

    const gsapModule = await import('gsap');
    const gsapInstance = gsapModule.gsap;
    const tl = gsapInstance.timeline({ defaults: { ease: 'power3.out' } });

    tl.to(greeting, { opacity: 1, y: 0, duration: 0.6 }, 0.3)
      .fromTo(name, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, 0.6)
      .to(role, { opacity: 1, duration: 0.6 }, 1.0)
      .to(social, { opacity: 1, y: 0, duration: 0.6 }, 1.3)
      .to(cta, { opacity: 1, y: 0, duration: 0.5 }, 1.5)
      .to(scroll, { opacity: 1, duration: 0.5 }, 1.8);
  }

  scrollToProjects(): void {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  }
}
