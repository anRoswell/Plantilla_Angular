//Angular
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// PrimeNg
import { PrimeNGConfig } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToastModule, MessageModule, ButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ptkDashboardWeb';

  constructor(private primeNGConfig: PrimeNGConfig) {}

  ngOnInit(): void {
    // Configuración PrimeNg
    this.primeNGConfig.ripple = false;
    this.primeNGConfig.setTranslation({
      accept: 'Aceptar',
      reject: 'Cancelar',
      choose: 'Seleccionar',
      lt: 'Menor que',
      lte: 'Menor o igual que',
      gt: 'Mayor que',
      gte: 'Mayor o igual que',
      dayNames: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado'],
      dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
      dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
      monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],

      startsWith: 'Comienza con',
      contains: 'Contiene',
      notContains: 'No contiene',
      endsWith: 'Termina con',
      equals: 'Igual a',
      notEquals: 'No igual a',
      clear: 'Limpiar',
      apply: 'Aplicar',
      matchAll: 'Coincidir con todos',
      matchAny: 'Coincidir con cualquiera',
      addRule: 'Agregar regla',
      removeRule: 'Eliminar regla',
    });
    this.primeNGConfig.zIndex = {
      modal: 1100, // Dialog, Sidebar
      overlay: 1000, // Dropdown, OverlayPanel
      menu: 1000, // Overlay Menus
      tooltip: 1100, // Tooltip
    };
  }
}
