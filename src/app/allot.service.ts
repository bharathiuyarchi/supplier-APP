
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Env } from './environment';


@Injectable({
  providedIn: 'root'
})
export class MamaneAllot {

  local: any = localStorage.getItem('token');
  token: any = JSON.parse(this.local).value;
  baseurl = Env.baseAPi;

  constructor(private http: HttpClient) { }
  get_stream() {
    return this.http.get(this.baseurl + "/v1/ecomplan/get/stream/all/alert", { headers: { auth: this.token }, });
  }
  get_stream_one(id: any) {
    return this.http.get(this.baseurl + "/v1/ecomplan/get/one/stream?id=" + id, { headers: { auth: this.token }, });
  }

  get_sub_host(id:any) {
    return this.http.get(this.baseurl + "/v1/subhost/get/subhost/free?id="+id, { headers: { auth: this.token }, });
  }
  alert_stream(body: any, id: any) {
    return this.http.put(this.baseurl + "/v1/ecomplan/allot/stream/subhost?id=" + id, body, { headers: { auth: this.token }, });
  }
}



