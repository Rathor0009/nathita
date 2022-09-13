import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetuserServiceService {

  constructor() { }

  register(phone: number, firstname: string, lastname: string, email: string,rephone:string,password: string, location: string,service:string): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      phone,
      firstname,
      lastname,
      email,
      rephone,
      password,
      location,
      service,
      
    });
  }
}
