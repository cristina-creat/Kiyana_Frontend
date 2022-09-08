/** @class app/pages/admin/company/company-roles/company-role-create-update */

/**
 * @description Tenant roles admin page, includes html & css templates
 * 
 */

// Require angular dependencies
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
// Require role model
import { Role } from '../../../../../../models/role.model';

// Implements decorator Component
// Define selector & html template
@Component({
  selector: 'fury-company-role-create-update',
  templateUrl: './company-role-create-update.component.html',
  styleUrls: ['./company-role-create-update.component.scss']
})
export class CompanyRoleCreateUpdateComponent implements OnInit {

  // Define form to validate
  form: FormGroup;
  // By default is in creation mode
  mode: 'create' | 'update' = 'create';

  constructor(@Inject(MAT_DIALOG_DATA) public defaults: any,
              private dialogRef: MatDialogRef<CompanyRoleCreateUpdateComponent>,
              private fb: FormBuilder) {
  }

  // Auto exec when component is triggered
  ngOnInit() {
    if (this.defaults) {
      this.mode = 'update';
    } else {
      this.defaults = {} as Role;
    }
    // Define form inputs to validate
    this.form = this.fb.group({
      _id: [this.defaults._id || null],
      name: [this.defaults.name || '',]
    });
  }

  // Trigger save or update function
  save() {
    if (this.mode === 'create') {
      this.createRole();
    } else if (this.mode === 'update') {
      this.updateRole();
    }
  }

  // Close modal and return value
  createRole() {
    const role = this.form.value;
    role.permissions = [];
    this.dialogRef.close(role);
  }

  // Close modal and return value
  updateRole() {
    const role = this.form.value;
    role._id = this.defaults._id;

    this.dialogRef.close(role);
  }

  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }
}
