
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Env } from '../environment';


@Injectable({
  providedIn: 'root'
})
export class Managelivestream {

  local: any = localStorage.getItem('token');
  token: any = JSON.parse(this.local).value;
  baseurl = Env.baseAPi;

  constructor(private http: HttpClient) { }

  get_all_plans(page: any) {
    return this.http.get(this.baseurl + "/v1/ecomplan/my/approved/streams?page=" + page, { headers: { auth: this.token }, });
  }

  get_token_details(id: any) {
    return this.http.get(this.baseurl + "/v1/ecomplan/golive/host/view?id=" + id, { headers: { auth: this.token }, });
  }
  create_token(data: any) {
    return this.http.post(this.baseurl + "/v2/generateRTC/production/livestream/generateToken/supplier", data, { headers: { auth: this.token }, });
    // return this.http.post("http://localhost:3000/v2/generateRTC/getToken" ,data, { headers: { auth: this.token }, });
    // return this.http.post(this.baseurl + "/v2/generateRTC/getToken", data, { headers: { auth: this.token }, });

  }
  get_old_chats(channel: any) {
    return this.http.get(this.baseurl + "/v2/chat/getoldchats?channel=" + channel)

  }

  create_cloude_recording(data: any) {
    return this.http.post(this.baseurl + "/v2/generateRTC/production/livestream/generateToken/supplier/cloudrecording", data, { headers: { auth: this.token }, });
  }
}



