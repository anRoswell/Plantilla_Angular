import { HttpInterceptorFn } from '@angular/common/http';
import { IMessage } from '../models/message.model';
import { StorageService } from '../shared/services/storage.service';
import { MessageService } from '../shared/services/message.service';
import { inject } from '@angular/core';
import { HttpEvent, HttpRequest, HttpHandlerFn, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { share, map, catchError } from 'rxjs/operators';

export const tokenInterceptor: HttpInterceptorFn = (request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const storage = inject(StorageService);
  const messageService = inject(MessageService);
  const msg: IMessage = { type: '', message: '' };

  const token = storage.getStorage('token');
  if (token) {
    request = request.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
  }

  return next(request).pipe(
    share(),
    map((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        const newToken = event.headers.get('authorization');
        if (newToken) {
          storage.postStorage('token', newToken);
        }
        // proceso para mostrar los mensajes en las acciones CRUD
        const {
          body: { action },
        } = event;
        if (action) {
          msg.type = 'success';
          switch (action) {
            case 'created':
              msg.message = 'Registro creado con éxito';
              break;
            case 'updated':
              msg.message = 'Registro actualizado con éxito';
              break;
            case 'deleted':
              msg.message = 'Registro eliminado con éxito';
              break;
            default:
              msg.message = 'Mensaje de prueba';
              break;
          }
          messageService.dispatch.next(msg);
        }
      }

      if (event instanceof HttpErrorResponse) {
        const { status, error } = event;
        if ([401, 403].includes(status)) {
          // Lógica de logout (comentada para evitar error en esta versión)
          // auth.logout();
        }

        // Validación del mensaje de error
        if (!status) {
          msg.type = 'error';
          msg.message = 'Error de conexión al servidor';
        } else {
          msg.type = 'error';
          msg.message = error.body || 'Ocurrió un error desconocido';
        }
        messageService.dispatch.next(msg);
      }

      return event;
    }),
    catchError((error) => {
      const { status } = error;
      validateError(status);
      return throwError(() => error);
    }),
  );
};

function validateError(status: any) {
  if ([401, 403].includes(status)) {
    // Lógica de logout (comentada para evitar error en esta versión)
    // auth.logout();
  }
}
