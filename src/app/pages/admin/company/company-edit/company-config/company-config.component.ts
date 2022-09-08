// NOT IN USE YET



import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'benefits-company-config',
  templateUrl: './company-config.component.html',
  styleUrls: ['./company-config.component.scss']
})
export class CompanyConfigComponent implements OnInit {

  @Input() tenant: string;

  constructor() { }

  ngOnInit() {
  }

}
