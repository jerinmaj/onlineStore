import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders } from '@angular/common/http';
import {GlobalProvider} from '../globalprovider'
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private http :HttpClient,
    public global :GlobalProvider ) { }
   
    listOrders()
    {
      console.log("inside orders list under OrderService service");

     return this.http.get(this.global.API_ENDPOINT +"/Adminorders");
    }

    viewOrderDetails(index){
      console.log("inside viewOrderDetails under order sevice");
      return this.http.get(this.global.API_ENDPOINT +"/viewOrders/"+index);
    }

    }
