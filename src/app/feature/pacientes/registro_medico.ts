import { Catalog } from './../control-datos/datos-formularios/catalogos/catalogo';
export interface MedicalRecord {
  id: number;
  diabetes_type: Catalog;
  diagnosis_date: Date;
  diagnostic_period: Catalog;
  last_hb_test: Date;
  hb_value: number;
  glucose_checks: number;
  written_record: string;
  single_measurement: string;
  monitoring_system: string;
  basal_insulin_type: Catalog;
  morning_basal_dose: number;
  evening_basal_dose: number;
  prandial_insulin_type: Catalog;
  breakfast_prandial_dose: number;
  lunch_prandial_dose: number;
  dinner_prandial_dose: number;
  correction_prandial_dose: number;
  has_convulsions: string;
  hypoglycemia_symptoms: string;
  hypoglycemia_frequency: number;
  min_hypoglycemia: number;
  hypoglycemia_treatment: string;
  doctor: Catalog;
  last_visit: Date;
  hospital_type: Catalog;
  hospital: Catalog;
  other_disease: string;
  supply_opt_in: string;
  assistance_type: Catalog;
}






