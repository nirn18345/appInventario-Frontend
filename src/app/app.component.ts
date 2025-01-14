import { Component } from '@angular/core';
import { Router,RouterOutlet } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MatIconModule } from '@angular/material/icon';
import { LoginService } from './services/login.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, CommonModule, MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'inventory-system-app';
  isLoggedIn: boolean = false;
  currentYear: number = new Date().getFullYear();

  constructor(private authService: LoginService, private router: Router) {}

  ngOnInit(): void {
    // Verifica si localStorage está disponible antes de usarlo
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('token');
      this.isLoggedIn = !!token;

      if (!this.isLoggedIn) {
        this.router.navigate(['/']);
      } else {
        this.router.navigate(['/products']);
      }
    } else {
      console.warn('localStorage no está disponible en este entorno.');
    }
  }

  onLogout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/']);
  }

  
}
