/** @class app/pages/landings/condiciones */

/**
 * @description Simple HTML privacy policy page
 * 
 */

// Require angular dependencies
import { Component, OnInit } from '@angular/core';

// Implements decorator Component
// Define selector & html template
@Component({
  selector: 'kiyana-condiciones',
  templateUrl: './condiciones.component.html',
  styleUrls: ['./condiciones.component.scss']
})
export class CondicionesComponent implements OnInit {

  // Initialize services
  constructor() { }

  ngOnInit() {
  }

}
