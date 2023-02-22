import { Env } from './../../environment';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { managerequestservice } from '../managestream.module';
declare let $: any;
@Component({
  selector: 'app-managerequest',
  templateUrl: './managerequest.component.html',
  styleUrls: ['./managerequest.component.css']
})
export class ManagerequestComponent implements OnInit {

  constructor(public api: managerequestservice, public router: Router) { }
  page = 0;
  displaycount = 0;
  totalcount: any = 0;
  pagetotal: any = 0;
  iso: any;
  ngOnInit(): void {
    this.iso = new Date().getTime()
    this.get_my_request(this.page);
    this.get_posts();
  }
  myrequest: any;
  baseURL: any = Env.baseAPi
  get_my_request(page: any) {
    this.api.get_all_request(page).subscribe((res: any) => {
      console.log(res)
      this.myrequest = res.value;
      this.displaycount = this.page;
      this.totalcount = res.total;
      this.pagetotal = Math.ceil(res.total / 10);
    })

  }
  post_list: any;
  get_posts() {
    this.api.get_all_post().subscribe((res: any) => {
      console.log(res)
      this.post_list = res;
    })
  }
  cancel_stream(item: any) {
    this.api.cancel_stream(item._id).subscribe((res: any) => {
      console.log(res)
      this.get_my_request(this.page);

    })
  }
  go_to_new_stream() {
    if (this.post_list.length == 0) {
      $("#no_post_found").modal("show");
    }
    else {
      this.router.navigateByUrl('/streamrequest/step-one')
    }
  }

  pagination(count: any) {
    if (count == 1) {
      this.page++;
    } else if (count == 2) {
      // console.log(this.pagetotal)
      this.page = this.pagetotal - 1;
    } else if (count == 3) {
      this.page = 0;
      console.log(this.page);
    } else {
      if (this.page > 0) {
        this.page--;
      }
    }
    this.get_my_request(this.page);
  }
  view_details: any;
  view_details_type: any;
  view_request(type: any, item: any) {
    console.log(item)
    this.view_details = item;
    this.view_details_type = type;
    $('#view_details').modal('show');
  }
  close_popup() {
    this.view_details_type = null;
  }
  change_view(type: any) {
    this.view_details_type = type;
  }
}


