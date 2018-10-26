import { Component, OnInit } from '@angular/core';
import {MatTableDataSource,MatPaginator,MatSort} from '@angular/material';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  category :Category[]=[];
  viewMode :string;
  listData: MatTableDataSource<any>;
  displayedColumns: string[] =['Id','name','action'];
  constructor(private categoryService :CategoryService) { }

  ngOnInit() {
    this.viewMode ='tableMode';
    this.displayCategories();
  }
  toggle(filter?){
    if (!filter)
        {
          filter="tableMode"
        }
    else
    {
      filter= filter;
    }
  this.viewMode = filter;
}
displayCategories(){
console.log('inside category display function');
this.categoryService.listCategories().subscribe(
  (data:any)=>{
    console.log("responce data",data);
      this.category = data;
      this.listData = new MatTableDataSource(this.category);
   
  },
  (error)=>{
    console.log("responc error :",error);
  }
);

}
view(category:Category){
 console.log("inside Category view function");
 console.log(category);
 //let categoryId = category.id;
 this.categoryService.viewCategory(category.id).subscribe(
  (data:any)=>{
    console.log("responce data",data);
  },
  (error)=>{
    console.log("responc error :",error);
  });
}
update(category:Category){
  console.log("inside Category update function");
  console.log(category);
//  this.categoryService.updateCategory().subscribe(
//   (data:any)=>{
//     console.log("responce data",data);
//   },
//   (error)=>{
//     console.log("responc error :",error);
//   });

}
addCategory(){
  console.log("inside add Category function");
  console.log("inside Category view function");
 //console.log(category);
//  this.categoryService.addCategory().subscribe(
//   (data:any)=>{
//     console.log("responce data",data);
//   },
//   (error)=>{
//     console.log("responc error :",error);
//   });

}

delete(category : Category)
{
  console.log("inside Delete Category function");

}


}
