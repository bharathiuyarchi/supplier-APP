import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Country, State, City } from 'country-state-city';
import { Env } from 'src/app/environment';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  baseurl = Env.baseAPi;

  countries: any;
  state: any = [];
  city: any;
  countrycode: any;
  product: any;
  cat: any;
  prolist_sup = false;
  studentEmailcheck: any;
  ss: any;
  isdisplay = false


  constructor(public http: HttpClient, public fb: FormBuilder, public router: Router, public LoginService: LoginService) { }


  supplier :any= new FormGroup({
    tradeName: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern('^[a-zA-Z ]*$')]),
    companytype: new FormControl(null, Validators.required),
    primaryContactName: new FormControl('', [
      Validators.required,
      Validators.maxLength(50),
      Validators.pattern('^[a-zA-Z ]*$'),
    ]),
    primaryContactNumber: new FormControl('', Validators.required),
    productDealingWith: this.fb.array([], Validators.required),
    createdByStatus: new FormControl('By Supplier'),
    approvedStatus: new FormControl('Pending'),

  });


  ngOnInit(): void {

    this.countries = Country.getAllCountries();

    this.http.get(this.baseurl + '/v1/product').subscribe((res) => {
      this.product = res;
    });

    this.http.get(this.baseurl + '/v1/category/product/category').subscribe((res) => {
      this.cat = res;
      console.log(res);
    });


  }

  // submit api

  // error_message: any;
  // supplier_create() {

  //   this.prolist_sup = true;
  //   if (this.supplier.valid)
  //   // this.prolist_sup=false
  //     this.http.post(this.baseurl + '/v1/supplier', this.supplier.value).subscribe((res:any) => {
  //       this.supplier.reset()
  //       this.router.navigate(['/VerifyOTP']);
  //      }   
  //       // error => {
  //       // error.error.message
  //       // console.log(error.error.message,"ppppp")
  //       //  }
  //     );



  // }
  supplier_create() {
    this.prolist_sup = true;
    if (this.supplier.valid)

      this.LoginService.registerapi(this.supplier.value).subscribe((res: any) => {
        this.supplier.reset();
        this.router.navigate(['/VerifyOTP']);
      }, error => {
        error.error.message
        this.isdisplay = true
        console.log(error.error.message)
      })
  }


  numbervalidation(event: any) {
    if (event.target.value == null) {
      this.supplier.get("primaryContactNumber")?.setErrors(null);
    } else {
      this.supplier.get("primaryContactNumber")?.setErrors({ incorrect: true });
      console.log(this.supplier.get("primaryContactNumber")?.setErrors({ incorrect: true }), "oooooo")
    }

  }

  checkGstvalidation(e: any) {

    if (e.target.value != "") {
      this.supplier.get("gstNo")?.setErrors(null);
    } else {
      this.supplier.get("gstNo")?.setErrors({ incorrect: true });
      console.log(this.supplier.get("gstNo")?.setErrors({ incorrect: true }), "uuuu")
    }
  }

  checkvalidation(e: any) {

    if (e.target.value != "") {
      this.supplier.get("email")?.setErrors(null);
    } else {
      this.supplier.get("email")?.setErrors({ incorrect: true });
      console.log(this.supplier.get("email")?.setErrors({ incorrect: true }), "uuuu")
    }
  }

  selectstate(event: any) {
    this.supplier.get('district')?.setValue(null);
    this.supplier.get('state')?.setValue(null);
    this.countrycode = event.target.value;
    console.log(this.countrycode, 'country code');
    this.state = State.getStatesOfCountry(event.target.value);
  }
  citydata: any;
  selectcity(event: any) {
    this.supplier.get('district')?.setValue(null);
    // this.supplier.get('state')?.setValue(null);
    console.log(event.target.value);
    this.citydata = event.target.value;
    this.city = City.getCitiesOfState(this.countrycode, event.target.value);
  }
  // selectdistrict(event:any){
  //   this.selectdistrict = City.getCitiesOfState(this.citydata, event.target.value);
  // }

  oncheckboxchange(e: any) {
    const data: FormArray = this.supplier.get('productDealingWith') as FormArray;
    if (e.target.checked) {
      data.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      data.controls.forEach((item: any) => {
        if (item.value == e.target.value) {
          data.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  keyPressNumbers(event: any) {
    var charCode = event.which ? event.which : event.keyCode;

    // Only Numbers 0-9
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  valid(event: any) {
    if (event.keyCode >= 97 && event.keyCode <= 122) {
      alert('You Pressed Alphabetic Keys');
      console.log(event.keyCode);
    }
  }




}
