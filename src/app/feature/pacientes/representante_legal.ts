import { Catalog } from "../control-datos/datos-formularios/catalogos/catalogo";
import { Person } from "../personal/persona/persona";

export interface LegalRepresentative {
  id: number;
  person: Person;
  relationship: Catalog;
}
