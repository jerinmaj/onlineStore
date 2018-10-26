import { Component, OnInit } from '@angular/core';
import{ProductService} from './../../service/product.service';
import { CategoryService } from '../../service/category.service';
import{Product} from './../../model/product';
import { Router} from "@angular/router";
import { providerDef } from '@angular/core/src/view';
import {PageEvent} from '@angular/material';
import { CompInteractionService } from 'src/app/service/comp-interaction.service';
@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
 
})
export class ProductListComponent implements OnInit {
   products :Product[]= null; 
   category="";
  //  length =20;
  //  pageSize =10;
   length="";
   pageSize="";
   pageSizeOptions :number []=[5,10,15,20];
   page=1;
    // MatPaginator Output
    pageEvent: PageEvent;

    constructor(
    private productService : ProductService,
    private router :Router, 
    private categoryService: CategoryService,
    private compInteractionService : CompInteractionService) { }

  ngOnInit() {
    
    this.listProducts(this.category,this.page);
    
    // this.categoryService.categorySelected.subscribe(
    //   (data: any) => {
    //     console.log('Selected catogory from category list in product list: ', data);
    //     this.category=data;
    //     this.listProducts(this.category);
    //   }
    // );
  this.compInteractionService.category$.subscribe(
    (category :any)=>{
      console.log("selected category in product list",category);
      //alert ("selected category in product list"+category);
      this.category = category;
     this.categoryService.listproductbyCategorywise().subscribe((data:any)=>{
      console.log(data);
      console.log("totel length :" +data.totalCount);
      console.log("page size :"+data.size)
      this.products=data;
     },
   (error)=>{
       console.log(error);
   });
      //this.listProducts(this.category,this.page);
    }
  )
 
  }
  listProducts(category='',page){
    this.productService._listProducts(category,page
      )
    .subscribe((data:any)=>{
       console.log(data);
       console.log("totel length :" +data.totalCount);
       console.log("page size :"+data.size)
       this.products=data.data;
       this.length = data.totalCount
       this.pageSize = data.size;
       console.log("totel length :" +this.length);
       console.log("page size :"+this.pageSize)
       //console.log("product List =",this.products);
      },
    (error)=>{
        console.log(error);
    });
  }
  pageEvent2(e){
    
    this.page = e.pageIndex+1;
    alert(this.page);
    console.log("page = " +this.page );
    this.listProducts('',this.page);
  }

  view( product :Product){
    console.log("inside view");
console.log(product.id);
  this.router.navigate(['/user/product/view/', product.id]);
   //this.router.navigate(['/user/product/view:id']);
  }

}
// git clone git@github.com:susmithasusu/shopping-cart.git
