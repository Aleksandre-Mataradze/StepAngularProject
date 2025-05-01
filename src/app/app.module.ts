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
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HeaderServiceComponent,
    HeaderMainComponent,
    BodyComponent,
    CategoriesComponent,
    ProductsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
