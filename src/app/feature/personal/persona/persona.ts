import { Catalog } from '../../control-datos/datos-formularios/catalogos/catalogo';

export interface Person {
  id: number;
  names: string;
  last_names: string;
  identification_type: Catalog;
  identification: string;
  gender: string;
  date_birth: Date;
  place_birth: string;
  disability: string;
  mobile_phone: string;
  landline_phone: string;
  nationality: Catalog;
  region: Catalog;
  address: string;
  province: string;
  canton: string;
  parish: string;
  created_at: Date;
  updated_at: Date;
}
