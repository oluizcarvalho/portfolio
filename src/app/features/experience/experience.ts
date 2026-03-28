import { Component, afterNextRender, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header';
import { TimelineItemComponent } from './timeline-item/timeline-item';
import { EXPERIENCES } from '../../core/data/experiences.data';
import { AnimationService } from '../../core/services/animation.service';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [TranslateModule, SectionHeaderComponent, TimelineItemComponent],
  template: `
    <section id="experience" class="experience">
      <app-section-header titleKey="experience.title" subtitleKey="experience.subtitle" />

      <div class="timeline">
        <div class="timeline-line"></div>
        @for (exp of experiences; track exp.company + exp.roleKey; let i = $index) {
          <app-timeline-item [experience]="exp" [isRight]="i % 2 !== 0" />
        }
      </div>
    </section>
  `,
  styles: `
    @use 'styles/variables' as *;
    @use 'styles/mixins' as *;
    @use 'styles/breakpoints' as *;

    .experience {
      @include section-padding;
    }

    .timeline {
      position: relative;
      max-width: 900px;
      margin: 0 auto;
    }

    .timeline-line {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 2px;
      background: $gradient-primary;
      opacity: 0.3;

      @include desktop {
        left: 50%;
        transform: translateX(-50%);
      }
    }
  `,
})
export class ExperienceComponent {
  experiences = EXPERIENCES;
  private animationService = inject(AnimationService);

  constructor() {
    afterNextRender(() => {
      this.animationService.registerPlugins();
    });
  }
}
