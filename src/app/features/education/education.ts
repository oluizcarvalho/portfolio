import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [TranslateModule, SectionHeaderComponent],
  template: `
    <section id="education" class="education">
      <app-section-header titleKey="education.title" subtitleKey="education.subtitle" />

      <div class="education-card">
        <div class="edu-icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
            <path d="M6 12v5c0 1.66 2.69 3 6 3s6-1.34 6-3v-5"/>
          </svg>
        </div>
        <div class="edu-info">
          <h3 class="edu-university">{{ 'education.ufu.university' | translate }}</h3>
          <p class="edu-degree">{{ 'education.ufu.degree' | translate }} - {{ 'education.ufu.field' | translate }}</p>
          <span class="edu-period">{{ 'education.ufu.period' | translate }}</span>
        </div>
      </div>
    </section>
  `,
  styles: `
    @use 'styles/variables' as *;
    @use 'styles/mixins' as *;
    @use 'styles/breakpoints' as *;

    .education {
      @include section-padding;
    }

    .education-card {
      @include glass-card;
      padding: $space-2xl;
      max-width: 600px;
      margin: 0 auto;
      display: flex;
      gap: $space-xl;
      align-items: center;
      transition: all $transition-base;

      &:hover {
        border-color: $border-hover;
        transform: translateY(-2px);
      }

      @include mobile {
        flex-direction: column;
        text-align: center;
        gap: $space-md;
      }
    }

    .edu-icon {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      background: rgba(108, 99, 255, 0.1);
      color: $accent-violet;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .edu-university {
      font-size: $font-size-xl;
      font-weight: 700;
      color: $text-heading;
      margin-bottom: $space-xs;
    }

    .edu-degree {
      font-size: $font-size-base;
      color: $text-primary;
      margin-bottom: $space-xs;
    }

    .edu-period {
      font-family: $font-family-mono;
      font-size: $font-size-sm;
      color: $accent-cyan;
    }
  `,
})
export class EducationComponent {}
