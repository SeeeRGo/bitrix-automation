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

interface BaseInputs {
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
  comment: string
}

export interface Inputs extends BaseInputs {
  resume: File | undefined
}

export interface ApiInputs extends BaseInputs {
  fileData: { fileData: [string, string] }
}