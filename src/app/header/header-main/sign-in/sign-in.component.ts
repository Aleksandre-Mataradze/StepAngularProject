import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { signInUp } from 'src/app/services/signInUp.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthResponse, User, userData } from 'src/assets/interfaces/auth.interfaces';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit{

  @Output() userLoggedIn = new EventEmitter<userData>()

  signInForm:FormGroup

  getUserByTokenApi:string = 'https://api.everrest.educata.dev/auth'

  userData:userData = {
    userName: '',
    userLastname: '',
    userAge: null,
    userEmail: '',
    userAddress: '',
    userTel: '',
    userZipCode: null,
    userGender: '',
    userAvatar: '',
    userID: '',
    //userLoggedIn is not data base key
    userLoggedIn: false
  }

  constructor(
    private auth: signInUp,
    private http: HttpClient,
  ){}

  ngOnInit(): void {
    this.initializeSignInForm()
  }

  authTrigger(){
    this.auth.deactivateSignIn()
  }

  goToRegistration(){
    this.auth.deactivateSignIn()
    this.auth.activateSignUp()
  }

  initializeSignInForm(){
    this.signInForm = new FormGroup({
      'userEmail' : new FormControl(null,(Validators.required)),
      'userPassword' : new FormControl(null,(Validators.required))
    })
  }

  onSubmit(){
    this.auth.signIn(this.signInForm.controls['userEmail'].value, this.signInForm.controls['userPassword'].value).subscribe({
      next: (respone: AuthResponse) => {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${respone.access_token}`
        })
        this.http.get<User>(this.getUserByTokenApi, {headers}).subscribe(user => {
        
          localStorage.setItem('Token', respone.access_token)

          this.userData = {
            userName : user.firstName,
            userLastname : user.lastName,
            userAge  : user.age,
            userEmail : user.email,
            userAddress : user.address,
            userTel : user.phone,
            userZipCode : user.zipcode,
            userGender : user.gender,
            userAvatar : user.avatar,
            userID : user._id,
            //userLoggedIn is not data base key
            userLoggedIn : false
          }

          this.userLoggedIn.emit(this.userData)
        })
        setTimeout(() => {
          this.auth.deactivateSignIn()
        }, 500);
      },
      error: (error) => {
        console.log('Not successful log in:', error)
      }
    })
  }

  testClick(){
    console.log("user data:", this.userData)
  }
}
