/** @class app/pages/admin/company */

/**
 * @description Tenand admin page, includes html & css templates
 * 
 */

// Require angular dependencies
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// Require env config
import { environment } from 'environments/environment';
// Require models
import { Tenant } from 'app/models/tenant.model';
// Require services
import { LoginService } from 'app/services/login.service';
import { TenanService } from 'app/services/tenant.service';

// Implements decorator Component
// Define selector & html template
@Component({
  selector: 'benefits-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.scss']
})
export class CompanyEditComponent implements OnInit {

  // Link HTML avatar to use it inside component
  @ViewChild('avatarSelect') avatarSelect: ElementRef;

  // Define form to use validation
  form: FormGroup;
  // To store current tenant
  tenant: Tenant = new Tenant();
  // Boolean to define if user can or not edit current tenant
  editable: boolean = false;

  // Define avatars url
  apiUrl: String = environment.avatarsUrl;
  // Temp var when user has changed the avatar
  avatarBase64: any;
  // File type of the choosen new avatar
  newAvatar: File;
  // List of parents page
  breadcrumbs_crumbs: any[] = ['Empresas'];

  // Initialize component
  constructor(
    private tenantService: TenanService,
    private loginService: LoginService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
  }

  // Auto exec function when component is loaded
  ngOnInit() {

    // Get URL params to retrive Tenand ID
    this.route.params.subscribe(params => {
      // If ID, then it's a tenant edition
      if (params['id']) {
        // Enable or disable edition if user is admin
        this.editable = this.loginService.hasPermission('admin-tenant-update');
        // Get tenant data from backend
        this.tenantService.getTenantById(params['id']).subscribe(tenant => {
          this.tenant = tenant;
          // Set default color if not defined
          if (!tenant.color)
            tenant.color = '#FF671D';
          this.createForm();
        });
      } else {
        // If no ID, is a New tenant, validate permissions
        this.editable = this.loginService.hasPermission('admin-tenant-create');
        // Create new tenant
        this.tenant = new Tenant({ status: true });
        this.createForm();
      }
    })
  }

  // Create form configuration to validate
  createForm() {
    this.form = this.fb.group({
      _id: this.fb.control({ value: (this.tenant._id || null), disabled: !this.editable }),
      name: this.fb.control({ value: (this.tenant.name || ''), disabled: !this.editable }),
      calle: this.fb.control({ value: (this.tenant.calle || ''), disabled: !this.editable }),
      colonia: this.fb.control({ value: (this.tenant.colonia || ''), disabled: !this.editable }),
      cp: this.fb.control({ value: (this.tenant.cp || ''), disabled: !this.editable }),
      estado: this.fb.control({ value: (this.tenant.estado || ''), disabled: !this.editable }),
      municipio: this.fb.control({ value: (this.tenant.municipio || ''), disabled: !this.editable }),
      pais: this.fb.control({ value: (this.tenant.pais || ''), disabled: !this.editable }),
      tel: this.fb.control({ value: (this.tenant.tel || ''), disabled: !this.editable }),
      color: this.fb.control({ value: (this.tenant.color || ''), disabled: !this.editable }),
      contacto_admin: this.fb.control({ value: (this.tenant.contacto_admin || ''), disabled: !this.editable }),
      status: this.fb.control({ value: (this.tenant.status || false), disabled: !this.editable }),
    });
  }

  // When image was selected, receive the image on an event
  changeImage(files: File[]) {
    if (files && files[0]) {
      // Read file
      const reader = new FileReader();
      // Read as base64
      reader.readAsDataURL(files[0]);
      // When reading finished
      reader.onload = () => {
        // Set image content into a var
        this.avatarBase64 = reader.result;
        this.newAvatar = files[0];
        this.loginService.displayMessage('Presiona "Guardar" para salvar tus cambios.')
        this.avatarSelect.nativeElement.value = null;
      };
    }
  }

  // Change tenant color
  setupColor(ev: any) {
    this.form.patchValue({ color: ev.color.hex });
  }

  // Create or update tenant (Form validation is in the HTML)
  saveCompany() {

    // Send data to backend
    this.tenantService.saveOrUpdate(this.form.value).subscribe(async (res) => {
      // An error has occurred
      if (res.message) {
        this.loginService.displayMessage(res.message);
      } else {
        // Tenand has been created or updated, then upload avatar if available
        if (this.newAvatar) {
          let avatarResponse = await this.tenantService.addAvatar(res._id, this.newAvatar).toPromise();
          if (avatarResponse._id && avatarResponse.avatar) {
            this.tenant.img = avatarResponse.avatar;
            this.removeImage();
          }
        }
        // If is a new tenant, redirect to current tenant page
        if (!this.tenant._id) {
          this.router.navigate(['/app/company/edit/' + res._id]);
        }
        this.loginService.displayMessage('La información ha sido guardada');
      }
    },
      (err) => {
        console.log(err);
        this.loginService.displayMessage('Ha ocurrido un error al crear la empresa');
      });
  }

  // Clear selected image
  removeImage() {
    this.avatarBase64 = null;
    this.newAvatar = null;
  }

}
