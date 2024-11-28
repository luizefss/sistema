// src/app/core/directives/counter-animation.directive.ts
import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appCounterAnimation]',
  standalone: true
})
export class CounterAnimationDirective implements OnInit {
  @Input() endValue = 0;
  @Input() duration = 2000;
  @Input() prefix = '';
  @Input() suffix = '';
  @Input() decimals = 0;

  constructor(private element: ElementRef) {}

  ngOnInit() {
    this.createObserver();
  }

  private createObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateCount();
          observer.unobserve(entry.target);
        }
      });
    });

    observer.observe(this.element.nativeElement);
  }

  private animateCount() {
    const start = 0;
    const range = this.endValue - start;
    const increment = range / (this.duration / 16);
    let current = start;
    
    const updateCount = () => {
      current += increment;
      if (current <= this.endValue) {
        this.element.nativeElement.textContent = 
          `${this.prefix}${current.toFixed(this.decimals)}${this.suffix}`;
        requestAnimationFrame(updateCount);
      } else {
        this.element.nativeElement.textContent = 
          `${this.prefix}${this.endValue.toFixed(this.decimals)}${this.suffix}`;
      }
    };
    
    requestAnimationFrame(updateCount);
  }
}