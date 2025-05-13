import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { merge } from 'rxjs';
import { serviceFilter } from 'src/app/services/filters.service';
import { generateCard } from 'src/app/services/getCards.service';

@Component({
  selector: 'app-laptop-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class laptopFiltersComponent implements OnInit{
  
  getBrandsApi:string = 'https://api.everrest.educata.dev/shop/products/brands'

  brandList:string[] = []

  selectedBrands:string[] = []

  priceFilter:FormGroup

  ratingFilter:FormGroup

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private filter: serviceFilter,
    private getCards: generateCard
  ){}
  
  ngOnInit(): void {
    this.listBrands()
    this.initializeFilterForms()

    this.route.queryParamMap.subscribe(params => {
      this.selectedBrands = params.getAll('brand')
    })
  }

  listBrands(){
    this.http.get<string[]>(this.getBrandsApi).subscribe(value => {
      this.brandList = value
    })
  }

  filterByBrand(selectedBrand: string){
    const selectedBrands = [...this.selectedBrands]
    const brandIndex = selectedBrands.indexOf(selectedBrand)

    if(brandIndex > -1) {
      selectedBrands.splice(brandIndex, 1)
    }else{
      selectedBrands.push(selectedBrand)
    }

    this.router.navigate(['Laptops'], {
      queryParams: {brand : selectedBrands},
      queryParamsHandling: 'merge'
    })
  }

  initializeFilterForms(){
    this.priceFilter = new FormGroup({
      'minPrice' : new FormControl(null),
      'maxPrice' : new FormControl(null)
    })
    this.ratingFilter = new FormGroup({
      'minRating' : new FormControl(null),
      'maxRating' : new FormControl(null)
    })
  }

  filterByPrice(){
    const formControl = this.priceFilter.controls;
    this.router.navigate(['Laptops'], {
      queryParams : {
          minPrice: formControl['minPrice'].value,
          maxPrice: formControl['maxPrice'].value
      },
      queryParamsHandling: 'merge'
  })
  }

  removeFilterPrice(){
    this.priceFilter.reset()
  }

  filterByRating(){
    console.log("დაეჭირა")
    const formControl = this.ratingFilter.controls
    this.router.navigate(['Laptops'], {
      queryParams: {
        minRating: formControl['minRating'].value,
        maxRating: formControl['maxRating'].value
      },
      queryParamsHandling: 'merge'
    })
  }

  removeFilterRating(){
    this.ratingFilter.reset()
  }
}
