import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected isMenuOpen = false;

  protected readonly navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: 'D' },
    { label: 'Students', path: '/students', icon: 'S' },
    { label: 'Teachers', path: '/teachers', icon: 'T' },
    { label: 'Classes', path: '/classes', icon: 'C' },
    { label: 'Subjects', path: '/subjects', icon: 'B' },
    { label: 'Attendance', path: '/attendance', icon: 'A' },
    { label: 'Fees', path: '/fees', icon: 'F' },
    { label: 'Results', path: '/results', icon: 'R' },
  ];

  protected toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  protected closeMenu(): void {
    this.isMenuOpen = false;
  }
}
