import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeTableComponent } from './employees/employee-table/employee-table.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: EmployeeTableComponent
  },
  {
    path:'employee',
    component:EmployeeTableComponent
  },
  {
    path: '',
    pathMatch: 'full',
    component: EmployeeTableComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
 
