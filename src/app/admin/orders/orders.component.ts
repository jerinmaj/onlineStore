import { Component, OnInit,ViewChild } from '@angular/core';
import {MatTableDataSource,MatPaginator,MatSort} from '@angular/material'
import { OrderService } from 'src/app/service/order.service';
import { DeliveryAddress } from 'src/app/model/deliveryAddress';
import { Product } from 'src/app/model/product';
@Component({
  selector: 'orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
   user :DeliveryAddress = {
    id :null,
    name : '',
    email :'',
    address :'',
    phone :null
   }
   productCart :Product[]=[];
  viewMode : string;
  listData : MatTableDataSource <any>;
  displayedColumns : string[] =['id','username','status','action'];
@ViewChild(MatPaginator) paginator : MatPaginator;
@ViewChild (MatSort) sort :MatSort;

  constructor(
    private orderService :OrderService
    ) { }

  ngOnInit() {
    this.viewMode ='tableMode';
    this.orderTable();

  }
toggle(filter?){
  if(!filter){
    filter = 'tableMode';
  }
  else{
    filter=filter;
   }
   this.viewMode = filter;
}
orderTable(){
  console.log("inside Order Table Function");
  this.orderService.listOrders().subscribe(
    (data :any)=>{
      console.log("orders responce",data);
      this.listData = data;
    }
  );  
}

viewOrderDetails(order:any){
  console.log("inside viewOrderDetails function");
     let orderId =order.id
     this.orderService.viewOrderDetails(orderId).subscribe(
       (data :any )=>{
         console.log("view order Details result",data);
         this.user = data.data.user;
         console.log("user info : ",this.user);
         this.productCart = data.data.cart;
         console.log('user cart info :',this.productCart);

       }
     )
this.viewMode = 'viewMode';
}

editOrderDetails(){
  console.log("inside editOrderDetails");
  this.viewMode ='editMode';

}

deleteOrderDetails(){
  console.log("inside deleteOrderDetails");
  

}


}
