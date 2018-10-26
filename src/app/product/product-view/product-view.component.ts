import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute} from "@angular/router";
import{Product} from './../../model/product';
import {ProductService} from './../../service/product.service';
import { CookieService } from 'ngx-cookie-service';
import { GlobalProvider } from './../../globalprovider';
import { CompInteractionService } from 'src/app/service/comp-interaction.service';

@Component({
  selector: 'product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {

  product :Product={
    id :null,
    category: "",
    name : "",
    image: "",
    description :"",
    price: null,
    count:null
   }
  productCart :Product[]=[];
  public productId;
  constructor(private router:Router, private activatedRoute: ActivatedRoute,private productService :ProductService,private cookieService : CookieService,public global :GlobalProvider,private compInteraction :CompInteractionService ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(paramsId => {
      this.productId  = paramsId.id;

      console.log( "Product id ="+this.productId); // Print the parameter to the console. 
      this.productCart =JSON.parse(this.cookieService.get('userCart'));
     // this.productsCart =JSON.parse(this.cookieService.get('userCart'));
  });

  this.productService._viewProduct(this.productId)
       .subscribe(
         (data :any)=>{
           console.log("responce=",data);
            this.product = data.data;
          this.product.count=1;
            console.log( "product=",this.product);

         });
  }

  _addToCart(){
    this.productCart.push(this.product);
    console.log(this.productCart);
     this.cookieService.set('userCart',JSON.stringify(this.productCart));
     this.compInteraction.sendCartCount();
    this.router.navigate(['/cart']);
    
  }

}
