import { Injectable } from '@angular/core';
import { GlobalProvider } from '../globalprovider';
import{HttpClient,HttpHeaders} from'@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  //categorySelected = new Subject();

  constructor(
    public global:GlobalProvider,
    private http : HttpClient
    ) { }

    listCategories(){
      let api="/api/index.php/product/categories";
      console.log('inside listcategories function under categoryService');
      // return this.http.get(this.global.API_ENDPOINT+"/category");
      return this.http.get(api);
    }

    listproductbyCategorywise(){
      let api ='/api/index.php/product/products?category=mobile';
      console.log("category wise");
      return this.http.get(api);
    }

    viewCategory(categoryId :number){
      console.log("inside viewCategory function under Category Service");
      return this.http.get(this.global.API_ENDPOINT+"/category/"+categoryId);
    }

    updateCategory(categoryId :number){
      console.log("inside updateCategory function under Category Service");
    }
    addCategory(){
      console.log("inside addCategory function under Category Service");
    }
}
