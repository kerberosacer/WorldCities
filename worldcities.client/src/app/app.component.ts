import { AuthService } from './auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'HealthCheck';

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.init();
  }
}
