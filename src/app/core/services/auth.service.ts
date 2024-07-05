import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { environments } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginStatus$ = new BehaviorSubject<boolean>(false);

  private apiUrl = `${environments.apiUrl}/auth`;

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<{ token: string, id: string}> {
    return this.http.post<{ token: string, id: string}>(`${this.apiUrl}/login`, { email, password });
  }

  signup(name: string, email: string, password: string) {
    return this.http.post<{ token: string, id: string}>(`${this.apiUrl}/signup`, { name, email, password });
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    this.loginStatus$.next(false);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
