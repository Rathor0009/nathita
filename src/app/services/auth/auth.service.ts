import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { TokenStorageService } from '../token/token.service';
const AUTH_API = environment.baseUrl;
const httpOptions = {
  headers: new HttpHeaders({
    "X-Custom-Header": "application/json",
    // "x-access-token":token//

  })
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient,public tokenStorage:TokenStorageService) { }
//register as service user
  register(phone: number, firstname: string, lastname: string, email: string,rephone:string,password: string, location:number,service:string,geo_address:string): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      phone,
      firstname,
      lastname,
      email,
      rephone,
      password,
      location,
      service,
      geo_address,
      
    }, httpOptions);
  }
//register as shop user
shopUserRegister(phone: number, firstname: string, lastname: string, email: string,rephone:string,password: string, location:number,shop:string,geo_address:string): Observable<any> {
  return this.http.post(AUTH_API + 'shop-user-signup', {
    phone,
    firstname,
    lastname,
    email,
    rephone,
    password,
    location,
    shop,
    geo_address
    
  }, httpOptions);
}

// sign in as serviceUser
  signin(phone:number,password:string):Observable<any>{
    return this.http.post(AUTH_API+'login',{
      phone,password
    },httpOptions)

  }

  // signin as shop user
  shopUserSignin(phone:number,password:string):Observable<any>{
    return this.http.post(AUTH_API+'shop-user-login',{
      phone,password
    },httpOptions)

  }

  token=this.tokenStorage.getToken()
 getuser():Observable<any>{
  return this.http.get(AUTH_API+'profile',httpOptions)
 }



 getservice(service:string,lat:string,lng:string):Observable<any>{
  
  return this.http.post(AUTH_API+'service-provider-user',{
    service,
    lat,
   lng
  },httpOptions)
  

 }

 getshop(shop:string,lat:string,lng:string):Observable<any>{
  
  return this.http.post(AUTH_API+'shop-provider-user',{
    shop,lat,lng
  },httpOptions)

}

 getServiceData():Observable<any>{
  
  return this.http.get(AUTH_API+'profileS',)
 }
}