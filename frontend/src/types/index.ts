export type PersonaName = 'Farmer' | 'Student' | 'Woman Entrepreneur' | 'Senior Citizen' | 'Business Owner';

export interface SchemeCard {
  id: string;
  name: string;
  ministry: string;
  status: 'Recommended' | 'Saved' | 'Eligible' | 'Needs Review';
  score: number;
}

export interface TimelineEvent {
  title: string;
  detail: string;
  timestamp: string;
}

export interface NotificationItem {
  title: string;
  detail: string;
}

export interface PersonaSnapshot {
  name: PersonaName;
  profileCompletion: number;
  readinessScore: number;
  recentChats: string[];
  recommendedSchemes: SchemeCard[];
  savedSchemes: string[];
  applicationTimeline: TimelineEvent[];
  notifications: NotificationItem[];
}
