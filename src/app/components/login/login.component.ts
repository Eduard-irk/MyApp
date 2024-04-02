import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CardModule,
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule,
    PasswordModule,
    RouterLink,
    HttpClientModule,
    ToastModule,
    NgIf,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private msgService: MessageService
  ) {}

  get email() {
    return this.loginForm.controls['email'];
  }

  get password() {
    return this.loginForm.controls['password'];
  }

  loginUser() {
    const { email, password } = this.loginForm.value;
    this.authService.getUserByEmail(email as string).subscribe((response) => {
      if (response.length > 0 && response[0].password === password) {
        sessionStorage.setItem('email', email as string);
        this.router.navigate(['/home']);
      } else {
        this.msgService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'email or password is wrong',
        });
      }
    });
  }
}
