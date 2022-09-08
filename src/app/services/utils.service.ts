/** @class app/services/utils */

/**
 * @description Service with common functionalities, to use into any component
 * 
 */

// Require angular dependencies
import { Injectable } from '@angular/core';

// Import node libraries
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

// Define default Excel extensions and mime types
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

// Define common structure for array of arrays
type AOA = any[][];

// Implements decorator Injectable to use as a service
@Injectable({
  providedIn: 'root'
})
// Exportable as a class
export class UtilsService {

  // Empty constructor
  constructor(
  ) {
    
  }

  // Function that exports a JSON to an Excel file:
  // 
  // Params:
  // json: a json structure
  // excelFileName: the name to the result file
  // headers: optional if titles should be added
  exportJsonAsExcelFile(json: any[], excelFileName: string, headers?: string[]) {
    let options = {};
    if ( headers ) {
      options['header'] = headers;
    }
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json, options );
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }
  
  // Function that exports an array to an Excel file:
  // 
  // Params:
  // arrayData: a array of arrays structure
  // excelFileName: the name to the result file
  exportArrayAsExcelFile(arrayData: any[], excelFileName: string) {
    const worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(arrayData);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  // Function that reads a file and returns an array of arrays
  // 
  // Params:
  // file: HTML File Object
  importExcelFileAsArray( file: File ) : Promise<any[]> {
    return new Promise ( (resolve) => {
      const reader: FileReader = new FileReader();
      // Handle as an event, reading is async
      reader.onload = (e: any) => {
        /* read workbook */
        const bstr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(bstr, {
          type: 'binary',
          cellDates: true,
          cellNF: false,
          cellText: false
        });

        /* grab first sheet */
        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];

        /* save data */
        resolve( <AOA>(XLSX.utils.sheet_to_json(ws, {header: 1})) );
      };
      reader.readAsBinaryString(file)
    });
  }

  // Function that converts an AoA to an Key => Value array
  // 
  // Params:
  // data: AoA data
  arrayToObject( data: any[] ) {
    // Array must include headings in the first row
    var headings = data.shift();
    return data.map( el => {
      var item = {};
      headings.forEach( (key, index) => {
        item[key] = el[index];
      });
      return item;
    });
  }

  // Internal function to generate a downloadable file
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

  // Generates an HTML element of a file to be downloadable
  blobToFile(blob: any, fileName: string) {
    const a = document.createElement('a')
    const objectUrl = URL.createObjectURL(blob)
    a.href = objectUrl
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(objectUrl);

  }

  
}