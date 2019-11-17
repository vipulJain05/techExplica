import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BehaveService {
  //isAdmin;
  public isAdmin = new BehaviorSubject<boolean>(false);
  telecast = this.isAdmin.asObservable();
  public isUser = new BehaviorSubject<boolean>(false);
  userTelecast = this.isUser.asObservable();

  //behaviour for change course from that page

  public isCourseSelected = new BehaviorSubject<boolean>(false);
  course = this.isCourseSelected.asObservable();

  // public cartItem = new BehaviorSubject<string>('0');
  // telecastCartItem = this.message.asObservable();

  setMessage(value:boolean){
    this.isAdmin.next(value);
    
  }

  setnav(value:boolean){
    this.isUser.next(value);
    
  }

  setcourse(value:boolean){
    this.isCourseSelected.next(value);
    
  }
  // CartQuantity(value)
  // {
  //   this.cartItem.next(value);
  // }

  constructor() { }
}
