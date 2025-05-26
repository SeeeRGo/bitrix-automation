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
  contactTelegram: string
  specialistName: string
  techStack: TechStack
  grade: string
  rate: string
  country: string
  city: string
  birthdate: string
  education: string
  educationYear: string
  educationProf: string
  comment: string
}

export interface Inputs extends BaseInputs {
  resume: File | undefined
}

export interface ApiInputs extends BaseInputs {
  fileData: { fileData: [string, string] }
}