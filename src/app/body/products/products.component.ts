import { Component, OnInit } from '@angular/core';
import { HeaderMainComponent } from 'src/app/header/header-main/header-main.component';
import { generateCard } from 'src/app/services/getCards.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{

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
      this.cardService.exportProduct().subscribe({
        next: (products) => {
          if(!this.searchResult.searchInput){
            this.productList = products.map((product:any) => {
              if(product.price.currency == 'USD'){
                product.price.convertedCurrentPrice = (product.price.current * 2.73).toFixed(2)
              }else{
                product.price.convertedCurrentPrice = product.price.current
              }
              return product
            })
          }else if (this.searchResult.searchInput){
            this.cardService.emitSearchProduct(this.searchResult.searchInput).subscribe({
              next: (data:any) => {
                const products = data.products
                this.productList = products.map((product:any) => {
                  if(product.price.currency == 'USD'){
                    product.price.convertedCurrentPrice = (product.price.current * 2.73).toFixed(2)
                  }else{
                    product.price.convertedCurrentPrice = product.price.current
                  }
                  return product
                })
              }
            })
          }
          // console.log("პროდუქტები", products)
        }
      })
  }
}
