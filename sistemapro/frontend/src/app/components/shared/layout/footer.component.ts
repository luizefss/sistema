// footer.component.ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
 selector: 'app-footer',
 standalone: true,
 imports: [CommonModule, MatButtonModule, MatIconModule],
 template: `
   <footer>
     <div class="footer-content">
       <div class="footer-grid">
         <!-- Empresa -->
         <div class="footer-section">
           <h3>AutoOffice</h3>
           <p>Automatização e gestão para escritórios profissionais</p>
           <div class="social-links">
             <a href="#"><mat-icon>facebook</mat-icon></a>
             <a href="#"><mat-icon>linkedin</mat-icon></a>
             <a href="#"><mat-icon>instagram</mat-icon></a>
           </div>
         </div>

         <!-- Links Rápidos -->
         <div class="footer-section">
           <h4>Links Rápidos</h4>
           <ul>
             <li><a href="#sobre">Sobre</a></li>
             <li><a href="#planos">Planos</a></li>
             <li><a href="#contato">Contato</a></li>
             <li><a href="#blog">Blog</a></li>
           </ul>
         </div>

         <!-- Soluções -->
         <div class="footer-section">
           <h4>Soluções</h4>
           <ul>
             <li><a href="#">Contabilidade</a></li>
             <li><a href="#">Advocacia</a></li>
             <li><a href="#">Engenharia</a></li>
             <li><a href="#">Arquitetura</a></li>
           </ul>
         </div>

         <!-- Contato -->
         <div class="footer-section">
           <h4>Contato</h4>
           <ul class="contact-info">
             <li>
               <mat-icon>email</mat-icon>
                 <span>contato&#64;autooffice.com</span>
             </li>
             <li>
               <mat-icon>phone</mat-icon>
               (11) 9999-9999
             </li>
             <li>
               <mat-icon>location_on</mat-icon>
               São Paulo, SP
             </li>
           </ul>
         </div>
       </div>

       <div class="footer-bottom">
         <div class="legal-links">
           <a href="#">Termos de Uso</a>
           <a href="#">Política de Privacidade</a>
           <a href="#">LGPD</a>
         </div>
         <p>&copy; 2024 AutoOffice. Todos os direitos reservados.</p>
       </div>
     </div>
   </footer>
 `,
 styles: [`
   footer {
     background: #1976d2;
     color: white;
     padding: 64px 24px 24px;
   }

   .footer-content {
     max-width: 1200px;
     margin: 0 auto;
   }

   .footer-grid {
     display: grid;
     grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
     gap: 48px;
     margin-bottom: 48px;
   }

   .footer-section {
     h3 {
       font-size: 1.5rem;
       margin-bottom: 16px;
     }

     h4 {
       font-size: 1.1rem;
       margin-bottom: 16px;
     }

     ul {
       list-style: none;
       padding: 0;
       margin: 0;

       li {
         margin-bottom: 8px;
         
         a {
           color: white;
           text-decoration: none;
           opacity: 0.8;
           transition: opacity 0.3s;

           &:hover {
             opacity: 1;
           }
         }
       }
     }
   }

   .social-links {
     display: flex;
     gap: 16px;
     margin-top: 16px;

     a {
       color: white;
       opacity: 0.8;
       transition: opacity 0.3s;

       &:hover {
         opacity: 1;
       }
     }
   }

   .contact-info {
     li {
       display: flex;
       align-items: center;
       gap: 8px;
       opacity: 0.8;

       mat-icon {
         font-size: 20px;
         width: 20px;
         height: 20px;
       }
     }
   }

   .footer-bottom {
     border-top: 1px solid rgba(255,255,255,0.1);
     padding-top: 24px;
     text-align: center;

     .legal-links {
       margin-bottom: 16px;

       a {
         color: white;
         text-decoration: none;
         margin: 0 12px;
         opacity: 0.8;
         font-size: 0.875rem;

         &:hover {
           opacity: 1;
         }
       }
     }

     p {
       opacity: 0.8;
       font-size: 0.875rem;
     }
   }

   @media (max-width: 768px) {
     .footer-grid {
       grid-template-columns: 1fr;
       gap: 32px;
       text-align: center;
     }

     .social-links {
       justify-content: center;
     }

     .contact-info li { 
       justify-content: center;
     }
   }
 `]
})
export class FooterComponent {}