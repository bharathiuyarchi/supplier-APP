import { Validators, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { managerequestservice } from '../managestream.module';

@Component({
  selector: 'app-requestset-two',
  templateUrl: './requestset-two.component.html',
  styleUrls: ['./requestset-two.component.css']
})
export class RequestsetTwoComponent implements OnInit {

  constructor(public api: managerequestservice, public route: ActivatedRoute, public router: Router) { }
  id: any;
  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      this.id = params.id;
      this.get_septwo(this.id);
    })
  }
  myOrders: any;
  get_septwo(id: any) {
    this.api.get_one_request_step(id).subscribe((res: any) => {
      console.log(res)
      this.myOrders = res.myorders;
    })
  }
  step_two: any = new FormGroup({
    plan_name: new FormControl(null, [Validators.required]),

  })
  submited: any = false;
  step_two_complete() {
    if (this.step_two.valid) {
      this.api.update_one_request_step_two(this.id, this.step_two.value).subscribe((res: any) => {
        console.log(res)
        this.router.navigateByUrl("/streamrequest")
      })
    }

  }
}
