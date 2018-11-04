import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Product } from 'src/app/model/product';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { DeliveryAddress } from 'src/app/model/deliveryAddress';


@Component({
    selector: 'order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
    productCart: Product[] = [];
    cart: boolean = false;
    DeliveryAddress : DeliveryAddress[] =[];
    totalAmount: number;
    constructor(
        private cookieService: CookieService,
        private userService: UserService
    ) { }
    uorders;

    email = new FormControl('', [Validators.required, Validators.email]);

    getErrorMessage() {
        return this.email.hasError('required') ? 'You must enter a value' :
            this.email.hasError('email') ? 'Not a valid email' :
                '';
    }
       


    ngOnInit() {
        //  if(this.cookieService.check('userCart'))
        //  {
        //     this.cart=true;
        //    this.productCart =JSON.parse(this.cookieService.get('userCart'));
        //    console.log("userCart=",this.productCart);

        //  }
        //  this.cart=false;
       // this.UserOrder();
    }
    UserOrder() {
        console.log("inside user order");
        this.userService.currentUserOrder(this.email.value).
            subscribe(
                (data: any) => {
                    this.cart = true;
                    console.log("view order Details result", data);
                    this.uorders = data.orders;
                }
            );
        console.log("email:", this.email.value);
    }
    activeOrders(){
        console.log("Inside Active Orders");
         
    }

    canceldOrders(){
        console.log("Inside Canceld Orders");

    }
    cancelOrder(orderid:number,productid:number) {
        console.log("inside cancel order");
        console.log("orderId:"+orderid +" productId:" +productid);
        this.userService.cancelOrder(orderid,productid).subscribe((data:any)=>{
            console.log(data);
            this.UserOrder();
        })

    }

}
