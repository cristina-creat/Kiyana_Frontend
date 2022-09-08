/** @class app/models/checklist-database */

/**
 * @description Service that handle user permissions
 * 
 */

// Require angular dependencies
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
// Require models
import { TodoItemNode } from "./item.model";
import { Permission } from "./permission.model";
// Require permissions service
import { PermissionsService } from "../services/permissions.service";

// Implements decorator Injectable to use as a service
@Injectable()
export class ChecklistDatabase {

  // Define an observable item to detect changes
  dataChange = new BehaviorSubject<TodoItemNode[]>([]);

  // Get function to return item value
  get data(): TodoItemNode[] { return this.dataChange.value; }
  
  // To store permissions list
  permissions: any;
  // Default error message
  errorMessage: string = '';

  // Constructor with permission service param
  constructor(
    private permissionsService : PermissionsService
  ) {
    // Get all permissions from backend
    this.permissionsService.getAll().subscribe(
      per => { 
        // Call internal function to construct tree
        // Permissions are - spearated string (Ex. admin-dashboard-read)
        // We need to create a Module -> Submodule -> Permission tree structure
        this.permissions = this.makePermissionsTree(per['data']);
        // Internal function to initialize HTML tree
        this.initialize();
      },
      error => {
        this.errorMessage = error;
    });
  }

  // Function to convert array of strings to a tree node
  makePermissionsTree(permissions_list: Permission[]){
    // Temporary var
    let tree_permissions = {};
    // Walk each permission
    permissions_list.forEach(permission =>{
      // Separate permission by ' '
      let arr_permision = permission.name.split(' ');
      // If permission module (pos 0) don't exists, then create it
      if(!tree_permissions.hasOwnProperty(arr_permision[0]))
        tree_permissions[arr_permision[0]] = {};
      // If permission submodule (pos 1) don't exists, then create it
      if(!tree_permissions[arr_permision[0]].hasOwnProperty([arr_permision[1]]))
        tree_permissions[arr_permision[0]][arr_permision[1]] = {}
      // If permission module (pos 2) don't exists, then create it
      if(tree_permissions[arr_permision[0]][arr_permision[1]])
        tree_permissions[arr_permision[0]][arr_permision[1]][arr_permision[2]] = permission._id;

    });
    // Return tree
    return tree_permissions;
  }

  // Internal function to initialize tree
  initialize() {
    // Build the tree nodes from Json object. The result is a list of `TodoItemNode` with nested
    //     file node as children.
    const data = this.buildFileTree(this.permissions, 0);

    // Notify the change.
    this.dataChange.next(data);
  }

  /**
   * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
   * The return value is the list of `TodoItemNode`.
   */
  buildFileTree(obj: any, level: number): TodoItemNode[] {
    return Object.keys(obj).reduce<TodoItemNode[]>((accumulator, key) => {
      var value = obj[key];
      const node = new TodoItemNode();
      node.item = key;

      if (typeof value === 'object') {
        node.children = this.buildFileTree(value, level + 1);
      } else {
        node.value = value;
      }

      return accumulator.concat(node);
    }, []);
  }

  /** Add an item to to-do list */
  insertItem(parent: TodoItemNode, name: string) {
    if (parent.children) {
      parent.children.push({item: name} as TodoItemNode);
      this.dataChange.next(this.data);
    }
  }

  // If we need to add new tree node item
  updateItem(node: TodoItemNode, name: string) {
    node.item = name;
    this.dataChange.next(this.data);
  }
}