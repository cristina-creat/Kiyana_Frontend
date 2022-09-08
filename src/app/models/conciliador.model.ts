/**
 * @interface Conciliacion - Describe conciliacion properties
 */
export class Conciliacion {
    _id: string;
    data: [
        {
            dia: Number,
            poliza: String,
            endoso: String,
            recibo: String,
            serie: String,
            remesa: String,
            cve: String,
            concepto: String,
            importe: Number,
            comis: Number,
            iva_pag: Number,
            isr_r: Number,
            iva_r: Number,
            cargo: Number,
            abono: Number
        }
    ];
    status: string;
    _user: String; // Owner User ID
    created_at: Date;
  
    constructor(model: any = null) {
      for(var key in model){
        this[key] = model[key];
      } 
    }

    // Columns to be exported into an excel file
    exportables() {
      return []
    }
}

/**
 * @interface ConciliacionResult - Describe conciliacion result properties
 */
export class ConciliacionResult {
  _id: string;
  _conciliacion: string; // Conciliacion ID
  data: [
      {
          poliza: Number,
          sica: String,
          insurance: String,
          status: String
      }
  ];
  filename: string; // Exportable Excel filename
  created_at: Date;

  constructor(model: any = null) {
    for(var key in model){
      this[key] = model[key];
    } 
  }

  // Columns to be exported into an excel file
  exportables() {
    return ['cve_agente','agente_poliza','agente_endoso','agente_periodo','agente_importe','agente_comisiones','ins_poliza','ins_endoso','ins_periodo','ins_importe','ins_comisiones','ins_fechas','status']
  }
}

