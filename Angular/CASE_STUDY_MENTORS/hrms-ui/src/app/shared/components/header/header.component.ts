import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { Role } from 'src/app/core/types/role.enum';
import { UserProfile } from 'src/app/core/types/user-profile';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  userInfo: UserProfile;

  constructor(private authService: AuthService,private router:Router) {
  }

  ngOnInit() {
    this.authService.currentUser$.subscribe((user: UserProfile) => {
      this.userInfo = user;
      if (!this.userInfo) {
        this.userInfo = {
        id: localStorage.getItem('userId'),
        userName: localStorage.getItem('userName'),
        role: localStorage.getItem('userRole') as Role
        };
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
