
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeliveryAddress } from './../../../model/deliveryAddress';
import { CookieService } from 'ngx-cookie-service';
import { Product } from './../../../model/product';
import { GlobalProvider } from './../../../globalprovider';
import { UserService } from '../../../service/user.service';
import { CompInteractionService } from 'src/app/service/comp-interaction.service';
import {MatStepper} from '@angular/material';
import { Router } from '@angular/router';
@Component({
  selector: 'checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  deliveryAddress: DeliveryAddress = new DeliveryAddress();
  addressForm: FormGroup;
  delivery_date: Date;
  @ViewChild('stepper') stepper: MatStepper;

  //   deliveryAddress :DeliveryAddress ={
  //     id:null,
  //     name :'',
  //     email :'',
  //     address :'',
  //     phone :null,
  // };
  public total: number = 0;
  productsCart: Product[] = [];
  isLinear = true;
  confirm:Boolean = false;
  formsubmit:Boolean=false;
  deliveryAddressStatusMsg:string ='';
  constructor(
    private cookieService: CookieService,
     public globalProvider: GlobalProvider, 
     private userService: UserService,
      private fb: FormBuilder, 
      private compInteraction: CompInteractionService,
      private router: Router) { }

  ngOnInit() {

    this.addressForm = this.fb.group({
      //id:[this.deliveryAddress.id,[Validators.required]],
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required]],
      phone: [null, [Validators.required,Validators.pattern (/[0-9\+\-\ ]/)]],
    });

    if (this.cookieService.check('userCart')) {
      this.productsCart = JSON.parse(this.cookieService.get('userCart'));

      console.log("array length", this.productsCart.length);
      console.log("cart products=", this.productsCart);
    }
    else{
      alert("cart is empty");
      this.router.navigate(['/home']);
    }

  }
  totalAmount() {
    let count = 0;
    let price = 0;
    for (let i = 0; i < this.productsCart.length; i++) {
      console.log("inside For loop");
      console.log(this.productsCart[i].count);
      console.log(this.productsCart[i].price);
      this.total += this.productsCart[i].count * this.productsCart[i].price;
      console.log("sum=", i, this.total);
    }
  }

  save() {

    // console.log( "Delivery Address =",deliveryAddress);
    console.log("Delivery Address =", this.addressForm.value);
    this.userService.userStatus(this.addressForm.value).subscribe((data:any)=>{
      console.log('user status :',data);
      if(data.status ==1){
        console.log("status"+data.status);
       
        this.addressForm.reset();
        this.deliveryAddressStatusMsg=" Try differnt shipping address because this user has been blocked";

      }
      else{
       
        this.deliveryAddress = this.addressForm.value;
        this.formsubmit=true;
        this.totalAmount();
         this.stepper.next();
      }
      console.log("status"+data.status);

    });

     
  }

  confirmOrder() {
    this.userService.order(this.deliveryAddress, this.total).subscribe((data: any) => {
      console.log("after order successfully placed", data);
    
      this.delivery_date = data.delivery_date;
      console.log("delivery date",data.delivery_date)
      this.cookieService.delete('userCart');
      this.compInteraction.sendCartCount();
      this.confirm = true;
      this.addressForm.reset("");

    }, (err: any) => {
      console.log(err);
    },
      () => { });

    //
   

    //  .subscribe((data:any)=>{
    //   console.log(data);
    // if(error == 'category'){
    //   return this.updateForm.controls['category'].hasError('required') ? 'You must enter a value' : '';
  }
  //  }); 

  // goForward(stepper: MatStepper){
  //     stepper.next();
  // }

  getErrorMessage(err) {
    if (err == 'name') {
      return this.addressForm.controls['name'].hasError('required') ? 'You must enter a value' : '';
    }
    else if (err == 'email') {
      return this.addressForm.controls['email'].hasError('required') ? 'You must enter a value' :
        this.addressForm.controls['email'].hasError('email') ? 'Not a valid email' : '';
    }

    else if (err == 'address') {
      return this.addressForm.controls['address'].hasError('required') ? 'You must enter a value' : '';

    }
    else {
      return this.addressForm.controls['phone'].hasError('required') ? 'You must enter a value' : '';

    }
  }
}

