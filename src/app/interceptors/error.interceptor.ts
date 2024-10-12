import { Router } from '@angular/router';
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { inject } from '@angular/core';

export const ErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const messageError = _handleError(error);
      _actionError(error, router);
      _showMessage(messageError);

      return throwError(
        () =>
          new HttpErrorResponse({
            status: error.status,
            error: error,
          }),
      );
    }),
  );
};

const _handleError = (error: HttpErrorResponse): string => {
  let errorMessage = error?.error?.body ?? 'Error de conexión al servidor';

  if (error.error instanceof ErrorEvent) {
    errorMessage = `Error: ${error.message ?? 'Ocurrió un error en la solicitud'}`;
  } else {
    switch (error.status) {
      case 401:
        errorMessage = 'Sin autorización para acceder a este contenido';
        break;
      case 403:
        errorMessage = 'Sin autorización para acceder a este contenido';
        break;
      default:
        errorMessage = `${errorMessage}`;
        break;
    }
  }

  return errorMessage;
};

const _actionError = (error: HttpErrorResponse, router: Router): void => {
  switch (error.status) {
    case 401:
    case 403:
      router.navigate(['/sign-in']);
      break;
  }
};

const _showMessage = (message: string): void => {
  alert(message);
};
