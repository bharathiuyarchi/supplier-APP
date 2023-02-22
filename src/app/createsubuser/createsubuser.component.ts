import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormControl } from '@angular/forms';
import { SubhostService } from '../subhost.service';

@Component({
  selector: 'app-createsubuser',
  templateUrl: './createsubuser.component.html',
  styleUrls: ['./createsubuser.component.scss']
})
export class CreatesubuserComponent implements OnInit {
  isSubmitted=false;
  loginForm:any=this.fb.group({
    Name:new FormControl('', Validators.required),
    mail:new FormControl('',[Validators.required,Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    phoneNumber:new FormControl('',[Validators.required,Validators.pattern('^[6-9]{1}[0-9]{9}$')]),
    role:new FormControl(null, Validators.required),
  })
  constructor(private fb:FormBuilder,private subHost:SubhostService) { }

  ngOnInit(){

  }
  numberOnly(event: any) {
    if (event.target.value.length > 9) {
      return false;
    }
    else {
      return true;
    }

  }
  onSubmitted(){
  this.isSubmitted=true;
  if(this.loginForm.valid){
  this.subHost.createSubhost(this.loginForm.value).subscribe((res:any) =>{
    this.loginForm.reset();
    this.isSubmitted=false;
  })
  }
  }
}
