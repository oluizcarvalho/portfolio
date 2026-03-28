import { Component, afterNextRender, inject, DestroyRef } from '@angular/core';
import { NavbarComponent } from '../shared/components/navbar/navbar';
import { FooterComponent } from '../shared/components/footer/footer';
import { ScrollToTopComponent } from '../shared/components/scroll-to-top/scroll-to-top';
import { HeroComponent } from '../features/hero/hero';
import { AboutComponent } from '../features/about/about';
import { SkillsComponent } from '../features/skills/skills';
import { ExperienceComponent } from '../features/experience/experience';
import { ProjectsComponent } from '../features/projects/projects';
import { EducationComponent } from '../features/education/education';
import { ContactComponent } from '../features/contact/contact';
import { ScrollService } from '../core/services/scroll.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    ScrollToTopComponent,
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    ExperienceComponent,
    ProjectsComponent,
    EducationComponent,
    ContactComponent,
  ],
  template: `
    <app-navbar />
    <main>
      <app-hero />
      <app-about />
      <app-skills />
      <app-experience />
      <app-projects />
      <app-education />
      <app-contact />
    </main>
    <app-footer />
    <app-scroll-to-top />
  `,
  styles: `
    main {
      position: relative;
    }
  `,
})
export class MainLayoutComponent {
  private scrollService = inject(ScrollService);
  private destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      const sections = Array.from(
        document.querySelectorAll('section[id]')
      ) as HTMLElement[];
      this.scrollService.initObserver(sections);
      this.destroyRef.onDestroy(() => this.scrollService.destroy());
    });
  }
}
