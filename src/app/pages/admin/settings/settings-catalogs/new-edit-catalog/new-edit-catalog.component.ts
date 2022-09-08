/** @class app/pages/admin/settings/settings-catalogs/new-edit-catalog */

/**
 * @description Settings Catalogs NewEdit page, includes html & css templates
 * 
 */

// Require angular dependencies
import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { DateAdapter, MatDialogRef, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MAT_DIALOG_DATA } from '@angular/material';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
// Require node libraries
import * as _ from 'lodash';
// Require models
import * as Catalogs from 'app/models/catalogs.model';
// Require services
import { LoginService } from 'app/services/login.service';
import { CatalogService } from 'app/services/catalogs.service';

// Define calendar|datetime format configuration
const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MM YYYY',
  },
};

// Implements decorator Component
// Define selector & html template
@Component({
  selector: 'benefits-new-edit-catalog',
  templateUrl: './new-edit-catalog.component.html',
  styleUrls: ['./new-edit-catalog.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})

export class NewEditCatalogComponent implements OnInit {
  // Link to HTML button to handle upload files
  @ViewChild('fileSelect') fileSelect: ElementRef;

  // Current ID item
  id: string;
  // Current collection
  collection: string;
  // Collection dependencies
  external_collections: any;
  // Current item
  item: any;
  // Window title
  title: string = 'Crear item';
  // Stores fields descriptions
  description: any;
  // List of item props
  displayedColumns: string[] = [];

  // Default file format for a file (if not deffined)
  file_format: string = 'application/pdf';
  // File information
  uploadFile: any;


  // Implements decorator Component
  // Define selector & html template
  constructor(
    public catalogService: CatalogService,
    public loginService: LoginService,
    public dialogRef: MatDialogRef<NewEditCatalogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.collection = data.collection;
    this.external_collections = data.external_collections;
    if (data.item) {
      this.title = 'Editar item';
      this.item = new Catalogs[this.collection](data.item);
    } else {
      this.item = new Catalogs[this.collection]();
    }

    var columns = Object.getOwnPropertyNames(this.item);
    this.displayedColumns = columns.filter(el => el != '_id');

    if (typeof this.item.description === "function") {
      this.description = this.item.description();
    } else {
      this.description = {};
      this.displayedColumns.forEach(el => { this.description[el] = { type: this.typeof(el) } });
    }


  }

  // Initialize component
  ngOnInit() {
  }

  // Return type of value to print formated in table
  typeof(item: any) {
    if (typeof (item) == 'object') {
      if (Array.isArray(item)) {
        return 'array';
      } else {
        return 'object';
      }
    } else {
      return typeof (item);
    }
  }

  // Get keys from an object
  getKeys(item: any) {
    return Object.keys(item);
  }

  // Remove an array item
  removeSubitem(item, index) {
    item.splice(index, 1);
  }

  // Add item to an array
  addSubitem(item, field?) {
    var tmp_data = _.cloneDeep(this.description[field].default);
    item.push(tmp_data);
  }

  // Function used to "trackBy" on a For cicle in HTML to avoid repeating index
  trackByIdx(index: number, obj: any): any {
    return index;
  }

  // Function that handle upload file from the HTML button
  uploadItem(field: any, format: string, key?: string) {

    this.file_format = format;

    this.uploadFile = (files) => {
      if (files && files.length) {
        for (var i = 0; i < files.length; ++i) {

          this.loginService.loading = true;
          // Send file to the backend
          this.catalogService.uploadFile(files[i]).subscribe(
            (fileResponse) => {
              if (fileResponse && fileResponse.url) {
                if (!key) {
                  this.item[field] = fileResponse.url;
                } else {
                  field[key] = fileResponse.url;
                }

                this.loginService.loading = false;
                this.loginService.displayMessage('El archivo ha sido agregado');
                this.fileSelect.nativeElement.value = null;
              } else {
                this.loginService.loading = false;
                this.loginService.displayMessage('Ha ocurrido un error al subir el archivo');
                this.fileSelect.nativeElement.value = null;
              }
            },
            (err) => {
              this.loginService.loading = false;
              console.log('err', err);
              this.loginService.displayMessage('Ha ocurrido un error al subir el archivo');
              this.fileSelect.nativeElement.value = null;
            }
          );
        }
      }
    }

    // Update HTML button
    setTimeout(() => {
      this.fileSelect.nativeElement.click()
    });

  }

  // Return file type icon
  getFileIcon(file:string) {
    if ( !file )
      return '';
    var ext = file.split('.').pop();
    switch (ext) {
      case 'pdf':
        return 'assets/icons/svg/pdf.svg';
      case 'jpg':
        return 'assets/icons/svg/jpg.svg';
      case 'jpeg':
        return 'assets/icons/svg/jpg.svg';
      case 'png':
        return 'assets/icons/svg/jpg.svg';
      default:
        return 'assets/icons/svg/default.svg';
    }
  }

  // Remove collection item
  removeItem() {
    if (confirm('¿Estás seguro de borrar el item?')) {
      this.loginService.loading = true;
      // Send request to the backend
      this.catalogService.delete(this.collection, this.item._id).subscribe(
        data => {
          if (data && data['data']._id) {
            this.dialogRef.close({
              deleted: data['data']
            });
            this.loginService.displayMessage('El item ha sido eliminado');
          } else {
            this.loginService.displayMessage('Error al borrar el item');
          }
          this.loginService.loading = false;

        },
        e => {

          this.loginService.displayMessage('Error al borrar el item');
          console.log('error', e);
          this.loginService.loading = false;


        }
      )
    }
  }

  // Save or update item
  saveItem(): void {
    this.loginService.loading = true;
    // Send request to the backend
    this.catalogService.saveOrUpdate(this.collection, this.item).subscribe(
      data => {
        if (!data.error) {
          this.dialogRef.close({
            item: data['data']
          });
          if (this.item._id) {
            this.loginService.displayMessage('El item ha sido actualizado');
          } else {

            this.loginService.displayMessage('El item ha sido agregado');
          }
        } else {
          this.loginService.displayMessage('Ha ocurrido un error al guardar el item');
        }

        this.loginService.loading = false;

      },
      e => {

        this.loginService.displayMessage('Error al guardar el item');
        console.log('error', e);
        this.loginService.loading = false;


      }
    )

  }

  // Close modal
  close() {
    this.dialogRef.close();
  }

  // If item was created/updated return to main component to update table list
  saveForm() {
    this.dialogRef.close(this.item);
  }

}
