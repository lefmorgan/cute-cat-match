import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';

const MATERIAL_MODULES = [MatToolbarModule, MatIconModule, MatButtonModule, MatMenuModule];
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MATERIAL_MODULES],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  private readonly router = inject(Router)
  goToUrl(url: string): void {
    this.router.navigate([url])
  }
}
