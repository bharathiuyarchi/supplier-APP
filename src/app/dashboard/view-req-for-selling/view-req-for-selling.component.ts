import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { OrdersService } from 'src/app/services/orders.service';
import { SuddenorderService } from 'src/app/services/suddenorder.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-view-req-for-selling',
  templateUrl: './view-req-for-selling.component.html',
  styleUrls: ['./view-req-for-selling.component.scss']
})
export class ViewReqForSellingComponent implements OnInit {

  constructor(public route: ActivatedRoute,private router: Router,private ProfileService:ProfileService,) { }
  addItem(a:any){

  }
  getRefresh: any;

  ngOnInit(): void {

    this.ProfileService.getApproveOrPendingStatus().subscribe((res:any)=>{
      this.data = res
      console.log(this.data,"this.data")
    })

    this.route.queryParams.subscribe((params: Params) => {
      this.getRefresh=params;
      console.log(params,"aaaaaaaaaaaa");
      console.log(this.getRefresh,"aaaaaaaaaaaa");
      this.getrequestForSelling();
    })


    // this.getrequestForSelling();
  }
  orders:any;
  data:any

  getrequestForSelling(){
    this.ProfileService.getreqData().subscribe((res:any)=>{
      this.orders = res
    },error =>{
      error.error
      console.log(error.error,"error.error.message")
      if("User Not Available" == error.error){
        localStorage.removeItem('token');
        localStorage.removeItem('data');
        this.router.navigate(['/login'])
      }

    })
  }

}

@Component({
  selector: 'app-procedures',
  templateUrl: './procedures.component.html',
  styleUrls: ['./view-req-for-selling.component.scss']
})
export class ProceduresComponent implements OnInit {

  product:any
 
  date = new Date();

  constructor(private router: Router,public route: ActivatedRoute,public http: HttpClient, public api: SuddenorderService,public orderService: OrdersService,) { }

  ngOnInit(): void {
    this.get_products();
  }
  @Output() newItemEvent = new EventEmitter<any>();

  sudden_order :any= new FormGroup({
    productid: new FormControl(null, Validators.required),
    supplierid: new FormControl(),
    confirmOrder: new FormControl(null, Validators.required),
    confirmcallstatus: new FormControl(null, Validators.required),
    confirmprice: new FormControl(null, Validators.required),
    status: new FormControl("credit", Validators.required),
    exp_date: new FormControl(null, Validators.required),
    orderType: new FormControl(),
    showWhs: new FormControl(),
    order_Type: new FormControl('Voluntary'),
    SuddenCreatedBy: new FormControl("By Suplier"),
    SuddenStatus: new FormControl("Pending"),
  })
  // Pop Up

  create_orders(){

    this.sudden_order.patchValue({
      orderType: "sudden",
      confirmcallstatus: "Accepted",
      showWhs: true,
    })
    if (this.sudden_order.valid) 
      console.log(this.sudden_order.valid,"sassss")
      // $("#confirm_order_now").modal("show")
    
    console.log(this.sudden_order.value)

  }

  // // get Product Name For DropDown

  get_products() {
    this.api.getAll_product().subscribe((res: any) => {
      console.log(res, "sdfsd")
      this.product = res;
    })
  }

  
  confirm_create_orders() {


    // if (this.sudden_order.valid) 
    console.log(this.sudden_order.value,"ppppp")

    // const a = {
    //   supplierid: localStorage.getItem('data')
    // }
    this.sudden_order.patchValue({
      supplierid:localStorage.getItem('data'),
     
    })
   
      
      this.orderService.create_callstatus(this.sudden_order.value).subscribe((res: any) => {
        console.log(res)
        // this.sudden_order.reset()
        // this.newItemEvent.emit(true);
        this.router.navigate(['/ViewReqForSellin'],{queryParams: { refresh:true }});
        // this.get_products();

       
      })
    
    console.log(this.sudden_order.value)
  }
}

