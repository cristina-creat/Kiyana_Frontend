/** @class app/pages/auth/login */

/**
 * @description Email & password login page, includes html & css templates
 * 
 */

// Require angular dependencies
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
// Require global login service
import { LoginService } from 'app/services/login.service';

// Implements decorator Component
// Define selector & html template
@Component({
  selector: 'fury-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // To handle form validations
  form: FormGroup;

  // Show/Hide password
  inputType = 'password';
  // Button to show/hide password
  visible = false;

  // Initialize services
  constructor(
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private loginService: LoginService
  ) {
  }

  // Initial function automatically triggered, declare form values
  ngOnInit() {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // Send login form only if valid
  send() {
    if ( !this.form.valid ) {
      this.loginService.displayMessage('Por favor completa los campos');
      return;
    }

    // Send data to the service
    this.loginService.doLogin( this.form.value ).subscribe(
      data => {
        if ( data['user'] ) {
          // Validate user can access to the admin panel
          let adminTenants = data['tenants'].filter( tn => tn._role.permissions.includes('admin-stats-read') );
          if ( adminTenants && adminTenants.length ) {
            // Store token
            this.loginService.setIdentity(data['user']);
            this.loginService.setTenants(adminTenants);
            this.loginService.setLenguage();
            this.loginService.redirectLogin();
          } else {
            this.loginService.displayMessage('Email o password incorrecto');
          }
        } else {
          this.loginService.displayMessage('Email o password incorrecto');
        }
       
      },
      err => {
        this.loginService.displayMessage('El usuario o la contraseña son incorrectos');
      }
    )

  }

  // Toggle to show/hide password
  toggleVisibility() {
    if (this.visible) {
      this.inputType = 'password';
      this.visible = false;
      this.cd.markForCheck();
    } else {
      this.inputType = 'text';
      this.visible = true;
      this.cd.markForCheck();
    }
  }

}
