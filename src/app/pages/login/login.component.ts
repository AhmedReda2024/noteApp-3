import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  successMsg: string = '';
  errMsg: string = '';

  isLoading: boolean = false;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[A-Z]\w{6,}$/),
    ]),
  });

  submitLoginForm(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;

      this.authService.sendLoginData(this.loginForm.value).subscribe({
        next: (res) => {
          this.isLoading = false;
          if (res.msg === 'done') {
            console.log(res);
            localStorage.setItem('userToken', res.token);
            this.loginForm.reset(); // reset form
            // navigate login

            this.authService.saveUserToken();

            setTimeout(() => {
              this.router.navigate(['/home']);
            }, 600);

            this.successMsg = res.msg;
          }
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
          this.errMsg = err.error.msg;
          this.isLoading = false;
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
