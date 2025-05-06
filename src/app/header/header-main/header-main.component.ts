import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { generateCard } from 'src/app/services/getCards.service';
import { signInUp } from 'src/app/services/signInUp.service';
import { userData } from 'src/assets/interfaces/auth.interfaces';


@Component({
  selector: 'app-header-main',
  templateUrl: './header-main.component.html',
  styleUrls: ['./header-main.component.scss'],
})
export class HeaderMainComponent implements OnInit{

  userData:userData = {
    userName: '',
    userLastname: '',
    userAge: null,
    userEmail: '',
    userAddress: '',
    userTel: '',
    userZipCode: null,
    userGender: '',
    userAvatar: ''
  }

  searchResult = {
    searchInput : '',
    searchActive : false
  }
  
  signInForm:any = {
    active : false
  }

  signUpForm:any = {
    active : false
  }

  throwInputData = new Subject<any>();

  headerImageUrl:string = "assets/images/Shop image.png"

  constructor(
    private searchCard: generateCard,
    private auth: signInUp
  ){}
  
  ngOnInit(): void {
    this.auth.signInactive$.subscribe(value => this.signInForm.active = value)
    this.auth.signUpActive$.subscribe(value => this.signUpForm.active = value)
    this.receiveUserData
  }

  onSubmit(data: any){
    this.searchResult.searchInput = data.controls.searchInput.value
    if(this.searchResult.searchInput){
      this.searchResult.searchActive = true
    }
    this.searchCard.emitSearchProduct(this.searchResult.searchInput, this.searchResult.searchActive)
  }

  authTrigger(){
    this.auth.activateSignIn()
  }

  receiveUserData(data:userData){
    if(data){
      this.userData = data
      console.log("მოვიდა დატა", this.userData)
    }else{
      console.log("შემოვიდა ელსში")
      return
    }
  }
}
