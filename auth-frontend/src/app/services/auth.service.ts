// src/app/services/auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users'; // Backend URL
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { 
    const token = localStorage.getItem('token');
    this.loggedIn.next(!!token);
  }

  // Register a new user
  register(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, { username, password });
  }

  // Login user
  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password })
      .pipe(
        map(response => {
          if (response.access_token) {
            localStorage.setItem('token', response.access_token);
            this.loggedIn.next(true);
          }
          return response;
        })
      );
  }

  // Logout user
  logout() {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
  }

  // Check if user is logged in
  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  // Get token
  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
