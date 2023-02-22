import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-forgot-veridy',
  templateUrl: './forgot-veridy.component.html',
  styleUrls: ['./forgot-veridy.component.scss']
})
export class ForgotVeridyComponent implements OnInit {

  constructor(private router: Router,private loginService:LoginService) { }

  ngOnInit(): void {

  }

  lengthcheck: any = 0;
  submitted = false;
  error_message:any;

  verify = new FormGroup({
    OTP: new FormControl(null, Validators.required),
    mobile: new FormControl()
  })

  keyPress(event: KeyboardEvent, val: any) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    } else {
      if (val.target.value.length > 5) {
        event.preventDefault();
      }
    }
    console.log(this.verify);
  }

  iddata:any
  datalocal:any;
  isdisplay =  false

  verify_now(){
    this.submitted = true;
    this.lengthcheck = this.verify.get('OTP')?.valid ? this.verify.get('OTP')?.value : 0;
    console.log(this.lengthcheck.length)
    if (this.verify.valid && this.lengthcheck.length == 6) {
    

      console.log(this.verify.value)
      this.submitted = false;
      console.log(this.verify.value)
      this.loginService.verify_otp(this.verify.value).subscribe((res: any) => {
        console.log(res)
        // this.setCookie(res)
        this.iddata= res.id
        this.datalocal = res.id
        localStorage.setItem('data', this.datalocal);
        console.log(localStorage.getItem('data'));
        // this.setCookie(this.iddata)
        console.log(this.iddata,"ncskjk")
        this.verify.reset()
        this.router.navigate(['/NewpassConfirPass'])
      },
       error => {
        this.error_message 
        this.isdisplay = true
      }
      )
    }
  }
}


