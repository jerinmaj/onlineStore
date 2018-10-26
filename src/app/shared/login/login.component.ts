import { Component, OnInit,Input } from '@angular/core';
import{LoginForm} from"./../../model/loginForm";
import {UserRegister} from './../../model/userRegister';
import {Router} from "@angular/router";
import { UserService } from '../../service/user.service';
@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
loginform: LoginForm  = {
  username: '',
  password: '',
};

userRegister :UserRegister ={
  id:null,
     name : "",
      mobile :null,
      email : "",
      password :"" 
}
  constructor( private router:Router,private userService:UserService) {
   }
 

  ngOnInit() {
    
  }

  login(loginform: LoginForm){
    console.log(loginform);
   // this.userService._auth(l)
    this.router.navigate(['home']);
  }
Clear()
{
}
createUser(userRegister :UserRegister){
  console.log(userRegister);
  this.userService._create(userRegister);
  //this.router.navigate(['login']);
}
}
