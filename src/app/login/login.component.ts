import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth-service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginError: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
      this.authService.loginUser(email, password).subscribe(
        response => {
          console.log('Login successful:', response);
          this.router.navigate(['/dashboard']); // Navigate to your dashboard route
        },
        (error: HttpErrorResponse) => {
          console.error('Login failed:', error);
          if (error.status === 401) {
            this.loginError = 'Invalid credentials. Please try again.';
          } else {
            this.loginError = 'An error occurred. Please try again later.';
          }
        }
      );
    } else {
      this.loginError = 'Please fill in all required fields.';
    }
  }
}
