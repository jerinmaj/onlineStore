
import {Component, OnInit} from '@angular/core';
 import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DeliveryAddress} from './../../../model/deliveryAddress';
import { CookieService } from 'ngx-cookie-service';
import{Product} from './../../../model/product';
import { GlobalProvider } from './../../../globalprovider';
import { UserService } from '../../../service/user.service';
import { CompInteractionService } from 'src/app/service/comp-interaction.service';
@Component({
  selector: 'checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  deliveryAddress :DeliveryAddress = new DeliveryAddress();
   addressForm :FormGroup;
//   deliveryAddress :DeliveryAddress ={
//     id:null,
//     name :'',
//     email :'',
//     address :'',
//     phone :null,
// };
public total:number=0;
productsCart :Product[]=[];
  isLinear = true;
  confirm = false;
  public confirmationMsg="";
  constructor(private cookieService:CookieService,public globalProvider:GlobalProvider,private userService :UserService, private fb :FormBuilder,private compInteraction :CompInteractionService) {}

  ngOnInit() {
    this.addressForm = this.fb.group({
      // id:[this.deliveryAddress.id,[Validators.required]],
    name :['',[Validators.required]],
     email :['',[Validators.required,Validators.email]],
     address :['',[Validators.required]],
     phone :[null,[Validators.required]],
    });

    if(this.cookieService.check('userCart'))
    {
       this.productsCart =JSON.parse(this.cookieService.get('userCart'));
       
       console.log("array length",this.productsCart.length);
       console.log("cart products=", this.productsCart);
    }
   
  }
totalAmount(){
  let count=0;
  let price=0;
  for(let i=0;i<this.productsCart.length;i++)
  {
    console.log("inside For loop");
    console.log(this.productsCart[i].count);
    console.log(this.productsCart[i].price);
      this.total+=this.productsCart[i].count*this.productsCart[i].price;
      console.log("sum=",i,this.total);
  }
}
  
  save(){

   // console.log( "Delivery Address =",deliveryAddress);
    console.log( "Delivery Address =",this.addressForm.value);
    this.deliveryAddress = this.addressForm.value;

    this.totalAmount();
  }

  confirmOrder(){
       this.userService.order(this.deliveryAddress,this.total);
       this.confirm = true;
       //
       this.compInteraction.sendCartCount();

      //  .subscribe((data:any)=>{
      //   console.log(data);
      // if(error == 'category'){
      //   return this.updateForm.controls['category'].hasError('required') ? 'You must enter a value' : '';
        }
      //  }); 
  

  getErrorMessage(err){
    if( err =='name'){
      return this.addressForm.controls['name'].hasError('required') ?'You must enter a value' : '';
      }
      else if( err =='email')
      {
         return this.addressForm.controls['email'].hasError('required') ? 'You must enter a value' :
         this.addressForm.controls['email'].hasError('email') ? 'Not a valid email' : '';
       }

       else if( err =='address')
       {
        return this.addressForm.controls['address'].hasError('required') ?'You must enter a value' : '';

         }
         else
       {
        return this.addressForm.controls['phone'].hasError('required') ?'You must enter a value' : '';

         }
}
}

