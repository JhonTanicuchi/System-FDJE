import { Catalog } from './../../../control-datos/datos-formularios/catalogos/catalogo';
import { Patient } from "../../../pacientes/paciente";
import { Person } from 'src/app/feature/personal/persona/persona';

export interface HemoglobinTest {
  id: number;
  patient: Patient;
  hb1ac_result: string;
  hb1ac_date: Date;
  endocrinologist_date: Date;
  delivered: boolean;
  weight: number;
  size: number;
  observations: string;

  state: Catalog;

  archived: boolean;
  archived_at: Date;
  archived_by: Person;

  created_at: Date;
  updated_at: Date;
}
