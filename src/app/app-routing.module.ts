import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodyComponent } from './body/body.component';
import { LaptopsPageComponent } from './laptops-page/laptops-page.component';

const routes: Routes = [
  {path: '', component: BodyComponent},
  {path: 'Laptops', component: LaptopsPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
