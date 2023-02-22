
import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { Cookie } from 'ng2-cookies';
declare let $: any

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  prolist_sup = false;
  isSuccess: boolean = false;
  // loginForm: any;
  forgotPasswordForm: any;
  mobilelength: any = 0;
  error_message: any;
  alreadyCustomersendMobile: any;
  AlreadyCustomerverify: any

  constructor(private router: Router, private loginService: LoginService) { }

  loginForm = new FormGroup({
    primaryContactNumber: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })



  ngOnInit(): void {
    this.forgotPasswordForm = new FormGroup({
      primaryContactNumber: new FormControl('', Validators.required),
    })
    this.alreadyCustomersendMobile = new FormGroup({
      mobileNumber: new FormControl('', Validators.required)
    })

  }
  tokens: any;
  refresh: any;
  token: any;
  gettoken: any
  users: any;
  datastore: any
  usersname: any;
  datastorename: any;
  isDisplay = false
  btnClicklogin() {
    this.prolist_sup = true;
    if (this.loginForm.valid && this.isSuccess == false)
      this.loginService.loginForm(this.loginForm.value).subscribe((res: any) => {
        console.log(this.loginForm.value, "lllll")
        console.log("this.loginForm.value")
        this.router.navigate(['dashboard']);

        this.tokens = res.tokens;
        console.log(this.tokens, "this.tokens")
        this.refresh = res.tokens.refresh
        console.log(this.refresh, " this.refresh")
        this.gettoken = res.tokens.refresh.token
        console.log(this.gettoken, "  this.gettoken")


        this.users = res.users;
        this.datastore = res.users.id
        console.log(this.datastore, "this.users")


        localStorage.setItem("data", this.datastore)
        //  var object1 = { data:  res.users.id }
        //  localStorage.setItem("data", JSON.stringify(object1));


        this.usersname = res.users;
        this.datastorename = res.users.primaryContactName
        console.log(this.datastorename, "this.users")

        localStorage.setItem("name", this.datastorename)


        var object = { value: res.tokens.refresh.token }
        localStorage.setItem("token", JSON.stringify(object));
        this.router.navigate(['profile'])


      }, error => {
        console.log(error.error.message, "fgkjjk")
        if (error.error.message == "Passwoed Doesn't Match") {
          this.passworderror = true;
          this.notregister = false;
        }
        else {
          this.passworderror = false;
          this.notregister = true;
        }
      });

  }
  passworderror: any;
  notregister: any


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

  btnClick() {

  }

  // Forgot Password 
  forgotPass() {
    this.prolist_sup = true;
    if (this.forgotPasswordForm.valid && this.isSuccess == false) {
      this.loginService.forgotPassword(this.forgotPasswordForm.value).subscribe((res: any) => {
      })
    }
  }

  forgotPassotp() {

  }

  passwordfor() {

  }

  setCookie(token: any) {
    let d: Date = new Date();
    d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
    let expires: string = `expires=${d.toUTCString()}`;
    document.cookie = `shop=${token.access.token}; ${expires}`;
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

  verify = new FormGroup({
    OTP: new FormControl(null, Validators.required),
    mobile: new FormControl()
  })
  // error_message: any;
  iddata: any
  datalocal: any
  lengthcheck: any = 0;
  submitted = false;
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
      this.loginService.verify_otp(this.verify.value).subscribe((res: any) => {
        console.log(res)
        // this.setCookie(res)
        this.iddata = res.id
        this.datalocal = res.id
        localStorage.setItem('data', this.datalocal);
        console.log(localStorage.getItem('data'));
        // this.setCookie(this.iddata)
        console.log(this.iddata, "ncskjk")
        this.verify.reset()
        this.router.navigate(['/NewpassConfirPass'])
      },
        //  error => {
        //   this.error_message = error.error.message;
        // }
      )
    }
  }

  // alredy customer

  customerVerify() {

    this.prolist_sup = true;
    if (this.alreadyCustomersendMobile.valid && this.isSuccess == false) {
      this.loginService.alreadyCustomerVerify(this.alreadyCustomersendMobile.value).subscribe((res: any) => {
        console.log(res)
        this.setCookie(res)
      })
    }
  }
  Already_Customer_verify_now() {

  }

  resetPasswordAlready() {

  }

}

