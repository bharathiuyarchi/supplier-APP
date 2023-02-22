import { Component, OnInit } from '@angular/core';
import { SubhostService } from '../subhost.service';

@Component({
  selector: 'app-manage-subuser',
  templateUrl: './manage-subuser.component.html',
  styleUrls: ['./manage-subuser.component.scss']
})
export class ManageSubuserComponent implements OnInit {
  user:any=[];
  constructor(private subhost:SubhostService) { }

  ngOnInit(){
    this.get_user()
  }
  get_user(){
    this.subhost.managesubHost().subscribe((res:any) => {
    this.user=res;
    })
  }
}
