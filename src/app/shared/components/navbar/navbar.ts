import { Component, signal, inject, afterNextRender, DestroyRef } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageSwitcherComponent } from '../language-switcher/language-switcher';
import { ScrollService } from '../../../core/services/scroll.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [TranslateModule, LanguageSwitcherComponent],
  template: `
    <nav class="navbar" [class.scrolled]="scrolled()">
      <div class="navbar-container">
        <a class="navbar-logo" (click)="scrollTo('hero')">
          <span class="logo-text">LC</span>
        </a>

        <ul class="navbar-links" [class.open]="menuOpen()">
          @for (link of navLinks; track link.id) {
            <li>
              <a
                class="nav-link"
                [class.active]="scrollService.activeSection() === link.id"
                (click)="scrollTo(link.id)"
              >
                {{ link.labelKey | translate }}
              </a>
            </li>
          }
          <li class="nav-lang-mobile">
            <app-language-switcher />
          </li>
        </ul>

        <div class="navbar-actions">
          <app-language-switcher />
          <button
            class="hamburger"
            [class.active]="menuOpen()"
            (click)="menuOpen.set(!menuOpen())"
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>

    @if (menuOpen()) {
      <div class="menu-overlay" (click)="menuOpen.set(false)"></div>
    }
  `,
  styles: `
    @use 'styles/variables' as *;
    @use 'styles/mixins' as *;
    @use 'styles/breakpoints' as *;

    .navbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: $z-navbar;
      padding: $space-md $space-lg;
      transition: all $transition-base;

      &.scrolled {
        background: rgba($bg-tertiary, 0.9);
        backdrop-filter: blur(12px);
        border-bottom: 1px solid $border-subtle;
        padding: $space-sm $space-lg;
      }
    }

    .navbar-container {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .navbar-logo {
      cursor: pointer;
    }

    .logo-text {
      font-family: $font-family-mono;
      font-size: $font-size-2xl;
      font-weight: 700;
      @include gradient-text;
    }

    .navbar-links {
      display: flex;
      gap: $space-xl;
      align-items: center;

      @include mobile {
        position: fixed;
        top: 0;
        right: -100%;
        width: 280px;
        height: 100vh;
        flex-direction: column;
        background: $bg-secondary;
        padding: $space-5xl $space-xl $space-xl;
        gap: $space-lg;
        transition: right $transition-base;
        border-left: 1px solid $border-subtle;
        z-index: $z-navbar + 1;

        &.open {
          right: 0;
        }
      }
    }

    .nav-link {
      color: $text-secondary;
      font-size: $font-size-sm;
      font-weight: 500;
      letter-spacing: 0.5px;
      cursor: pointer;
      transition: color $transition-fast;
      position: relative;

      &::after {
        content: '';
        position: absolute;
        bottom: -4px;
        left: 0;
        width: 0;
        height: 2px;
        background: $gradient-primary;
        transition: width $transition-base;
        border-radius: $radius-full;
      }

      &:hover,
      &.active {
        color: $text-heading;

        &::after {
          width: 100%;
        }
      }

      @include mobile {
        font-size: $font-size-lg;
      }
    }

    .navbar-actions {
      display: flex;
      align-items: center;
      gap: $space-md;

      app-language-switcher {
        @include mobile {
          display: none;
        }
      }
    }

    .nav-lang-mobile {
      display: none;

      @include mobile {
        display: block;
        margin-top: $space-md;
      }
    }

    .hamburger {
      display: none;
      flex-direction: column;
      gap: 5px;
      padding: $space-xs;

      @include mobile {
        display: flex;
      }

      span {
        display: block;
        width: 24px;
        height: 2px;
        background: $text-primary;
        transition: all $transition-fast;
        border-radius: $radius-full;
      }

      &.active {
        span:nth-child(1) {
          transform: rotate(45deg) translate(5px, 5px);
        }
        span:nth-child(2) {
          opacity: 0;
        }
        span:nth-child(3) {
          transform: rotate(-45deg) translate(5px, -5px);
        }
      }
    }

    .menu-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: $z-navbar;

      @include desktop {
        display: none;
      }
    }
  `,
})
export class NavbarComponent {
  scrolled = signal(false);
  menuOpen = signal(false);
  scrollService = inject(ScrollService);
  private destroyRef = inject(DestroyRef);

  navLinks = [
    { id: 'about', labelKey: 'nav.about' },
    { id: 'skills', labelKey: 'nav.skills' },
    { id: 'experience', labelKey: 'nav.experience' },
    { id: 'projects', labelKey: 'nav.projects' },
    { id: 'education', labelKey: 'nav.education' },
    { id: 'contact', labelKey: 'nav.contact' },
  ];

  constructor() {
    afterNextRender(() => {
      const handler = () => this.scrolled.set(window.scrollY > 50);
      window.addEventListener('scroll', handler, { passive: true });
      this.destroyRef.onDestroy(() => window.removeEventListener('scroll', handler));
    });
  }

  scrollTo(sectionId: string): void {
    this.menuOpen.set(false);
    this.scrollService.scrollTo(sectionId);
  }
}
