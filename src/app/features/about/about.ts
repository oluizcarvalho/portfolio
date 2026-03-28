import { Component, afterNextRender, inject, ElementRef, viewChild } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header';
import { AnimationService } from '../../core/services/animation.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [TranslateModule, SectionHeaderComponent],
  template: `
    <section id="about" class="about" #aboutSection>
      <app-section-header titleKey="about.title" subtitleKey="about.subtitle" />

      <div class="about-grid">
        <div class="about-photo-wrapper">
          <div class="about-photo">
            <div class="photo-placeholder">
              <span class="photo-initials">LC</span>
            </div>
            <div class="photo-decoration"></div>
          </div>
        </div>

        <div class="about-info">
          <p class="about-bio">{{ 'about.bio' | translate }}</p>

          <div class="about-stats">
            <div class="stat-item">
              <span class="stat-number">6+</span>
              <span class="stat-label">{{ 'about.stats.yearsExp' | translate }}</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">28+</span>
              <span class="stat-label">{{ 'about.stats.projects' | translate }}</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">2</span>
              <span class="stat-label">{{ 'about.stats.companies' | translate }}</span>
            </div>
          </div>

          <a class="about-cv" href="mailto:luizandre.ita&#64;gmail.com">
            {{ 'about.downloadCv' | translate }}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M7 17l9.2-9.2M17 17V7.8H7.8"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  `,
  styles: `
    @use 'styles/variables' as *;
    @use 'styles/mixins' as *;
    @use 'styles/breakpoints' as *;

    .about {
      @include section-padding;
    }

    .about-grid {
      display: grid;
      grid-template-columns: 1fr 1.5fr;
      gap: $space-3xl;
      align-items: center;

      @include mobile {
        grid-template-columns: 1fr;
        gap: $space-2xl;
      }
    }

    .about-photo-wrapper {
      display: flex;
      justify-content: center;
    }

    .about-photo {
      position: relative;
      width: 280px;
      height: 280px;

      @include mobile {
        width: 200px;
        height: 200px;
      }
    }

    .photo-placeholder {
      width: 100%;
      height: 100%;
      border-radius: $radius-xl;
      background: $bg-secondary;
      border: 2px solid $border-subtle;
      @include flex-center;
      overflow: hidden;
    }

    .photo-initials {
      font-family: $font-family-mono;
      font-size: $font-size-5xl;
      font-weight: 800;
      @include gradient-text;
    }

    .photo-decoration {
      position: absolute;
      top: 12px;
      left: 12px;
      right: -12px;
      bottom: -12px;
      border: 2px solid $accent-violet;
      border-radius: $radius-xl;
      opacity: 0.3;
      z-index: -1;
    }

    .about-bio {
      font-size: $font-size-lg;
      line-height: 1.8;
      color: $text-primary;
      margin-bottom: $space-2xl;
    }

    .about-stats {
      display: flex;
      gap: $space-2xl;
      margin-bottom: $space-2xl;

      @include mobile {
        gap: $space-lg;
      }
    }

    .stat-item {
      text-align: center;
    }

    .stat-number {
      display: block;
      font-size: $font-size-4xl;
      font-weight: 800;
      @include gradient-text;
      line-height: 1;
    }

    .stat-label {
      font-size: $font-size-sm;
      color: $text-secondary;
      margin-top: $space-xs;
      display: block;
    }

    .about-cv {
      display: inline-flex;
      align-items: center;
      gap: $space-sm;
      padding: $space-sm $space-xl;
      border-radius: $radius-full;
      font-weight: 600;
      color: $text-heading;
      transition: all $transition-base;
      @include gradient-border;

      &:hover {
        background: rgba(108, 99, 255, 0.1);
        transform: translateY(-2px);
      }
    }
  `,
})
export class AboutComponent {
  private aboutSection = viewChild.required<ElementRef>('aboutSection');
  private animationService = inject(AnimationService);

  constructor() {
    afterNextRender(() => {
      this.animationService.registerPlugins();
      const el = this.aboutSection().nativeElement;
      this.animationService.createFadeSlideIn(el.querySelector('.about-grid'), 'up');
    });
  }
}
