import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MamaneAllot } from '../allot.service';

@Component({
  selector: 'app-alertstream',
  templateUrl: './alertstream.component.html',
  styleUrls: ['./alertstream.component.css']
})
export class AlertstreamComponent implements OnInit {

  constructor(public api: MamaneAllot, public route: ActivatedRoute, public router: Router) { }
  id: any;
  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      this.id = params.id;
      this.get_alert_stream(params.id);
      this.get_sub_host();
    })
  }
  postForm: any = new FormGroup({

  })
  submited: any = false;
  alert_stream() {
    this.api.alert_stream(this.postForm.value, this.id).subscribe((res: any) => {
      console.log(res)
      this.router.navigateByUrl('/manage-subuser/manageallot')

    })
  }
  // new FormGroup({
  //     allot_chat: new FormControl(null, Validators.required),
  //     allot_host_1: new FormControl(null, Validators.required),,
  //     allot_host_2: new FormControl(null, Validators.required),,
  //     allot_host_3: new FormControl(null, Validators.required),
  //   });
  stream_list: any;
  get_alert_stream(id: any) {
    this.api.get_stream_one(id).subscribe((res: any) => {
      this.stream_list = res;
      if (res.chat_need == 'yes') {
        this.postForm.addControl('allot_chat', new FormControl(res.allot_chat, Validators.required))
      }
      if (res.purchasedplans.no_of_host == 1 || res.purchasedplans.no_of_host == 2 || res.purchasedplans.no_of_host == 3) {
        this.postForm.addControl('allot_host_1', new FormControl(this.stream_list.allot_host_1, Validators.required))
      }
      if (this.stream_list.purchasedplans.no_of_host == 2 || this.stream_list.purchasedplans.no_of_host == 3) {
        this.postForm.addControl('allot_host_2', new FormControl(this.stream_list.allot_host_2, Validators.required))
      }
      if (this.stream_list.purchasedplans.no_of_host == 3) {
        this.postForm.addControl('allot_host_3', new FormControl(this.stream_list.allot_host_3, Validators.required))
      }
      console.log(this.postForm.value)
    })

  }
  subhost: any;
  get_sub_host() {
    this.api.get_sub_host(this.id).subscribe((res: any) => {
      console.log(res)
      this.subhost = res;
    })
  }

}
