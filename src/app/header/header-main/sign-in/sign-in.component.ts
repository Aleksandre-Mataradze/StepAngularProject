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
    userAvatar: ''
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
        console.log('Successful log in:', respone)
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${respone.access_token}`
        })
        this.http.get<User>(this.getUserByTokenApi, {headers}).subscribe(user => {
          console.log("user:", user)

          this.userData = {
            userName : user.firstName,
            userLastname : user.lastName,
            userAge  : user.age,
            userEmail : user.email,
            userAddress : user.address,
            userTel : user.phone,
            userZipCode : user.zipcode,
            userGender : user.gender,
            userAvatar : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.veryicon.com%2Ficons%2Fmiscellaneous%2Fuser-avatar%2Fuser-avatar-male-5.html&psig=AOvVaw31q6Nr8HTkYWyhM3Qcr6DC&ust=1742756962241000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCOCvveKxnowDFQAAAAAdAAAAABAE"
          }

          this.userLoggedIn.emit(this.userData)
        })
      },
      error: (error) => {
        console.log('Not successful log in:', error)
      }
    })
    console.log(this.signInForm)
  }

  testClick(){
    console.log("user data:", this.userData)
  }
}
