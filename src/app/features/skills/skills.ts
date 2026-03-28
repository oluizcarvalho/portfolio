import { Component, computed, signal, afterNextRender, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header';
import { SkillCardComponent } from './skill-card/skill-card';
import { SKILLS } from '../../core/data/skills.data';
import { AnimationService } from '../../core/services/animation.service';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [TranslateModule, SectionHeaderComponent, SkillCardComponent],
  template: `
    <section id="skills" class="skills">
      <app-section-header titleKey="skills.title" subtitleKey="skills.subtitle" />

      <div class="skills-filters">
        @for (cat of categories; track cat.key) {
          <button
            class="filter-btn"
            [class.active]="selectedCategory() === cat.key"
            (click)="selectedCategory.set(cat.key)"
          >
            {{ cat.labelKey | translate }}
          </button>
        }
      </div>

      <svg width="0" height="0" style="position: absolute;">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#6c63ff" />
            <stop offset="100%" stop-color="#00d4ff" />
          </linearGradient>
        </defs>
      </svg>

      <div class="skills-grid">
        @for (skill of filteredSkills(); track skill.name) {
          <app-skill-card [skill]="skill" />
        }
      </div>
    </section>
  `,
  styles: `
    @use 'styles/variables' as *;
    @use 'styles/mixins' as *;
    @use 'styles/breakpoints' as *;

    .skills {
      @include section-padding;
    }

    .skills-filters {
      display: flex;
      justify-content: center;
      gap: $space-sm;
      margin-bottom: $space-2xl;
      flex-wrap: wrap;
    }

    .filter-btn {
      padding: $space-xs $space-lg;
      border-radius: $radius-full;
      border: 1px solid $border-subtle;
      color: $text-secondary;
      font-size: $font-size-sm;
      font-weight: 500;
      transition: all $transition-fast;
      background: transparent;

      &:hover {
        border-color: $border-hover;
        color: $text-heading;
      }

      &.active {
        background: $gradient-primary;
        color: white;
        border-color: transparent;
      }
    }

    .skills-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
      gap: $space-md;

      @include mobile {
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
        gap: $space-sm;
      }
    }
  `,
})
export class SkillsComponent {
  private animationService = inject(AnimationService);
  selectedCategory = signal<string>('all');
  private allSkills = SKILLS;

  categories = [
    { key: 'all', labelKey: 'skills.categories.all' },
    { key: 'frontend', labelKey: 'skills.categories.frontend' },
    { key: 'backend', labelKey: 'skills.categories.backend' },
    { key: 'devops', labelKey: 'skills.categories.devops' },
    { key: 'tools', labelKey: 'skills.categories.tools' },
  ];

  filteredSkills = computed(() => {
    const cat = this.selectedCategory();
    return cat === 'all' ? this.allSkills : this.allSkills.filter((s) => s.category === cat);
  });

  constructor() {
    afterNextRender(() => {
      this.animationService.registerPlugins();
    });
  }
}
