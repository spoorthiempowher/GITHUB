import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { User } from 'src/app/core/types/user';
import { Role } from 'src/app/core/types/role.enum';
import { UserProfile } from 'src/app/core/types/user-profile';
import { EmployeeInfo } from '../types/employee-info';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css'],
})
export class EmployeeDetailComponent {

  employeeForm: FormGroup;
  
  isEditMode = false;
  limitEditAccess: boolean = false;
  currentUser: UserProfile | null = null;
  role=Role;


  statusOptions = [
    { value: true, label: 'Active' },
    { value: false, label: 'Inactive' },
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    private authService: AuthService
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
      status: [true],
    });
  }

  ngOnInit(): void {
    this.getUserDetails();

    const id = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!id;

    if (this.isEditMode) {
      this.loadEmployeeData(id);
    }
  }

  getUserDetails(): void {
    this.authService.currentUser$.subscribe((user) => {
      this.currentUser = user;

      if (this.currentUser && this.currentUser.role == Role.EMPLOYEE) {
        this.limitEditAccess = true;
      } else {
        const currentUserRole = localStorage.getItem('userRole') as Role;
        if (currentUserRole == Role.EMPLOYEE) {
          this.limitEditAccess = true;
        } else {
          this.limitEditAccess = false;
        }
      }
    });
  }

  loadEmployeeData(id: string | null) {
    this.employeeService.getEmployeeById(id).subscribe(
      (data) => {
      this.employeeForm.patchValue(data);
      },
      (error) => {
        const matchResult = this.employeeService.employees.find((employee: EmployeeInfo) => 
          employee.id == id.toString());
        console.log(id, this.employeeService.employees, matchResult)
        if (matchResult) {
          this.employeeForm.patchValue(matchResult);
        }
      }
    );
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
