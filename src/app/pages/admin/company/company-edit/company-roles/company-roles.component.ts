/** @class app/pages/admin/company/company-roles */

/**
 * @description Tenant roles admin page, includes html & css templates
 * 
 */

// Require angular dependencies
import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material';
import { FlatTreeControl } from '@angular/cdk/tree';
import { SelectionModel } from '@angular/cdk/collections';
// Require node libraries
import * as _ from 'lodash';
// Require external component to trigger as a modal
import { CompanyRoleCreateUpdateComponent } from './company-role-create-update/company-role-create-update.component';
// Require models
import { ChecklistDatabase } from '../../../../../models/checklist-database';
import { TodoItemFlatNode, TodoItemNode } from '../../../../../models/item.model';
import { Role } from '../../../../../models/role.model';
// Require services
import { RolesService } from '../../../../../services/roles.service';
import { LoginService } from 'app/services/login.service';

// Implements decorator Component
// Define selector & html template
@Component({
  selector: 'fury-company-roles',
  templateUrl: './company-roles.component.html',
  styleUrls: ['./company-roles.component.scss'],
  providers: [ChecklistDatabase]
})
export class CompanyRolesComponent implements OnInit {

  // Link HTML element to a local var
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  // ID of the current tenant, received from an HTML attr
  @Input() tenant: string;
  // List of tenant roles
  roles: Role[] = [];
  // Current selected role
  current_role: Role;

  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  flatNodeMap = new Map<TodoItemFlatNode, TodoItemNode>();

  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  nestedNodeMap = new Map<TodoItemNode, TodoItemFlatNode>();

  /** A selected parent node to be inserted */
  selectedParent: TodoItemFlatNode | null = null;
  treeControl: FlatTreeControl<TodoItemFlatNode>;
  treeFlattener: MatTreeFlattener<TodoItemNode, TodoItemFlatNode>;
  dataSource: MatTreeFlatDataSource<TodoItemNode, TodoItemFlatNode>;

  /** The selection for checklist */
  checklistSelection = new SelectionModel(true);

