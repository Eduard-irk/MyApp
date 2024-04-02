import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { clear } from 'console';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private router: Router) {}

  logOut() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }
}
