/** @class app/pages/admin/users/bulk-result */

/**
 * @description Bulk result modal component, includes html & css templates
 * 
 */

// Require angular dependencies
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LoginService } from 'app/services/login.service';

// Implements decorator Component
// Define selector & html template
@Component({
  selector: 'benefits-bulk-result',
  templateUrl: './bulk-result.component.html',
  styleUrls: ['./bulk-result.component.scss']
})

export class BulkResultComponent implements OnInit {
  // Stores backend response of a bulk result
  result: any = {};

  // initialize component
  constructor(
    public loginService: LoginService,
    public dialogRef: MatDialogRef<BulkResultComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if ( this.data ) {
      this.result = this.data;
    } else {
      this.dialogRef.close();
      this.loginService.displayMessage('No se ha obtenido una respuesta');
    }
  }

  // Auto exec function when component is loaded
  ngOnInit() {
  }

}
