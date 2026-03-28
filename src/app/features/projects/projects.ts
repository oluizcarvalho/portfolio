import { Component, afterNextRender, inject } from '@angular/core';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header';
import { ProjectCardComponent } from './project-card/project-card';
import { PROJECTS } from '../../core/data/projects.data';
import { AnimationService } from '../../core/services/animation.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [SectionHeaderComponent, ProjectCardComponent],
  template: `
    <section id="projects" class="projects">
      <app-section-header titleKey="projects.title" subtitleKey="projects.subtitle" />

      <div class="projects-grid">
        @for (project of projects; track project.id) {
          <app-project-card [project]="project" />
        }
      </div>
    </section>
  `,
  styles: `
    @use 'styles/variables' as *;
    @use 'styles/mixins' as *;
    @use 'styles/breakpoints' as *;

    .projects {
      @include section-padding;
    }

    .projects-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: $space-xl;

      @include mobile {
        grid-template-columns: 1fr;
      }
    }
  `,
})
export class ProjectsComponent {
  projects = PROJECTS;
  private animationService = inject(AnimationService);

  constructor() {
    afterNextRender(() => {
      this.animationService.registerPlugins();
    });
  }
}
