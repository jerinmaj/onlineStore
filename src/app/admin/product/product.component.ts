import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { Product } from 'src/app/model/product';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  updateForm: FormGroup;
  addForm : FormGroup;
  viewMode: string;
  products: Product[] = [];
  product: Product = {
    id: null,
    category: "",
    name: "",
    image: "",
    description: "",
    price: null,
    count: null
  }

  category =[{id:1,value :'mobile'},
  {id:2,value :'headphone'}
 ];
  listData: MatTableDataSource<any>

  displayedColumns: string[] = ['Id', 'Image', 'Category', 'Name', 'Price', 'Action'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // updateForm:FormGroup

  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {

    this.viewMode = "displayMode";
    this.productService._listProducts('','').subscribe(
      list => {
        console.log('responce', list)
        this.products = list;
        this.listData = new MatTableDataSource(this.products);
        this.listData.paginator = this.paginator;
        this.listData.sort = this.sort;

      });

    this.updateForm = this.formBuilder.group
      ({ 'id'     :[null],
        'category': ['', Validators.required],
        'name': ['', Validators.required],
        'description': ['', Validators.required],
        'price': [null, Validators.required],
        'count': [null, Validators.required],
        'image': ['', Validators.required],

      });

     this.addForm = this.formBuilder.group({
      'id'     :[null],
      'category': ['', Validators.required],
      'name': ['', Validators.required],
      'description': ['', Validators.required],
      'price': ['', Validators.required],
      'count': ['', Validators.required],
      'image': ['', Validators.required],
     }) 

  }
  getErrorMessage(error) {
    if(error == 'category'){
    return this.updateForm.controls['category'].hasError('required') ? 'You must enter a value' : '';
    }
    else if(error == 'name'){
      return this.updateForm.controls['name'].hasError('required') ? 'You must enter a value' : '';
    }
    else if(error == 'price'){
      return this.updateForm.controls['price'].hasError('required') ? 'You must enter a value' : '';
    }
    else if(error == 'count'){
      return this.updateForm.controls['count'].hasError('required') ? 'You must enter a value' : '';
    }
    

  }

  toggle(filter?) {
    if (!filter) {
      filter = "displayMode"
    }
    else {
      filter = filter;
    }
    this.viewMode = filter;
  }
  Tview(product: Product) {
    this.toggle("viewMode");
  }


  applyFilter(filterValue: string) {
    // this.dataSource.filter = filterValue.trim().toLowerCase();

    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
  }

  onUpdateSubmit() {
    console.log("inside update submit function");
    console.log("update values", this.updateForm.value);
    this.toggle("displayMode");
  }
  Tupdate(product: Product) {
    console.log(product);
    this.toggle('editMode');
      this.updateForm.setValue(product);
  }
  onAddSubmit() {
    console.log("inside add submit function");
    console.log("new product values", this.addForm.value);
    this.toggle("displayMode");
  }
}

