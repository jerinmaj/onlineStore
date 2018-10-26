import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import{Product} from './../../../model/product';
import { GlobalProvider } from './../../../globalprovider';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {
public rowHeight="400px";
  public content="150px";
  productsCart :Product[]=[];
//_count=1;
//msg=false;
amount:number =0;
  constructor(private cookieService :CookieService,public globalProvider :GlobalProvider) {

   // this.globalProvider.productsCart=[];
    //this.cookieService.set('userCart',"[]");
   }
   
  ngOnInit() {
    if(this.cookieService.check('userCart'))
    {
       this.productsCart =JSON.parse(this.cookieService.get('userCart'));
      //  this.productsCart[0].count = 3;
       this.rowHeight=this.productsCart.length*170+150+"px";
       console.log("array length",this.productsCart.length)
       console.log("row Height=",this.rowHeight);
       console.log("cart productsCart=", this.productsCart);
     
    }
    
  }
_displayCart(){
       this.productsCart =JSON.parse(this.cookieService.get('userCart'));
       this.rowHeight=this.productsCart.length*170+150+"px";
      
}
_count_decrement(index){
  //this.productsCart=item;
  // this.productsCart =JSON.parse(this.cookieService.get('userCart'));
  console.log('Before decrement: ', this.productsCart);
  let selectedItem = this.productsCart[index];
       
  if(selectedItem.count> 1)
{
  selectedItem.count--;
 // this.productsCart =JSON.parse(this.cookieService.get('userCart'));
  console.log("cart after decrement productsCart=", this.productsCart);
  this.cookieService.set('userCart',JSON.stringify(this.productsCart)); 
  //console.log()

}
}
_count_increment(index){
  //this.productsCart=item;
  // this.productsCart =JSON.parse(this.cookieService.get('userCart'));
  console.log('Before increment: ', this.productsCart);
  let selectedItem = this.productsCart[index];
  selectedItem.count++;
 // this.productsCart =JSON.parse(this.cookieService.get('userCart'));
  console.log("cart after increment productsCart=", this.productsCart);
  this.cookieService.set('userCart',JSON.stringify(this.productsCart)); 
  //console.log()

}
remove(index){
  // let cart=this.cookieService.get('userCart');
  this.productsCart =JSON.parse(this.cookieService.get('userCart'));
  // JSONArray cartData = new JSONArray(cart); 
  //  let cart2=JSON.parse(cart);
  //  console.log("Existing cart:");
  //  console.log(cart);

   //cart2.pop();
  // delete cart2[index];
   //cart=(JSONArray) cart;
   //cart=JSON.parse("[" + cart + "]");
 
   //cart[index]=undefined;
   //delete cart[index];
  //  console.log("Updated cart:");
   
  //  let cartData=[];
  //  for(var i=0;i<cart2.length;i++){
  //    if(cart2[i]){
  //     cartData.push(cart2[i]);
  //    }
  //  }
  
   delete this.productsCart[index];
   console.log("Updated cart:");
   
   let cartData=[];
   for(var i=0;i<this.productsCart.length;i++){
     if(this.productsCart[i]){
      cartData.push(this.productsCart[i]);
     }
   }
   console.log(cartData);
   //console.log("index",index);
  //delete this.globalProvider.productsCartCart[index];
  //console.log("Updated cart:",this.globalProvider.productsCartCart);
  this.cookieService.set('userCart',JSON.stringify(cartData)); 
  this._displayCart();
}
}
