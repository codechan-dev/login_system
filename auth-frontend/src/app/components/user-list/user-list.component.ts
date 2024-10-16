// src/app/components/user-list/user-list.component.ts

import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatListItem, MatListModule, MatSelectionList } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';

interface User {
  id: number;
  username: string;
  password: string;
}

@Component({
  selector: 'app-user-list',
  standalone:true,
  imports:[NgFor,MatButtonModule,MatCardModule,MatSelectionList,MatListItem,MatListModule],
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get<User[]>('http://localhost:3000/users', { headers })
      .subscribe(
        data => this.users = data,
        err => {
          console.error(err);
          this.authService.logout();
          this.router.navigate(['/login']);
        }
      );
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
