import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


import { Env } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  baseurl = Env.baseAPi;

  constructor(private httpClient:HttpClient) { }

  loginForm (data:any){
    return this.httpClient.post(this.baseurl+'/v1/supplier/login',data)
  }

  // forgotPasswordForm(data:any){
  //   return this.httpClient.post(this.baseurl+ 
  //     "/forgot-password/",data,{
  //     headers: new HttpHeaders().set('Content-Type','application/json')
  //   })
  // }

  forgotPassword(data:any){
    return this.httpClient.post(this.baseurl+'/v1/supplier/forgotPassword',data)

  }
  verify_otp(data:any){
    return this.httpClient.post(this.baseurl + '/v1/supplier/otp_verify',data);

  }

  registerapi(data:any){
    return this.httpClient.post(this.baseurl + '/v1/supplier',data)
  }
  alreadyCustomerVerify(data:any){
    return this.httpClient.post(this.baseurl + '/v1/supplier/already_Customer',data)
  }
}
