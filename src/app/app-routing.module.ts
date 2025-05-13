import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodyComponent } from './body/body.component';
import { LaptopsPageComponent } from './laptops-page/laptops-page.component';
import { MobilesPageComponent } from './mobiles-page/mobiles-page.component';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
  {path: '', component: BodyComponent},
  {path: 'Laptops', component: LaptopsPageComponent},
  {path: 'Mobiles', component: MobilesPageComponent},
  {path: 'Product', component: ProductComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
