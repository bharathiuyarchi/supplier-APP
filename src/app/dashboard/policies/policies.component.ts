import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-policies',
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.scss']
})
export class PoliciesComponent implements OnInit {

  displaycount = 0;
  page = 0;
  pagetotal = 0;
  totalcount = 0;

  constructor(private router: Router,private ProfileService:ProfileService) { }

  ngOnInit(): void {
    this.getdataVoluntaryNeed()
  }

  // data:any
  // getraisedOrderReq(){
  //   this.ProfileService.raisedOrderReq().subscribe((res: any) => {
  //     this.data = res;
  //   })
  // }

  datadata:any
  getdataVoluntaryNeed(){
    this.ProfileService.getdataVoluntaryNeedApproved().subscribe((res:any)=>{
      this.datadata = res[0].callstatuses
      console.log(this.datadata,"data")
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
    
    // this.getBillDetailsDtaa(this.id,this.page);
  }

}
