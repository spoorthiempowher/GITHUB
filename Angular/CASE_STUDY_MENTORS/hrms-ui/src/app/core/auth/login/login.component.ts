import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from '../../types/role.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
role=Role;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.errorMessage = 'Username and Password are required';
      return;
    }

    this.authService
      .validateCredentials(this.username, this.password)
      .subscribe((user) => {
        if (user) {
          this.errorMessage = '';
          if (user.role === this.role.ADMIN) {
            this.router.navigate(['/employee']);
          } else if (user.role === this.role.EMPLOYEE) {
            this.router.navigate(['/employee-details']);
          }
        } else {
          this.errorMessage = 'Invalid credentials';
        }
      });
  }
}
