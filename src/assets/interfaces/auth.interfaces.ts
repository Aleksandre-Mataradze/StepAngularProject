export interface userData{
    userName:string,
    userLastname:string,
    userAge:Number,
    userEmail:string,
    userAddress:string,
    userTel:string,
    userZipCode:number,
    userGender:string,
    userAvatar:string,
    userID:string,
    userLoggedIn:boolean
}

export interface JSONuserData{
    address:string,
    age:number,
    avatar:string,
    cartID:string,
    chatIDs:[],
    email:string,
    firstName:string,
    gender:string,
    lastName:string,
    password:string,
    phone:string,
    role:string,
    verified:boolean,
    zipcode:string,
    _id:string,
    userLoggedIn:boolean
}

export interface User {
    _id: string;
    firstName: string;
    lastName: string;
    age: number;
    email: string;
    address: string;
    phone: string;
    zipcode: number;
    gender: string;
    avatar: string;
    cartID: string;
    chatIds: string[];
    password: string;
    role: string;
    verified: boolean;
  }

export interface AuthResponse{
    access_token: string,
    refresh_token: string
}