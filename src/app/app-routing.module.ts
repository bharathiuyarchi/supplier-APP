import { AlertstreamComponent } from './alertstream/alertstream.component';
import { PrivateplanComponent } from './privateplan/privateplan.component';
import { RequestsetTwoComponent } from './managerequest/requestset-two/requestset-two.component';
import { CreaterequestComponent } from './managerequest/createrequest/createrequest.component';
import { ManagerequestComponent } from './managerequest/managerequest/managerequest.component';
import CreatepostsComponent from './manageposts/createposts/createposts.component';
import { PurchasePlansComponent } from './manageplans/purchase-plans/purchase-plans.component';
import { MyplansComponent } from './manageplans/myplans/myplans.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AppModule } from './app.module';
import { ManageTeamComponent } from './dashboard/manage-team/manage-team.component';
import { PoliciesComponent } from './dashboard/policies/policies.component';
import { ProceduresComponent } from './dashboard/procedures/procedures.component';
import { ReportsComponent } from './dashboard/reports/reports.component';
import { SkillsComponent } from './dashboard/skills/skills.component';
import { AccountSettingsComponent } from './dashboard/account-settings/account-settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
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
import { AuthGuard } from './services/authroutes.service';
import { DisplayAdvanceDetailsComponent } from './dashboard/display-advance-details/display-advance-details.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { AlreadyCostomerSetPasswordComponent } from './already-costomer-set-password/already-costomer-set-password.component';
import { ForgotVeridyComponent } from './forgot-veridy/forgot-veridy.component';
import { AlreadyCustomerComponent } from './already-customer/already-customer.component';
import { ViewPlansComponent } from './manageplans/view-plans/view-plans.component';
import { PurchasesuccessComponent } from './manageplans/purchasesuccess/purchasesuccess.component';
import { ManagepostsComponent } from './manageposts/manageposts/manageposts.component';
import { ManagelivestreamComponent } from './managelivestream/managelivestream/managelivestream.component';
import { GolivestreamComponent } from './managelivestream/golivestream/golivestream.component';
import { CreatesubuserComponent } from './createsubuser/createsubuser.component';
import { ManageSubuserComponent } from './manage-subuser/manage-subuser.component';
import { ManagealertstreamComponent } from './managealertstream/managealertstream.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'accountsettings', component: AccountSettingsComponent },
  {
    path: 'my-plans', children: [
      { path: "", component: MyplansComponent, },
      {
        path: 'purchase-plans', children: [
          { path: "", component: PurchasePlansComponent, },
          { path: "view-plan", component: ViewPlansComponent },
          { path: "purchase-success", component: PurchasesuccessComponent, pathMatch: "full" },

        ]
      },
    ]
  },

  {
    path: 'manage-post', children: [
      { path: "", component: ManagepostsComponent },
      { path: "create-post", component: CreatepostsComponent },
      { path: "view-post", component: CreatepostsComponent },
    ]
  },
  {
    path: 'streamrequest', children: [
      { path: "", component: ManagerequestComponent },
      { path: "step-one", component: CreaterequestComponent },
      { path: "step-two", component: RequestsetTwoComponent },
    ]
  },
  {
    path: 'livestream', children: [
      { path: "", component: ManagelivestreamComponent },
      { path: "golive", component: GolivestreamComponent },
    ]
  },
  { path: "purchase-success", component: PurchasesuccessComponent, pathMatch: "full" },

  {
    path: 'manageteam', component: ManageTeamComponent,
    //     children: [
    //   {
    //     path:"certificates",
    //     component: CertificatesComponent,
    //     pathMatch: 'full',
    //   },
    //   {
    //     path: "reports",
    //     component: ReportsComponent,
    //     pathMatch: 'full',
    //   }
    // ]
  },

  { path: 'policies', component: PoliciesComponent },
  {
    path: 'ViewReqForSellin', component: ViewReqForSellingComponent,
    children: [
      {
        path: "procedures",
        component: ProceduresComponent,
        // pathMatch: 'full'
      }
    ]

  },
  { path: 'reports', component: ReportsComponent },
  { path: 'skills', component: SkillsComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'details', component: DetailsComponent },
  { path: 'certificates', component: CertificatesComponent },
  { path: 'create-course', component: CreateCourseComponent },
  { path: 'add-learner', component: AddLearnerComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'changePassword', component: ChangePasswordComponent },
  { path: "VerifyOTP", component: VerifyOTPComponent },
  { path: "SetPassword", component: SetPasswordComponent },
  { path: "NewpassConfirPass", component: NewpassConfirPassComponent },
  {
    path: "DisplayAdvanceDetails",
    children: [
      {
        path: '', component: DisplayAdvanceDetailsComponent
      },
      {
        path: 'AdvanceDetails', component: AdvanceDeatailsComponent
      }
    ]
  },
  { path: 'AlreadyCostomerSetPassword', component: AlreadyCostomerSetPasswordComponent },
  { path: 'Forgotpassword', component: ForgotpasswordComponent },
  { path: "ForgotVerify", component: ForgotVeridyComponent },
  { path: "AlreadyCustomer", component: AlreadyCustomerComponent },
  { path: "crateSubUser", component: CreatesubuserComponent },
  {
    path: "manage-subuser", children: [
      { path: "", component: ManageSubuserComponent },
      {
        path: "manageallot", children: [
          { path: "", component: ManagealertstreamComponent, },
          { path: "allot", component: AlertstreamComponent }
        ]
      },
    ],
  },
  { path: "purchase/plan", component: PrivateplanComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
// export const ArrayOfComponents = [ AccountSettingsComponent]

