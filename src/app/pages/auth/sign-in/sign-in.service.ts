import { Observable } from 'rxjs';
import { ILogin } from '../../../models/login.model';
import { IUserLogin } from '../../../models/user-login.model';
import { HttpService } from './../../../shared/services/http.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SignInService {
  url: string = '/AdminAuth';

  constructor(private httpService: HttpService) {}

  postAuth(authentication: ILogin): Observable<IUserLogin> {
    return this.httpService.postMethod<IUserLogin>(`${this.url}`, authentication);
  }
}
