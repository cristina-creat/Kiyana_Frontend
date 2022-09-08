/** @class app/pages/landings/privacidad */

/**
 * @description Simple HTML privacy policy page
 * 
 */

// Require angular dependencies
import { Component, OnInit } from '@angular/core';

// Implements decorator Component
// Define selector & html template
@Component({
  selector: 'kiyana-privacidad',
  templateUrl: './privacidad.component.html',
  styleUrls: ['./privacidad.component.scss']
})
export class PrivacidadComponent implements OnInit {

  // Initialize services
  constructor() { }

  ngOnInit() {
  }

}
