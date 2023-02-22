
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Env } from '../environment';


@Injectable({
  providedIn: 'root'
})
export class managerequestservice {

  local: any = localStorage.getItem('token');
  token: any = JSON.parse(this.local).value;
  baseurl = Env.baseAPi;

  constructor(private http: HttpClient) { }

  get_all_post() {
    return this.http.get(this.baseurl + "/v1/ecomplan/get/all/post", { headers: { auth: this.token }, });
  }


  // stream request APIS
  create_request_one(date: any) {
    return this.http.post(this.baseurl + "/v1/ecomplan/create/stream/one", date, { headers: { auth: this.token }, });
  }
  update_request_one(date: any, id: any) {
    // return this.http.put("http://localhost:3000/v1/ecomplan/create/stream/one?id="+id, date, { headers: { auth: this.token }, });
    return this.http.put(this.baseurl + "/v1/ecomplan/create/stream/one?id=" + id, date, { headers: { auth: this.token }, });
  }

  create_request_two(date: any) {
    return this.http.post(this.baseurl + "/v1/ecomplan/create/stream/two", date, { headers: { auth: this.token }, });
  }
  get_all_request(page: any) {
    return this.http.get(this.baseurl + "/v1/ecomplan/get/all/stream?page=" + page, { headers: { auth: this.token }, });
  }
  get_one_request(id: any) {
    return this.http.get(this.baseurl + "/v1/ecomplan/get/one/stream?id=" + id, { headers: { auth: this.token }, });
  }
  get_one_request_step(id: any) {
    return this.http.get(this.baseurl + "/v1/ecomplan/get/my/stream/step/two?id=" + id, { headers: { auth: this.token }, });
  }
  update_one_request(id: any, data: any) {
    return this.http.put(this.baseurl + "/v1/ecomplan/update/one/stream?id=" + id, data, { headers: { auth: this.token }, });
  }
  update_one_request_step_two(id: any, data: any) {
    return this.http.put(this.baseurl + "/v1/ecomplan/update/step/two/stream?id=" + id, data, { headers: { auth: this.token }, });
  }

  delete_one_request(id: any) {
    return this.http.delete(this.baseurl + "/v1/ecomplan/delete/one/stream?id=" + id, { headers: { auth: this.token }, });
  }
  create_request_one_image(date: any, id: any) {
    return this.http.post(this.baseurl + "/v1/ecomplan/create/stream/one/image?id=" + id, date, { headers: { auth: this.token }, });
  }
  create_request_one_video(date: any, id: any) {
    return this.http.post(this.baseurl + "/v1/ecomplan/create/stream/one/video?id=" + id, date, { headers: { auth: this.token }, });
  }

  cancel_stream(id: any) {
    return this.http.put(this.baseurl + "/v1/ecomplan/cancel/stream", { id: id }, { headers: { auth: this.token }, });
  }


  // get purchase plans 
  get_purchasePlans() {
    return this.http.get(this.baseurl + "/v1/purchaseplan/mypurchase/plans/gellall", { headers: { auth: this.token }, });
  }



}



