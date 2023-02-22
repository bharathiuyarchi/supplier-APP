
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Env } from '../environment';


@Injectable({
  providedIn: 'root'
})
export class ManageplansModule {

  local: any = localStorage.getItem('token');
  token: any = JSON.parse(this.local).value;
  baseurl = Env.baseAPi;

  constructor(private http: HttpClient) { }
  get_all_plans(page: any) {
    return this.http.get(this.baseurl + "/v1/ecomplan/get/all/plan/normal?page=" + page);
  }
  get_all_plans_addon(params: any) {
    const queryString = new URLSearchParams(params).toString();
    return this.http.get(this.baseurl + "/v1/ecomplan/get/all/plan/addon?id=" + queryString);
  }
  get_one_plans(id: any) {
    return this.http.get(this.baseurl + "/v1/ecomplan/get/one/plan?id=" + id);
  }

  razorpay_paynow(amount: any) {
    return this.http.post(this.baseurl + "/v1/paymentgatway/create/razorpay/orderid", { amount: amount });
  }

  confirm_order_payment(data: any) {
    return this.http.post(this.baseurl + "/v1/purchaseplan/purchase/suceess", data, { headers: { auth: this.token }, })
  }
  confirm_order_payment_private(data: any) {
    return this.http.post(this.baseurl + "/v1/purchaseplan/purchase/suceess/private", data)
  }


  confirm_order_payment_addon(data: any) {
    // return this.http.post("http://localhost:3000/v1/purchaseplan/purchase/addon/suceess",data,{ headers: { auth: this.token },})
    return this.http.post(this.baseurl + "/v1/purchaseplan/purchase/addon/suceess", data, { headers: { auth: this.token }, })
  }

  get_order_details(id: any) {
    return this.http.get(this.baseurl + "/v1/purchaseplan/getpayment/details/one?id=" + id, { headers: { auth: this.token }, })
  }
  get_all_my_orders(page: any) {
    return this.http.get(this.baseurl + "/v1/purchaseplan/getpayment/details/all/normal?page=" + page, { headers: { auth: this.token }, })
  }

  success_payment: any = false;
  change_status() {
    this.success_payment = true;
  }


  verify_link(link: any) {
    return this.http.get(this.baseurl + "/v1/ecomplan/purchase/link/plan?link=" + link)

  }
}



