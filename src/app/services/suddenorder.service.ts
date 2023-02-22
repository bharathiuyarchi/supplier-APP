import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Env } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class SuddenorderService {
  baseurl = Env.baseAPi;
  constructor(public http: HttpClient) { }


  get_suppleirs(pid: any) {
    return this.http.get(this.baseurl + "/v1/supplier/productData/" + pid);
  }

  // approveUpdateById

  approveUpdateById(id:any,detatils:any){
    return this.http.put(this.baseurl + "/v1/callStatus/" +id,detatils)
  }

  getAll_product() {
    return this.http.get(this.baseurl + "/v1/product");

  }
  insert_suddenOrder(data: any) {
    return this.http.get(this.baseurl + "/v1/product");

  }
  getAll_sudden_orders(page: any) {
    return this.http.get( "https://wayr.link/v1/callstatus/callstatusData/SuddenOrders/" + page);

  }
  get_esitimated_order(id: any) {
    return this.http.get(this.baseurl + "/v1/estimatedOrders/getEstimated/orders/" + id);

  }
  get_sudden_order(id: any) {
    return this.http.get(this.baseurl + "/v1/callStatus/suddenOrdersDisplay/" + id);

  }
  getSuppliers_dt(id:any,page:any){
    return this.http.get(this.baseurl+`/v1/receivedProduct/getSupplierBillsDetails1/${id}/${page}`)
  }
  reportFor(id:any){
    return this.http.get(this.baseurl+`/v1/receivedProduct/getAllWithPagination_billed_supplier1/supplier/data/${id}`)
  }
  reportDt(id:any){
    return this.http.get(this.baseurl+`/v1/receivedProduct/previousOrderdata/${id}`)
  }
}
