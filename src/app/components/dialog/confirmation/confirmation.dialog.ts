import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'confirmation-dialog',
  templateUrl: 'confirmation.dialog.html'
})
export class ConfirmationDialog {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialog>,
    @Inject(MAT_DIALOG_DATA) public message: string) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
