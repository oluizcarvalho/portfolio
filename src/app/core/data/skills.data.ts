import { Skill } from '../models/skill.model';

export const SKILLS: Skill[] = [
  // Frontend
  { name: 'Angular', icon: 'angular', category: 'frontend', proficiency: 95 },
  { name: 'TypeScript', icon: 'typescript', category: 'frontend', proficiency: 95 },
  { name: 'React', icon: 'react', category: 'frontend', proficiency: 80 },
  { name: 'Next.js', icon: 'nextjs', category: 'frontend', proficiency: 70 },
  { name: 'JavaScript', icon: 'javascript', category: 'frontend', proficiency: 90 },
  { name: 'HTML5', icon: 'html5', category: 'frontend', proficiency: 95 },
  { name: 'CSS3/SCSS', icon: 'css3', category: 'frontend', proficiency: 90 },
  { name: 'RxJS', icon: 'rxjs', category: 'frontend', proficiency: 85 },
  { name: 'Blazor', icon: 'blazor', category: 'frontend', proficiency: 65 },

  // Backend
  { name: 'Node.js', icon: 'nodejs', category: 'backend', proficiency: 70 },
  { name: '.NET/C#', icon: 'dotnet', category: 'backend', proficiency: 65 },
  { name: 'MongoDB', icon: 'mongodb', category: 'backend', proficiency: 70 },
  { name: 'MySQL', icon: 'mysql', category: 'backend', proficiency: 60 },
  { name: 'Express', icon: 'express', category: 'backend', proficiency: 65 },

  // DevOps
  { name: 'Azure DevOps', icon: 'azure', category: 'devops', proficiency: 80 },
  { name: 'CI/CD', icon: 'cicd', category: 'devops', proficiency: 85 },
  { name: 'Docker', icon: 'docker', category: 'devops', proficiency: 70 },
  { name: 'Git', icon: 'git', category: 'devops', proficiency: 90 },

  // Tools
  { name: 'Jest', icon: 'jest', category: 'tools', proficiency: 75 },
  { name: 'Datadog', icon: 'datadog', category: 'tools', proficiency: 70 },
  { name: 'Webpack', icon: 'webpack', category: 'tools', proficiency: 70 },
  { name: 'Module Federation', icon: 'webpack', category: 'tools', proficiency: 80 },
  { name: 'Figma', icon: 'figma', category: 'tools', proficiency: 60 },
];
