import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from "rxjs";
import { ProductsComponent } from "../body/products/products.component";

@Injectable({
    providedIn: 'root'
})
export class generateCard{

    private allProductApiUrl = 'https://api.everrest.educata.dev/shop/products/all?page_index=1&page_size=38';

    searchProduct = new Subject<{ input: string, active: boolean}>();
    searchProduct$ = this.searchProduct.asObservable();
    
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
                    // console.log(data.products)
                const products = data.products
                observer.next(products)
                observer.complete()
            }
            })
        })
    }

    emitSearchProduct(input:string, active: boolean){
        this.searchProduct.next({input, active})
    }
}

