import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cookie } from 'ng2-cookies';
// import { environment } from 'src/environments/environment';
import { Env } from '../environment';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  baseurl = Env.baseAPi;

  constructor(private httpClient: HttpClient) {}

  profileForm(data: any) {
    return this.httpClient.post(this.baseurl + '/users/', data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }

  getbilldataaa(page: any) {
    const params = { page };
    let local: any = localStorage.getItem('token');
    let token: any = JSON.parse(local).value;
    const queryString = new URLSearchParams(params).toString();
    return this.httpClient.get(this.baseurl + '/v1/receivedProduct/Billed/data?' + queryString, {
      headers: { auth: token },
    });
  }

  getbillHistory(id:any){
    return this.httpClient.get(this.baseurl + '/v1/receivedProduct/get/billed/history/'+id)
  }

  getdataVoluntaryNeedApproved(){
    let local: any = localStorage.getItem('token');
    let token: any = JSON.parse(local).value;
    return this.httpClient.get(this.baseurl + '/v1/supplier/getAllAppSupplierApproved',{
      headers: { auth: token },
    })
  }

  UnbilledData(page:any){

    // const params = { page };
    let local: any = localStorage.getItem('token');
    let token: any = JSON.parse(local).value;
    // const queryString = new URLSearchParams(params).toString();
    return this.httpClient.get(this.baseurl + '/v1/supplierunBilled/getRaisedUnBilled/PaidUnbilled/Details/'+page , {
      headers: { auth: token },
    });
  }

  amountHistoryUnbilled(id:any){
    return this.httpClient.get(this.baseurl+ "/v1/supplierunBilled/getPaidUnBilledHistory/" +id)
  }

  historyRequest(id:any){
    return this.httpClient.get(this.baseurl + '/v1/supplierunBilled/getUnBilled/Raisedhistory/BySupplier/'+id)
  }
  getreqData(){
    let local: any = localStorage.getItem('token');
    let token: any = JSON.parse(local).value;
    return this.httpClient.get(this.baseurl + '/v1/supplier/getAppSupplier',{
      headers: { auth: token },
    })
}

raisedOrderReq(){
  let local: any = localStorage.getItem('token');
    let token: any = JSON.parse(local).value;
    return this.httpClient.get(this.baseurl + '/v1/supplier/getAppSupplier',{
      headers: { auth: token },
    })
}

// update

updateAdvancedata(data:any){
  let local: any = localStorage.getItem('token');
  let token: any = JSON.parse(local).value;
  return this.httpClient.put(this.baseurl + '/v1/supplier/getAllAppOnly_Supplier_Update',data,{
    headers: { auth: token },
  })
}

getbasicData(){
  let local: any = localStorage.getItem('token');
    let token: any = JSON.parse(local).value;
  return this.httpClient.get(this.baseurl+ "/v1/supplier/getAllAppOnly_Supplier",{
    headers: { auth: token },
  })
}

getApproveOrPendingStatus(){
  let local: any = localStorage.getItem('token');
  let token: any = JSON.parse(local).value;
return this.httpClient.get(this.baseurl+ "/v1/supplier/checkApproved",{
  headers: { auth: token },
})
}
}
