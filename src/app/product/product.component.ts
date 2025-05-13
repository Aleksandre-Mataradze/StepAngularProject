import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit{

  productID:string

  product:any

  productGalerryArr:[] = []

  index:number = 0

  getProductApi:string = 'https://api.everrest.educata.dev/shop/products/id'

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ){}

  ngOnInit(): void {
    this.productID = this.route.snapshot.queryParams['product']
    console.log(this.productID)

    this.iniatializeProduct(this.productID).subscribe(value => {
      this.product = value
      console.log(value)
      this.product.price.convertedPrice = this.product.price.current * 2.73
      this.product.price.convertedBeforePrice = this.product.price.beforeDiscount * 2.73
      this.productGalerryArr = this.product.images
    })
  }

  iniatializeProduct(id:string){
    const url = `${this.getProductApi}/${id}`;
    return this.http.get(url);
  }

  convertPrices(products: any[]): any[] {
    return products.map(product => {
      // convert is disabled because of data base issue
      if (product.price.currency === 'USD') {
        product.price.convertedCurrentPrice = (product.price.current * 2.73).toFixed(2);
      } else {
        product.price.convertedCurrentPrice = product.price.current;
      }

      return product.price.convertedCurrentPrice;
    });
  }

  nextImage(){
    if(this.index != this.product.images.length-1){
      this.index += 1
    }
  }

  previousImage(){
    if(this.index != 0){
      this.index -= 1
    }
  }
}
