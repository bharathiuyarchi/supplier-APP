import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { ProfileService } from 'src/app/services/profile.service';
import { Country, State, City } from 'country-state-city';
import { Env } from '../../environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-advance-deatails',
  templateUrl: './advance-deatails.component.html',
  styleUrls: ['./advance-deatails.component.scss']
})
export class AdvanceDeatailsComponent implements OnInit {

  isSuccess:any;
  profileForm:any;
  baseurl = Env.baseAPi;
  supdata: any = [];
 constructor(private router: Router,private profileService:ProfileService,public http: HttpClient) { }
 @Output() newItemEvent = new EventEmitter<any>();


 ngOnInit(): void {
   this.countries = Country.getAllCountries();
  //  this.state = State.

   
   this.getbasicDataget()


   this.http.get(this.baseurl + `/v1/supplier/${localStorage.getItem('data')}`).subscribe((res: any) => {
    console.log(res, 'response');
    this.supdata = res.supplier.productDealingWith;
    this.supplier.patchValue({
      tradeName: res.supplier.tradeName,
      companytype: res.supplier.companytype,
      primaryContactName: res.supplier.primaryContactName,
      primaryContactNumber: res.supplier.primaryContactNumber,
      secondaryContactName: res.supplier.secondaryContactName,
      secondaryContactNumber: res.supplier.secondaryContactNumber,
      RegisteredAddress: res.supplier.RegisteredAddress,
      countries: res.supplier.countries,
      state: res.supplier.state,
      district: res.supplier.district,
      gstNo: res.supplier.gstNo,
      email: res.supplier.email,
      pinCode: res.supplier.pinCode,
    });
    this.state = State.getStatesOfCountry(res.supplier.countries);
    this.city = City.getCitiesOfState(res.supplier.countries,res.supplier.state);

  });
  
 }

 countries: any;
 state: any = [];
 city: any;
 countrycode: any;

 valuestatus:any
 
 supplier :any= new FormGroup({
  secondaryContactName: new FormControl('', [
    Validators.required,
    Validators.maxLength(50),
    Validators.pattern('^[a-zA-Z ]*$'),
  ]),
  secondaryContactNumber : new FormControl('', Validators.required),
   RegisteredAddress: new FormControl('', Validators.required),
   countries: new FormControl('', Validators.required),
   state: new FormControl('', Validators.required),
   district: new FormControl('', Validators.required),
   pinCode: new FormControl('', Validators.required),
 });
 prolist_sup=false

 load(e:any){
   this.valuestatus = e.target.value;

 }
 supplier_create(){

  console.log('this.supplier_create');
  this.prolist_sup = true;
  if (this.supplier.valid)
  
   this.profileService.updateAdvancedata(this.supplier.value).subscribe((res: any) => {
     console.log(localStorage.getItem('data'),"localStorage.getItem('data')")
     console.log(this.supplier.value,"this.supplier.value")
     this.supplier.reset();
     this.router.navigate(['/DisplayAdvanceDetails'])

   })

 }


 datata:any
 getbasicDataget(){
   this.profileService.getbasicData().subscribe((res: any) => {
     this.datata = res;
     console.log( this.datata ," this.datata ")
   })
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