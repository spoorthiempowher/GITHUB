import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from '../../types/role.enum';
import { UserProfile } from '../../types/user-profile';

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

  ngOnInit() {
    localStorage.clear();
  }

  onSubmit(form: NgForm) {

    if (form.invalid) {
      this.errorMessage = 'Username and Password are required';
      return;
    }

    this.authService
      .validateCredentials(this.username, this.password)
      .subscribe((user: UserProfile) => {
        if (user) {
          this.errorMessage = '';
          localStorage.setItem('loginSuccess', 'true');
          localStorage.setItem('userId', user.id.toString());
          localStorage.setItem('userName', user.userName.toString());
          localStorage.setItem('userRole', user.role.toString());
          if (user.role === this.role.ADMIN) {
            console.log(user)
            this.router.navigate(['/employee']);
          } else if (user.role === this.role.EMPLOYEE) {
            console.log(user)
            this.router.navigate(['/employee/update', user.id]);
          }
        } else {
          this.errorMessage = 'Invalid credentials';
        }
      });
  }
}
