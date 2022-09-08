import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ViewEncapsulation } from '@angular/core'; // and any other imports

@Component({
  selector: 'fury-kiolink-popup-scale',
  templateUrl: './kiolink-popup-scale.component.html',
  styleUrls: ['./kiolink-popup-scale.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class KiolinkPopupScaleComponent implements OnInit {

  folio: any;

  constructor(
    public dialogRef: MatDialogRef<KiolinkPopupScaleComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if(data){
      this.folio = data;
    }
   }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
