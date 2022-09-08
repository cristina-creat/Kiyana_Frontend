/**
 * @interface Tenant - Describe company or customer properties
 */
export class Tenant {
    _id: string;
    name:string;
    calle:string;
    colonia:string;
    cp:string;
    estado:string;
    municipio:string;
    pais:string;
    tel:string;
    contacto_admin:string;
    status: boolean;
    img:string;
    color:string = "#FF671D"; // Not in use, expected to be used to enhance company interface
  
    constructor(model: any = null) {
      for(var key in model){
        this[key] = model[key];
      } 
    }

    // Columns to be exported into an excel file
    exportables() {
        return ["_id", "name", "active"]
      }
}