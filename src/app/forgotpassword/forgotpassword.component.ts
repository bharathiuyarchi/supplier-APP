import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {

  constructor(private router: Router,private loginService:LoginService) { }

  ngOnInit(): void {
    this.ForgotPass = new FormGroup({
      primaryContactNumber: new FormControl('',Validators.required),
    })

  }

  ForgotPass:any;
  isDisplay = false
  submitted:any;
  error_message:any

  forgot(){
    this.submitted = true;
    if(this.ForgotPass.valid){
      this.loginService.forgotPassword(this.ForgotPass.value).subscribe((res: any) => {
        this.router.navigate(['/ForgotVerify']);
      
      },error => {
        error.message
        this.isDisplay = true
        console.log(error.message,"ppppp")
      }
      )
    }
  }

}
