/**
 * @interface TodoItemNode - Describe properties por tree-node component (used un roles/permissions)
 */
export class TodoItemNode {
    children: TodoItemNode[];
    item: string;
    value: string;

    constructor(model: any = null) {
      for(var key in model){
        this[key] = model[key];
      } 
    }
  }
  
  /**
 * @interface TodoItemFlatNode - Describe properties por tree-node component (used un roles/permissions)
 */
  export class TodoItemFlatNode {
    item: string;
    level: number;
    expandable: boolean;
    value: string;

    constructor(model: any = null) {
      for(var key in model){
        this[key] = model[key];
      } 
    }
  }