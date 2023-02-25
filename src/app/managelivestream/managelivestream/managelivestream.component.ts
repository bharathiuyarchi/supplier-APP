import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Managelivestream } from '../managelivestream.module';
import { SocketioService } from '../socketio.service';

@Component({
  selector: 'app-managelivestream',
  templateUrl: './managelivestream.component.html',
  styleUrls: ['./managelivestream.component.css']
})
export class ManagelivestreamComponent implements OnInit, OnDestroy {
  streams: any;
  page = 0;
  displaycount = 0;
  totalcount = 0;
  pagetotal: number = 0;
  iso: any;
  setinterval: any;
  setTimeinterval() {
    this.iso = new Date().getTime()
    this.setinterval = setInterval(() => {
      this.iso = new Date().getTime()
      console.log(this.iso, 11111)
    }, 1000)
  }
  ngOnInit(): void {
    this.get_streams(this.page);
    this.setTimeinterval()
  }
  constructor(public api: Managelivestream, public route: ActivatedRoute, public router: Router, public socket: SocketioService) {

  }
  ngOnDestroy(): void {

    clearInterval(this.setinterval)
  }
  my_stream: any;

  get_streams(page: any) {
    this.api.get_all_plans(page).subscribe((res: any) => {
      console.log(res)
      this.my_stream = res.value;
      this.displaycount = this.page;
      this.totalcount = res.total;
      this.pagetotal = Math.ceil(res.total / 10);
      res.value.forEach((e: any) => {
        this.socket.get_user_Register(e._id).subscribe((msg: any) => {
          console.log(msg)
          let index = this.my_stream.findIndex((e: any) => e._id == msg.streamId);
          if (index != -1) {
            this.my_stream[index].registeredUsers = msg.count;
            console.log(this.my_stream[index])
          }
        });
      });
    })
  }
  pagination(count: any) {
    if (count == 1) {
      this.page++;
    }
    else if (count == 2) {
      this.page = this.pagetotal - 1;
    }
    else if (count == 3) {
      this.page = 0;
    }
    else {
      if (this.page > 0) {
        this.page--;
      }
    }
    this.get_streams(this.page);

  }
  viewstream: any;
  view_stream(item: any) {
    this.viewstream = item;
  }

  go_live(item: any) {
    let data = {
      isPublisher: true,
      type: "host",
      streamId: item._id
    }
    this.api.create_token(data).subscribe((res: any) => {
      console.log(res)
      this.router.navigateByUrl('livestream/golive?id=' + item._id);
    })
  }


}

