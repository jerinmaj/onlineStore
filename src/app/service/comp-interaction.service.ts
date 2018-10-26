import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class CompInteractionService {
  productCart: Product[] = [];
  count = 0;
  private _categorySelected = new Subject();
  category$ = this._categorySelected.asObservable();

  private _cartNotification = new Subject();
  cartCount$ = this._cartNotification.asObservable();

  constructor(private cookieService: CookieService) { }

  selectedCategory(items :any){
   console.log(items);
    this. _categorySelected.next(items);
  }

  sendCartCount() {
    if (this.cookieService.check('userCart')) {
      this.productCart = JSON.parse(this.cookieService.get('userCart'));
      this.count = this.productCart.length
      this._cartNotification.next(this.count);
    }
    else { this._cartNotification.next(0); }
  }



}
