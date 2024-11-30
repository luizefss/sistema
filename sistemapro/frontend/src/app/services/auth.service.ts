import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


// Response Types
interface User {
  id: number;
  username: string;
  email: string;
  area: string;
}

interface LoginResponse {
  area: string;
  user: User;
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
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap((response) => {
          if (response.token) {
            localStorage.setItem('auth_token', response.token);
            localStorage.setItem('user_area', response.user.area); // Armazena a área
          }
        })
      );
  }

  requestPasswordRecovery(email: string): Observable<GenericResponse> {
    return this.http.post<GenericResponse>(
      `${this.apiUrl}/recovery`,
      { email },
      this.httpOptions
    );
  }

  resetPassword(data: PasswordResetData): Observable<GenericResponse> {
    return this.http.post<GenericResponse>(
      `${this.apiUrl}/password-reset`,
      {
        token: data.token,
        senha: data.newPassword,
      },
      this.httpOptions
    );
  }

  verifyResetToken(token: string): Observable<GenericResponse> {
    return this.http.get<GenericResponse>(`${this.apiUrl}/verify-reset-token`, {
      params: { token },
      headers: this.httpOptions.headers,
    });
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_area');
  }

  activateAccount(token: string): Observable<GenericResponse> {
    return this.http.get<GenericResponse>(`${this.apiUrl}/activate-account`, {
      params: { token },
    });
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
