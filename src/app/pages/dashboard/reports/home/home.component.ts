import { PagosService } from './pagos.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ButtonGroupModule } from 'primeng/buttongroup';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { lastValueFrom, zip } from 'rxjs';
import { SearchPipe } from '../../../../pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { MultiSelectModule } from 'primeng/multiselect';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TableModule, TagModule, ButtonGroupModule, ButtonModule, SearchPipe, FormsModule, CalendarModule, MultiSelectModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  payList: any[] = [];
  searchText: string = '';

  fechaDesde: Date | null = null;
  fechaHasta: Date | null = null;

  constructor(private pagosService: PagosService) {}

  ngOnInit(): void {
    this.getPayReport();
  }

  onDateChange() {
    if (this.fechaDesde && this.fechaHasta) {
      this.getPayReport();
    }
  }

  async getPayReport() {
    if (!this.fechaDesde || !this.fechaHasta) {
      return;
    }

    const fechaDesdeFormatted = this.fechaDesde.toISOString();
    const fechaHastaFormatted = this.fechaHasta.toISOString();

    const [allReport, finishedReport]: any[] = await lastValueFrom(
      zip(this.pagosService.getPayReport(fechaDesdeFormatted, fechaHastaFormatted), this.pagosService.getReportFinish(fechaDesdeFormatted, fechaHastaFormatted)),
    );

    if (allReport && finishedReport) {
      const nuevosEnProceso = allReport.body;
      const finalizados = finishedReport.body;

      this.payList = [...nuevosEnProceso, ...finalizados];
    } else {
      this.payList = [];
      console.log('No se encontraron resultados para las fechas seleccionadas.');
    }

    console.log('Datos de pagos recibidos:', { nuevosEnProceso: allReport, finalizados: finishedReport });
  }

  getSeverity(status: number): 'success' | 'warning' | 'danger' | undefined {
    switch (status) {
      case 1:
        return 'success';
      case 2:
        return 'warning';
      case 3:
        return 'danger';
      default:
        return undefined;
    }
  }
}
