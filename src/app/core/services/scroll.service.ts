import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ScrollService {
  activeSection = signal<string>('hero');
  scrollY = signal<number>(0);

  private observer?: IntersectionObserver;

  initObserver(sections: HTMLElement[]): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.activeSection.set(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );
    sections.forEach((s) => this.observer!.observe(s));
  }

  scrollTo(sectionId: string): void {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  }

  destroy(): void {
    this.observer?.disconnect();
  }
}
