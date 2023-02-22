import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { Env } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {

  private socket: Socket;
  private url = Env.baseAPi; // your server local path
  // private url = "http://localhost:3000"; // your server local path

  constructor() {
    this.socket = io(this.url, { transports: ['websocket', 'polling', 'flashsocket'] });
  }
  getMessage_new(): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on('subscriberjoined', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      }
    });
  }
  getMessage_new_chat(channel: any): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on(channel, (data: any) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      }
    });
  }
  send_message(body: any) {
    return this.socket.emit('groupchathost', body);
  }
  getMessage_userCount(channel: any): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on(channel + '_count', (data: any) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      }
    });
  }
  leave_live(channel: any): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on(channel + 'admin_action', (data: any) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      }
    });
  }



  get_user_Register(channel: any): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on(channel + "_userjoined", (data: any) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      }
    });
  }

  toggle_controls(body: any) {
    return this.socket.emit('toggle_controls', body);
  }
  start_stop_post_stream(body: any) {
    return this.socket.emit('post_start_end', body);
  }

  get_post_details(stream: any) {
    return new Observable<any>(observer => {
      this.socket.on(stream + 'postStart', (data: any) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      }
    });
  }

  leave_subhost(data: any) {
    return this.socket.emit('leave_subhost', data);
  }
  mainhost_remove_live(channel: any, uid: any): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on(channel + uid, (data: any) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      }
    });
  }



}
