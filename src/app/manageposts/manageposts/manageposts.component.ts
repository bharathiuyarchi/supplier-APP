import { Env } from './../../environment';
import { Component, OnInit } from '@angular/core';
import { managepostsservice } from '../manageplans.module';
import { FormControl, FormGroup } from '@angular/forms';
import { formatDate } from '@angular/common';
declare let $: any
@Component({
  selector: 'app-manageposts',
  templateUrl: './manageposts.component.html',
  styleUrls: ['./manageposts.component.css']
})
export class ManagepostsComponent implements OnInit {
  page = 0;
  displaycount = 0;
  totalcount: any = 0;
  pagetotal: any = 0;
  constructor(public api: managepostsservice) { }
  baseURL = Env.baseAPi;

  ngOnInit(): void {
    this.filterForm.get('page').setValue(this.page)
    this.get_all_posts(this.filterForm.value);
  }
  my_posts: any;
  get_all_posts(page: any) {
    this.api.get_all_post(page).subscribe((res: any) => {
      console.log(res)
      this.my_posts = res.value;
      this.displaycount = this.page;
      this.totalcount = res.total;
      this.pagetotal = Math.ceil(res.total / 10);
    })
  }

  delete_post(id: any) {
    this.api.delete_one_post(id).subscribe((res: any) => {
      this.get_all_posts(this.filterForm.value);
    });
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
    this.get_all_posts(this.filterForm.value);
  }

  filterForm: any = new FormGroup({
    date: new FormControl(null),
    status: new FormControl('active'),
    page: new FormControl(0),
  })
  filterDate = new FormControl(null)
  apply_filter() {
    console.log(this.filterDate.value, 12312312)
    if (this.filterDate?.value != null) {
      let endDate = formatDate(new Date(this.filterDate?.value['end']['$d']), 'yyy-MM-dd', 'en-IN');
      let startDate = formatDate(new Date(this.filterDate?.value['start']['$d']), 'yyyy-MM-dd', 'en-IN');
      console.log(endDate)
      console.log(startDate)
      this.filterForm.get("date")?.setValue(startDate + "," + endDate)
    }
    else {
      this.filterForm.get("date")?.setValue(null)
    }
    this.get_all_posts(this.filterForm.value);
    console.log(this.filterForm.value)
  }

  view_details: any;
  view_details_type: any;
  view_image(type: any, item: any) {
    console.log(type, item)
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
