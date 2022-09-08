/** @class app/pages/admin/settings/settings-catalogs */

/**
 * @description Settings Catalogs page, includes html & css templates
 * 
 */

// Require angular dependencies
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
// Require node libraries
import * as _ from 'lodash';
// Require models
import * as Catalogs from 'app/models/catalogs.model';
// Require services
import { LoginService } from 'app/services/login.service';
import { CatalogService } from 'app/services/catalogs.service';
// Require component to load as a modal
import { NewEditCatalogComponent } from './new-edit-catalog/new-edit-catalog.component';

// Implements decorator Component
// Define selector & html template
@Component({
  selector: 'fury-settings-catalogs',
  templateUrl: './settings-catalogs.component.html',
  styleUrls: ['./settings-catalogs.component.scss']
})
export class SettingsCatalogsComponent implements OnInit {

  // Link HTML components
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // List of available collection (Defined from model)
  collections: string[] = [];
  // Current selected model
  currentCollection: string;
  // Store new item
  newItem: any;
  // List of collections when has dependencies
  external_collections: any;


  // List of columns to display (Mat Table configuration)
  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<Element[]>();
  pageSize: number = 50;
  

  // Initialize component
  constructor(
    public catalogService: CatalogService,
    public loginService: LoginService,
    public dialog: MatDialog
  ) {
    
  }

  // Initialize component
  ngOnInit() {
    // Get list from model
    this.collections = Object.keys(Catalogs);
    // Set first model to work with it
    this.setupCollection( this.collections[0] );

  }

  // Function to initialize data with a selected model
  setupCollection( name: string ): void {
    // Set collection name
    this.currentCollection = name;
    // Initialize empty object
    this.newItem = new Catalogs[ name ]();
    // Local var of an empty object used to get props and more
    let tmp = new Catalogs[ name ]();
    // Get model columns by props
    var columns = Object.getOwnPropertyNames(tmp);
    // Get columns qty
    this.displayedColumns.length = columns.length;
    this.displayedColumns = columns;
    
    // Get current model data
    this.catalogService.getAll( name ).subscribe( 
      data => {
        // Initialize Mat Table
        this.dataSource.data = data;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.loginService.loading = false;
        

        // Get  extra collections
        this.external_collections = {};
        let extra = tmp.exportables();
        // If current catalog has dependencies, get it from backend
        Object.keys( extra ).forEach( col => {
          this.catalogService.getAll( extra[col] ).subscribe( 
            ext => {
              this.external_collections[col] = ext;
            },
            err => {
              console.log('Error loading ' + extra[col]);
            }
          );
        });
        this.dataSource.paginator = this.paginator;

      },
      e => {
        alert('No se ha podido cargar el catálogo')
        console.log( 'error', e);
        this.loginService.loading = false;
        
      }
    )

    
  }

  // function that returns data from an external collection (receive ID and return value)
  getFromExternal( collection: any[], item: string ) {
    if ( !collection )
      return ''
    var el = collection.find( el => String(el._id) == String(item) );
    return ( el && el.name ) ? el.name : '';
  }

  // Return type of value to print formated in table
  typeof( item: any ) {
    //console.log( item, typeof(item) )
    if ( typeof(item) == 'object' ) {
      if ( Array.isArray(item) ) {
        return 'array';
      } else {
        return 'object';
      }
    } else {
      return typeof(item);
    }
  }

  // Get keys from an object
  getKeys( item:any ) {
    return item ? Object.keys( item ) : [];
  }

  // Remove an array item
  removeSubitem(item: any[], index: number) {
    item.splice(index, 1);
  }

  // Add item to an array
  addSubitem(item: any[]) {
    let last = _.cloneDeep(item[item.length-1]);
    if ( typeof(last) != 'object' ) {
      item.push('');
    } else {
      Object.keys(last).forEach( k => {
        if ( Array.isArray(last[k]) ) {
          last[k] = [];
        } else {
          last[k] = '';
        }
      });
      item.push(last);
    }
    
  }

  
  // Function used to "trackBy" on a For cicle in HTML to avoid repeating index
  trackByIdx(index: number, obj: any): any {
    return index;
  }

  // Function to display modal for a creation or editing item
  newEditCatalog( item?: any ): void {
    const dialogRef = this.dialog.open(NewEditCatalogComponent, {
      width: '500px',
      panelClass: 'edit-catalog-item',
      hasBackdrop: true,
      // Sen props (current collection, dependencies, current item)
      data: {
        collection: this.currentCollection,
        external_collections: this.external_collections,
        item: item
      }
    });

    // When modal is closed, update table if neccessary
    dialogRef.afterClosed().subscribe(result => {
      if ( result && result.deleted ) {
        const table = this.dataSource.data;
        this.dataSource.data = table.filter( el => el['_id'] !== item._id );;
      }
      if ( result && result.item ) {
        console.log( result )
        const table = this.dataSource.data;
        var index = table.findIndex( el => String(el['_id']) == String(result.item._id) );
        if ( index != -1 ) {
          table[index] = new Catalogs[ this.currentCollection ](result.item);
        } else {
          table.push( new Catalogs[ this.currentCollection ](result.item) );
        }
        this.dataSource.data = table;
      }
    });
  }

}
