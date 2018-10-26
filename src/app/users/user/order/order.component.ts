import { Component, OnInit } from '@angular/core';
import{CookieService} from 'ngx-cookie-service';
import { Product } from 'src/app/model/product';
import {FormControl, Validators} from '@angular/forms';


@Component({
  selector: 'order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
 productCart:Product[]=[];
 cart:boolean =false;
  constructor(private cookieService :CookieService) { }
  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }
  ngOnInit() {
       if(this.cookieService.check('userCart'))
       {
          this.cart=true;
         this.productCart =JSON.parse(this.cookieService.get('userCart'));
         console.log("userCart=",this.productCart);
          
       }
       this.cart=false;
  }

}
