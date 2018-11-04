import { Injectable } from '@angular/core';
import{HttpClient,HttpHeaders} from'@angular/common/http';
import{GlobalProvider} from'./../globalprovider';
import { Product } from '../model/product';
// import{Observable} from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(public global :GlobalProvider,private http : HttpClient) { }
  
  _listProducts(category,page){
    console.log("inside listProduct function under productService");
    let api="/api/index.php/product/index";
    return this.http.get<Product[]>(api);      
    //return this.http.get<Product[]>(api+"&page="+page+category);

  }

  _viewProduct(productId:number){
    console.log("inside _viewProduct function under Service");
    console.log("productId="+productId)
    let api=`/api/index.php/product/view?id=${productId}`;
   // let api=`http://localhost/api/backend/web/product/view?id=1`;

    return this.http.get(api);
  //  this.http.get(this.global.API_ENDPOINT+"/product/"+productId).subscribe((data:any)=>
  //  {
  //    console.log(data);
  //    console.log(data.id);
  //  })
  }

}
