import { Component } from '@angular/core';
import { combineLatest, filter } from 'rxjs';
import { generateCard } from 'src/app/services/getCards.service';

@Component({
  selector: 'app-laptops',
  templateUrl: './laptops.component.html',
  styleUrls: ['./laptops.component.scss']
})
export class LaptopsComponent {

  productList:any[] = []
  searchResult = {
    searchInput : '',
    searchActive : false
  }

  constructor(
    private cardService: generateCard
  ){}

    ngOnInit(): void {
    
      this.loadProducts(); // Loads all products on the page

      

      this.cardService.searchProduct$.subscribe(data => { // Loads product on the page, that was searched in search bar.
        this.searchResult.searchInput = data.input
        this.loadProducts()
      })
  }

  loadProducts(){
    this.cardService.exportProduct()
    .subscribe({
      next: (products) => {
        if (!this.searchResult.searchInput) {
          this.productList = products
            .filter((product: any) => product.category.name === 'laptops')
            .map((product: any) => {
              if (product.price.currency === 'USD') {
                product.price.convertedCurrentPrice = (product.price.current * 2.73).toFixed(2);
              } else {
                product.price.convertedCurrentPrice = product.price.current;
              }
              return product;
            });
        } else {
          this.cardService.emitSearchProduct(this.searchResult.searchInput).subscribe({
            next: (data: any) => {
              this.productList = data.products
                .filter((product: any) => product.category?.name?.toLowerCase() === 'laptops')
                .map((product: any) => {
                  if (product.price.currency === 'USD') {
                    product.price.convertedCurrentPrice = (product.price.current * 2.73).toFixed(2);
                  } else {
                    product.price.convertedCurrentPrice = product.price.current;
                  }
                  return product;
                });
            }
          });
        }
      }
    });
    }
}
