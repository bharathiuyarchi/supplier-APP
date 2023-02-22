import { Component, OnInit } from '@angular/core';
import { MamaneAllot } from '../allot.service';

@Component({
  selector: 'app-managealertstream',
  templateUrl: './managealertstream.component.html',
  styleUrls: ['./managealertstream.component.css']
})
export class ManagealertstreamComponent implements OnInit {

  constructor(public api: MamaneAllot) { }

  ngOnInit(): void {
    this.get_alert_stream();
  }
  postForm: any;
  submited: any = false;
  alert_stream() {

  }

  stream_list: any;
  get_alert_stream() {
    this.api.get_stream().subscribe((res: any) => {
      console.log(res);
      this.stream_list = res;
    })
  }
}
