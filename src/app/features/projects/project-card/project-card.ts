import { Component, input } from '@angular/core';
import { SlicePipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Project } from '../../../core/models/project.model';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [TranslateModule, SlicePipe],
  template: `
    <div class="project-card">
      <div class="project-image">
        <div class="project-placeholder">
          <span class="project-icon">{{ project().titleKey | translate | slice:0:2 }}</span>
        </div>
        <div class="project-overlay">
          @if (project().githubUrl) {
            <a [href]="project().githubUrl" target="_blank" rel="noopener noreferrer" class="project-link">
              {{ 'projects.viewCode' | translate }}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M7 17l9.2-9.2M17 17V7.8H7.8"/>
              </svg>
            </a>
          }
        </div>
      </div>
      <div class="project-info">
        <h3 class="project-title">{{ project().titleKey | translate }}</h3>
        <p class="project-desc">{{ project().descriptionKey | translate }}</p>
        <div class="project-tags">
          @for (tech of project().techStack; track tech) {
            <span class="tech-tag">{{ tech }}</span>
          }
        </div>
      </div>
    </div>
  `,
  styles: `
    @use 'styles/variables' as *;
    @use 'styles/mixins' as *;

    .project-card {
      @include glass-card;
      overflow: hidden;
      transition: all $transition-base;
      @include gradient-border;

      &::before {
        opacity: 0;
        transition: opacity $transition-base;
      }

      &:hover {
        transform: translateY(-6px);
        box-shadow: $glow-violet;

        &::before {
          opacity: 1;
        }

        .project-overlay {
          opacity: 1;
        }

        .project-placeholder {
          transform: scale(1.05);
        }
      }
    }

    .project-image {
      position: relative;
      height: 200px;
      overflow: hidden;
    }

    .project-placeholder {
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, rgba(108, 99, 255, 0.1), rgba(0, 212, 255, 0.1));
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform $transition-slow;
    }

    .project-icon {
      font-family: $font-family-mono;
      font-size: $font-size-4xl;
      font-weight: 800;
      @include gradient-text;
      text-transform: uppercase;
    }

    .project-overlay {
      position: absolute;
      inset: 0;
      background: rgba($bg-primary, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity $transition-base;
    }

    .project-link {
      display: inline-flex;
      align-items: center;
      gap: $space-xs;
      padding: $space-sm $space-lg;
      border-radius: $radius-full;
      background: $gradient-primary;
      color: white;
      font-weight: 600;
      font-size: $font-size-sm;
      transition: transform $transition-fast;

      &:hover {
        transform: scale(1.05);
      }
    }

    .project-info {
      padding: $space-lg;
    }

    .project-title {
      font-size: $font-size-xl;
      font-weight: 700;
      color: $text-heading;
      margin-bottom: $space-xs;
    }

    .project-desc {
      font-size: $font-size-sm;
      color: $text-secondary;
      line-height: 1.6;
      margin-bottom: $space-md;
    }

    .project-tags {
      display: flex;
      flex-wrap: wrap;
      gap: $space-xs;
    }

    .tech-tag {
      padding: 2px $space-sm;
      border-radius: $radius-full;
      font-size: $font-size-xs;
      font-weight: 500;
      color: $accent-cyan;
      border: 1px solid rgba($accent-cyan, 0.3);
      background: rgba($accent-cyan, 0.05);
    }
  `,
})
export class ProjectCardComponent {
  project = input.required<Project>();
}
