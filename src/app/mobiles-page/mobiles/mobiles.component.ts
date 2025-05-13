import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, combineLatest, takeUntil} from 'rxjs';
import { serviceFilter } from 'src/app/services/filters.service';
import { generateCard } from 'src/app/services/getCards.service';

@Component({
  selector: 'app-mobiles',
  templateUrl: './mobiles.component.html',
  styleUrls: ['./mobiles.component.scss']
})
export class MobilesComponent {

  productList:any[] = []
  searchResult = {
    searchInput : '',
    searchActive : false
  }

  private destroy$ = new Subject<void>()

  constructor(
    private cardService: generateCard,
    private filterService: serviceFilter,
    private router: Router,
    private route: ActivatedRoute,
  ){}

  ngOnInit(): void {
    
    this.loadProducts(); // Loads all products on the page

    

    this.cardService.searchProduct$.subscribe(data => { // Loads product on the page, that was searched in search bar.
      this.searchResult.searchInput = data.input
      this.loadProducts()
    })

    combineLatest([this.filterService.activeBrand$, this.filterService.activePrice$, this.filterService.activeRating$]).pipe(takeUntil(this.destroy$)).subscribe(([brands, price, rating]) => {
      console.log("Subscribed:", brands, price, rating)
      this.loadProducts(brands, price, rating)
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadProducts(brandQuery: string[] = [], priceQuery: { minPrice: number | null, maxPrice: number | null} = {minPrice: null, maxPrice: null}, ratingQuery : {minRating: number | null, maxRating: number | null} = {minRating: null, maxRating: null}){
    const searchInput = this.searchResult.searchInput;
    // const prices = priceQuery;
    const minPrice = priceQuery.minPrice 
    const maxPrice = priceQuery.maxPrice
    const minRating = ratingQuery.minRating
    const maxRating = ratingQuery.maxRating
    // console.log("prices:", prices)
    
    if(searchInput) {
      console.log("შემოვიდა ინფუთიანში")
      this.cardService.emitSearchProduct(searchInput).subscribe({
        next: (data: any) => {
          let products = data.products.filter(product => product.category.id === '2');
          

          products = this.convertPrices(products)
          
          if(brandQuery.length > 0){
            products = products.filter(product =>
              brandQuery.includes(product.brand)
            );
          }

          if(minPrice !== null && !isNaN(minPrice)) {
            products = products.filter(product => product.price.convertedCurrentPrice * 2.73  >= minPrice * 2.73);
          }
          if(maxPrice !== null && !isNaN(maxPrice)) {
            products = products.filter(product => product.price.convertedCurrentPrice * 2.73 <= maxPrice * 2.73);
          }

          if(minRating !== null){
            products = products.filter(product => product.rating >= minRating)
          }
          if(maxRating !== null){
            products = products.filter(product => product.rating <= maxRating)
          }

          console.log(products)
          this.productList = products
        }
      });
    } else {
      console.log("არ შემოვიდა ინფუთიანში")
      this.cardService.exportProduct().subscribe({
        next: (products: any[]) => {
          products = products.filter(product => product.category.id === '2')
          console.log("Query", brandQuery, priceQuery)

          products = this.convertPrices(products);
          
          if (brandQuery.length > 0) {
            products = products.filter(product =>
            brandQuery.includes(product.brand)
            );
          }

          if(minPrice !== null && !isNaN(minPrice)) {
            products = products.filter(product => product.price.convertedCurrentPrice * 2.73  >= minPrice * 2.73);
          }
          if(maxPrice !== null && !isNaN(maxPrice)) {
            products = products.filter(product => product.price.convertedCurrentPrice * 2.73 <= maxPrice * 2.73);
          }

          if(minRating !== null){
            products = products.filter(product => product.rating >= minRating)
          }
          if(maxRating !== null){
            products = products.filter(product => product.rating <= maxRating)
          }

          this.productList = products
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
