import { Component } from '@angular/core';
import { categoriesList } from 'src/assets/interfaces/categories.interfaces';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {

  CategoriesListIsActive:boolean = false;

  categoryList:categoriesList[] = [
    {catagoryName:'ლეპტოპები', categoryId: 1, categoryIconUrl:''},
    {catagoryName:'მობილურები', categoryId: 2, categoryIconUrl:''},
  ];

  activateCategoriesList(){
    this.CategoriesListIsActive = !this.CategoriesListIsActive;
  }
}
