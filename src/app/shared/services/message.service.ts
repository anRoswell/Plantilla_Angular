import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IMessage } from '../../models/message.model';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  public dispatch: BehaviorSubject<IMessage | null> = new BehaviorSubject<IMessage | null>(null);
}
