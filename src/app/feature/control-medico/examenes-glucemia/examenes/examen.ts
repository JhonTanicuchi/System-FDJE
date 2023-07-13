import { Catalog } from './../../../control-datos/datos-formularios/catalogos/catalogo';
import { Patient } from "../../../pacientes/paciente";
import { Person } from 'src/app/feature/personal/persona/persona';
export interface Test {
  id: number;

  patient: Patient;

  ophthalmologist: string;
  ophthalmologist_date: Date;
  nephrologist: string;
  nephrologist_date: Date;
  podiatrist: string;
  podiatrist_date: Date;
  lipidic: string;
  lipidic_date: Date;
  thyroid: string;
  thyroid_date: Date;
  weight: number;
  height: number;
  state: Catalog;
  observations: string;
  delivered: string;

  archived: boolean;
  archived_at: Date;
  archived_by: Person;

  created_at: Date;
  updated_at: Date;
}
