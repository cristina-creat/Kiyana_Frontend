import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'idToRole'
})
export class IdToRolePipe implements PipeTransform {

  transform(value: string, roles: any): string {
    if(!value || typeof(roles)=='undefined') return '';
    let role = roles.find(r => { return r._id == value; });
    return (!role || !role['name']) ? 'Usuario sin perfil' : role['name'];
  }

}
