export interface Profile {
  owner: string;
  handle: string;
  ipfsHash: string;
  createdAt: number;
  updatedAt: number;
  reputationScore: number;
  verified: boolean;
}

export interface Credential {
  credentialType: string;
  issuer: string;
  issuedDate: number;
  expiryDate: number;
  proofUrl: string;
  verified: boolean;
  verificationCount: number;
}

export interface Achievement {
  title: string;
  description: string;
  unlockedAt: number;
  verified: boolean;
}

export interface ResumeData {
  address: string;
  name: string;
  bio: string;
  avatar?: string;
  skills: string[];
  experience: ExperienceEntry[];
  education: EducationEntry[];
  projects: ProjectEntry[];
  social: SocialLinks;
  timestamp: number;
}

export interface ExperienceEntry {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  skills: string[];
}

export interface EducationEntry {
  id: string;
  degree: string;
  institution: string;
  location: string;
  graduationDate: string;
  field: string;
  gpa?: string;
  honors?: string[];
}

export interface ProjectEntry {
  id: string;
  title: string;
  description: string;
  url?: string;
  github?: string;
  technologies: string[];
  date: string;
  featured: boolean;
}

export interface SocialLinks {
  twitter?: string;
  github?: string;
  linkedin?: string;
  website?: string;
  discord?: string;
  telegram?: string;
}

export interface TalentProtocolProfile {
  id: string;
  handle: string;
  name: string;
  bio: string;
  avatar: string;
  verified: boolean;
  talentScore: number;
}

export interface TalentAchievement {
  id: string;
  title: string;
  description: string;
  earnedAt: string;
  category: string;
  points: number;
}

export interface TalentCredential {
  id: string;
  type: string;
  issuer: string;
  issuedAt: string;
  expiresAt?: string;
  metadata: Record<string, any>;
}
