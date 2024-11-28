// src/app/core/directives/count-up.directive.ts
import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appCountUp]',
  standalone: true
})
export class CountUpDirective implements OnInit {
  @Input() startValue = 0;
  @Input() endValue = 0;
  @Input() duration = 2000;
  @Input() prefix = '';
  @Input() suffix = '';

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.animateCount();
  }

  private animateCount() {
    const range = this.endValue - this.startValue;
    const stepTime = Math.abs(Math.floor(this.duration / range));
    const startTime = new Date().getTime();
    const endTime = startTime + this.duration;

    const run = () => {
      const now = new Date().getTime();
      const remaining = Math.max((endTime - now) / this.duration, 0);
      const value = Math.round(this.endValue - (remaining * range));
      this.el.nativeElement.innerText = `${this.prefix}${value}${this.suffix}`;
      
      if (value !== this.endValue) {
        requestAnimationFrame(run);
      }
    };
    
    requestAnimationFrame(run);
  }
}