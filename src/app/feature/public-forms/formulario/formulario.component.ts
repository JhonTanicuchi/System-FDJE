import { Component, OnDestroy } from '@angular/core';
import { PacientesFormComponent } from '../../pacientes/form/paciente.form.component';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { PacienteService } from '../../pacientes/paciente.service';
import { FormBuilder } from '@angular/forms';
import { CatalogService } from '../../control-datos/datos-formularios/catalogos/catalogo.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
})
export class FormularioComponent
  extends PacientesFormComponent
  implements OnDestroy
{
  constructor(
    public override pacientesService: PacienteService,
    public override router: Router,
    public override activatedRoute: ActivatedRoute,
    public override titleTab: Title,
    public override formBuilder: FormBuilder,
    public override catalogService: CatalogService,
    public override dialog: MatDialog
  ) {
    super(
      pacientesService,
      router,
      activatedRoute,
      titleTab,
      formBuilder,
      catalogService,
      dialog
    );
  }
  ngOnDestroy(): void {
    localStorage.removeItem('patientCreated');
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.titleTab.setTitle('Formulario de registro de paciente');
  }
}
