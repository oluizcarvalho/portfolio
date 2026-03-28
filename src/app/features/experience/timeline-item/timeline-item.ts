import { Component, input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Experience } from '../../../core/models/experience.model';

@Component({
  selector: 'app-timeline-item',
  standalone: true,
  imports: [TranslateModule],
  template: `
    <div class="timeline-item" [class.right]="isRight()">
      <div class="timeline-dot"></div>
      <div class="timeline-card">
        <span class="timeline-period">{{ experience().periodKey | translate }}</span>
        <h3 class="timeline-company">{{ experience().company }}</h3>
        <h4 class="timeline-role">{{ experience().roleKey | translate }}</h4>
        <p class="timeline-desc">{{ experience().descriptionsKey | translate }}</p>
        <div class="timeline-tags">
          @for (tech of experience().techStack; track tech) {
            <span class="tech-tag">{{ tech }}</span>
          }
        </div>
      </div>
    </div>
  `,
  styles: `
    @use 'styles/variables' as *;
    @use 'styles/mixins' as *;
    @use 'styles/breakpoints' as *;

    .timeline-item {
      position: relative;
      padding-left: 40px;
      margin-bottom: $space-2xl;

      @include desktop {
        width: 50%;
        padding-left: 40px;
        padding-right: 0;

        &.right {
          margin-left: 50%;
          padding-left: 40px;
          padding-right: 0;
        }

        &:not(.right) {
          padding-left: 0;
          padding-right: 40px;
          text-align: right;

          .timeline-dot {
            left: auto;
            right: -8px;
          }

          .timeline-tags {
            justify-content: flex-end;
          }
        }
      }
    }

    .timeline-dot {
      position: absolute;
      left: -8px;
      top: 8px;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: $gradient-primary;
      border: 3px solid $bg-primary;
      z-index: 2;
      box-shadow: $glow-violet;

      @include desktop {
        left: -8px;
      }
    }

    .timeline-card {
      @include glass-card;
      padding: $space-lg;
      transition: all $transition-base;

      &:hover {
        border-color: $border-hover;
        transform: translateY(-2px);
      }
    }

    .timeline-period {
      font-family: $font-family-mono;
      font-size: $font-size-xs;
      color: $accent-cyan;
      font-weight: 500;
    }

    .timeline-company {
      font-size: $font-size-xl;
      font-weight: 700;
      color: $text-heading;
      margin: $space-xs 0;
    }

    .timeline-role {
      font-size: $font-size-base;
      @include gradient-text;
      font-weight: 600;
      margin-bottom: $space-sm;
    }

    .timeline-desc {
      font-size: $font-size-sm;
      color: $text-secondary;
      line-height: 1.7;
      margin-bottom: $space-md;
    }

    .timeline-tags {
      display: flex;
      flex-wrap: wrap;
      gap: $space-xs;
    }

    .tech-tag {
      padding: 2px $space-sm;
      border-radius: $radius-full;
      font-size: $font-size-xs;
      font-weight: 500;
      color: $accent-violet;
      border: 1px solid rgba($accent-violet, 0.3);
      background: rgba($accent-violet, 0.05);
    }
  `,
})
export class TimelineItemComponent {
  experience = input.required<Experience>();
  isRight = input<boolean>(false);
}
