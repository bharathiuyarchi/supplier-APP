import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  displaycount = 0;
  page = 0;
  pagetotal = 0;
  totalcount = 0;
  unbilledamount:any

  constructor( private router: Router,private ProfileService:ProfileService) { }

  ngOnInit(): void {
    this.getUnbilledDtaa(this.page);
   
  }

  getdata:any
  getUnbilledDtaa(page:any){
    this.ProfileService.UnbilledData(page).subscribe((res:any)=>{
      this.getdata = res.values;
      console.log(this.getdata,"this.getdata")
      this.unbilledamount = res.unBilled.un_Billed_amt
      console.log(this.unbilledamount,"this.unbilledamount")
    })
  }
  amountdata:any
  amounthis(id:any){
    this.ProfileService.amountHistoryUnbilled(id).subscribe((res:any)=>{
      this.amountdata = res
      console.log(this.amountdata,"this.amountdata")
    })
  }
  displayData:any
  reqhistory(id:any){
    this.ProfileService.historyRequest(id).subscribe((res:any)=>{
      this.displayData = res
    })

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
    
    this.getUnbilledDtaa(this.page);
  }

}
