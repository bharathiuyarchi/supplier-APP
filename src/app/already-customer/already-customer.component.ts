import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-already-customer',
  templateUrl: './already-customer.component.html',
  styleUrls: ['./already-customer.component.scss']
})
export class AlreadyCustomerComponent implements OnInit {

  constructor(private router: Router,private loginService:LoginService) { }

  ngOnInit(): void {
    this.ForgotPass = new FormGroup({
      mobileNumber: new FormControl('',Validators.required),
    })
  }
  ForgotPass:any;
  isDisplay:any;
  submitted:any;
  error_message:any

  forgot(){
    this.submitted = true;
    if(this.ForgotPass.valid){
      this.loginService.alreadyCustomerVerify(this.ForgotPass.value).subscribe((res: any) => {
        this.router.navigate(['/ForgotVerify']);
      
      })
    }
  }
}
