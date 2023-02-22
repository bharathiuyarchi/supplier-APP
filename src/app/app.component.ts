import { Component } from '@angular/core';
import { Spinkit } from 'ng-http-loader';

@Component({
  selector: 'app-root',
  template: `

  <div class="outer-outlet">
    <router-outlet></router-outlet>
  </div>
`,
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'SupplierApp';
  spinnerStyle = Spinkit;  

};