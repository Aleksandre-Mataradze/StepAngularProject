import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-header-main',
  templateUrl: './header-main.component.html',
  styleUrls: ['./header-main.component.scss'],
})
export class HeaderMainComponent {

  searchResult = {
    searchInput : '',
    searchActive : false
  }

  throwInputData = new Subject<any>();

  headerImageUrl:string = "assets/images/Shop image.png"

  onSubmit(data: any){
    this.searchResult.searchInput = data.controls.searchInput.value
    this.searchResult.searchActive = true
    this.throwInputData.next(this.searchResult.searchInput)
    this.throwInputData.next(this.searchResult.searchActive)
    this.throwInputData.complete()
    console.log(this.searchResult.searchInput, "and ", this.searchResult.searchActive)
  }
}
