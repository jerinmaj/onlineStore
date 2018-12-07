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
  cartView:boolean =false;

  private _categorySelected = new Subject();
  category$ = this._categorySelected.asObservable();

  private _cartNotification = new Subject();
  cartCount$ = this._cartNotification.asObservable();

// private _cartView = new Subject();
//     cartView$ = this._cartView.asObservable();

  constructor(private cookieService: CookieService) { }

  selectedCategory(items: any) {
    console.log(items);
    this._categorySelected.next(items);
  }

  // sendCartView(){
  //   this._cartView.next(this.cartView);
  // }

  sendCartCount() {
    console.log("inside send cart count function");
    if (this.cookieService.check('userCart')) {
      console.log("inside send cart count IF function count:");
      this.productCart = JSON.parse(this.cookieService.get('userCart'));
      this.count = this.productCart.length
      console.log("inside send cart count IF function count:", this.count);
      this._cartNotification.next(this.count);
    }
    else {

      this.count = 0;
      console.log("inside send cart count IF function count:", this.count);

      this._cartNotification.next(this.count);
    }
  }



}
