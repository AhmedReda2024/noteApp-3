import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../env/environment';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient, private router: Router) {}

  userData: any;

  sendRegisterData(data: object): Observable<any> {
    return this.httpClient.post(
      `${environment.BASE_URL}/api/v1/users/signUp`,
      data
    );
  }

  sendLoginData(data: object): Observable<any> {
    return this.httpClient.post(
      `${environment.BASE_URL}/api/v1/users/signIn`,
      data
    );
  }

  saveUserToken(): void {
    const token = localStorage.getItem('userToken')!;
    this.userData = jwtDecode(token);
    console.log(this.userData);
  }

  userSignOut(): void {
    // 1- remove token token
    localStorage.removeItem('userToken');
    // 2- jwt ==> null
    this.userData = null;
    // 3- navigate to login
    this.router.navigate(['/login']);
  }
}
