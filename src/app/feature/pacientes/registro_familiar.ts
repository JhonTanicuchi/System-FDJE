import { LegalRepresentative } from "./representante_legal";

export interface FamilyRecord {
  id: number;
  household_head: string;
  housing_zone: string;
  housing_type: string;
  members: number;
  contributions: number;
  minors: number;
  members_disability: string;
  diabetes_problem: string;
  legal_representative: LegalRepresentative;
}

