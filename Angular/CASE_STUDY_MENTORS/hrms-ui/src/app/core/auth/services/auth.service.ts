import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';

import { User } from '../../types/user';
import { UserProfile } from '../../types/user-profile';
import { Role } from '../../types/role.enum';

@Injectable({
  providedIn: 'root',
})

export class AuthService {

  private apiUrl = 'http://localhost:8080';

  // Mock User Info
  private users: User[] = [
    { id: '1', userName: 'empowher_admin@example.com', password: 'admin', role: Role.ADMIN },
    { id: '2', userName: 'john.doe@example.com', password: 'empl', role: Role.EMPLOYEE },
  ];

  // BehaviorSubject to hold the logged-in user data
  public currentUserSubject: BehaviorSubject<UserProfile | null> =
    new BehaviorSubject<UserProfile | null>(null);    

  public currentUser$: Observable<UserProfile | null> =
    this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Mock function to check user credentials in UI
  validateCredentials(username: string, password: string): Observable<UserProfile | null> {

    const user: User = this.users.find(
      (u: User) => u.userName === username && u.password === password
    );

    const userProfile = { id: user.id ,userName: user.userName, role: user.role };

    this.setUserInfo(userProfile);
    this.currentUserSubject.next(userProfile || null);
    console.log(userProfile);
    return of(user || null);
  }

  setUserInfo(currentUserInfo: UserProfile) {
    this.currentUserSubject.next(currentUserInfo || null);
  }

  // Login api call
  login(username: string, password: string): Observable<UserProfile | null> {
    const loginPayload = { username, password };

    return this.http.post<UserProfile>(this.apiUrl, loginPayload).pipe(
      map((response: UserProfile) => {
        this.setUserInfo(response);
        return response;
      }),
      catchError((error) => {
        console.error('Login failed', error);
        return new Observable<User | null>((observer) => observer.next(null)); // Return null on error
      })
    );
  }

  // Logout method to clear the current user data
  logout(): void {
    this.currentUserSubject.next(null); // Clear user data on logout
  }
}
