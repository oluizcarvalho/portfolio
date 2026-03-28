import { Component, input, afterNextRender, ElementRef, viewChild, inject } from '@angular/core';
import { Skill } from '../../../core/models/skill.model';

@Component({
  selector: 'app-skill-card',
  standalone: true,
  template: `
    <div class="skill-card" #card>
      <div class="skill-progress-ring">
        <svg viewBox="0 0 80 80">
          <circle class="ring-bg" cx="40" cy="40" r="34" />
          <circle
            class="ring-fill"
            cx="40"
            cy="40"
            r="34"
            #ringFill
            [style.stroke-dasharray]="circumference"
            [style.stroke-dashoffset]="circumference"
          />
        </svg>
        <span class="skill-percent">{{ skill().proficiency }}%</span>
      </div>
      <h4 class="skill-name">{{ skill().name }}</h4>
    </div>
  `,
  styles: `
    @use 'styles/variables' as *;
    @use 'styles/mixins' as *;

    .skill-card {
      @include glass-card;
      padding: $space-lg;
      text-align: center;
      transition: all $transition-base;

      &:hover {
        border-color: $border-hover;
        transform: translateY(-4px);
        box-shadow: $glow-violet;
      }
    }

    .skill-progress-ring {
      position: relative;
      width: 80px;
      height: 80px;
      margin: 0 auto $space-md;

      svg {
        transform: rotate(-90deg);
        width: 100%;
        height: 100%;
      }
    }

    .ring-bg {
      fill: none;
      stroke: rgba(255, 255, 255, 0.05);
      stroke-width: 4;
    }

    .ring-fill {
      fill: none;
      stroke: url(#gradient);
      stroke-width: 4;
      stroke-linecap: round;
      transition: stroke-dashoffset 1.5s ease-out;
    }

    .skill-percent {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: $font-family-mono;
      font-size: $font-size-sm;
      font-weight: 600;
      color: $text-heading;
    }

    .skill-name {
      font-size: $font-size-sm;
      font-weight: 600;
      color: $text-primary;
    }
  `,
})
export class SkillCardComponent {
  skill = input.required<Skill>();
  circumference = 2 * Math.PI * 34;
  private ringFill = viewChild<ElementRef>('ringFill');

  constructor() {
    afterNextRender(() => {
      const ring = this.ringFill()?.nativeElement;
      if (ring) {
        const offset = this.circumference - (this.skill().proficiency / 100) * this.circumference;
        setTimeout(() => (ring.style.strokeDashoffset = `${offset}`), 100);
      }
    });
  }
}
