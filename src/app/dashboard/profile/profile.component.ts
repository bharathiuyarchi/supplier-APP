import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { ProfileService } from 'src/app/services/profile.service';
import { Country, State, City } from 'country-state-city';
import { Env } from '../../environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
   router: any;
   isSuccess:any;
   profileForm:any;
   baseurl = Env.baseAPi;
  constructor(private profileService:ProfileService,public http: HttpClient) { }

  ngOnInit(): void {
    this.countries = Country.getAllCountries();
    this.getbasicDataget()
   
  }

  countries: any;
  state: any = [];
  city: any;
  countrycode: any;

  valuestatus:any
  
  supplier = new FormGroup({
  
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
   
    this.profileService.updateAdvancedata(this.supplier.value).subscribe((res: any) => {
      console.log(localStorage.getItem('data'),"localStorage.getItem('data')")
      console.log(this.supplier.value,"this.supplier.value")
      this.supplier.reset();

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


}
