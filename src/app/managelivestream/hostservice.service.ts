import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Env } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class HostserviceService {

  constructor(public http: HttpClient) { }
  baseURL = Env.baseAPi
  get_host_users() {
    return this.http.get(this.baseURL + 'v2/generateRTC/getHostTokens');
  }

  generate_token(uid: any) {
    return this.http.post(this.baseURL + "v2/generateRTC/getToken", { uid: uid, type: "host", isPublisher: true })
  }
  generate_token_sub(uid: any, res: any, channel: any) {
    return this.http.post(this.baseURL + "v2/generateRTC/getToken", { channel: channel, uid: uid, hostId: res._id, type: "sub", isPublisher: false })
  }

  generateUid() {
    const length = 5;
    const randomNo = (Math.floor(Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1)));
    return randomNo;
  }


  get_token_details(id: any) {
    return this.http.get(this.baseURL + "/v2/generateRTC/gettoken/byId?id=" + id)
  }
  get_token_details_sub(id: any) {
    return this.http.get(this.baseURL + "/v2/generateRTC/getsub/token/user?id=" + id)
  }
  get_token_details_host(id: any) {
    return this.http.get(this.baseURL + "/v2/generateRTC/gettoken/host/byId?id=" + id)
  }

  participents_limit(id: any) {
    return this.http.get(this.baseURL + "/v2/generateRTC/getparticipents/limit?id=" + id)
  }
  participents_leave(id: any) {
    return this.http.put(this.baseURL + "/v2/generateRTC/leave/participents/limit?id=" + id, { active: false })
  }

  leave_host(id: any) {
    return this.http.get(this.baseURL + "/v2/generateRTC/leave/host?id=" + id)
  }

  end_stream(id: any) {
    return this.http.put(this.baseURL + "/v1/ecomplan/steam/end/now?id=" + id, {})

  }
  join_host(id: any) {
    return this.http.get(this.baseURL + "/v2/generateRTC/join/host/admin?id=" + id)
  }


  acquire_recording(id: any) {
    return this.http.post(this.baseURL + "/v2/generateRTC/recording/acquire", { id: id })
  }
  start_recording(json: any) {
    return this.http.post(this.baseURL + "/v2/generateRTC/recording/start", json)
  }
  query_recording(id: any) {
    return this.http.post(this.baseURL + "/v2/generateRTC/recording/query", id)
  }
  stop_recording(res: any) {
    return this.http.post(this.baseURL + "/v2/generateRTC/recording/stop", res)
  }


  // user limit 

  get_user_participents(id: any) {
    return this.http.get(this.baseURL + "/v2/generateRTC/participents/limit/all?id=" + id)
  }
}
