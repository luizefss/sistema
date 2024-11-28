// src/app/core/services/theme.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkMode = new BehaviorSubject<boolean>(false); // Estado inicial como dark mode
  darkMode$ = this.darkMode.asObservable();

  constructor() {
    // Aplicar o estado inicial ao carregar o serviço
    document.body.classList.toggle('dark-mode', this.darkMode.value);
  }

  toggleTheme() {
    const isDark = !this.darkMode.value;
    this.darkMode.next(isDark);

    // Alterna o tema no DOM
    document.body.classList.toggle('dark-mode', isDark);
  }
}
