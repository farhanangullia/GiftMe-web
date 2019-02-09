import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AuthComponent} from './auth/auth.component';
import {CategoryPageComponent} from './category-page/category-page.component';
import {ProfilePageComponent} from './profile-page/profile-page.component';
import {ProductPageComponent} from './product-page/product-page.component';
import {ShoppingCartComponent} from './shopping-cart/shopping-cart.component';
import {CheckoutComponent} from './checkout/checkout.component';
import {FaqComponent} from './faq/faq.component';
import {FlowersCategoryComponent} from './flowers-category/flowers-category.component';
import {ConfectioneryCategoryComponent} from './confectionery-category/confectionery-category.component';
import {PlushiesCategoryComponent} from './plushies-category/plushies-category.component';
import {RegisterUserComponent} from './register-user/register-user.component';
import {AccountComponent} from './account/account.component';
import {ShopComponent} from './shop/shop.component';
import {TransactionComponent} from './transaction/transaction.component';
import {ShopsComponent} from './shops/shops.component';
import {TransactionSuccessfulComponent} from './transaction-successful/transaction-successful.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent, data: {title: 'giftme - homepage'}},
  {path: 'login', component: AuthComponent},
  {path: 'register', component: RegisterUserComponent},
  {path: 'category', component: CategoryPageComponent},
  {path: 'product/:productId', component: ProductPageComponent},
  {path: 'profile', component: ProfilePageComponent},
  {path: 'cart', component: ShoppingCartComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'faq', component: FaqComponent},
  {path: 'category/flowers', component: FlowersCategoryComponent},
  {path: 'category/plushies', component: PlushiesCategoryComponent},
  {path: 'category/confectionery', component: ConfectioneryCategoryComponent},
  {path: 'account', component: AccountComponent},
  {path: 'shop/:shopId', component: ShopComponent},
  {path: 'transaction', component: TransactionComponent},
  {path: 'shops', component: ShopsComponent},
  {path: 'success', component: TransactionSuccessfulComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
