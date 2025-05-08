import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit{
  
  getBrandsApi:string = 'https://api.everrest.educata.dev/shop/products/brands'

  brandList:string[] = []

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ){}
  
  ngOnInit(): void {
    this.listBrands()
  }

  listBrands(){
    this.http.get<string[]>(this.getBrandsApi).subscribe(value => {
      this.brandList = value
    })
  }

  filterByBrand(selectedBrand){
    this.router.navigate(['Laptops'], {
      queryParams: {brand : selectedBrand}
    })
  }
}
