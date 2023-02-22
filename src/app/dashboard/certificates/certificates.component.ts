import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.scss']
})
export class CertificatesComponent implements OnInit {

  displaycount = 0;
  page = 0;
  pagetotal = 0;
  totalcount = 0;

  constructor( private router: Router,private ProfileService:ProfileService) { }

  ngOnInit(): void {
    this.getbilledData(this.page)
  }

  data:any
  getbilledData(page:any) {
    this.ProfileService.getbilldataaa(page).subscribe((res:any)=>{
      this.data = res.values
      console.log(this.data,"this.data")
    })
  }
  dataStatus:any;
  BillNo:any
  supplierData(id:any,BillNo:any){

    this.ProfileService.getbillHistory(id).subscribe((res:any)=>{
      this.dataStatus = res
      console.log(this.dataStatus,"this.dataStatus")
    })
    this.BillNo = BillNo

  }

  pagination(count: any) {
    if (count == 1) {
      this.page++;
    }
    else if (count == 2) {
      this.page = this.pagetotal - 1;
    }
    else if (count == 3) {
      this.page = 0;
      console.log(this.page)
    }
    else {
      if (this.page > 0) {
        this.page--;
      }
    }
    
    // this.getBillDetailsDtaa(this.id,this.page);
  }


}
