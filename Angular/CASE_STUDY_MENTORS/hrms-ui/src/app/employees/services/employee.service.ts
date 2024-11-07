import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { EmployeeInfo } from '../types/employee-info';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  //to remove Dummy data
  private employees: EmployeeInfo[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      departmentId: 'HR',
      manager: 'Jane Smith',
      status: 'Active',
      designation: '',
      joiningYear: 0,
      skills: '',
      address: '',
      phoneNumber: 0
    },
    {
      id: '2',
      name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      departmentId: 'Finance',
      manager: 'Mark Brown',
      status: 'Active',
      designation: '',
      joiningYear: 0,
      skills: '',
      address: '',
      phoneNumber: 0
    },
    {
      id: '3',
      name: 'Bob Williams',
      email: 'bob.williams@example.com',
      departmentId: 'IT',
      manager: 'Sara White',
      status: 'Inactive',
      designation: '',
      joiningYear: 0,
      skills: '',
      address: '',
      phoneNumber: 0
    },
    {
      id: '4',
      name: 'Emily Davis',
      email: 'emily.davis@example.com',
      departmentId: 'Marketing',
      manager: 'Tom Clark',
      status: 'Active',
      designation: '',
      joiningYear: 0,
      skills: '',
      address: '',
      phoneNumber: 0
    }
  ];

  private apiUrl = 'https://your-backend-api.com/employees'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<EmployeeInfo[]> {
    // return this.http.get<EmployeeInfo[]>(this.apiUrl);
    return of(this.employees); // Return dummy data as an Observable
  }

  // Create a new employee
  createEmployee(employee: EmployeeInfo): Observable<EmployeeInfo> {
    console.log(employee, "employees");

    return this.http.post<EmployeeInfo>(this.apiUrl, employee);
  }

  updateEmployee(employee: EmployeeInfo): Observable<EmployeeInfo> {
    console.log(employee, "updated employee");
    return this.http.put<EmployeeInfo>(`${this.apiUrl}/${employee.id}`, employee);
  }

   // Search employees based on criteria
   searchEmployees(searchCriteria: { employeeName: string, department: string }): Observable<EmployeeInfo[]> {
    let params = new HttpParams();
    
    if (searchCriteria.employeeName) {
      params = params.set('name', searchCriteria.employeeName);
    }
    if (searchCriteria.department) {
      params = params.set('department', searchCriteria.department);
    }

    return this.http.get<EmployeeInfo[]>(`${this.apiUrl}/search`, { params });
  }

}
