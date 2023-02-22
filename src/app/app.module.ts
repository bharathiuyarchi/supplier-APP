import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './dashboard/header/header.component';
import { FooterComponent } from './dashboard/footer/footer.component';
import { LoginComponent } from './login/login.component';
import { SidebarComponent } from './dashboard/sidebar/sidebar.component';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { PoliciesComponent } from './dashboard/policies/policies.component';
import { ProceduresComponent } from './dashboard/procedures/procedures.component';
import { SkillsComponent } from './dashboard/skills/skills.component';
import { ReportsComponent } from './dashboard/reports/reports.component';
import { AccountSettingsComponent } from './dashboard/account-settings/account-settings.component';
import { ManageTeamComponent } from './dashboard/manage-team/manage-team.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { DetailsComponent } from './dashboard/details/details.component';
import { CertificatesComponent } from './dashboard/certificates/certificates.component';
import { CreateCourseComponent } from './dashboard/create-course/create-course.component';
import { AddLearnerComponent } from './dashboard/add-learner/add-learner.component';
import { RegisterComponent } from './register/register.component';
import { ChangePasswordComponent } from './dashboard/change-password/change-password.component';
import { VerifyOTPComponent } from './verify-otp/verify-otp.component';
import { SetPasswordComponent } from './set-password/set-password.component';
import { NewpassConfirPassComponent } from './newpass-confir-pass/newpass-confir-pass.component';

import { ViewReqForSellingComponent } from './dashboard/view-req-for-selling/view-req-for-selling.component';

import { AdvanceDeatailsComponent } from './dashboard/advance-deatails/advance-deatails.component';
import { DisplayAdvanceDetailsComponent } from './dashboard/display-advance-details/display-advance-details.component';
import { AlreadyCostumerMobileSendComponent } from './already-costumer-mobile-send/already-costumer-mobile-send.component';
import { AlreadyCostumerVerifyOtpComponent } from './already-costumer-verify-otp/already-costumer-verify-otp.component';
import { AlreadyCostomerSetPasswordComponent } from './already-costomer-set-password/already-costomer-set-password.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { AlreadyCustomerComponent } from './already-customer/already-customer.component';
import { ForgotVeridyComponent } from './forgot-veridy/forgot-veridy.component';
import { ManageplansModule } from './manageplans/manageplans.module';
import { MyplansComponent } from './manageplans/myplans/myplans.component';
import { PurchasePlansComponent } from './manageplans/purchase-plans/purchase-plans.component';
import { ViewPlansComponent } from './manageplans/view-plans/view-plans.component';
import { PurchasesuccessComponent } from './manageplans/purchasesuccess/purchasesuccess.component';
import { ManagepostsComponent } from './manageposts/manageposts/manageposts.component';
import CreatepostsComponent from './manageposts/createposts/createposts.component';
import { CreaterequestComponent } from './managerequest/createrequest/createrequest.component';
import { ManagerequestComponent } from './managerequest/managerequest/managerequest.component';
import { RequestsetTwoComponent } from './managerequest/requestset-two/requestset-two.component';
import { ManagelivestreamComponent } from './managelivestream/managelivestream/managelivestream.component';
import { FormatTimePipe, GolivestreamComponent } from './managelivestream/golivestream/golivestream.component';
import { CreatesubuserComponent } from './createsubuser/createsubuser.component';
import { ManageSubuserComponent } from './manage-subuser/manage-subuser.component';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { PrivateplanComponent } from './privateplan/privateplan.component';
import { ProductlistshowComponent } from './managelivestream/productlistshow/productlistshow.component';
import { StreamchatComponent } from './managelivestream/streamchat/streamchat.component';
import { AlertstreamComponent } from './alertstream/alertstream.component';
import { ManagealertstreamComponent } from './managealertstream/managealertstream.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    SidebarComponent,
    PoliciesComponent,
    ProceduresComponent,
    SkillsComponent,
    ReportsComponent,
    AccountSettingsComponent,
    ManageTeamComponent,
    DashboardComponent,
    ProfileComponent,
    DetailsComponent,
    CertificatesComponent,
    CreateCourseComponent,
    AddLearnerComponent,
    RegisterComponent,
    ChangePasswordComponent,
    VerifyOTPComponent,
    SetPasswordComponent,
    NewpassConfirPassComponent,

    ViewReqForSellingComponent,

    AdvanceDeatailsComponent,
    DisplayAdvanceDetailsComponent,
    AlreadyCostumerMobileSendComponent,
    AlreadyCostumerVerifyOtpComponent,
    AlreadyCostomerSetPasswordComponent,
    ForgotpasswordComponent,
    AlreadyCustomerComponent,
    ForgotVeridyComponent,
    MyplansComponent,
    PurchasePlansComponent,
    ViewPlansComponent,
    PurchasesuccessComponent,
    ManagepostsComponent,
    CreatepostsComponent,
    CreaterequestComponent,
    ManagerequestComponent,
    RequestsetTwoComponent,
    ManagelivestreamComponent,
    GolivestreamComponent,
    FormatTimePipe,
    CreatesubuserComponent,
    ManageSubuserComponent,
    PrivateplanComponent,
    ProductlistshowComponent,
    StreamchatComponent,
    AlertstreamComponent,
    ManagealertstreamComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgHttpLoaderModule.forRoot(),
    NgxDaterangepickerMd.forRoot(),

    // MatDatepickerModule,
    // SubUserModule
    // ManageplansModule,
    // NgxDaterangepickerMd.forRoot(),

  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule { }

