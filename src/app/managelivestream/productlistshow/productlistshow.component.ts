import { Component, Input, OnInit } from '@angular/core';
import { Env } from 'src/app/environment';
import { SocketioService } from '../socketio.service';

@Component({
  selector: 'app-productlistshow',
  templateUrl: './productlistshow.component.html',
  styleUrls: ['./productlistshow.component.css']
})
export class ProductlistshowComponent implements OnInit {

  @Input("id") id: any;
  @Input("streamDetails") streamDetails: any;
  baseURL = Env.baseAPi
  constructor(public Socket: SocketioService) { }
  primaryHost: any = false;

  ngOnInit(): void {
    console.log(this.id)
    console.log(this.streamDetails, 12312312)
    if (this.streamDetails != null) {
      this.get_post_details();
      this.streamPending = this.streamDetails.streamPending == false ? false : true;
      this.primaryHost = this.streamDetails.primaryHost;
    }
  }

  get_post_details() {
    this.Socket.get_post_details(this.streamDetails._id).subscribe((res: any) => {
      console.log(res)
      this.streamDetails = res.value[0]
      this.streamDetails

    })
  }

  streamPending: any = false;
  start_post(item: any) {
    this.streamPending = true;;
    console.log(this.Socket.start_stop_post_stream({ ...item, ...{ streamId: this.streamDetails._id, start: true } }))
  }
  end_post(item: any) {
    this.streamPending = false;
    console.log(this.Socket.start_stop_post_stream({ ...item, ...{ streamId: this.streamDetails._id, end: true } }))
  }


}
