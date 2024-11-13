import { Component } from '@angular/core';
import { AuthService } from './core/auth/services/auth.service';
import { Router } from '@angular/router';
import { UserProfile } from './core/types/user-profile';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  title = 'hrms-ui';

  isUserLoggedIn = false;

  userInfoSubscription$ = new Subscription();

  constructor(private authSerivce: AuthService) {
    this.userInfoSubscription$ = this.authSerivce.currentUserSubject.subscribe(
      (response: UserProfile) => {
        if (response && response.userName) {
          this.isUserLoggedIn = true
        } else {
          this.isUserLoggedIn = false;
        }
      })
  }

  ngOnDestroy() {
    this.userInfoSubscription$.unsubscribe();
  }

  
}
