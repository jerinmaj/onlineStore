import { Component, OnInit } from '@angular/core';
import { GlobalProvider } from '../../globalprovider';
import { CookieService } from 'ngx-cookie-service';
import { Product } from '../../model/product';
import { CompInteractionService } from 'src/app/service/comp-interaction.service';


@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  productsCart :Product[]=[];
  counter;
  constructor(public global:GlobalProvider,private cookieService :CookieService, private compInteraction :CompInteractionService ) { }

  ngOnInit() {
    // this.global.isGuest=true;
   // this._cartCount();
    this.compInteraction.cartCount$.subscribe(
      (count :any) => {
      this.counter = count;
      // alert(this.counter);
     }
    );

  }
// _cartCount(){
//   if(this.cookieService.check('userCart'))
//   {
//      this.productsCart =JSON.parse(this.cookieService.get('userCart'));
//      this.counter =this.productsCart.length;
//   }
// }
}
