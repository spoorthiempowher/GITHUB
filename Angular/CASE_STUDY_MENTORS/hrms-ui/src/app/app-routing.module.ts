import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { EmployeeTableComponent } from './employee-table/employee-table.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    pathMatch: 'full',
    component: LoginComponent
  },
  {
    path: 'employee-list',
    component: EmployeeTableComponent
  },
  {
    path: 'employee/add',
    component: EmployeeDetailComponent
  },
  {
    path: 'employee/update',
    component: EmployeeDetailComponent
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
