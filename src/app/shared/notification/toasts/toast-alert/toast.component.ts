import { Component, Inject, inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'toast',
  templateUrl: 'toast.component.html',})
export class ToastAlertComponent {
  snackBarRef = inject(MatSnackBarRef);

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: string) {}
}
