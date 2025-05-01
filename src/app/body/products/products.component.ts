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

  constructor(
    private cardService: generateCard,
    private headerMain: HeaderMainComponent
  ){}

    ngOnInit(): void {
    
      this.loadProducts();
  }

  loadProducts(){
    this.cardService.exportProduct().subscribe({
      next: (products) => {
        this.productList = products.map((product:any) => {
          if(product.price.currency == 'USD'){
            product.price.convertedCurrentPrice = (product.price.current * 2.73).toFixed(2)
          }else{
            product.price.convertedCurrentPrice = product.price.current
          }
          return product
        })
        console.log("In component product list is: ", this.productList)
      }
    })
  }

  
}
