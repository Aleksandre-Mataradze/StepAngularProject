import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HeaderServiceComponent } from './header/header-service/header-service.component';
import { HeaderMainComponent } from './header/header-main/header-main.component';
import { BodyComponent } from './body/body.component';
import { CategoriesComponent } from './body/categories/categories.component';
import { ProductsComponent } from './body/products/products.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignInComponent } from './header/header-main/sign-in/sign-in.component';
import { SignUpComponent } from './header/header-main/sign-up/sign-up.component';
import { LaptopsPageComponent } from './laptops-page/laptops-page.component';
import { LaptopsComponent } from './laptops-page/laptops/laptops.component';
import { laptopFiltersComponent } from './laptops-page/filters/filters.component';
import { MobilesPageComponent } from './mobiles-page/mobiles-page.component';
import { MobilesComponent } from './mobiles-page/mobiles/mobiles.component';
import { mobileFiltersComponent } from './mobiles-page/filters/filters.component';
import { ProductComponent } from './product/product.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HeaderServiceComponent,
    HeaderMainComponent,
    BodyComponent,
    CategoriesComponent,
    ProductsComponent,
    SignInComponent,
    SignUpComponent,
    LaptopsPageComponent,
    LaptopsComponent,
    laptopFiltersComponent,
    MobilesPageComponent,
    MobilesComponent,
    mobileFiltersComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
