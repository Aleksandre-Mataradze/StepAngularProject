import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Route, Router } from '@angular/router';
import { Subject, debounceTime, filter, throttleTime } from 'rxjs';
import { generateCard } from 'src/app/services/getCards.service';
import { signInUp } from 'src/app/services/signInUp.service';
import { JSONuserData, userData } from 'src/assets/interfaces/auth.interfaces';


@Component({
  selector: 'app-header-main',
  templateUrl: './header-main.component.html',
  styleUrls: ['./header-main.component.scss'],
})
export class HeaderMainComponent implements OnInit{

  userData:JSONuserData = {
    address: '',
    age: 0,
    avatar: '',
    cartID: '',
    chatIDs: [],
    email: '',
    firstName: '',
    gender: '',
    lastName: '',
    password: '',
    phone: '',
    role: '',
    verified: false,
    zipcode: '',
    _id: '',
    userLoggedIn:false
  }
  // userLoggedIn:boolean

  
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
  
  userOptionsActive:boolean = false;

  constructor(
    private searchCard: generateCard,
    private auth: signInUp,
    private cdRef: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute
  ){}

    private userID:string
  
  ngOnInit(): void {
    this.auth.signInactive$.subscribe(value => this.signInForm.active = value)
    this.auth.signUpActive$.subscribe(value => this.signUpForm.active = value)
    this.receiveUserData()
  }

  onSubmit(data: any){
    this.searchResult.searchInput = data.controls.searchInput.value
    if(this.searchResult.searchInput){
      this.searchResult.searchActive = true
    }
    this.searchCard.emitSearchProduct(this.searchResult.searchInput)
    this.searchCard.streamSearchInput(this.searchResult.searchInput)
  }

  authTrigger(){
    this.auth.activateSignIn()
  }

  receiveUserData(){
    const userToken = localStorage.getItem('Token')
    if(userToken){
      this.auth.getUserByToken(userToken).subscribe(user => {
        this.userData = user
        this.userData.userLoggedIn = true
        this.cdRef.detectChanges()
      })
    }else{
      this.auth.deactivateSignIn()
    }

  }

  userOptions(){
    this.userOptionsActive = !this.userOptionsActive
  }

  logOut(){
    this.userData.userLoggedIn = false
    localStorage.removeItem('Token')
    this.router.navigate(['/'])
  }

  goToMainPage(){
    this.router.navigate([''])
  }
}
