import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { UserProfile } from 'src/app/core/types/user-profile';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  userInfo: UserProfile;

  constructor(private authService: AuthService,private router:Router) {
    this.authService.currentUser$.subscribe((user: UserProfile) => {
      this.userInfo = user;
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
