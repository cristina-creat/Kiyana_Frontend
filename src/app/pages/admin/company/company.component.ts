/** @class app/pages/admin/company */

/**
 * @description Tenand admin page, includes html & css templates
 * 
 */

// Require angular dependencies
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
// Require node libraries
import * as _ from 'lodash';
// Require models
import { Tenant } from 'app/models/tenant.model';
import { LoginService } from 'app/services/login.service';
import { ListColumn } from 'app/shared/list/list-column.model';
// Require services
import { TenanService } from '../../../services/tenant.service';
import { UtilsService } from '../../../services/utils.service';

// Implements decorator Component
// Define selector & html template
@Component({
  selector: 'benefits-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
  // Columns to be used in the tenants list
  @Input()
  columns: ListColumn[] = [
    { name: 'Nombre', property: 'name', visible: true, isModelProperty: true },
    { name: 'Status', property: 'status', visible: true, isModelProperty: false },
    { name: 'Fecha Creación', property: 'created_at', visible: true, isModelProperty: false },
    { name: '', property: 'actions', visible: true, isModelProperty: false },
  ] as ListColumn[];
  // Define MatTable structure
  dataSource: MatTableDataSource<Tenant> | null;
  pageSize = 50;
  // Store tenants list from backend request
  tenant: Tenant[];

  // Link HTML with component
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // Initialize component
  constructor(
    private tenantService: TenanService,
    public router: Router,
    public utilsService: UtilsService,
    public loginService: LoginService) {
    this.loginService.loading = true;
  }

  // Get function, return list of columns with property visible = true
  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  // Auto exec function when component is loaded
  ngOnInit() {
    // Define empty mat table
    this.dataSource = new MatTableDataSource();

    // Get all tennts from backend
    this.tenantService.getAll().subscribe(
      tenant => {
        // Store tenants locally
        this.tenant = tenant;
        // Insert tenants into list
        this.dataSource.data = this.tenant;
        // Stop loader
        this.loginService.loading = false;
      },
      err => {
        this.loginService.displayMessage('Ha ocurrido un error al cargar la información');
        this.loginService.loading = false;
      });

  }

  // When dom is ready, link HTML.
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // Filter data when search field has changed
  onFilterChange(value) {
    if (!this.dataSource) {
      return;
    }
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
  }

  // Remove tenand (also unlink from users)
  deleteCompany(tenant: any) {
    if (confirm("¿Estás seguro de borrar la empresa?")) {
      this.tenantService.deleteTenantById(tenant).subscribe((res) => {
        if (res.message) {
          this.loginService.displayMessage(res.message);
        } else {
          this.tenant.splice(this.tenant.map(el => { return el._id; }).indexOf(tenant._id), 1);
          this.loginService.displayMessage('La empresa ha sido eliminada.');
          this.dataSource.data = this.tenant;
        }
      });
    }


  }
  
  // If admin, work as selected tenant
  setupTenant(tenant: any) {
    this.loginService.selectTenant(tenant);
    window.location.reload();
  }

}