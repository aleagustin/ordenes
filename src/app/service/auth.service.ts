import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  URL: any

  constructor(private http: HttpClient) {

  }


authScan(){

  //return this.http.post(this.URL ,{"token":data})

  return "12345"

}



}
