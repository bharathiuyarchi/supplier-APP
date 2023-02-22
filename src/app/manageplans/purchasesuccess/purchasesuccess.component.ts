import { Component, OnInit, DoCheck } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WindowRefServiceModule } from 'src/app/window-ref-service/window-ref-service.module';
import { ManageplansModule } from '../manageplans.module';

@Component({
  selector: 'app-purchasesuccess',
  templateUrl: './purchasesuccess.component.html',
  styleUrls: ['./purchasesuccess.component.css']
})
export class PurchasesuccessComponent implements OnInit, DoCheck {

  constructor(public route: ActivatedRoute, public api: ManageplansModule, public winRef: WindowRefServiceModule, public router: Router) { }
  id: any;
  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      this.id = params.id;
      this.get_orderDetails(this.id);
    })
  }
  orderDetails: any;
  get_orderDetails(id: any) {
    this.api.get_order_details(id).subscribe((res: any) => {
      console.log(res)
      this.orderDetails = res;
    })
  }
  ngDoCheck(): void {
      console.log("asasa")
  }

  
}
