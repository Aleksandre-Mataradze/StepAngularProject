import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { ProductsComponent } from "../body/products/products.component";

@Injectable({
    providedIn: 'root'
})
export class generateCard{

    private allProductApiUrl = 'https://api.everrest.educata.dev/shop/products/all?page_index=1&page_size=38';
    
    constructor(
        private http: HttpClient
    ){}

    getAllProduct(): Observable<object>{
        return this.http.get<object>(this.allProductApiUrl)
    }   

    exportProduct(): Observable<any>{
        return new Observable((observer) => {
            this.getAllProduct().subscribe({
                next: (data:any) => {
                    console.log(data.products)
                const products = data.products
                observer.next(products)
                observer.complete()
            }
            })
        })
    }

    searchInputProduct(productName:string): Observable<any>{
        return new Observable((observer) => {
            this.getAllProduct().subscribe({
                next: (data:any) => {
                    console.log(data.products)
                const products = data.products
                for(let product of products){
                    if(product.title.includes(productName)){
                        observer.next(product)
                        observer.complete()
                    }
                }
            }
            })
        })
    }
}

