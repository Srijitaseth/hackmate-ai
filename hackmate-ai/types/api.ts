export interface UserProfile {
    id?: string;
    userId: string;
    name: string;
    email: string;
    college?: string;
    year?: string;
    bio?: string;
    skills?: string[];
    interests?: string[];
    preferredRoles?: string[];
    experienceLevel?: string;
    availability?: string;
    hackathonGoals?: string[];
    createdAt?: string;
    updatedAt?: string;
  }
  
  export interface MatchUser extends UserProfile {
    compatibilityScore: number;
  }
  
  export interface AiTopMatch {
    userId: string;
    name: string;
    compatibilityScore: number;
    reason: string;
    roleSuggestion: string;
    warning: string;
  }
  