import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies';

import { VerfyotpService } from '../services/verfyotp.service';
declare let $: any;
@Component({
  selector: 'app-newpass-confir-pass',
  templateUrl: './newpass-confir-pass.component.html',
  styleUrls: ['./newpass-confir-pass.component.scss']
})
export class NewpassConfirPassComponent implements OnInit {

  constructor(public route: Router, public verfiySertvice: VerfyotpService) {

  }
  submitted = false;
  error_message: any;
  ngOnInit(): void {
  }
  setpassword = new FormGroup({
    password: new FormControl('', Validators.required),
    confirmpassword: new FormControl('', Validators.required),
    // shopId: new FormControl('', Validators.required),
  })


  setpassword_now() {

    console.log(this.setpassword.value)
    this.submitted = true;
    // this.setpassword.patchValue({
    //   shopId: Cookie.get('shopId')
    // })
    if (this.setpassword.valid && this.setpassword.get('password')?.value == this.setpassword.get('confirmpassword')?.value) {
      // this.submitted = false;
      this.verfiySertvice.set_password(localStorage.getItem('data'), this.setpassword.value).subscribe((res: any) => {
        Cookie.deleteAll()
        this.setpassword.reset()
        this.route.navigate(['/login'])

      }, error => {
        this.error_message = error.error.message;
      })


    }

  }
  keyPress(event: KeyboardEvent, val: any) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
    else {
      if (val.target.value.length > 9) {
        event.preventDefault();
      }

    }

  }
  show_password(event: any, icon: any) {
    console.log(event)
    if ($(event).attr('type') == 'text') {
      $(event).attr('type', 'password');
      $(icon.target).addClass('show_now');

    }
    else {
      $(event).attr('type', 'text');
      $(icon.target).removeClass('show_now');
    }

  }


}
