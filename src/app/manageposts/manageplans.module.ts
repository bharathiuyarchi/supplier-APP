
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Env } from '../environment';


@Injectable({
  providedIn: 'root'
})
export class managepostsservice {

  local: any = localStorage.getItem('token');
  token: any = JSON.parse(this.local).value;
  baseurl = Env.baseAPi;

  constructor(private http: HttpClient) { }
  get_all_plans(params: any) {
    const queryString = new URLSearchParams(params).toString();
    return this.http.get(this.baseurl + "/v1/ecomplan/get/all/plan?id=" + queryString);
  }

  get_categorys() {
    return this.http.get(this.baseurl + "/v1/category");

  }
  get_product_by_cat(id: any) {
    return this.http.get(this.baseurl + "/v1/product/get/product/by/category/" + id);

  }
  // post apis 

  create_post(date: any) {
    return this.http.post(this.baseurl + "/v1/ecomplan/create/post", date, { headers: { auth: this.token }, });
  }
  create_post_teaser(date: any, id: any) {
    return this.http.post(this.baseurl + "/v1/ecomplan/create/post/teaser?id=" + id, date, { headers: { auth: this.token }, });
  }
  get_all_post(params: any) {
    const queryString = new URLSearchParams(params).toString();

    return this.http.get(this.baseurl + "/v1/ecomplan/get/all/post/pagenation?" + queryString, { headers: { auth: this.token }, });
  }
  get_one_post(id: any) {
    return this.http.get(this.baseurl + "/v1/ecomplan/get/one/post?id=" + id, { headers: { auth: this.token }, });
  }
  update_one_post(id: any, data: any) {
    // return this.http.put("http://localhost:3000/v1/ecomplan/update/one/post?id=" + id, data, { headers: { auth: this.token }, });
    return this.http.put(this.baseurl + "/v1/ecomplan/update/one/post?id=" + id, data, { headers: { auth: this.token }, });
  }
  delete_one_post(id: any) {
    return this.http.delete(this.baseurl + "/v1/ecomplan/delete/one/post?id=" + id, { headers: { auth: this.token }, });
  }

  removed_one_post(id: any) {
    return this.http.put(this.baseurl + "/v1/ecomplan/remove/one/post?id=" + id,{}, { headers: { auth: this.token }, });
  }
  create_post_image(date: any) {
    return this.http.post(this.baseurl + "/v1/ecomplan/create/post", date, { headers: { auth: this.token }, });
  }

}



