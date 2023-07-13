import { Patient } from '../../pacientes/paciente';
import { Person } from '../../personal/persona/persona';
import { User } from '../../personal/usuarios/usuario';
import { DetailSuppliesDelivery } from './detalle-entrega-insumo';

export interface SuppliesDelivery {
  id: number;

  patient: Patient;
  detail_supplies_delivery: DetailSuppliesDelivery[];

  delivered: boolean;
  delivered_by: Person;

  archived: boolean;
  archived_at: Date;
  archived_by: Person;

  created_at: Date;
  updated_at: Date;
}

export interface History {
  first_delivery: Date;
  last_delivery: Date;
  total_supplies_delivered: number;
  total_supplies_delivered_by_supply: [
    {
      supply: string;
      total: number;
    }
  ];
}

export interface Statistics {
  total_supplies_delivered: number;
  total_supplies_delivered_by_supply: [
    {
      value: string;
      total_supplies: number;
    }
  ];
  total_supplies_delivered_by_region: [
    {
      region: string;
      total: number;
      supplies: [
        {
          value: string;
          total_supplies: number;
        }
      ];
    }
  ];
}
