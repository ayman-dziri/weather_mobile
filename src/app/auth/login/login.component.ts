import { Component } from '@angular/core';
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false
})
export class LoginComponent   {
  email = '';
  password = '';
  isLoading = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.email = '';
    this.password = '';
    this.errorMessage = '';
  }

  login() {
    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login({ Email: this.email, Password: this.password }).subscribe({
      next: (response) => {
        this.authService.setToken(response.token);
        this.isLoading = false;
        this.router.navigate(['/home']);
      },
      error: (error) => {
        this.isLoading = false;
        if (error.status === 422) {
          this.errorMessage = 'email and password are required';
        }
        else if (error.status === 400) {
          this.errorMessage = 'email or password invalid';
        }
        else if (error.status === 401) {
          this.errorMessage = 'password incorrect';
        }
        else if (error.status === 404) {
          this.errorMessage = 'user not found';
        }
        else if (error.status === 200) {
          this.errorMessage = 'success';
        }
        else if (error.status === 500) {
          this.errorMessage = 'server error';
        }
        else this.errorMessage = 'error';
        console.log("code status : ", error.status);
      }
    });
  }
}
// ionic capacitor run android -l --external
