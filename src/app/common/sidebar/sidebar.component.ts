import { StorageService } from './../../shared/services/storage.service';
import { CommonModule } from '@angular/common';
import { Component, model, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { PanelMenuModule } from 'primeng/panelmenu';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, AvatarModule, RouterModule, ButtonModule, PanelMenuModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  switch = model(true);
  menuSidebar: any;
  person: any;
  activeMenu: any = null;

  constructor(private storageService: StorageService, private router: Router) {}

  ngOnInit(): void {
    this.person = this.storageService.getStorage('person');
    this.menu();
  }

  onToggle() {
    this.switch.set(!this.switch());
  }

  toggle(menu: any) {
    this.activeMenu = this.activeMenu === menu ? null : menu;
  }

  menu() {
    this.menuSidebar = [
      {
        label: 'Dashboard',
        icon: 'pi pi-home',
        items: [
          {
            label: 'Reporte Mensual',
            icon: 'pi pi-calendar',
            command: () => this.navigate('/reportes/mensual'),
          },
          {
            label: 'Reporte Anual',
            icon: 'pi pi-calendar-times',
            command: () => this.navigate('/reportes/anual'),
          },
        ],
      },
      {
        label: 'Reportes',
        icon: 'pi pi-chart-line',
        items: [
          {
            label: 'Reporte Mensual',
            icon: 'pi pi-calendar',
            command: () => this.navigate('/reportes/mensual'),
          },
          {
            label: 'Reporte Anual',
            icon: 'pi pi-calendar-times',
            command: () => this.navigate('/reportes/anual'),
          },
        ],
      },
      {
        label: 'Configuración',
        icon: 'pi pi-cog',
        items: [
          {
            label: 'Reporte Mensual',
            icon: 'pi pi-calendar',
            command: () => this.navigate('/reportes/mensual'),
          },
          {
            label: 'Reporte Anual',
            icon: 'pi pi-calendar-times',
            command: () => this.navigate('/reportes/anual'),
          },
        ],
      },
      {
        label: 'Perfil',
        icon: 'pi pi-user',
        items: [
          {
            label: 'Reporte Mensual',
            icon: 'pi pi-calendar',
            command: () => this.navigate('/reportes/mensual'),
          },
          {
            label: 'Reporte Anual',
            icon: 'pi pi-calendar-times',
            command: () => this.navigate('/reportes/anual'),
          },
        ],
      },
    ];
  }

  navigate(route: string) {
    this.router.navigate([`${route}`]);
  }

  getInitials(name: string): string {
    const names = name.split(' ');
    const initials = names
      .map((n) => n.charAt(0))
      .join('')
      .toUpperCase();
    return initials.slice(0, 2) || 'U';
  }
}
