import { Component, OnInit } from '@angular/core';
import {PageEvent} from '@angular/material';

@Component({
  selector: 'paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {

  length =100;
  pageSize =10;
  pageSizeOptions :number []=[5,10,15,20];
  constructor() { }

   // MatPaginator Output
   pageEvent: PageEvent;
  ngOnInit() {
  }

}
