//auth.services.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

// Response Types
interface LoginResponse {
  token: string;
  message: string;
}

interface GenericResponse {
  message: string;
  success?: boolean;
}

// Request Types
interface RegisterData {
  name: string;
  email: string;
  password: string;
  area: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface PasswordResetData {
  token: string;
  newPassword: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
private apiUrl = 'http://localhost:3000/auth'; // Certifique-se de que a URL está correta
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  register(userData: RegisterData): Observable<GenericResponse> {
    return this.http.post<GenericResponse>(
      `${this.apiUrl}/register`,
      {
        username: userData.name,
        email: userData.email,
        senha: userData.password,
        area: userData.area,
      },
      this.httpOptions
    );
  }

  login(credentials: LoginCredentials): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.apiUrl}/auth/login`,
      {
        email: credentials.email,
        senha: credentials.password,
      },
      this.httpOptions
    ).pipe(
      tap((response) => {
        if (response.token) {
          localStorage.setItem('auth_token', response.token);
        }
      })
    );
  }

  requestPasswordRecovery(email: string): Observable<GenericResponse> {
    return this.http.post<GenericResponse>(
      `${this.apiUrl}/auth/recovery`,
      { email },
      this.httpOptions
    );
  }

  resetPassword(data: PasswordResetData): Observable<GenericResponse> {
    return this.http.post<GenericResponse>(
      `${this.apiUrl}/auth/password-reset`,
      {
        token: data.token,
        senha: data.newPassword,
      },
      this.httpOptions
    );
  }

  verifyResetToken(token: string): Observable<GenericResponse> {
    return this.http.get<GenericResponse>(
      `${this.apiUrl}/auth/verify-reset-token`,
      {
        params: { token },
        headers: this.httpOptions.headers,
      }
    );
  }

  logout(): Observable<GenericResponse> {
    const token = this.getAuthToken();
    localStorage.removeItem('auth_token');

    return this.http.post<GenericResponse>(
      `${this.apiUrl}/auth/logout`,
      {},
      {
        headers: {
          ...this.httpOptions.headers,
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  activateAccount(token: string): Observable<GenericResponse> {
    return this.http.get<GenericResponse>(
      `${this.apiUrl}/auth/activate-account`,
      {
        params: { token },
        headers: this.httpOptions.headers,
      }
    );
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('auth_token');
    return !!token;
  }

  getAuthToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.getAuthToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }
}