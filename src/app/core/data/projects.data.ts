import { Project } from '../models/project.model';

export const PROJECTS: Project[] = [
  {
    id: 'egress-system',
    titleKey: 'projects.egress_system.title',
    descriptionKey: 'projects.egress_system.description',
    techStack: ['Angular 18', 'TypeScript', 'RxJS', 'SCSS'],
    githubUrl: 'https://github.com/oluizcarvalho/egress-system',
    featured: true,
  },
  {
    id: 'govbr-ds-angular',
    titleKey: 'projects.govbr_ds_angular.title',
    descriptionKey: 'projects.govbr_ds_angular.description',
    techStack: ['Angular', 'TypeScript', 'Design System', 'Web Components'],
    githubUrl: 'https://github.com/oluizcarvalho/govbr-ds-angular',
    featured: true,
  },
  {
    id: 'the-hit-movie',
    titleKey: 'projects.the_hit_movie.title',
    descriptionKey: 'projects.the_hit_movie.description',
    techStack: ['Angular 15', 'Material UI', 'PWA', 'IMDB API'],
    githubUrl: 'https://github.com/oluizcarvalho/the-hit-movie',
    featured: true,
  },
  {
    id: 'quizz-attack-on-titan',
    titleKey: 'projects.quizz_attack_on_titan.title',
    descriptionKey: 'projects.quizz_attack_on_titan.description',
    techStack: ['Next.js', 'React', 'Styled Components'],
    githubUrl: 'https://github.com/oluizcarvalho/quizz-attack-on-titan',
    featured: false,
  },
  {
    id: 'finansys',
    titleKey: 'projects.finansys.title',
    descriptionKey: 'projects.finansys.description',
    techStack: ['Angular', 'PrimeNG', 'Bootstrap', 'TypeScript'],
    githubUrl: 'https://github.com/oluizcarvalho/finansys',
    featured: false,
  },
  {
    id: 'mfe-container',
    titleKey: 'projects.mfe_container.title',
    descriptionKey: 'projects.mfe_container.description',
    techStack: ['Angular', 'Module Federation', 'Micro Frontends'],
    githubUrl: 'https://github.com/oluizcarvalho/mfe-container',
    featured: true,
  },
];
