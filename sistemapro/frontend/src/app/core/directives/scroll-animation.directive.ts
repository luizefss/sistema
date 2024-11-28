// src/app/core/directives/scroll-animation.directive.ts
import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appScrollAnimation]',
  standalone: true
})
export class ScrollAnimationDirective implements OnInit {
  @Input() animationDelay = 0;
  @Input() threshold = 0.2;

  constructor(private element: ElementRef) {}

  ngOnInit() {
    this.createObserver();
  }

  private createObserver() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: this.threshold
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            this.element.nativeElement.classList.add('fade-in-up');
          }, this.animationDelay);
          observer.unobserve(entry.target);
        }
      });
    }, options);

    observer.observe(this.element.nativeElement);
  }
}