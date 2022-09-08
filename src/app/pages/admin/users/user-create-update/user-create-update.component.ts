/** @class app/pages/admin/users/user-create-update */

/**
 * @description New user modal, includes html & css templates
 * 
 */

// Require angular dependencies
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
// Require models
import { User } from '../../../../models/user.model';

// Implements decorator Component
// Define selector & html template
@Component({
  selector: 'fury-user-create-update',
  templateUrl: './user-create-update.component.html',
  styleUrls: ['./user-create-update.component.scss']
})
export class UserCreateUpdateComponent implements OnInit {

  // To validate form
  form: FormGroup;
  mode: 'create' | 'update' = 'create';

  // Initialize component
  constructor(
              @Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<UserCreateUpdateComponent>,
              private fb: FormBuilder) {
  }

  // Auto exec function when component is loaded
  ngOnInit() {
    // By default, this modal is in creation mode
    if (this.data.user) {
      this.mode = 'update';
    } else {
      this.data.user = {} as User;
    }

    // Generate validation form
    this.form = this.fb.group({
      _id: [this.data.user._id || undefined],
      email: [this.data.user.email || '',],
      role: [this.data.user.role || ( this.data.roles.length ? this.data.roles[0]._id : '')]
    });
  }

  // Send data if is creation of updating
  save() {
    if (this.mode === 'create') {
      this.createUser();
    } else if (this.mode === 'update') {
      this.updateUser();
    }
  }

  // Close modal and return data to main component
  createUser() {
    const user = this.form.value;
    this.dialogRef.close(user);
  }

  // Close modal and return data to main component
  updateUser() {
    const user = this.form.value;
    user._id = this.data.user._id;

    this.dialogRef.close(user);
  }

  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }
}
