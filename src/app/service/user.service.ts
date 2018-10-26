import { Injectable } from '@angular/core';
import { UserRegister } from '../model/userRegister';
import{HttpClient,HttpHeaders} from'@angular/common/http';
import { GlobalProvider } from '../globalprovider';
import { Router } from '@angular/router';
import { LoginForm } from '../model/loginForm';
import { CookieService } from 'ngx-cookie-service';
import {DeliveryAddress} from './../model/deliveryAddress';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
}
)
export class UserService {
  errors={};
  deliveryAddress :DeliveryAddress;
  productsCart :Product[]=[];

  constructor(public global:GlobalProvider,private http:HttpClient,private router:Router,private cookieService: CookieService) { }
 
 
  _create(userRegister:UserRegister){

    console.log("inside Create function Under UserService");
    let body = userRegister;
    let httpOptions ={
      headers :new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    this.http.post(this.global.API_ENDPOINT+"",body,httpOptions)
    .subscribe((data :any)=>{
      this.router.navigate(['login']);
    },
    (err) => {  
      console.log(err);      
     this.errors=err.error.errors;       
         },
       () => {
         //Completed     
          });
  }


  authorize(loginform:LoginForm)
  {
      console.log("inside autherization function under UserService");
      let body = loginform;
      let httpOptions ={
        headers: new HttpHeaders({'Content-Type':  'application/json',})
      };
      this.http.post(this.global.API_ENDPOINT+"",body,httpOptions)
      .subscribe( 
        (response :any ) => {       
          console.log(response );
        // console.log("Auth Code:"+response.data.authorization_code);
      //data
      this.accesstoken(response.data.authorization_code);

      // this.router.navigate(['login']);
              },
    (err) => {  
          console.log(err);      
        this.errors=err.error.errors;       
            },
      () => {
    //Completed     
            }
          );

    }
accesstoken(authtoken):void{
console.log("Inside Accesstoken Function under UserService");         
 let data={ "authorization_code": authtoken };

 let body = JSON.stringify(data);

 let httpOptions = {
              headers: new HttpHeaders({
             'Content-Type':  'application/json',
                                 })
             };  
             this.http.post(this.global.API_ENDPOINT+"",body,httpOptions)
                    .subscribe(
                      (response :any)=>{
                        console.log(response);
                        data
                       this.cookieService.set('accesstoken',response.data.access_token);
                        if(this.cookieService.check('accesstoken'))
                        {this.global.isGuest=false;}
                        else{this.global.isGuest=true;}
                        this.userinfo();
                           
                       },
                       (err) => {


                        console.log(err);
                        //this.errors=err.error.errors;
              
                      },
                      () => {
                      }
                    );


    }

    userinfo():void{
      console.log("Inside Userinfo(ME) Function under UserService");
      let at = this.cookieService.get('accesstoken');
      this.http.get(this.global.API_ENDPOINT+"/v1/me?access_token="+at)
      .subscribe(
        (responce :any )=>{console.log(responce);
      //  data
     this.cookieService.set('username',responce.data.username);
        this.global.username=this.cookieService.get('username');
        this.router.navigate(['users']);
      },
      (err) =>{
        console.log(err);

      },
      () =>{
        //completed
      }
      )
    }  


    order(deliveryAddress :DeliveryAddress,totelAmount:number){
      console.log("inside Order function under Userservice");

      this.productsCart =JSON.parse(this.cookieService.get('userCart'));
      console.log("Delivery Address :",deliveryAddress,"cart items :",this.productsCart);
      let data={
        deliveryAddress:deliveryAddress,
        totelAmount:totelAmount,
        productsCart:this.productsCart
      };
    //  data.deliveryAddress=deliveryAddress
console.log(data);
     
        let httpOptions ={
         headers :new HttpHeaders({
         'Content-Type':  'application/json'
        })
       };
      // return this.http.get(this.global.API_ENDPOINT+"/product/"+productId);
         this.http.post(this.global.API_ENDPOINT,data,httpOptions).subscribe((data :any)=>{
           console.log(data);
         },(err :any)=>{
           console.log(err);
         },
         ()=>{});
    //  let msg=" Your order has been placed and is being processed";
    //  return msg;
    }
}
