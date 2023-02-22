import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Env } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  baseurl = Env.baseAPi;

  constructor(public http: HttpClient) { }

  totalMWAorder(date: any, page: any) {
    // return this.http.get(this.baseurl + "/v1/product/product/filter/" + date);
    return this.http.get(this.baseurl + "/v1/estimatedOrders/PH/" + date + "/" + page);
  }

  getSuppliers(id: any) {
    return this.http.get(this.baseurl + `/v1/supplier/products/dealing/${id}`)

  }
  getAllData(user: any, date: any, page: any) {
    return this.http.get(this.baseurl +`/v1/pickup/getAll/${user}/${date}/${page}`);
  }
  displayUser(data: any) {
    return this.http.get(this.baseurl + "/v1/supplier/" + data)
  }
  getLocation(id: any) {
    return this.http.get(this.baseurl +`/v1/pickup/${id}`)
  }
  create_callstatus(res: any) {
    let local:any = localStorage.getItem('token')
    let token: any = JSON.parse(local).value;
    return this.http.post( "https://wayr.link/v1/callStatus/suppierApp", res,{
      headers: { auth: token}
    })
  }
  update_callstatus(id: any, data: any) {
    return this.http.put(this.baseurl + "/v1/callStatus/" + id, data)
  }
  create_status(data: any) {
    return this.http.post(this.baseurl + "/v1/status", data)
  }
  update_status(id: any, data: any) {
    return this.http.put(this.baseurl + "/v1/status/" + id, data)

  }
  finish_order(id: any, date: any) {
    return this.http.get(this.baseurl + "/v1/callstatus/order/finished/" + id + "/" + date + "/")

  }
  supRecived(date: any, page: any) {
    return this.http.get(this.baseurl + `/v1/callStatus/getSuppplier/getproduct/details/${date}/` + page)
  }
  getProdSup(id: any, date: any) {
    return this.http.get<any>(this.baseurl + `/v1/supplier/product/supplier/${id}/${date}`)
  }
  getEmPName() {
    return this.http.get(this.baseurl +"/v1/BusinessUsers/all/user");
  }
  salary_DT(data: any) {
    return this.http.post(this.baseurl +"/v1/PUserSalaryInfo", data);
  }
  getSalaryMaster() {
    return this.http.get(this.baseurl +"/v1/PUserSalaryInfo")
  }
  changeUserStatus(id: any, data: any) {
    return this.http.put(this.baseurl +"/v1/PUserSalaryInfo/status/" + id, data)
  }
  internalForm(data: any, date: any) {
    console.log(data, 'data')
    return this.http.post(this.baseurl +"/v1/manageExpenses", data)
  }
  getInternalform(date: any, page: any) {
    return this.http.get(this.baseurl+`/v1/manageExpenses/${date}/` + page);
  }
  getFilterAttendence(id: any, date: any, startTime: any, endTime: any, page: any) {
    console.log()
    const x = this.http.get(this.baseurl +`/v1/b2bShopClone/attendanceClone/Admin/${id}/${date}/${startTime}/${endTime}/` + page);
    return x;
  }
  getAttendence(id: any, date: any, startTime: any, endTime: any, page: any) {
    return this.http.get(this.baseurl +`/v1/b2bShopClone/attendanceClone/Admin/${id}/${date}/${startTime}/${endTime}/` + page);

  }
  getMap(id: any, date: any, startTime: any, endDate: any) {
    return this.http.get(this.baseurl +`/v1/b2bShopClone/attendanceClone/Admin/map/View/${id}/${date}/${startTime}/${endDate}`);
  }
  getUser() {
    return this.http.get(this.baseurl +"/v1/b2bUsers/getusers/salesExecute");
  }
  getEmp() {
    return this.http.get(this.baseurl +"/v1/b2bUserSalary/getActiveUsers");
  }
  getRole(id: any) {
    return this.http.get(this.baseurl +"/v1/b2bUsers/" + id)

  }
  createSal(data: any) {
    return this.http.post(this.baseurl +"/v1/b2bUserSalary", data);
  }
  sendLogCost(data: any) {
    return this.http.post<any>(this.baseurl + "/v1/B2bBillStatus", data)

  }

  manageMaster(page: any) {
    return this.http.get(this.baseurl +"/v1/b2bUserSalary/getAll/" + page);
  }
  disableBtn(id: any, data: any) {
    return this.http.put(this.baseurl +"/v1/b2bUserSalary/" + id, data);
  }
  insAtten(data: any) {
    return this.http.post(this.baseurl +"/v1/attendance", data)
  }
  getAttMaster(page: any) {
    return this.http.get(this.baseurl +"/v1/attendance/getAll/" + page);
  }
  getdummyData() {
    return this.http.get(this.baseurl +"/v1/street/getDummy/streets")
  }
  getDis() {
    return this.http.get(this.baseurl +"/v1/district");
  }
  getZone(id: any) {
    return this.http.get(this.baseurl +`/v1/zone/zoneByDistrict/${id}`);
  }
  getward(id: any) {
    console.log(id)
    return this.http.get(this.baseurl +`/v1/ward/wardByZone/${id}`);
  }
  createWallet(data: any) {
    return this.http.post(this.baseurl +"/v1/wallet", data)
  }
}
