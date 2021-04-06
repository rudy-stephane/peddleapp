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
    MessagesComponent
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
