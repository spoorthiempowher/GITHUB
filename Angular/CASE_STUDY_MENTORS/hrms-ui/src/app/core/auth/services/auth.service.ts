import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { User } from '../../types/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080';

  private users: User[] = [
    { userName: 'Admin', password: 'admin', role: 'admin' },
    { userName: 'Empl', password: 'empl', role: 'employee' },
  ];

  // BehaviorSubject to hold the logged-in user data
  private currentUserSubject: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);    


  public currentUser$: Observable<User | null> =
    this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  validateCredentials(
    username: string,
    password: string
  ): Observable<User | null> {
    const user = this.users.find(
      (u) => u.userName === username && u.password === password
    );

    this.currentUserSubject.next(user || null);
    return of(user || null);
  }

  //login api call
  login(username: string, password: string): Observable<User | null> {
    const loginPayload = { username, password };

    return this.http.post<User>(this.apiUrl, loginPayload).pipe(
      map((response) => {
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
