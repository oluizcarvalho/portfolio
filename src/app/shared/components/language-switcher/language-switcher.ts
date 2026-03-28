import { Component, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  template: `
    <button
      class="lang-toggle"
      (click)="toggleLanguage()"
      [attr.aria-label]="'Switch to ' + (currentLang() === 'en' ? 'Portuguese' : 'English')"
    >
      <span class="lang-flag">{{ currentLang() === 'en' ? '🇧🇷' : '🇺🇸' }}</span>
      <span class="lang-code">{{ currentLang() === 'en' ? 'PT' : 'EN' }}</span>
    </button>
  `,
  styles: `
    @use 'styles/variables' as *;
    @use 'styles/breakpoints' as *;

    .lang-toggle {
      display: flex;
      align-items: center;
      gap: $space-xs;
      padding: $space-xs $space-sm;
      border-radius: $radius-full;
      border: 1px solid $border-subtle;
      color: $text-primary;
      font-size: $font-size-sm;
      font-weight: 500;
      transition: all $transition-base;
      background: transparent;

      &:hover {
        border-color: $border-hover;
        color: $text-heading;
      }
    }

    .lang-flag {
      font-size: 1rem;
    }

    .lang-code {
      font-family: $font-family-mono;
      font-size: $font-size-xs;
      letter-spacing: 1px;
    }
  `,
})
export class LanguageSwitcherComponent {
  currentLang = signal('en');

  constructor(private translate: TranslateService) {
    const saved = typeof localStorage !== 'undefined' ? localStorage.getItem('lang') : null;
    const lang = saved || 'en';
    this.currentLang.set(lang);
    this.translate.use(lang);
  }

  toggleLanguage(): void {
    const next = this.currentLang() === 'en' ? 'pt-br' : 'en';
    this.currentLang.set(next);
    this.translate.use(next);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('lang', next);
    }
  }
}
