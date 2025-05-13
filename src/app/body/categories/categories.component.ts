import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { categoriesList } from 'src/assets/interfaces/categories.interfaces';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit{

  CategoriesListIsActive:boolean = false;

  categoryList:categoriesList[] = [
    {catagoryName:'ლეპტოპები', categoryId: 1, categoryIconUrl:''},
    {catagoryName:'მობილურები', categoryId: 2, categoryIconUrl:''},
  ];

  userID:string

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
  }

  activateCategoriesList(){
    this.CategoriesListIsActive = !this.CategoriesListIsActive;
  }
  
  routeToCategory(category:string){
    console.log(category)
    if(category === 'ლეპტოპები'){
      this.router.navigate(['/Laptops'])
    }else if(category === 'მობილურები'){
      console.log("მობილურებში")
      this.router.navigate(['/Mobiles'])
    }
  }
}
