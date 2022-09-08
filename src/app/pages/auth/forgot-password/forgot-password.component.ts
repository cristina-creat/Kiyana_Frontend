/** @class app/pages/auth/forgot-password */

/**
 * @description Password restore page, includes html & css templates
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
  selector: 'fury-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  // To handle form validations
  form: FormGroup;

  // Show/Hide password
  inputType = 'password';
  // Button to show/hide password
  visible = false;

  // It has 3 steps:
  // 1. insert email and receibe code by email
  // 2. enter received code
  // 3. if code match, send new password
  currentStep: number = 1;

  code: string;
  token: string;
  password: string;

  // Initialize services
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private snackbar: MatSnackBar,
    private loginService: LoginService
  ) {
  }

  // Initial function automatically triggered, declare form values
  ngOnInit() {
    this.form = this.fb.group({
      email: ['', Validators.required]
    });
  }

  // Send email to the backend
  async send() {
    if ( !this.form.valid ) {
      this.loginService.displayMessage('Por favor completa los campos');
      return;
    }

    // Send email to backend and request for code
    await this.loginService.requestPasswordRestore( this.form.value.email );
    this.currentStep = 2;
    
  }

  // Send code received by email
  async passwordRequestCode() {

    if ( !this.code || !this.code.length ) {
      this.loginService.displayMessage('El código es requerido');
      return;
    }

    // Send to the backend
    let responseData = await this.loginService.requestPasswordCodeValidate( this.code );
    if ( responseData && responseData.token ) {
      this.token = responseData.token;
      this.currentStep = 3;
    } else {
      this.loginService.displayMessage('El código que has ingresado es incorrecto o ha caducado');
    }
  }
  
  // Send new password
  async passwordRequestSetup( ) {

    if ( !this.token || !this.token.length || !this.password || !this.password.length || this.password.length < 8 ) {
      this.loginService.displayMessage('La contraseña debe contener al menos 8 caracteres');
      return;
    }

    // Send to the backend
    let passResponse = await this.loginService.requestPasswordSetupNew( this.token, this.password );
    if ( passResponse && passResponse.email ) {
      this.loginService.displayMessage('La contraseña ha sido actualizada');
      this.currentStep = 4;
    } else {
      this.loginService.displayMessage('Ha ocurrido un error al actualizar la contraseña');
    }

  }
  

  // Show / hide password
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
