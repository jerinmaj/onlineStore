import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/service/category.service';
import { CompInteractionService } from 'src/app/service/comp-interaction.service';
@Component({
  selector: 'side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  @Output() selectedCategory = new EventEmitter();

//Catogery: string[] = ['Boots', 'mobile'];
category : Category[]=[];

constructor(private categoryService :CategoryService, private compInteractionSer :CompInteractionService) { }
  ngOnInit() {
   this.categoryService.listCategories().subscribe(
  (data :any)=>{
    this.category =data;
    console.log(this.category);
  }
);
  }
  onSelection(e, v) {
     
    //this.selectedCategory.emit(v);
    let selectedItems:string[]=[]
    console.log(v);
    for(let a of v) {
      
       console.log(a);
      console.log("Selected category from list: ",a.value);
      selectedItems.push(a.value);
    // this.categoryService.categorySelected.next(a.value);
       this.compInteractionSer.selectedCategory(selectedItems);
      console.log("Selected category from list: ",a.value);

    }
  }
  applyFilter(filterValue :string){
    console.log("filter value" ,filterValue);
  }

}
