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
    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(() => {
      let currentRoute = this.route.root;
      while (currentRoute.firstChild) {
        currentRoute = currentRoute.firstChild;
      }

      currentRoute.paramMap.subscribe(params => {
        this.userID = params.get('userID');
        console.log('ID:', this.userID);
      });
    });
  }

  activateCategoriesList(){
    this.CategoriesListIsActive = !this.CategoriesListIsActive;
  }
  
  routeToCategory(category:string){
    console.log(category)
    if(category === 'ლეპტოპები'){
      this.router.navigate(['/Laptops'])
    }
  }
}
