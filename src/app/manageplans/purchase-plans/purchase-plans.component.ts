import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ManageplansModule } from '../manageplans.module';

@Component({
  selector: 'app-purchase-plans',
  templateUrl: './purchase-plans.component.html',
  styleUrls: ['./purchase-plans.component.css']
})
export class PurchasePlansComponent implements OnInit {

  constructor(public api: ManageplansModule, public router: ActivatedRoute) { }
  id: any;
  ngOnInit(): void {
    this.router.queryParams.subscribe((params: any) => {
      this.id = params.id;
      
    })
    this.get_all_plans(this.page);

  }

  page: any = 0;
  plans: any;
  get_all_plans(page: any) {
    if (this.id == null) {
      this.api.get_all_plans(page).subscribe((res: any) => {
        console.log(res)
        this.plans = res;
      })
    }
    else{
      this.api.get_all_plans_addon(page).subscribe((res: any) => {
        console.log(res)
        this.plans = res;
      })
    }
  }

}
