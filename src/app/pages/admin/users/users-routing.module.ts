import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { MyAccountComponent } from './my-account/my-account.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    data: {
      scrollbarDisabled: true
    }
  },
  {
    path: 'edit/:id',
    component: UserEditComponent,
    data: {
      scrollbarDisabled: true
    }
  },
  {
    path: 'my-account',
    component: MyAccountComponent,
    data: {
      scrollbarDisabled: true
    }
  },
  /*
  {
    path: 'new',
    component: UserEditComponent,
    data: {
      scrollbarDisabled: true
    }
  }
  */
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {
}
