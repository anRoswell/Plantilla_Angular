import { StorageService } from './../../shared/services/storage.service';
import { CommonModule } from '@angular/common';
import { Component, model, OnInit } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, ButtonModule, AvatarModule, SidebarComponent, MenuModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  person: any;
  items: MenuItem[] | undefined;

  constructor(private storageService: StorageService, private router: Router) {}

  ngOnInit(): void {
    this.person = this.storageService.getStorage('person');

    this.items = [
      {
        label: 'Opciones',
        items: [
          {
            label: 'Mi cuenta',
            icon: 'pi pi-user',
          },
          {
            label: 'Cerrar sesión',
            icon: 'pi pi-sign-out',
            command: () => this.logout(),
          },
        ],
      },
    ];
  }

  getInitials(name: string): string {
    const names = name.split(' ');
    const initials = names
      .map((n) => n.charAt(0))
      .join('')
      .toUpperCase();
    return initials.slice(0, 2) || 'U';
  }

  logout() {
    this.storageService.clear();
    this.router.navigate(['/']);
  }
}
