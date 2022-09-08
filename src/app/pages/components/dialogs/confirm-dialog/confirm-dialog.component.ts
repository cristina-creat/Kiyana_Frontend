import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'fury-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {

  result: string;
  message: string;

  constructor(
    private dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: string
  ) {
    if(data){
      this.message = data;
    }
  }

  close(answer: boolean) {
    this.dialogRef.close(answer);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}