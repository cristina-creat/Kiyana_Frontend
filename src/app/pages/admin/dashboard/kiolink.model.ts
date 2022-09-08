import * as moment from 'moment';
 
let eventDateFormat2: string = 'YYYY-MM-DD';

export class Evento {
  _id: any;
  folio: String;
  type: String;
  name_event: String;
  _user: any;
  _business_user: any;
  name_business: String;
  descripcion: String;
  sede: String;
  sala: String;
  device_manage: Boolean;
  device_requests: {
      ingreso: String[],
      salida:  String[],
      no_registrado:  Boolean
      };
  users_invitations: any[];
  business_users_invitations: any[];
  external_invitations: any[];
  start_date: Date;
  end_date: Date;
  _servicedesk_user: String;
  _security_user: String;
  _infra_user: String;
  extra_auth: any;
  _user_authorize: String; // User whom authorize the event
  _authorized_date: Date;
  status: String;
  rejection: any[];
  files: any;
  comments: any;

  constructor(model: any = null) {
    for(var key in model){
      this[key] = model[key];
    } 
  }

  transformFromDB(data: any) {
    var offset = moment().utcOffset();
    var localText = moment(data.start_date).local().utcOffset(offset);
    data.start_date = new Date(data.start_date);
    var tmp_date = new Date ( data.start_date.getTime() + (data.start_date.getTimezoneOffset() * 60000) );

    let tmp = {
      _id: data._id,
      start: moment(tmp_date),
      ignoreTimezone: true,
      title: data.name_event,
      color: 'red'
    };
    return tmp;
  }
}