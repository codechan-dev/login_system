// src/app/components/register/register.component.ts

import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone:true,
  imports:[NgIf,FormsModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  message: string = '';

  constructor(private authService: AuthService) { }

  onRegister() {
    this.authService.register(this.username, this.password).subscribe(
      res => {
        this.message = 'Registration successful!';
        this.username = '';
        this.password = '';
      },
      err => {
        this.message = 'Registration failed. Username might be taken.';
      }
    );
  }
}
