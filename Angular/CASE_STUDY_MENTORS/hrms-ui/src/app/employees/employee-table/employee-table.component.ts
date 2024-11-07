import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeInfo } from '../types/employee-info';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.css'],
})
export class EmployeeTableComponent {
  employees: EmployeeInfo[] = [];
  employeeSearch: string = '';
  departmentSearch: string = '';

  constructor(
    private employeeService: EmployeeService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getEmployees().subscribe(
      (data: EmployeeInfo[]) => {
        this.employees = data;
      },
      (error) => {
        console.error('Error fetching employees', error);
      }
    );
  }

  searchEmployees() {
    const searchCriteria = {
      employeeName: this.employeeSearch,
      department: this.departmentSearch,
    };

    this.employeeService.searchEmployees(searchCriteria).subscribe(
      (data: EmployeeInfo[]) => {
        this.employees = data; // Update the employees array with the filtered data
      },
      (error) => {
        console.error('Error searching employees', error);
      }
    );
  }

  createEmployee(): void {
    this.route.navigate(['/employee-details']);
  }

  editEmployee(id: string) {
    this.route.navigate([`/employee/update`, id]);
  }
}
