// shared/animations/scroll-animations.ts
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';

export const fadeInUp = trigger('fadeInUp', [
  transition(':enter', [
    style({ 
      opacity: 0, 
      transform: 'translateY(20px)' 
    }),
    animate('0.5s ease-out', 
      style({ 
        opacity: 1, 
        transform: 'translateY(0)' 
      })
    )
  ])
]);

export const fadeInLeft = trigger('fadeInLeft', [
  transition(':enter', [
    style({ 
      opacity: 0, 
      transform: 'translateX(-20px)' 
    }),
    animate('0.5s ease-out', 
      style({ 
        opacity: 1, 
        transform: 'translateX(0)' 
      })
    )
  ])
]);

export const staggerFadeIn = trigger('staggerFadeIn', [
  transition('* => *', [
    query(':enter', [
      style({ opacity: 0, transform: 'translateY(20px)' }),
      stagger('100ms', [
        animate('500ms ease-out', 
          style({ opacity: 1, transform: 'translateY(0)' })
        )
      ])
    ], { optional: true })
  ])
]);

// Diretiva de scroll animation
import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appScrollAnimation]',
  standalone: true
})
export class ScrollAnimationDirective implements OnInit {
  @Input() animationDelay = 0;
  @Input() threshold = 0.3;

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
            this.element.nativeElement.classList.add('animated');
          }, this.animationDelay);
          observer.unobserve(entry.target);
        }
      });
    }, options);

    observer.observe(this.element.nativeElement);
  }
}

// Diretiva de contador animado

@Directive({
  selector: '[appCountAnimation]',
  standalone: true
})
export class CountAnimationDirective implements OnInit {
  @Input() startValue = 0;
  @Input() endValue = 100;
  @Input() duration = 2000;
  @Input() prefix = '';
  @Input() suffix = '';

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
    const range = this.endValue - this.startValue;
    const increment = range / (this.duration / 16);
    let current = this.startValue;
    const updateCount = () => {
      current += increment;
      if (current <= this.endValue) {
        this.element.nativeElement.textContent = 
          `${this.prefix}${Math.round(current)}${this.suffix}`;
        requestAnimationFrame(updateCount);
      } else {
        this.element.nativeElement.textContent = 
          `${this.prefix}${this.endValue}${this.suffix}`;
      }
    };
    requestAnimationFrame(updateCount);
  }
}