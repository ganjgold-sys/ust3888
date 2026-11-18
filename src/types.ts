export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  priceFrom: string;
  installmentPrice: string;
  features: string[];
  iconName: string;
  recommendedFor: string;
  badge?: string;
  audience?: 'person' | 'business';
}

export interface CaseStudy {
  id: string;
  caseNumber: string; // e.g. А19-14820/2024
  clientName: string;
  initialDebt: string;
  writtenOffDebt: string;
  duration: string;
  courtName: string; // Арбитражный суд Иркутской области
  details: string;
  creditorsCount: number;
  judgeResult: string;
  category: string;
  audience?: 'person' | 'business';
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  experienceYears: number; // 5 to 15 years as mentioned in flyer
  specialization: string;
  casesCount: number;
  photoUrl: string;
  description: string;
  responsibility?: string;
  contacts?: string;
  quote?: string;
}

export interface CompetitorComparisonRow {
  criteria: string;
  yustitsia: {
    text: string;
    isPositive: boolean;
  };
  competitors: {
    text: string;
    isPositive: boolean;
  };
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}
