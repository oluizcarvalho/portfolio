import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);

  setDefaults(): void {
    this.title.setTitle('Portfolio | Full-Stack Developer');
    this.meta.updateTag({ name: 'description', content: 'Full-stack developer portfolio showcasing projects, skills, and experience.' });
    this.meta.updateTag({ name: 'keywords', content: 'developer, portfolio, full-stack, angular, web development' });
    this.meta.updateTag({ property: 'og:title', content: 'Portfolio | Full-Stack Developer' });
    this.meta.updateTag({ property: 'og:description', content: 'Full-stack developer portfolio showcasing projects, skills, and experience.' });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
  }

  updatePage(title: string, description: string): void {
    this.title.setTitle(title);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
  }
}
