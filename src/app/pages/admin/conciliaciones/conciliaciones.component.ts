/** @class app/pages/admin/conciliaciones */

/**
 * @description Conciliaciones list page, includes html & css templates
 * 
 */

// Require angular dependencies
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
// Require node modules
import * as _ from 'lodash';
// Require models
import { ListColumn } from 'app/shared/list/list-column.model';
import { Conciliacion } from 'app/models/conciliador.model';
// Require services
import { ConciliadorService } from 'app/services/conciliador.service';
import { LoginService } from 'app/services/login.service';
// Import component to use as a modal
import { NewComponent } from './new/new.component';

// Implements decorator Component
// Define selector & html template
@Component({
  selector: 'fury-conciliaciones',
  templateUrl: './conciliaciones.component.html',
  styleUrls: ['./conciliaciones.component.scss']
})
export class ConciliacionesComponent implements OnInit {

  // Local var to store conciliaciones list
  conciliaciones: Conciliacion[];
  // Local var to store the table list
  dataSource: MatTableDataSource<Conciliacion> | null;

  // Columns to be used in the list
  @Input()
  columns: ListColumn[] = [
    //{ name: 'ID', property: 'id_colaborador', visible: true, isModelProperty: true },
    { name: 'Fecha', property: 'created_at', visible: true, isModelProperty: false },
    { name: 'Aseguradora', property: 'type', visible: true, isModelProperty: true },
    { name: 'Mes', property: 'month', visible: true, isModelProperty: true },
    { name: 'Año', property: 'year', visible: true, isModelProperty: true },
    { name: 'Email', property: 'user_email', visible: false, isModelProperty: true },
    { name: 'Procesos', property: 'count_files', visible: true, isModelProperty: true },
    { name: 'Status', property: 'status', visible: true, isModelProperty: false },
    /*{ name: 'Acciones', property: 'actions', visible: true },*/
  ] as ListColumn[];
  pageSize = 50;

  // Link to the html items
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // Initialize component
  constructor(
    private dialog: MatDialog,
    private conciliadorService: ConciliadorService,
    public loginService: LoginService,
    public router: Router,
  ) {
  }

  // Get function, return list of columns with property visible = true
  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  // Auto exec function when component is loaded
  ngOnInit() {
    // Initialize mat table
    this.dataSource = new MatTableDataSource();

    // Get conciliaciones from backend, filtration is made from backend
    this.conciliadorService.getAll().subscribe(
      response => {
        this.conciliaciones = response['data'];
        this.dataSource.data = this.conciliaciones.map(el => {
          el['user_email'] = el._user['email'];
          return el;
        });
        this.loginService.loading = false;
      },
      err => {
        this.loginService.loading = false;
        this.loginService.displayMessage('Ha ocurrido un error al cargar los registros');
      });


  }

  // When dom is ready, link HTML.
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // Launch modal with NewComponent for a new conciliacion
  createConciliacion() {

    this.dialog.open(
      NewComponent,
      {
        width: '600px',
        height: '450px',
        panelClass: 'edit-catalog-item',
        hasBackdrop: true
      }
    ).afterClosed().subscribe((data: any) => {

      //If data is returned (new conciliacion was requested), reload all data

      if (data) {
        this.ngOnInit();
      }

    });

  }


  // Filter data when search field has changed
  onFilterChange(value: string) {
    if (!this.dataSource) {
      return;
    }
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
  }

}
