import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SuppliesDelivery, History } from '../entrega-insumo';
import { SuppliesDeliveriesService } from '../entrega-insumo.service';
import { Catalog } from 'src/app/feature/control-datos/datos-formularios/catalogos/catalogo';
import { CatalogService } from 'src/app/feature/control-datos/datos-formularios/catalogos/catalogo.service';
import { DetailSuppliesDelivery } from '../detalle-entrega-insumo';
import { PacienteService } from 'src/app/feature/pacientes/paciente.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-entrega-insumo-form',
  templateUrl: './entrega-insumo.form.component.html',
  styleUrls: ['./entrega-insumo.form.component.css'],
})
export class SuppliesDeliveriesFormComponent implements OnInit {
  detalleInsumos = new Array<DetailSuppliesDelivery>();
  catalogoInsumos = new Array<{ insumo: Catalog; cantidad: number }>();

  loading: boolean = true;
  title = 'Nueva Entrega';
  today = new Date();

  currentSuppliesDelivery: SuppliesDelivery = {} as SuppliesDelivery;
  suppliesDeliveriesHistory: History = {} as History;

  // Variables de clase que son inyectadas por referencia
  public formGroup: FormGroup;

  params_patient_id: number;
  params_delivery_id: number;

  constructor(
    private suppliesDeliveriesService: SuppliesDeliveriesService,
    private catalogService: CatalogService,
    private pacientesService: PacienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.initForm();
  }

  initForm() {
    this.formGroup = this.formBuilder.group({
      id: [0],
      patient: [null],
      detail_supplies_delivery: [[], Validators.required],
    });
    this.formGroup.valueChanges.subscribe((data) => {
      this.currentSuppliesDelivery = data;
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: any) => {
      this.params_patient_id = params['patient_id'];
      this.params_delivery_id = params['delivery_id'];

      if (this.params_patient_id && !this.params_delivery_id) {
        this.getPatient(this.params_patient_id);
      } else if (this.params_patient_id && this.params_delivery_id) {
        this.getSuppliesDelivery(params['delivery_id']);
      }
    });

    this.getSupplies();
  }

  getPatient(id: number) {
    this.loading = true;
    this.pacientesService.getPaciente(id).subscribe((res: any) => {
      if (res.status === 'success') {
        this.currentSuppliesDelivery.patient = res.data.patient;
        this.formGroup.patchValue({ patient: res.data.patient });
        this.title = 'Nueva Entrega';
      }
      this.loading = false;
    });
  }

  getSuppliesDelivery(id: number) {
    this.loading = true;
    this.suppliesDeliveriesService
      .getSuppliesDelivery(id)
      .subscribe((res: any) => {
        if (res.status === 'success') {
          this.currentSuppliesDelivery = res.data.supplies_delivery;
          this.suppliesDeliveriesHistory = res.data.supplies_deliveries_history;
          this.title = 'Detalle de Entrega';
          this.sumSupplies();
        }
        this.loading = false;
      });
  }

  getSupplies() {
    this.catalogService.getCatalogsByType('insumos').subscribe((res: any) => {
      if (res.status === 'success') {
        res.data.catalogs.forEach((supply: any) => {
          this.catalogoInsumos.push({ insumo: supply, cantidad: 0 });
        });
      }
    });
  }

  searchSuppliesByTem(term: string) {
    this.catalogService
      .searchCatalogsByTerm('insumos', term)
      .subscribe((res: any) => {
        if (res.status === 'success') {
          this.catalogoInsumos = [];
          res.data.catalogs.forEach((item: any) => {
            this.catalogoInsumos.push({ insumo: item, cantidad: 0 });
          });
          if (term == '') {
            this.catalogoInsumos = [];
            this.getSupplies();
          }
        }
      });
  }

  createSuppliesDelivery() {
    console.log(this.currentSuppliesDelivery);
    this.suppliesDeliveriesService
      .createSuppliesDelivery(this.currentSuppliesDelivery)
      .subscribe((res: any) => {
        if (res.status === 'success') {
          this.router.navigate([
            '/system/control-medico/entrega-insumos/follow',
          ]);
        }
      });
  }

  addSupply(insumo: Catalog, cantidad: number) {
    let existe = false;
    this.currentSuppliesDelivery.detail_supplies_delivery.forEach((item) => {
      if (item.supply.id == insumo.id) {
        item.quantity++;
        this.catalogoInsumos.forEach((catalogo) => {
          if (catalogo.insumo.id == insumo.id) {
            catalogo.cantidad = item.quantity;
          }
        });
        existe = true;
      }
    });
    if (!existe) {
      this.currentSuppliesDelivery.detail_supplies_delivery.push({
        id: 0,
        supply: insumo,
        quantity: cantidad ? cantidad : 1,
      } as DetailSuppliesDelivery);
      this.catalogoInsumos.forEach((item) => {
        if (item.insumo.id == insumo.id) {
          item.cantidad = 1;
        }
      });
    }
  }

  updateQuantity(insumo: Catalog, cantidad: number) {
    let existe = false;
    if (cantidad == 0 || cantidad == null) {
      this.currentSuppliesDelivery.detail_supplies_delivery =
        this.currentSuppliesDelivery.detail_supplies_delivery.filter(
          (item) => item.supply.id !== insumo.id
        );
    } else {
      this.currentSuppliesDelivery.detail_supplies_delivery.forEach((item) => {
        if (item.supply.id == insumo.id) {
          item.quantity = cantidad;
          existe = true;
        }
      });
      if (!existe) {
        this.currentSuppliesDelivery.detail_supplies_delivery.push({
          id: 0,
          supply: insumo,
          quantity: cantidad,
        } as DetailSuppliesDelivery);
      }
    }
  }

  subtractSupply(insumo: Catalog) {
    this.currentSuppliesDelivery.detail_supplies_delivery.forEach((item) => {
      if (item.supply.id == insumo.id) {
        item.quantity--;
        this.catalogoInsumos.forEach((catalogo) => {
          if (catalogo.insumo.id == insumo.id) {
            catalogo.cantidad = item.quantity;
            if (item.quantity == 0) {
              this.removeSupply(insumo);
            }
          }
        });
      }
    });
  }

  removeSupply(insumo: Catalog) {
    this.currentSuppliesDelivery.detail_supplies_delivery =
      this.currentSuppliesDelivery.detail_supplies_delivery.filter(
        (item) => item.supply.id !== insumo.id
      );
    this.catalogoInsumos.forEach((item) => {
      if (item.insumo.id == insumo.id) {
        item.cantidad = 0;
      }
    });
  }
  TotalQuantity: number = 0;
  sumSupplies(): void {
    this.currentSuppliesDelivery.detail_supplies_delivery.forEach((element) => {
      this.TotalQuantity += element.quantity;
    });
  }
}
