import { Component, OnInit } from '@angular/core';
import { signInUp } from 'src/app/services/signInUp.service';
import { HeaderMainComponent } from '../header-main.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit{

  signUpForm:FormGroup

  constructor(
    private auth: signInUp
  ){}

  ngOnInit(): void {
    this.initializeSignUpForm()
  }

  authTrigger(){
    this.auth.deactivateSignUp()
  }

  goToSignIn(){
    this.auth.deactivateSignUp()
    this.auth.activateSignIn()
  }

  initializeSignUpForm(){
    this.signUpForm = new FormGroup({
      'userName' : new FormControl(null, [Validators.minLength(2), Validators.maxLength(20)]),
      'userLastName' : new FormControl(null, [Validators.minLength(2), Validators.maxLength(20)]),
      'userAge' : new FormControl(null, [Validators.min(1)]),
      'userEmail' : new FormControl(null, [Validators.required]),
      'userVerifyEmail' : new FormControl(null, [Validators.required]),
      'userPassword' : new FormControl(null, [Validators.minLength(8), Validators.maxLength(30)]),
      'userSecondPassword' : new FormControl(null, [Validators.required]),
      'userAddress' : new FormControl(null, [Validators.required]),
      'userTel' : new FormControl(null, [Validators.required]),
      'userZipCode' : new FormControl(null, [Validators.required]),
      'userGender' : new FormControl(null, [Validators.required]),
    })
  }

  onSubmit(){
    const formControl = this.signUpForm.controls;
    this.auth.signUp(
      formControl['userName'].value,
      formControl['userLastName'].value,
      formControl['userAge'].value,
      formControl['userEmail'].value,
      formControl['userPassword'].value,
      formControl['userAddress'].value,
      formControl['userTel'].value,
      formControl['userZipCode'].value,
      formControl['userGender'].value)
      .subscribe({
        next: (response) => {
          console.log("Successful sign up: ", response);
        },
        error: (error) => {
          console.log("Not successful sign up: ", error);
        }
      })
    
    this.auth.verifyEmail(formControl['userVerifyEmail'].value).subscribe({
      next: (response) => {
        console.log(response)
      },
      error: (error) => {
        console.log(error);
      }
    })
    console.log(this.signUpForm)
  }
}
