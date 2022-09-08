/** @class app/pages/admin/users/user-edit/password */

/**
 * @description Users password edit modal, includes html & css templates
 * 
 */

// Require angular dependencies
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
// Require services
import { LoginService } from 'app/services/login.service';
import { UsersService } from 'app/services/users.service';

// Implements decorator Component
// Define selector & html template
@Component({
  selector: 'user-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {
  
  // To use form validation
  form: FormGroup;

  // Initialize component
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<PasswordComponent>,
    private fb: FormBuilder,
    public loginService: LoginService,
    private usersService: UsersService,
  ) { }

  // Auto exec function when component is loaded
  ngOnInit() {
    this.form = this.fb.group( {
      password: ['', [Validators.required,Validators.minLength(6)]]
    } );
  }

  // Send new password to backend
  save() {
    
    this.usersService.updatePassword(this.data.user, this.form.value.password).subscribe((res) => {
      if ( !res || !res._id ) {
        this.loginService.displayMessage('Ha ocurrido un error al actualizar el usuario');
      } else {
        this.loginService.displayMessage('El usuario ha sido actualizado');
        this.dialogRef.close();
      }
    },
      (err) => {
        console.log(err);
        this.loginService.displayMessage('Ha ocurrido un error al actualizar el usuario');
    });
  }

  // Close window modal
  close() {
    this.dialogRef.close();
  }

}
