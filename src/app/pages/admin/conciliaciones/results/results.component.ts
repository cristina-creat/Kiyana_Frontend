/** @class app/pages/admin/conciliaciones/new */

/**
 * @description New conciliacion modal page, includes html & css templates
 * 
 */

// Require angular dependencies
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
// Require node libraries
import * as _ from 'lodash';
import * as moment from 'moment';
// Require models
import { ListColumn } from 'app/shared/list/list-column.model';
import { Conciliacion, ConciliacionResult } from 'app/models/conciliador.model';
// Require services
import { ConciliadorService } from 'app/services/conciliador.service';
import { LoginService } from 'app/services/login.service';
import { UtilsService } from 'app/services/utils.service';
// Setup moment localization (lang)
moment.locale('es');

// Implements decorator Component
// Define selector & html template
@Component({
  selector: 'fury-results-conciliacion',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  // Conciliacion ID
  id: string; 
  // Conciliacion request data
  conciliacion: Conciliacion;
  creation_date: string;
  // RPAs list
  queue: any[];
  currentQueue: any;
  // Results of the conciliacion
  conciliacionResult: ConciliacionResult;
  // Initialize Mat Table
  dataSource: MatTableDataSource<any> | null;
  
  // Columns to be used in the list
  @Input()
  columns: ListColumn[] = [
    //{ name: 'ID', property: 'id_colaborador', visible: true, isModelProperty: true },
    { name: 'CVE Agente', property: 'cve_agente', visible: true, isModelProperty: true },
    { name: 'Agente Poliza', property: 'agente_poliza', visible: true, isModelProperty: true },
    { name: 'Agente Endoso', property: 'agente_endoso', visible: true, isModelProperty: true },
    { name: 'Agente Periodo', property: 'agente_periodo', visible: false, isModelProperty: true },
    { name: 'Agente Importe', property: 'agente_importe', visible: true, isModelProperty: false },
    { name: 'Agente Comisiones', property: 'agente_comisiones', visible: true, isModelProperty: false },
    { name: 'INS Poliza', property: 'ins_poliza', visible: true, isModelProperty: true },
    { name: 'INS Endoso', property: 'ins_endoso', visible: true, isModelProperty: true },
    { name: 'Ins Periodo', property: 'ins_periodo', visible: false, isModelProperty: true },
    { name: 'INS Importe', property: 'ins_importe', visible: true, isModelProperty: false },
    { name: 'INS Comisiones', property: 'ins_comisiones', visible: true, isModelProperty: false },
    { name: 'INS Fechas', property: 'ins_fechas', visible: false, isModelProperty: true },
    { name: 'Status', property: 'status', visible: true, isModelProperty: false },
    //{ name: 'Acciones', property: 'actions', visible: true },
  ] as ListColumn[];
  pageSize = 50;
  
  // Link to the html items
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // Array of months
  availableMonths: string[] = ['','Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

  // Initialize component
  constructor(
    private route: ActivatedRoute,
    private conciliadorService: ConciliadorService,
    private utilsService: UtilsService,
    public loginService: LoginService,
    public router: Router
    ) {
      //this.loginService.loading = true; 
      this.route.params.subscribe( params =>{
        this.id = params['id'];
      });
  }

  // Get function, return list of columns with property visible = true
  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  // Auto exec function when component is loaded
  ngOnInit() {

    // Initialize mat table
    this.dataSource = new MatTableDataSource();

    // Get results from backend
    this.conciliadorService.getResultsById( this.id ).subscribe(
      response => {
        if (!response || !response.conciliacion ) {
          this.loginService.displayMessage('No se han encontrado resultados de la conciliación');
          return;
        }
        // Store into local variable
        this.conciliacion = response.conciliacion;
        // Store into local variable
        this.queue = response.queue;
        if ( this.queue && this.queue.length ) {
          this.currentQueue = this.queue[0];
        }

        // If already have results
        if ( response.result ) {
          this.conciliacionResult = response.result;
          
          if ( !this.conciliacionResult.data ) {
            this.conciliacionResult.data = <any>[];
          }
          // Sort data 
          this.dataSource.data = this.conciliacionResult.data.map( el => {
            el['cve_agente'] = (el.sica && el.sica['CAgente']) ? el.sica['CAgente'] : ((el.insurance && el.insurance['agente']) ? el.insurance['agente'] : 'N/A');
            el['agente_poliza'] = el.sica ? el.sica['Documento'] : '';
            el['agente_endoso'] = el.sica ? el.sica['Endoso'] : '';
            el['agente_periodo'] = el.sica ? el.sica['Periodo'] : '';
            el['agente_importe'] = el.sica ? el.sica['PrimaNeta'] : 'N/A';
            el['agente_comisiones'] = el.sica ? el.sica['total'] : 'N/A';
            el['ins_poliza'] = el.insurance ? el.insurance['poliza'] : '';
            el['ins_endoso'] = el.insurance ? el.insurance['endoso'] : '';
            el['ins_periodo'] = el.insurance ? el.insurance['serie'] : '';
            el['ins_importe'] = el.insurance ? el.insurance['totalImporte'] : 'N/A';
            el['ins_comisiones'] = el.insurance ? el.insurance['totalComisiones'] : 'N/A';
            el['ins_fechas'] = el.insurance ? el.insurance['periodo'] : 'N/A';
            return el;
          });
        }
        
        this.loginService.loading = false;
      },
      err => {
        this.loginService.loading = false;
        this.loginService.displayMessage('Ha ocurrido un error al cargar los registros');
        //console.log( err );  
    });
    

  }

  // Get function to return only finished queue
  get proccessedQueue() {
    if ( !this.queue || !this.queue.length )
      return 0;
    return this.queue.filter( el => el.status != 'pending' ).length
  }

  // Get percent of the proccessed queue
  get percentQueue() {
    if ( !this.queue || !this.queue.length )
      return 100;
    return  ( ( 100 / this.queue.length ) * this.proccessedQueue ).toFixed(0);
  }

  // When dom is ready, link HTML.
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // Launch modal with NewComponent for a new conciliacion
  onFilterChange(value) {
    if (!this.dataSource) {
      return;
    }
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
  }

  // Exports all results to a ZIP file
  exportData() {
    this.conciliadorService.getResultsFileById( this.conciliacion._id, this.conciliacionResult._id, this.conciliacionResult._id+'.zip' ).subscribe(
      (data) => {
        this.utilsService.blobToFile( data, this.conciliacionResult._id+'.zip')
      },
      err => {
        this.loginService.displayMessage('El archivo no se encuentra disponible, intenta generando nuevamente la conciliación.');
        console.warn( err );
      }
     );
  }

  // Reset queue item proccess
  reloadQueue( item: any ) {
    if ( confirm("¿Deseas agregar nuevamente a la cola de ejecución?\nEsto ejecutará nuevamente la conciliación.") ) {
      this.conciliadorService.resetQueue( this.conciliacion._id, item._id ).subscribe(
        data => {
          this.loginService.displayMessage('La solicitud ha sido enviada. En unos segundos la información será recargada.');;
          setTimeout( () => {
            this.ngOnInit();
          }, 3000)
        },
        error => {
          console.log( error );
          this.loginService.displayMessage('Ha ocurrido un error al enviar la solicitud');
        }
      );
    }
  }

  // Convert month number to string
  getMonth( month: number ) {
    return this.availableMonths[ month ] ? this.availableMonths[ month ] : 'N/A';
  }

  // Make again the conciliacion (if necessary, in case of algorithm has been changed as an example)
  reloadConciliacion() {
    
    if ( confirm('Se enviará una nueva solicitud, el resultado será enviado por email. ¿Desea continuar?') ) {
      this.conciliadorService.doConciliacion( this.conciliacion._id ).subscribe(
        data => {
          this.loginService.displayMessage('La solicitud ha sido enviada. En unos segundos la información será recargada.');
          setTimeout( () => {
            this.ngOnInit();
          }, 3000)
        },
        error => {
          console.log( error );
          this.loginService.displayMessage('Ha ocurrido un error al enviar la solicitud');
        }
      );
    }
  }
  
  // Remove all conciliacion data
  removeConciliacion() {
    
    if ( confirm('La conciliación y sus procesos serán eliminados. ¿Desea continuar?') ) {
      
      this.conciliadorService.removeRequest( this.conciliacion._id ).subscribe(
        data => {
          this.loginService.displayMessage('La conciliación ha sido eliminada');
          setTimeout( () => {
            this.router.navigateByUrl('/app/conciliaciones')
          });
        },
        error => {
          console.log( error );
          this.loginService.displayMessage('Ha ocurrido un error al enviar la solicitud');
        }
      );
      
      
    }
  }
  


}