  // Constructor wich include services
  constructor(
    private dialog: MatDialog,
    private rolesService: RolesService,
    public loginService: LoginService,
    private database: ChecklistDatabase
    ) {
      // Initilize tree node
      this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel,
        this.isExpandable, this.getChildren);
      this.treeControl = new FlatTreeControl<TodoItemFlatNode>(this.getLevel, this.isExpandable);
      this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
      this.database.dataChange.subscribe(data => {
        this.dataSource.data = data;
      });
  }

  


  ngOnInit() {

    
    // Get roles from the backend of the selected tenant
    this.rolesService.getAll( this.tenant ).subscribe( roles =>{
      this.roles = roles['data'];
      if ( this.roles && this.roles.length ) {
        setTimeout( () => {
          // Select first role
          this.setActiveRole(this.roles[0]);
        },200);
      }
      
    },
    err =>{
      this.loginService.displayMessage('Ha ocurrido un error al cargar los perfiles');
      console.log( err );
    });

  }

  // Trigger new role creation window
  createRole() {
    this.dialog.open(CompanyRoleCreateUpdateComponent).afterClosed().subscribe((role: Role) => {
      /**
       * "role" is the role name entered (if the user pressed Save - otherwise it's null)
       */
      if (role) {
        // Send to backend to save
        this.rolesService.saveOrUpdate(this.tenant,role).subscribe((res) => {
          if (res.message) {
            this.loginService.displayMessage( res.message );
          } else {
            if (!this.roles.find(el => { return el._id == res._id; })) {
              // Insert to roles list
              this.roles.push(res);
            } else {
              this.roles[this.roles.map(el => { return el._id; }).indexOf(this.current_role._id)] = res;
            }
            // Select new role
            this.setActiveRole(res);
            setTimeout( () => {
              // Scroll window in case of neccessary
              this.scrollToBottom();
            },500);
            this.loginService.displayMessage( 'El perfil ha sido creado. Asigna algunos privilegios.' );
          }
        });
      }
    });
  }

  // Define current role
  setActiveRole(role: Role) {
    this.current_role = _.cloneDeep(role);
    this.emptyTreecheck();
    this.chekPermissions();
  }

  // Update role with selected permissions
  saveRole() {
    this.current_role.permissions = this.checklistSelection.selected.filter((el: TodoItemFlatNode) => el.value).map((i: TodoItemFlatNode) => i.value);
    // Send data to backend
    this.rolesService.saveOrUpdate(this.tenant,this.current_role).subscribe((res) => {
      if (res.message) {
        this.loginService.displayMessage( res.message );
      } else {
        if (!this.roles.find(el => { return el._id == res._id; })) {
          this.roles.push(res);
        } else {
          this.roles[this.roles.map(el => { return el._id; }).indexOf(this.current_role._id)] = res;
        }
        this.setActiveRole(res);
        this.loginService.displayMessage( 'El perfil ha sido guardado.' );
      }
    });
  }

  // Delete selected role
  deleteRol() {
    if (confirm("¿Estás seguro de borrar el perfil?")) {
      // Send data to backend
      this.rolesService.delete(this.tenant,this.current_role).subscribe((res) => {
        if (res.message) {
          this.loginService.displayMessage( res.message );
        } else {
          this.roles.splice(this.roles.map(el => { return el._id; }).indexOf(this.current_role._id), 1);
          this.setActiveRole( this.roles[0] );
          this.loginService.displayMessage( 'El perfil ha sido eliminado.' );
        }
      });
    }
  }

  // Scroll roles list section to bottom
  scrollToBottom(): void {
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }                 
  }

  /* 
    Mat tree function controllers
  */

 getLevel = (node: TodoItemFlatNode) => node.level;

 isExpandable = (node: TodoItemFlatNode) => node.expandable;

 getChildren = (node: TodoItemNode): TodoItemNode[] => node.children;

 hasChild = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.expandable;

 hasNoContent = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.item === '';

 /**
  * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
  */
 transformer = (node: TodoItemNode, level: number) => {
   const existingNode = this.nestedNodeMap.get(node);
   const flatNode = existingNode && existingNode.item === node.item ? existingNode : new TodoItemFlatNode();
   flatNode.item = node.item;
   flatNode.level = level;
   flatNode.value = node.value;
   flatNode.expandable = !!node.children;
   this.flatNodeMap.set(flatNode, node);
   this.nestedNodeMap.set(node, flatNode);
   return flatNode;
 }

 /** Whether all the descendants of the node are selected. */
 descendantsAllSelected(node: TodoItemFlatNode): boolean {
   const descendants = this.treeControl.getDescendants(node);
   const descAllSelected = descendants.every(child =>
     this.checklistSelection.isSelected(child)
   );
   return descAllSelected;
 }

 /** Whether part of the descendants are selected */
 descendantsPartiallySelected(node: TodoItemFlatNode): boolean {
   const descendants = this.treeControl.getDescendants(node);
   const result = descendants.some(child => this.checklistSelection.isSelected(child));
   return result && !this.descendantsAllSelected(node);
 }

 /** Toggle the to-do item selection. Select/deselect all the descendants node */
 todoItemSelectionToggle(node: TodoItemFlatNode): void {
   this.checklistSelection.toggle(node);
   const descendants = this.treeControl.getDescendants(node);
   this.checklistSelection.isSelected(node)
     ? this.checklistSelection.select(...descendants)
     : this.checklistSelection.deselect(...descendants);

   // Force update for the parent
   descendants.every(child =>
     this.checklistSelection.isSelected(child)
   );
   this.checkAllParentsSelection(node);
 }

 /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
 todoLeafItemSelectionToggle(node: TodoItemFlatNode): void {
   this.checklistSelection.toggle(node);
   this.checkAllParentsSelection(node);
 }

 /* Checks all the parents when a leaf node is selected/unselected */
 checkAllParentsSelection(node: TodoItemFlatNode): void {
   let parent: TodoItemFlatNode | null = this.getParentNode(node);
   while (parent) {
     this.checkRootNodeSelection(parent);
     parent = this.getParentNode(parent);
   }
 }

 /** Check root node checked state and change it accordingly */
 checkRootNodeSelection(node: TodoItemFlatNode): void {
   const nodeSelected = this.checklistSelection.isSelected(node);
   const descendants = this.treeControl.getDescendants(node);
   const descAllSelected = descendants.every(child =>
     this.checklistSelection.isSelected(child)
   );
   if (nodeSelected && !descAllSelected) {
     this.checklistSelection.deselect(node);
   } else if (!nodeSelected && descAllSelected) {
     this.checklistSelection.select(node);
   }
 }

 /* Get the parent node of a node */
 getParentNode(node: TodoItemFlatNode): TodoItemFlatNode | null {
   const currentLevel = this.getLevel(node);

   if (currentLevel < 1) {
     return null;
   }

   const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

   for (let i = startIndex; i >= 0; i--) {
     const currentNode = this.treeControl.dataNodes[i];

     if (this.getLevel(currentNode) < currentLevel) {
       return currentNode;
     }
   }
   return null;
 }

 chekPermissions() {
   this.treeControl.dataNodes.forEach((el: TodoItemFlatNode) =>{
     if(el.value && this.current_role.permissions.includes(el.value))
       this.checklistSelection.select(el);
   });
   this.treeControl.dataNodes.forEach(el =>{
     this.checkAllParentsSelection(el);
   });
 }

 emptyTreecheck(){
   this.treeControl.dataNodes.forEach((el: TodoItemFlatNode) =>{
       this.checklistSelection.deselect(el);
   });
 }

  
}
