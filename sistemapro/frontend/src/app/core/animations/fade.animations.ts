// src/app/core/animations/fade.animations.ts
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';

export const fadeInOnScroll = trigger('fadeInOnScroll', [
  transition(':enter', [
    style({ 
      opacity: 0, 
      transform: 'translateY(20px)' 
    }),
    animate('600ms ease-out', 
      style({ 
        opacity: 1, 
        transform: 'translateY(0)' 
      })
    )
  ])
]);

export const listStagger = trigger('listStagger', [
  transition('* => *', [
    query(':enter', [
      style({ 
        opacity: 0, 
        transform: 'translateY(10px)' 
      }),
      stagger(80, [
        animate('400ms ease-out', 
          style({ 
            opacity: 1, 
            transform: 'translateY(0)' 
          })
        )
      ])
    ], { optional: true })
  ])
]);