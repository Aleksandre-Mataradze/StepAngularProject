import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { ProductsComponent } from "../body/products/products.component";

@Injectable({
    providedIn: 'root'
})
export class generateCard{

    private allProductApi = 'https://api.everrest.educata.dev/shop/products/all?page_index=1&page_size=38';
    private searchProductApi = `https://api.everrest.educata.dev/shop/products/search`

    searchProduct = new BehaviorSubject<{input: string}>({input: ''});
    searchProduct$ = this.searchProduct.asObservable();
    
    constructor(
        private http: HttpClient
    ){}

    getAllProduct(): Observable<object>{
        return this.http.get<object>(this.allProductApi)
    }   

    exportProduct(): Observable<any>{
        return new Observable((observer) => {
            this.getAllProduct().subscribe({
                next: (data:any) => {
                const products = data.products
                observer.next(products)
                observer.complete()
            }
            })
        })
    }

    streamSearchInput(input){
        this.searchProduct.next({input})
    }

    emitSearchProduct(input:string){
        const params = new HttpParams()
        .set('keywords', input)
        .set('page_size', 10)
        return this.http.get(this.searchProductApi, { params })
    }
}

