import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{FormsModule,ReactiveFormsModule} from '@angular/forms';
import{MaterialModule} from './material/material.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { AppRoutingModule } from './/app-routing.module';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './shared/login/login.component';
import { CartComponent } from './users/user/cart/cart.component';
import { OrderComponent } from './users/user/order/order.component';
import { ProfileComponent } from './users/user/profile/profile.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductViewComponent } from './product/product-view/product-view.component';
import { ProductAddComponent } from './product/product-add/product-add.component';
import { ProductUpdateComponent } from './product/product-update/product-update.component';
import { HttpClientModule } from '@angular/common/http';
import { GlobalProvider } from './globalprovider';
import { ProductService } from './service/product.service';
import { CheckoutComponent } from './users/user/checkout/checkout.component';
import { Form1Component } from './Reactivform/form1/form1.component';
import { UserService } from './service/user.service';
  import { CookieService } from 'ngx-cookie-service';
import { SideNavComponent } from './shared/side-nav/side-nav.component';
import { ProductComponent } from './admin/product/product.component';
import { UsersComponent } from './admin/users/users.component';
import { OrdersComponent } from './admin/orders/orders.component';
import { CategoryComponent } from './admin/category/category.component';
import { AdminComponent } from './admin/admin/admin.component';
import { PaginatorComponent } from './test/paginator/paginator.component';

@NgModule({ 
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    AdminComponent,
    CartComponent,
    OrderComponent,
    ProfileComponent,
    ProductListComponent,
    ProductViewComponent,
    ProductAddComponent,
    ProductUpdateComponent,
    CheckoutComponent,
    Form1Component,
    SideNavComponent,
    ProductComponent,
    UsersComponent,
    OrdersComponent,
    CategoryComponent,
    PaginatorComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    // GlobalProvider,
    // ProductService,
    // UserService,
   CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
