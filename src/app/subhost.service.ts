import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cookie } from 'ng2-cookies';
import { Env } from './environment';

@Injectable({
  providedIn: 'root'
})
export class SubhostService {
  base_url=Env.baseAPi;
  constructor(private http:HttpClient) { }
  createSubhost(data:any){
    let local: any = localStorage.getItem('token');
    let token: any = JSON.parse(local).value;
    return this.http.post(this.base_url+`/v1/subhost`,data,{headers:{auth:token}})
  }
  managesubHost(){
    let local: any = localStorage.getItem('token');
    let token: any = JSON.parse(local).value;
    return this.http.get(this.base_url+`/v1/subhost`,{headers:{auth:token}})
  }
}
