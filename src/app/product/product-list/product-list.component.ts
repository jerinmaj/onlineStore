import { Component, OnInit } from '@angular/core';
import { ProductService } from './../../service/product.service';
import { CategoryService } from '../../service/category.service';
import { Product } from './../../model/product';
import { Router } from "@angular/router";
import { providerDef } from '@angular/core/src/view';
import { PageEvent } from '@angular/material';
import { CompInteractionService } from 'src/app/service/comp-interaction.service';
import { Category } from 'src/app/model/category';
@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],

})
export class ProductListComponent implements OnInit {
  products: Product[] = null;
  categories : Category[]=[];
  //  length =20;
  //  pageSize =10;
  length = "";
  pageSize = "";
  pageSizeOptions: number[] = [5, 10, 15, 20];
  page = 1;
  selectedOption:any;
  // MatPaginator Output
  pageEvent: PageEvent;
 category ='';
  constructor(
    private productService: ProductService,
    private router: Router,
    private categoryService: CategoryService,
    private compInteractionService: CompInteractionService) { }
    isLoadingResults:boolean=true;
  ngOnInit() {
    // this.compInteractionService.category$.subscribe(
    //   (category: any) => {
    //     console.log("selected category in product list", category);
    //     alert ("selected category in product list"+category);
    //    this.categories = category;
    //    this.listProducts(this.categories, this.page);
    //   }
    // );
   // this.listProducts(this.category, this.page);
this.categorylist();
  }
categorylist(){
  this.categoryService.listCategories().subscribe(
    (data :any)=>{
      this.isLoadingResults=false;
      this.categories =data;
      this.selectedOption= this.categories[0];
      this.category=this.selectedOption;
      this.listProducts();
      console.log(this.selectedOption);
      console.log(this.categories);
    }
  );
  }

  selectOption(category:string)
  {
    this.isLoadingResults=true;
    this.page=1;
    this.category =category;
   console.log('selected category',this.category);
    this.listProducts();
    console.log(this.category,this.page);
  }

  listProducts() {
    console.log("inside list product");
    this.categoryService.listproductbyCategorywise(this.category,this.page).
      subscribe((data: any) => {
        this.isLoadingResults=false;
        console.log(data);
        console.log("totel length :" + data.totalCount);
        console.log("page size :" + data.size)
        this.products = data.products;
        this.length = data.totalCount
        this.pageSize = data.size;
        console.log("totel length :" + this.length);
        console.log("page size :" + this.pageSize);
        //console.log("product List =",this.products);
      },
        (error) => {
          console.log(error);
        });
  }

  pageEvent2(e) {
    this.page = e.pageIndex + 1;
   // alert(this.page);
    console.log("page = " + this.page);
    this.listProducts();

  }

  view(product: Product) {
    console.log("inside view");
    console.log(product.id);
    this.router.navigate(['/user/product/view/', product.id]);
    //this.router.navigate(['/user/product/view:id']);
  }

}


// ng serve --port 4416 --proxy-config proxy.conf.json