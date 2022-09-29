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
export class PaymentService {

  constructor(private http:HttpClient,public tokenStorage:TokenStorageService) { }
userPayment(status:Number,usertype:string,response:{}): Observable<any> {
  return this.http.post(AUTH_API + 'payment-record', {
    status,
    usertype,
   
    response
    
  }, httpOptions);
}



}
