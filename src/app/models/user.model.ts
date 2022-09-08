/**
 * @interface User - Describe user properties
 */
export class User {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
    contact_phone: string;
    extradata: any[]; // Array of key:value properties
    _tenants: any[]; // Array of Tenant configurations where user belongs (Tenand ID & Role ID)
    avatar: string;
    active: boolean; // Enable/Disable user globally
  
    constructor(model: any = null) {
      for(var key in model){
        this[key] = model[key];
      } 
    }

    // Fields to export into an excel file
    exportables() {
      return ["email", "firstname", "lastname", "last_login", "created_at", "tenant_id_colaborador","tenant_active", "tenant__role", "tenant_contact_phone"]
    }
}
