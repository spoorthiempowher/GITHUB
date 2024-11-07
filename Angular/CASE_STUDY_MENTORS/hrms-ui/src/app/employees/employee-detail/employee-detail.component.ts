import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css'],
})
export class EmployeeDetailComponent {
  employeeForm: FormGroup;
  isEditMode: boolean = false;

  statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'retired', label: 'Retired' },
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) {
    this.employeeForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      departmentId: [''],
      designation: ['', Validators.required],
      manager: [''],
      yearOfJoining: ['', [Validators.required, Validators.pattern(/^\d{4}$/)]],
      skills: [''],
      address: [''],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d{10}$/),
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(8)]],
      status: ['active'],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!id;

    if (this.isEditMode) {
      this.loadEmployeeData(id);
    }
  }

  loadEmployeeData(id: string | null) {
    // Load employee data based on ID (mock data for example)
    const employeeData = {
      id: '123',
      name: 'John Doe',
      email: 'john@example.com',
      departmentId: 'D001',
      designation: 'Manager',
      manager: 'Jane Smith',
      yearOfJoining: '2015',
      skills: 'Angular, TypeScript, JavaScript',
      address: '123 Main St, Cityville',
      phoneNumber: '1234567890',
      password: 'password123',
    };

    this.employeeForm.patchValue(employeeData);
  }

  onSubmit(): void {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
    } else {
      console.log('saved values', this.employeeForm.value);

      if (this.isEditMode) {
        console.log('Updating employee:', this.employeeForm.value);
        this.employeeService
          .updateEmployee(this.employeeForm.value)
          .subscribe();
      } else {
        console.log('Creating employee:', this.employeeForm.value);
        this.employeeService
          .createEmployee(this.employeeForm.value)
          .subscribe();
      }
    }
  }

  back(): void {
    this.router.navigate(['/employee']);
  }
}
