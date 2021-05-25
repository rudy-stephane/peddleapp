import { BrowserModule } from '@angular/platform-browser';
import {InjectionToken, NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CompagniesDashboardComponent } from './compagnies-dashboard/compagnies-dashboard.component';
import { EntrepreneurDashboardComponent } from './entrepreneur-dashboard/entrepreneur-dashboard.component';
import { BrandAmbassadorDashboardComponent } from './brand-ambassador-dashboard/brand-ambassador-dashboard.component';

import {ActivatedRouteSnapshot, RouterModule, Routes} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {FullCalendarModule} from '@fullcalendar/angular';
import { PasswordForgottenComponent } from './password-forgotten/password-forgotten.component';
import {HttpClientModule} from '@angular/common/http';
import {DialogModule} from 'primeng/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ChipModule} from 'primeng/chip';
import {SplitButtonModule} from 'primeng/splitbutton';
import { ToastsContainerComponent } from './toasts-container/toasts-container.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import {ChartModule} from 'primeng/chart';
import {resolve} from 'url';
import {MessagesModule} from 'primeng/messages';
import {ToastModule} from 'primeng/toast';
import {SocialAuthServiceConfig, SocialLoginModule} from 'angularx-social-login';
// @ts-ignore
import { AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider, LinkedInLoginProvider  } from 'angularx-social-login';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {environment} from '../environments/environment.prod';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import { ProfilesettingComponent } from './profilesetting/profilesetting.component';
import { TeammanagementComponent } from './teammanagement/teammanagement.component';
import {TableModule} from 'primeng/table';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import { ContactmanagementComponent } from './contactmanagement/contactmanagement.component';
import { MessagesComponent } from './messages/messages.component';
import {VirtualScrollerModule} from 'primeng/virtualscroller';
import {DropdownModule} from 'primeng/dropdown';
import {ScrollTopModule} from 'primeng/scrolltop';
import { PeddleHomeComponent } from './peddle-home/peddle-home.component';
import { PeddleOpportunitiesComponent } from './peddle-opportunities/peddle-opportunities.component';
import { PeddleMyAgendaComponent } from './peddle-my-agenda/peddle-my-agenda.component';
import { PeddleTeamMembersComponent } from './peddle-team-members/peddle-team-members.component';
import { PeddleContactsComponent } from './peddle-contacts/peddle-contacts.component';
import { PeddleMessagesComponent } from './peddle-messages/peddle-messages.component';
import { PeddleAnalyticsComponent } from './peddle-analytics/peddle-analytics.component';
import { PeddlePlanComponent } from './peddle-plan/peddle-plan.component';
import { PeddleUsersProfileComponent } from './peddle-users-profile/peddle-users-profile.component';
import { PeddleSettingComponent } from './peddle-setting/peddle-setting.component';
import { HomeComponent } from './home/home.component';


const externalUrlProvider = new InjectionToken('externalUrlRedirectResolver');
const appRoutes: Routes = [
    {path: 'analytics', component: AnalyticsComponent},
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: SignupComponent},
    {path: 'profilesetting', component: ProfilesettingComponent},
    {path: 'welcome', component: WelcomeComponent},
    {path: 'compagnies', component: CompagniesDashboardComponent},
    {path: 'entrepreneur', component: EntrepreneurDashboardComponent},
    {path: 'password-forgotten', component: PasswordForgottenComponent},
    {path: 'teammanagement', component: TeammanagementComponent},
    {path: 'brandambassador', component: BrandAmbassadorDashboardComponent},
    {path: 'contactmanagement', component: ContactmanagementComponent},
    {path: 'message', component: MessagesComponent},
    {path: 'peddle_home', component: PeddleHomeComponent,
      children: [
        {path: 'peddle_analytics', component: PeddleAnalyticsComponent},
        {path: 'peddle_contacts', component: PeddleContactsComponent},
        {path: 'peddle_messages', component: PeddleMessagesComponent},
        {path: 'peddle_my_agenda', component: PeddleMyAgendaComponent},
        {path: 'peddle_opportunities', component: PeddleOpportunitiesComponent},
        {path: 'peddle_setting', component: PeddleSettingComponent},
        {path: 'peddle_team_members', component: PeddleTeamMembersComponent},
        {path: 'peddle_users_profile', component: PeddleUsersProfileComponent},
        {path: 'peddle_plan', component: PeddlePlanComponent},
        {path: '', redirectTo : 'peddle_analytics'}
      ]
    },
    {path: '', redirectTo : '/welcome', pathMatch: 'full'}
  ];
/*const config = new AuthServiceConfig([
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('177375814178051')
   }
]);*/

/*
// tslint:disable-next-line:typedef
export function provideConfig() {
  return config;
}
*/

// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LoginComponent,
    SignupComponent,
    CompagniesDashboardComponent,
    EntrepreneurDashboardComponent,
    BrandAmbassadorDashboardComponent,
    PasswordForgottenComponent,
    ToastsContainerComponent,
    AnalyticsComponent,
    ProfilesettingComponent,
    TeammanagementComponent,
    ContactmanagementComponent,
    MessagesComponent,
    PeddleHomeComponent,
    PeddleOpportunitiesComponent,
    PeddleMyAgendaComponent,
    PeddleTeamMembersComponent,
    PeddleContactsComponent,
    PeddleMessagesComponent,
    PeddleAnalyticsComponent,
    PeddlePlanComponent,
    PeddleUsersProfileComponent,
    PeddleSettingComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    FullCalendarModule,
    HttpClientModule,
    DialogModule,
    BrowserAnimationsModule,
    ChipModule,
    SplitButtonModule,
    ChartModule,
    MessagesModule,
    ToastModule,
    SocialLoginModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    TableModule,
    ConfirmDialogModule,
    VirtualScrollerModule,
    DropdownModule,
    ScrollTopModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('177375814178051')
          }
        ]
      } as SocialAuthServiceConfig,
    },
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
