import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ButtonGroupModule } from 'primeng/buttongroup';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { MultiSelectModule } from 'primeng/multiselect';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TableModule, TagModule, ButtonGroupModule, ButtonModule, FormsModule, CalendarModule, MultiSelectModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  payList: any[] = [];
  filteredPayList: any[] = [];
  searchText: string = '';

  fechaDesde: Date | null = null;
  fechaHasta: Date | null = null;

  staticPayList = [
    { id: 1, userId: 101, cuentaId: 'A-123', createdAt: new Date('2024-05-15'), updatedAt: new Date('2024-08-20'), lapso: 5, description: 'Finalizado' },
    { id: 2, userId: 102, cuentaId: 'B-456', createdAt: new Date('2024-05-10'), updatedAt: new Date('2024-08-15'), lapso: 5, description: 'En proceso' },
    { id: 3, userId: 103, cuentaId: 'C-789', createdAt: new Date('2024-05-05'), updatedAt: new Date('2024-08-10'), lapso: 5, description: 'Pendiente' },
    { id: 4, userId: 104, cuentaId: 'D-012', createdAt: new Date('2024-05-20'), updatedAt: new Date('2024-08-25'), lapso: 5, description: 'Finalizado' },
    { id: 5, userId: 105, cuentaId: 'E-345', createdAt: new Date('2024-05-25'), updatedAt: new Date('2024-08-30'), lapso: 5, description: 'Pendiente' },
  ];

  constructor() {}

  ngOnInit(): void {}

  onDateChange() {
    if (this.fechaDesde && this.fechaHasta) {
      this.getPayReport();
    } else {
      this.payList = [];
      console.log('Por favor, selecciona ambas fechas para filtrar.');
    }
  }

  getPayReport() {
    if (!this.fechaDesde || !this.fechaHasta) {
      this.payList = [];
      return;
    }

    const desde = new Date(this.fechaDesde.setHours(0, 0, 0, 0));
    const hasta = new Date(this.fechaHasta.setHours(23, 59, 59, 999));

    this.payList = this.staticPayList.filter((payment) => {
      const paymentDate = new Date(payment.createdAt).getTime();
      return paymentDate >= desde.getTime() && paymentDate <= hasta.getTime();
    });

    if (this.payList.length === 0) {
      console.log('No se encontraron resultados para las fechas seleccionadas.');
    } else {
      console.log('Datos de pagos filtrados:', this.payList);
    }
  }

  getSeverity(description: string): 'success' | 'warning' | 'danger' | undefined {
    switch (description) {
      case 'Finalizado':
        return 'success';
      case 'En proceso':
        return 'warning';
      case 'Pendiente':
        return 'danger';
      default:
        return undefined;
    }
  }
}
