import { Observable } from 'rxjs';
import { HttpRequest, HttpHandlerFn, HttpEvent, HttpResponse } from '@angular/common/http';
import { LoadingService } from '../shared/services/loading.service';

const requests: HttpRequest<any>[] = [];

export const LoadingInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const loading = new LoadingService();

  const removeRequest = (request: HttpRequest<any>) => {
    const i = requests.indexOf(request);
    if (i >= 0) {
      requests.splice(i, 1);
    }
    setTimeout(() => {
      loading.isLoading.next(requests.length > 0);
    }, 1000);
  };

  requests.push(req);
  loading.isLoading.next(true);

  return new Observable<HttpEvent<unknown>>((observer) => {
    const subscription = next(req).subscribe(
      (event) => {
        if (event instanceof HttpResponse) {
          removeRequest(req);
          observer.next(event);
        }
      },
      (error) => {
        removeRequest(req);
        observer.error(error);
      },
      () => {
        removeRequest(req);
        observer.complete();
      },
    );

    return () => {
      removeRequest(req);
      subscription.unsubscribe();
    };
  });
};
