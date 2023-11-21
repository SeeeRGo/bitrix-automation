export interface Company {
  title: string;
  id: number;
}

export interface Contact {
  title: string;
  id: number;
}

export interface TechStack {
  ID: string;
  VALUE: string;
}

export interface Inputs {
  company: string
  contactName: string
  contactPosition: string
  contactEmail: string
  contactPhone: string
  contactTelegram: string
  specialistName: string
  techStack: TechStack
  grade: string
  rate: string
  location: string
  resume: File | undefined
  comment: string
}