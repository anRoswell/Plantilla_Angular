import { HttpInterceptorFn } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { HttpRequest, HttpHandlerFn, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { TypeResponse } from '../enums/TypeResponse';

const requests: { [key: string]: any } = {};
const throttleDuration = 1000;
const message = 'Se detectó múltiples solicitudes, espere unos segundos antes de intentar de nuevo.';

export const ThrottleInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const currentRequestTime = new Date().getTime();
  const currentRequest = requests[req.url];

  if (currentRequest) {
    if (currentRequestTime - currentRequest.lastRequestTime < throttleDuration) {
      return throwError(
        () =>
          new HttpErrorResponse({
            error: new Error(message),
            status: TypeResponse.TOO_MANY_REQUEST,
          }),
      );
    }
    requests[req.url].lastRequestTime = currentRequestTime;
  } else {
    requests[req.url] = {
      url: req.url,
      lastRequestTime: currentRequestTime,
    };
  }

  return next(req);
};
