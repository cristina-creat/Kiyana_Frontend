import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
@Component({
  selector: 'benefits-select-company',
  templateUrl: './select-company.component.html',
  styleUrls: ['./select-company.component.scss']
})
export class SelectCompanyComponent implements OnInit {

  constructor(public dialog: MatDialog) {
  }
  

  ngOnInit() {
  }

}
