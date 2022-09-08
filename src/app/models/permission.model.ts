/**
 * @interface Permission - Describe role permissions properties
 */
export class Permission {
    _id: string;
    name: string;
    slug: string;
  
    constructor(model: any = null) {
      this._id = model._id;
      this.name = model.name;
      this.slug = model.slug;
    }
  }
  