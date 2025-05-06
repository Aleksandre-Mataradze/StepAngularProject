import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class signInUp{

    authForm = {
        authActive : new BehaviorSubject<boolean>(false)
    }

    signInApi:string = 'https://api.everrest.educata.dev/auth/sign_in'

    signUpApi:string = 'https://api.everrest.educata.dev/auth/sign_up'

    verifyEmailApi:string = 'https://api.everrest.educata.dev/auth/verify_email'


    signInActive = new BehaviorSubject<boolean>(false)
    signUpActive = new BehaviorSubject<boolean>(false)

    signInactive$ = this.signInActive.asObservable();
    signUpActive$ = this.signUpActive.asObservable();

    constructor(
        private http: HttpClient
    ){}

    activateSignIn(){
        this.signInActive.next(true)
    }
    deactivateSignIn(){
        this.signInActive.next(false)
    }

    activateSignUp(){
        this.signUpActive.next(true)
    }
    deactivateSignUp(){
        this.signUpActive.next(false)
    }

    authTrigger(isActive:boolean): {authActive : BehaviorSubject<boolean>} {
       this.authForm.authActive.next(!isActive)
       
       return this.authForm
    }

    signIn(email:string, password:string){
        return this.http.post(this.signInApi, ({email, password}))
    }

    signUp(userName:string, userSurname:string, userBornDate:number, userEmail:string, userPassword:string, userAddress:string, userTel:string, userZipcode:number, userGender:string){
        return this.http.post(this.signUpApi, ({userName, userSurname,userBornDate, userEmail, userPassword, userAddress, userTel, userZipcode, userGender}))
    }

    verifyEmail(userVerifyEmail:string){
        return this.http.post(this.verifyEmailApi, (userVerifyEmail))
    }
}