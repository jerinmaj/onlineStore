import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './shared/login/login.component';
import { ProductViewComponent } from './product/product-view/product-view.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { CartComponent } from './users/user/cart/cart.component';
import { CheckoutComponent } from './users/user/checkout/checkout.component';
import { OrderComponent } from './users/user/order/order.component';
import { AdminComponent } from './admin/admin/admin.component';
import { CategoryComponent } from './admin/category/category.component';
import { OrdersComponent } from './admin/orders/orders.component';
import { ProductComponent } from './admin/product/product.component';
import { UsersComponent } from './admin/users/users.component';
 const routes:Routes=[
   {path:'home',component:HomeComponent},
   { path: '', redirectTo: '/home', pathMatch: 'full' },
  //  { path: '**', redirectTo: '/home', pathMatch: 'full' },
   {path:'login',component:LoginComponent},
   {path:'admin', component:AdminComponent},
   {path:'user/product/view/:id',component:ProductViewComponent},
   {path:'user/productlist',component:ProductListComponent},
   {path :'cart',component:CartComponent},
   {path:'checkout',component:CheckoutComponent},
   {path:'orders', component:OrderComponent},
   {path:'admin/category', component:CategoryComponent},
   {path:'admin/orders', component:OrdersComponent},
   {path:'admin/product', component:ProductComponent},
   {path:'admin/users', component:UsersComponent}

 ]
 @NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
