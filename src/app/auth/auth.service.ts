import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, timer } from 'rxjs';
import { retryWhen, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://192.168.1.24:5199/dotnet_api/User/Authenticate';

  constructor(private http: HttpClient) {}

  login(credentials: { Email: string; Password: string }): Observable<any> {
    return this.http.post(this.apiUrl, credentials).pipe(
      retryWhen(errors =>
        errors.pipe(
          mergeMap((error, index) => {
            if (index >= 2) {
              return throwError(error);
            }
            return timer(2000);
          })
        )
      )
    );
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
