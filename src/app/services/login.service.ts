import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class LoginService {
  private baseUrl = 'http://localhost:8080/';

  constructor(private http:HttpClient) {
    console.log('Login..');
   }

   getUser(userName:string){
    return this.http.get(this.baseUrl + "userObtain?userName="+userName);
   }
}
