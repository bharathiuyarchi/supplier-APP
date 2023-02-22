import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ManageplansModule } from '../manageplans/manageplans.module';
import { WindowRefServiceModule } from '../window-ref-service/window-ref-service.module';

@Component({
  selector: 'app-privateplan',
  templateUrl: './privateplan.component.html',
  styleUrls: ['./privateplan.component.css']
})
export class PrivateplanComponent implements OnInit {


  constructor(public route: ActivatedRoute, public api: ManageplansModule, public winRef: WindowRefServiceModule, public router: Router) { }
  link_url: any
  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      this.get_link_details(params.link)
      this.link_url = params.link;
    })
  }
  link: any;
  error: any;
  get_link_details(link: any) {

    this.api.verify_link(link).subscribe((res: any) => {
      this.plan_details = res.plan_details
      this.link = res;
    }, (error: any) => {
      console.log(error.error.message)
      this.error = error.error.message;
    })
  }
  plan_details: any;
  pay_now() {
    this.get_link_details(this.link_url);
    this.api.verify_link(this.link_url).subscribe((res: any) => {
      this.api.razorpay_paynow(this.plan_details.salesPrice).subscribe((res: any) => {
        this.payWithRazor(res.orderId, 100, '')
      })
    }, (error: any) => {
      console.log(error.error.message)
      this.error = error.error.message;
    })

  }
  payWithRazor(orderID: any, amount: any, order: any) {
    console.log(amount)
    const options: any = {
      key: 'rzp_test_D0FyQwd0lixiEd',
      amount: this.plan_details.salesPrice * 100,
      currency: 'INR',
      name: '',
      description: '',
      image: '/assets/image/favicon.jpg',
      order_id: orderID,
      modal: {
        escape: false,
      },
      notes: {
      },
      theme: {
        color: '#0c238a'
      }
    };
    options.handler = ((response: any, error: any) => {
      options.response = response;
      this.success_payemnt(response)
    });
    options.modal.ondismiss = ((res: any) => {
      console.log('Transaction cancelled.');
    });
    const rzp = new this.winRef.nativeWindow.Razorpay(options);
    rzp.on('payment.failed', (response: any) => {
      // console.log(response)
    })
    rzp.open();
  }


  success_payemnt(res: any) {
    this.api.confirm_order_payment_private({ PaymentDatails: res, link: this.link._id }).subscribe((res: any) => {
      console.log(res)
      window.location.href = "/login";
    })
  }
}
