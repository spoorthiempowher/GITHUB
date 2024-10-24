import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/auth/login/login.component';
import { EmployeeTableComponent } from './employees/employee-table/employee-table.component';
import { EmployeeDetailComponent } from './employees/employee-detail/employee-detail.component';
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
    path: 'employee/update/:id',
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
