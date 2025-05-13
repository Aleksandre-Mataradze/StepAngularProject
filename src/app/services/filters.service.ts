import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subject, filter } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class serviceFilter{

    activeBrand = new Subject<string[]>()
    activeBrand$ = this.activeBrand.asObservable()

    activePrice = new Subject<{minPrice: number | null, maxPrice: number | null}>()
    activePrice$ = this.activePrice.asObservable()

    activeRating = new Subject<{minRating: number | null, maxRating: number | null}>()
    activeRating$ = this.activeRating.asObservable()

    constructor(
        private http: HttpClient,
        private router: Router,
        private route: ActivatedRoute
    ){
        this.filterByBrand()
        this.streamPrice()
        this.streamRating()
    }

    filterByBrand(){
        this.route.queryParamMap.subscribe(queryParams => {
            const brand = queryParams.getAll('brand');
            this.activeBrand.next(brand)
        })
    }

    streamPrice(){
        this.route.queryParamMap.subscribe(queryParams => {
            const minPrice = Number(queryParams.get('minPrice'))
            const maxPrice = Number(queryParams.get('maxPrice'))
            this.activePrice.next({
                minPrice: minPrice || null,
                maxPrice: maxPrice || null
            })
        })
    }

    streamRating(){
        this.route.queryParamMap.subscribe(queryParams => {
            const minRating = Number(queryParams.get('minRating'))
            const maxRating = Number(queryParams.get('maxRating'))
            this.activeRating.next({
                minRating: minRating || null,
                maxRating: maxRating || null
            })
        })
    }
}

