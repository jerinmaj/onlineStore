import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';

@Component({
  selector: 'form1',
  templateUrl: './form1.component.html',
  styleUrls: ['./form1.component.css']
})
export class Form1Component implements OnInit {
  firstFormGroup: FormGroup;
  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.firstFormGroup =new FormGroup({
      fullname :new FormControl(),
      emil :new FormControl(),
      skills :new FormGroup({
        skillName : new FormControl(),
        experianceInYears : new FormControl(),
        proficency : new FormControl()
      })
    });
  }

}
