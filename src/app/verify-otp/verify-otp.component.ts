import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies';
import { VerfyotpService } from '../services/verfyotp.service';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.scss']
})
export class VerifyOTPComponent implements OnInit {

  constructor(public route: Router,public verfiySertvice: VerfyotpService ) { }
  ngOnInit(): void {
    
  }
  submitted = false;
  verify = new FormGroup({
    OTP: new FormControl(null, Validators.required),
    mobile: new FormControl()
  })
  error_message: any;
  iddata:any
  datalocal:any
  lengthcheck: any = 0;
  verify_now() {
    this.submitted = true;
    this.lengthcheck = this.verify.get('OTP')?.valid ? this.verify.get('OTP')?.value : 0;
    console.log(this.lengthcheck.length)
    if (this.verify.valid && this.lengthcheck.length == 6) {
      let mobile: any = Cookie.get("mobile")
      this.verify.patchValue({
        mobile: mobile
      })
      console.log(this.verify.value)
      this.submitted = false;
      console.log(this.verify.value)
      this.verfiySertvice.verify_otp(this.verify.value).subscribe((res: any) => {
        console.log(res)
        // this.setCookie(res)
        this.iddata= res.id
        this.datalocal = res.id
        localStorage.setItem('data', this.datalocal);
        console.log(localStorage.getItem('data'));
        // this.setCookie(this.iddata)
        console.log(this.iddata,"ncskjk")
        this.verify.reset()
        this.route.navigate(['/SetPassword'])
      },
      //  error => {
      //   this.error_message = error.error.message;
      // }
      )
    }
  }
  keyPress(event: KeyboardEvent, val: any) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
    else {
      if (val.target.value.length > 5) {
        event.preventDefault();
      }

    }
    console.log(this.verify)

  }

  // setCookie(shop: any) {
  //   console.log(shop)
  //   let d: Date = new Date();
  //   d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
  //   let expires: string = `expires=${d.toUTCString()}`;
  //   document.cookie = `shopId=${shop.id}; ${expires}`;
  // }

}
