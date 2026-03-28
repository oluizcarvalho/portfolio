import { Component, input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-section-header',
  standalone: true,
  imports: [TranslateModule],
  template: `
    <div class="section-header">
      <h2 class="section-title">{{ titleKey() | translate }}</h2>
      @if (subtitleKey()) {
        <p class="section-subtitle">{{ subtitleKey() | translate }}</p>
      }
      <div class="section-divider">
        <span class="divider-line"></span>
        <span class="divider-dot"></span>
        <span class="divider-line"></span>
      </div>
    </div>
  `,
  styles: `
    @use 'styles/variables' as *;
    @use 'styles/mixins' as *;

    .section-header {
      text-align: center;
      margin-bottom: $space-3xl;
    }

    .section-title {
      font-size: $font-size-4xl;
      font-weight: 800;
      @include gradient-text;
      margin-bottom: $space-sm;
    }

    .section-subtitle {
      color: $text-secondary;
      font-size: $font-size-lg;
      max-width: 600px;
      margin: 0 auto;
    }

    .section-divider {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: $space-sm;
      margin-top: $space-lg;
    }

    .divider-line {
      width: 40px;
      height: 2px;
      background: $gradient-primary;
      border-radius: $radius-full;
    }

    .divider-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: $accent-violet;
    }
  `,
})
export class SectionHeaderComponent {
  titleKey = input.required<string>();
  subtitleKey = input<string>('');
}
