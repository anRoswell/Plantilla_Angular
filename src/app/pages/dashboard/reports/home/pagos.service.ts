import { HttpService } from './../../../../shared/services/http.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class PagosService {
  getPayAllUrl: string = '/reportarpagoAdminMsSql';
  getPayFinishUrl: string = '/finalizadosReportarPagoAdminMsSql';

  constructor(private httpService: HttpService) {}

  getPayReport(fechaDesde: string, fechaHasta: string) {
    let params = new HttpParams().set('dateDesde', fechaDesde).set('dateHasta', fechaHasta);

    return this.httpService.getMethod(`${this.getPayAllUrl}`, params);
  }

  getReportFinish(fechaDesde: string, fechaHasta: string) {
    let params = new HttpParams().set('dateDesde', fechaDesde).set('dateHasta', fechaHasta);

    return this.httpService.getMethod(`${this.getPayFinishUrl}`, params);
  }
}
