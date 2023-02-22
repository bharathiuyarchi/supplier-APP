import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WindowRefServiceModule } from 'src/app/window-ref-service/window-ref-service.module';
import { ManageplansModule } from '../manageplans.module';

declare let $: any;
@Component({
  selector: 'app-myplans',
  templateUrl: './myplans.component.html',
  styleUrls: ['./myplans.component.css']
})
export class MyplansComponent implements OnInit {

  constructor(public route: ActivatedRoute, public api: ManageplansModule, public winRef: WindowRefServiceModule, public router: Router) { }
  page = 0;
  displaycount = 0;
  totalcount: any = 0;
  pagetotal: any = 0;
  date_now: any;

  ngOnInit(): void {
    this.date_now = new Date().getTime()
    console.log(this.date_now);
    this.get_myplans(this.page);
  }
  my_plans: any;
  view_details: any;
  get_myplans(page: any) {
    this.api.get_all_my_orders(page).subscribe((res: any) => {
      console.log(res)
      this.my_plans = res.plan;

      this.displaycount = this.page;
      this.totalcount = res.total;
      this.pagetotal = Math.ceil(res.total / 10);
    })
  }
  view_image(item: any) {
    this.view_details = item;
    $("#view_details").modal('show');
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
    this.get_myplans(this.page);
  }
}
