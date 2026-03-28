export interface Project {
  id: string;
  titleKey: string;
  descriptionKey: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
}
