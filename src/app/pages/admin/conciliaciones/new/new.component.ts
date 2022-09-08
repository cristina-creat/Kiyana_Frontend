/** @class app/pages/admin/conciliaciones/new */

/**
 * @description New conciliacion modal page, includes html & css templates
 * 
 */

// Require angular dependencies
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
// Require angular dependencies for date time configuration
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
// Require node modules
import * as _ from 'lodash';
import * as _moment from 'moment';
// Require services
import { UtilsService } from 'app/services/utils.service';
import { LoginService } from 'app/services/login.service';
import { ConciliadorService } from 'app/services/conciliador.service';

// Initialize local moment
const moment = _moment;

// Initialice locale date time configuration (for date picker)
export const MY_FORMATS = {
  parse: {
    dateInput: 'MMMM YYYY',
  },
  display: {
    dateInput: 'MMMM YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

// Implements decorator Component
// Define selector & html template
@Component({
  selector: 'fury-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to this interface
    // implements non typical configurations (year/month selection, no day)
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})

export class NewComponent implements OnInit {

  // HTML button to upload REPORTE file
  @ViewChild('importSicaButton') importSICAbutton: ElementRef;

  // Separated validation for each step
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  // NAME of the selected insurance
  currentInsurance: string;

  // Phharsed report result
  fileInfo: any;
  // Agent numbers to proccess (extracted from the report)
  agentCodes: string[] = []

  // Initialize component
  constructor(
    private _formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef, // To reload data when not automatically
    public dialogRef: MatDialogRef<NewComponent>, // To manage current modal
    private loginService: LoginService,
    private utilsService: UtilsService,
    private conciliadorService: ConciliadorService
  ) {
  }

  // Auto exec function when component is loaded
  ngOnInit(): void {
    // Getenate first block validations
    this.firstFormGroup = this._formBuilder.group({
      insurance: [null, Validators.required],
    });
    // Generate second block validations
    this.secondFormGroup = this._formBuilder.group({
      period: [moment(), Validators.required],
    });
    // Generate third block validations
    this.thirdFormGroup = this._formBuilder.group({
      dataFile: [null, Validators.required],
      agentes: [[], Validators.required]
    });
    // Set default insurance
    this.setInsurance('Qualitas');
  }

  // Change insurance name in local var and into form
  setInsurance(name: string): void {
    this.firstFormGroup.patchValue({ insurance: name });
    this.currentInsurance = name;
  }

  // Launched when file selection was triggered
  importSica(event: any) {

    // Get information from first file
    const filedata = event.target.files[0];
    // Copy filename into local var
    this.fileInfo = _.cloneDeep(filedata.name);
    // Use utils service to extract report data (here we should launch a cusom service to parametrize)
    this.utilsService.importExcelFileAsArray(filedata).then(
      data => {
        // Reset HTML button
        this.importSICAbutton.nativeElement.value = null;

        // Only filter items with 17 fields
        data = data.filter(el => el.length >= 17);

        // Convert array to object through utils service
        data = this.utilsService.arrayToObject(data);
        let numberItems = ['CAgente', 'ImportePendXMon', 'ImportePend_MXN', 'PrimaNeta'];

        // Cast to numbers and dates
        data = data.map(el => {
          numberItems.forEach(k => {
            el[k] = Number(String(el[k]).replace(/,/g, ''));
          });
          // Disabled because data is already date format (maybe this change, we need to import as a RAW)
          /*
          dateItems.forEach( k => {
            console.log( el[k] )
            el[k] = moment(el[k],'DD/MM/YYYY').toDate();
            console.log( el[k] )
          });
          */
          return el;
        });

        // Get array of available agents
        this.agentCodes = _.uniq(data.map(d => d.CAgente));
        // Fill form validations
        this.thirdFormGroup.setValue({ dataFile: data, agentes: this.agentCodes });
      }
    ).catch(err => {
      console.error(err);
      // If error, reset HTML button to be available
      this.importSICAbutton.nativeElement.value = null;
      this.loginService.displayMessage('El archivo importado contiene datos incorrectos');
    });
  }

  // Send conciliacion request to the backend
  makeRequest() {
    // Filter only selected agents
    let thirdForm = this.thirdFormGroup.value;
    // Filter report data with selected agents
    thirdForm.dataFile = thirdForm.dataFile.filter(el => thirdForm.agentes.includes(el.CAgente));
    // Merge forms into only one
    let data = { ...this.firstFormGroup.value, ...this.secondFormGroup.value, ...thirdForm }

    // Send request to the backend
    this.conciliadorService.makeRequest(data).subscribe(
      resp => {
        this.loginService.displayMessage('La solicitud ha sido enviada.')
        this.dialogRef.close(resp);
      },
      err => {
        this.loginService.displayMessage('Ha ocurrido un error al procesar la solicitud.')
      },
    )
  }

  // Exit creation modal
  close() {
    this.dialogRef.close();
  }

  // Triggered when a year is selected
  chosenYearHandler(normalizedYear: string) {
    let { period } = this.secondFormGroup.value;
    period.year(moment(normalizedYear).year());
    this.secondFormGroup.patchValue({ period: period });
  }

  // Triggered when a month is selected
  chosenMonthHandler(normalizedMonth: string, datepicker: MatDatepicker<any>) {
    let { period } = this.secondFormGroup.value;
    period.month(moment(normalizedMonth).month());
    // Example
    //this.secondFormGroup.patchValue({ period: '2021-11' });
    this.secondFormGroup.patchValue({ period: period });
    // Close datepicker because we don't need day selection
    datepicker.close();
    // Update DOM
    this.cdr.detectChanges();

  }

}
