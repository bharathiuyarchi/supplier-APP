import { Injectable } from '@angular/core';
import { Env } from '../environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VerfyotpService {

  baseurl = Env.baseAPi;

  constructor(public http: HttpClient) { }

  verify_otp(data:any){
    return this.http.post(this.baseurl + '/v1/supplier/otp_verify',data);

  }

  set_password(id:any,data:any){
    return this.http.put(this.baseurl + '/v1/supplier/Supplier_setPassword/'+id,data);

  }
}
