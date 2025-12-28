
export interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription?: string;
  features?: string[];
  techStack?: string[];
  tags: string[];
  imageUrl: string;
  gallery?: string[];
  link: string;
  status: 'CONCEPT TESTING' | 'MVP' | 'LIVE' | 'DEAD' | 'MATURE/EXIT' | 'HACKING IT';
}

export interface SiteContent {
  heroTagline: string;
  heroHeadline1: string;
  heroHeadline2: string;
  heroDescription: string;
  
  // Landing Page Teaser
  aboutTitle: string;
  aboutText: string;
  
  // Full About Page Content
  aboutHeadline: string; // The big H1 on the about page
  aboutManifesto: string; 
  aboutValues: string[];
  aboutQuote: string; // The quote at the bottom

  contactTitle: string;
  contactSubtitle: string;
}

export enum ThemeColor {
  PINK = 'pink',
  GREEN = 'green',
  BLUE = 'blue',
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface Song {
  id: string;
  file?: File;
  url: string;
  name: string;
}