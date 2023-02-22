import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { OrdersService } from 'src/app/services/orders.service';
import { SuddenorderService } from 'src/app/services/suddenorder.service';
// import { SuddenorderService } from '../adminpanel/manageshoporder/suddenorder.service';
// import { OrdersService } from '../orders.service';
declare let $: any;
// import * as $ from "jquery";
@Component({
  selector: 'app-procedures',
  templateUrl: './procedures.component.html',
  styleUrls: ['./procedures.component.scss']
})
export class ProceduresComponent implements OnInit {

  product: any
  newItemEvent: any;
  date = new Date();
  prolist_sup = false

  constructor(private router: Router, public http: HttpClient, public api: SuddenorderService, public orderService: OrdersService,) { }

  ngOnInit(): void {
    this.get_products();

  }

  sudden_order: any = new FormGroup({
    productid: new FormControl(null, Validators.required),
    // supplierid: new FormControl(),
    confirmOrder: new FormControl(null, Validators.required),
    confirmcallstatus: new FormControl(null, Validators.required),
    confirmprice: new FormControl(null, Validators.required),

    // exp_date: new FormControl(null, Validators.required),
    orderType: new FormControl(),
    showWhs: new FormControl(),
    status: new FormControl("credit"),
    order_Type: new FormControl('Voluntary'),
    SuddenCreatedBy: new FormControl("By Suplier"),
    SuddenStatus: new FormControl("Pending"),
  })
  // Pop Up

  create_orders() {

    this.sudden_order.patchValue({
      orderType: "sudden",
      confirmcallstatus: "Accepted",
      status: "credit",
      showWhs: true,
    })
    if (this.sudden_order.valid)
      console.log(this.sudden_order.valid, "sassss")
    $("#confirm_order_now").modal("show")

    console.log(this.sudden_order.value)

  }

  // get Product Name For DropDown

  get_products() {
    this.api.getAll_product().subscribe((res: any) => {
      console.log(res, "sdfsd")
      this.product = res;
    })
  }

  confirm_create_orders() {


    if (this.sudden_order.valid)
      console.log(this.sudden_order.value, "ppppp")

    // const a = {
    //   supplierid: localStorage.getItem('data')
    // }
    // this.sudden_order.patchValue({
    //   supplierid:localStorage.getItem('data'),

    // })


    this.orderService.create_callstatus(this.sudden_order.value).subscribe((res: any) => {
      console.log(res)
      this.sudden_order.reset()
      // this.newItemEvent.emit(true);
      this.router.navigate(['/ViewReqForSellin'], { queryParams: { refresh: true } });
      // this.get_products();


    })

    console.log(this.sudden_order.value)
  }
  name: any
  touch(name: any) {
    this.name = name.target.value
    console.log(this.name, "name")

  }

}
