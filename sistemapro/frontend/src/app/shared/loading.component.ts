// components/shared/loading/loading.component.ts
import { CommonModule, NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    NgClass
  ],
  template: `
    <!-- Spinner de carregamento -->
    @if (type === 'spinner') {
      <div [class]="containerClass">
        <mat-spinner 
          [diameter]="size" 
          [color]="color"
          [mode]="mode"
        ></mat-spinner>
        @if (showText) {
          <span class="mt-3 text-gray-600">{{loadingText}}</span>
        }
      </div>
    }

    <!-- Barra de progresso -->
    @if (type === 'progress-bar') {
      <div [class]="containerClass">
        <mat-progress-bar
          [mode]="mode"
          [color]="color"
          [value]="value"
        ></mat-progress-bar>
        @if (showText) {
          <span class="mt-2 text-sm text-gray-600">{{loadingText}}</span>
        }
      </div>
    }

    <!-- Skeleton loading -->
    @if (type === 'skeleton') {
      <div 
        [class]="containerClass"
        [style.width]="width"
        [style.height]="height"
      >
        <div class="animate-pulse">
          @if (variant === 'text') {
            <div class="h-4 bg-gray-200 rounded w-3/4"></div>
            <div class="space-y-3 mt-4">
              <div class="h-4 bg-gray-200 rounded"></div>
              <div class="h-4 bg-gray-200 rounded w-5/6"></div>
              <div class="h-4 bg-gray-200 rounded w-4/6"></div>
            </div>
          }

          @if (variant === 'card') {
            <div class="h-48 bg-gray-200 rounded-t"></div>
            <div class="p-4 space-y-3">
              <div class="h-4 bg-gray-200 rounded w-3/4"></div>
              <div class="h-4 bg-gray-200 rounded"></div>
              <div class="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          }

          @if (variant === 'list') {
            <div class="space-y-4">
              @for (item of [1,2,3]; track item) {
                <div class="flex items-center space-x-4">
                  <div class="h-12 w-12 bg-gray-200 rounded-full"></div>
                  <div class="flex-1 space-y-2">
                    <div class="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div class="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              }
            </div>
          }

          @if (variant === 'grid') {
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              @for (item of [1,2,3]; track item) {
                <div class="space-y-3">
                  <div class="h-32 bg-gray-200 rounded"></div>
                  <div class="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div class="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              }
            </div>
          }
        </div>
      </div>
    }
  `,
  styles: [`
    :host {
      display: block;
    }

    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .loading-container.fullscreen {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(255, 255, 255, 0.9);
      z-index: 9999;
    }

    .loading-container.inline {
      padding: 2rem;
    }

    .animate-pulse {
      animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }

    @keyframes pulse {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: .5;
      }
    }
  `]
})
export default class LoadingComponent {
  @Input() type: 'spinner' | 'progress-bar' | 'skeleton' = 'spinner';
  @Input() variant: 'text' | 'card' | 'list' | 'grid' = 'text';
  @Input() size = 40;
  @Input() color: 'primary' | 'accent' | 'warn' = 'primary';
  @Input() mode: 'determinate' | 'indeterminate' = 'indeterminate';
  @Input() value = 0;
  @Input() fullscreen = false;
  @Input() showText = true;
  @Input() loadingText = 'Carregando...';
  @Input() width = '100%';
  @Input() height = 'auto';

  get containerClass(): string {
    return `loading-container ${this.fullscreen ? 'fullscreen' : 'inline'}`;
  }
}

// loading.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  show() {
    this.loadingSubject.next(true);
  }

  hide() {
    this.loadingSubject.next(false);
  }
}