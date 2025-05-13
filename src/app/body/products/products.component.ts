import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderMainComponent } from 'src/app/header/header-main/header-main.component';
import { serviceFilter } from 'src/app/services/filters.service';
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
    private cardService: generateCard,
    private route: ActivatedRoute,
    private router: Router
  ){}

    ngOnInit(): void {
    
       this.loadProducts(); // Loads all products on the page

      this.cardService.searchProduct$.subscribe(data => { // Loads product on the page, that was searched in search bar.
        this.searchResult.searchInput = data.input
        this.loadProducts()
      })
  }

  loadProducts(){
    const searchInput = this.searchResult.searchInput;
    const brandQuery = this.route.snapshot.queryParamMap.getAll('brand')
    
    if (searchInput) {
      this.cardService.emitSearchProduct(searchInput).subscribe({
        next: (data: any) => {
          let products = data.products;
  
          if (brandQuery.length > 0) {
            products = products.filter(product =>
              brandQuery.includes(product.brand)
            );
          }
  
          this.productList = this.convertPrices(products);
        }
      });
    } else {
      this.cardService.exportProduct().subscribe({
        next: (products: any[]) => {
          if (brandQuery.length > 0) {
            products = products.filter(product =>
              brandQuery.includes(product.brand)
            );
          }
  
          this.productList = this.convertPrices(products);
        }
      });
    }
  }

  convertPrices(products: any[]): any[] {
    return products.map(product => {
      if (product.price.currency === 'USD') {
        product.price.beforeDiscountPrice = (product.price.beforeDiscount * 2.73).toFixed(2);
        product.price.convertedCurrentPrice = (product.price.current * 2.73).toFixed(2);
      } else {
        product.price.beforeDiscountPrice = product.price.beforeDiscount;
        product.price.convertedCurrentPrice = product.price.current;
      }
      return product;
    });
  }

  goToProductPage(product){
    const ID = product._id
    this.router.navigate(['Product'], {
      queryParams: {product : ID}
    })
  } 
}
