import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-employee-search-control',
  templateUrl: './employee-search-control.component.html',
  styleUrls: ['./employee-search-control.component.css']
})
export class EmployeeSearchControlComponent {
  employeeSearch: string = '';
  departmentSearch: string = '';

  @Output() searchEvent = new EventEmitter<{ employeeSearch: string, departmentSearch: string }>();

  onSearch(): void {
    this.searchEvent.emit({
      employeeSearch: this.employeeSearch,
      departmentSearch: this.departmentSearch
    });
  }
}
