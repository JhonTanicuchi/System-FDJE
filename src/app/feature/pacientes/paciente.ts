import { Catalog } from '../control-datos/datos-formularios/catalogos/catalogo';
import { Person } from '../personal/persona/persona';
import { FamilyRecord } from './registro_familiar';
import { MedicalRecord } from './registro_medico';

export interface Patient {
  id: number;
  email: string;
  type: Catalog;
  person: Person;
  medical_record: MedicalRecord;
  family_record: FamilyRecord;
  active: boolean;
  archived: boolean;
  archived_at: Date;
  archived_by: Person;
  created_at: Date;
  updated_at: Date;
}
