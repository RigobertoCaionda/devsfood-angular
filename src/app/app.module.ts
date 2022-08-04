import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TooltipModule } from 'ng2-tooltip-directive';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { SigninComponent } from './views/signin/signin.component';
import { SignupComponent } from './views/signup/signup.component';
import { TesteComponent } from './views/teste/teste.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CategoryComponent } from './views/home/category/category.component';
import { ProductItemComponent } from './views/home/product-item/product-item.component';
import { SharedModule } from './shared/shared.module';
import { CartProductComponent } from './views/cart-product/cart-product.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TokenInterceptor } from './core/interceptors/token.interceptor';
import { ProfileComponent } from './views/profile/profile.component';
import { UserUpdateFormComponent } from './views/profile/user-update-form/user-update-form.component';
import { OrdersComponent } from './views/orders/orders.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SigninComponent,
    SignupComponent,
    TesteComponent,
    CategoryComponent,
    ProductItemComponent,
    CartProductComponent,
    ProfileComponent,
    UserUpdateFormComponent,
    OrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TooltipModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient] 
      }
})
  ],
  exports: [
    TranslateModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
