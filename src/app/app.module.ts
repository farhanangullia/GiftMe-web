import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import {TableModule} from 'primeng/table';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

// Services
import { TimeService } from './time.service';
import { ProductService } from './product.service';
import { UserService } from './user.service';
import { AlertService } from './services/alert.service';
import { ShopService } from './services/shop.service';
import { PromotionService } from './services/promotion.service';
import { ReviewService } from './services/review.service';
import { TransactionService } from './services/transaction.service';
import { UpdateCartService } from './services/updateCart.service';
import { CustomValidationService } from './services/customValidationService';

// Directives
import {CompareDirective} from './validators/CompareDirective.directive';
import {EmailDirective} from './validators/EmailDirective.directive';
import {NumberDirective} from './validators/NumberDirective.directive';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Pages
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';


 // From libraries
import {CardModule} from 'primeng/card';
import { NouisliderModule } from 'ng2-nouislider';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { CreditCardDirectivesModule } from 'angular-cc-library';

// Custom UI Elements
import {ProductCard} from './shared/ProductCard/ProductCard.component';

// Material Angular
import {MatCheckboxModule} from '@angular/material/checkbox';

// Primeng
import {DialogModule} from 'primeng/dialog';

// Own components
import { CarouselCaptionComponent } from './shared/carousel';
import { CategoryPageComponent } from './category-page/category-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { FaqComponent } from './faq/faq.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { ConfectioneryCategoryComponent } from './confectionery-category/confectionery-category.component';
import { PlushiesCategoryComponent } from './plushies-category/plushies-category.component';
import { FlowersCategoryComponent } from './flowers-category/flowers-category.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { AlertComponent } from './alert/alert.component';
import { AccountComponent } from './account/account.component';
import { ShopComponent } from './shop/shop.component';
import { TransactionComponent } from './transaction/transaction.component';
import { ShopsComponent } from './shops/shops.component';

// Pipes
import {FilterPipe} from './pipes/FilterPipe';
import { TransactionSuccessfulComponent } from './transaction-successful/transaction-successful.component';
import { CounterComponentComponent } from './counter-component/counter-component.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';



  @NgModule({
    declarations: [
      AppComponent,
      HomeComponent,
      CarouselCaptionComponent,
      AuthComponent,
      CategoryPageComponent,
      ProfilePageComponent,
      ProductPageComponent,
      ProductCard,
      ShoppingCartComponent,
      CheckoutComponent,
      FaqComponent,
      HeaderComponent,
      FooterComponent,
      MenuComponent,
      ConfectioneryCategoryComponent,
      PlushiesCategoryComponent,
      FlowersCategoryComponent,
      RegisterUserComponent,
      CompareDirective,
      EmailDirective,
      NumberDirective,
      AlertComponent,
      AccountComponent,
      ShopComponent,
      TransactionComponent,
      ShopsComponent,
      FilterPipe,
      TransactionSuccessfulComponent,
      CounterComponentComponent,
      ForgotPasswordComponent
    ],
    imports: [
      BrowserAnimationsModule,
      BrowserModule,
      AppRoutingModule,
      FormsModule,
      ReactiveFormsModule,
     HttpClientModule,
  TableModule,
CarouselModule.forRoot(),
// Prime Ng modules/ UI
CardModule, DialogModule, NouisliderModule, CollapseModule.forRoot(), MatCheckboxModule, CreditCardDirectivesModule],
    providers: [
    TimeService, ProductService, UserService, AlertService, ShopService, PromotionService, ReviewService,
    TransactionService, UpdateCartService, CustomValidationService
    ],
    bootstrap: [AppComponent]
  })
  export class AppModule { }
