/** @class app/pages/admin/settings */

/**
 * @description Settings page, includes html & css templates, this page is a holder of sub components
 * 
 */

// Require angular dependencies
import { Component, OnInit } from '@angular/core';
// Require services
import { LoginService } from '../../../services/login.service';


// Implements decorator Component
// Define selector & html template
@Component({
  selector: 'ms-main-content',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  
  // Initialize component
  constructor(
    public loginService: LoginService
  ) {
    
  }

  ngOnInit() {
    
    
  }
  

}