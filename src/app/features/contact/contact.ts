import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [TranslateModule, SectionHeaderComponent],
  template: `
    <section id="contact" class="contact">
      <app-section-header titleKey="contact.title" subtitleKey="contact.subtitle" />

      <div class="contact-content">
        <div class="contact-item">
          <div class="contact-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2"></rect>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
            </svg>
          </div>
          <div>
            <p class="contact-label">{{ 'contact.emailLabel' | translate }}</p>
            <a href="mailto:luizandre.ita&#64;gmail.com" class="contact-value email-link">
              luizandre.ita&#64;gmail.com
            </a>
          </div>
        </div>

        <div class="contact-item">
          <div class="contact-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </div>
          <div>
            <p class="contact-label">{{ 'contact.locationLabel' | translate }}</p>
            <p class="contact-value">{{ 'contact.location' | translate }}</p>
          </div>
        </div>

        <div class="contact-social">
          <p class="social-label">{{ 'contact.socialLabel' | translate }}</p>
          <div class="social-links">
            <a href="https://github.com/oluizcarvalho" target="_blank" rel="noopener noreferrer" class="social-btn" aria-label="GitHub">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/oluizcarvalho" target="_blank" rel="noopener noreferrer" class="social-btn" aria-label="LinkedIn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      <div class="contact-decoration">
        <div class="deco-circle deco-1"></div>
        <div class="deco-circle deco-2"></div>
      </div>
    </section>
  `,
  styles: `
    @use 'styles/variables' as *;
    @use 'styles/mixins' as *;
    @use 'styles/breakpoints' as *;

    .contact {
      @include section-padding;
      position: relative;
      overflow: hidden;
    }

    .contact-content {
      max-width: 600px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: $space-xl;
    }

    .contact-item {
      display: flex;
      align-items: center;
      gap: $space-lg;

      @include mobile {
        flex-direction: column;
        text-align: center;
      }
    }

    .contact-icon {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: rgba(108, 99, 255, 0.1);
      color: $accent-violet;
      @include flex-center;
      flex-shrink: 0;
    }

    .contact-label {
      font-size: $font-size-sm;
      color: $text-secondary;
      margin-bottom: 2px;
    }

    .contact-value {
      font-size: $font-size-lg;
      color: $text-heading;
      font-weight: 600;
    }

    .email-link {
      @include gradient-text;
      transition: opacity $transition-fast;

      &:hover {
        opacity: 0.8;
      }
    }

    .contact-social {
      text-align: center;
      margin-top: $space-lg;
    }

    .social-label {
      font-size: $font-size-sm;
      color: $text-secondary;
      margin-bottom: $space-md;
    }

    .social-links {
      display: flex;
      justify-content: center;
      gap: $space-md;
    }

    .social-btn {
      display: inline-flex;
      align-items: center;
      gap: $space-sm;
      padding: $space-sm $space-xl;
      border-radius: $radius-full;
      border: 1px solid $border-subtle;
      color: $text-primary;
      font-weight: 500;
      font-size: $font-size-sm;
      transition: all $transition-base;

      &:hover {
        border-color: $accent-violet;
        color: $text-heading;
        transform: translateY(-2px);
        box-shadow: $glow-violet;
      }
    }

    .contact-decoration {
      position: absolute;
      inset: 0;
      pointer-events: none;
      overflow: hidden;
    }

    .deco-circle {
      position: absolute;
      border-radius: 50%;
      opacity: 0.05;
    }

    .deco-1 {
      width: 400px;
      height: 400px;
      background: $accent-violet;
      top: -100px;
      right: -100px;
    }

    .deco-2 {
      width: 300px;
      height: 300px;
      background: $accent-cyan;
      bottom: -100px;
      left: -100px;
    }
  `,
})
export class ContactComponent {}
