import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
// import { Env } from 'src/environments/environment';
import { Country, State, City } from 'country-state-city';
import { Validators, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-display-advance-details',
  templateUrl: './display-advance-details.component.html',
  styleUrls: ['./display-advance-details.component.scss']
})
export class DisplayAdvanceDetailsComponent implements OnInit {

  constructor(public route: ActivatedRoute,private profileService:ProfileService,) { }

  ngOnInit(): void {

    this.getbasicDataget()
  }

  datata:any

 
  getbasicDataget(){
    this.profileService.getbasicData().subscribe((res: any) => {
      this.datata = res;
      console.log( this.datata ," this.datata ")
    })
  }

}

@Component({
  selector: 'app-advance-deatails',
  templateUrl: './advance-deatails.component.html',
  styleUrls: ['./display-advance-details.component.scss']
})
export class AdvanceDeatailsComponent implements OnInit {
 
  isSuccess:any;
  profileForm:any;
  // baseurl = Env.baseAPi;
 constructor(private profileService:ProfileService,public http: HttpClient,private router: Router,public route: ActivatedRoute) { }
 @Output() newItemEvent = new EventEmitter<any>();

 ngOnInit(): void {
   this.countries = Country.getAllCountries();
   
  
 }

 countries: any;
 state: any = [];
 city: any;
 countrycode: any;

 valuestatus:any
 
 supplier = new FormGroup({
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
