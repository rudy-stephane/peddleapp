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


const externalUrlProvider = new InjectionToken('externalUrlRedirectResolver');
const appRoutes: Routes = [
    {path: 'analytics', component: AnalyticsComponent},
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: SignupComponent},
    {path: 'welcome', component: WelcomeComponent},
    {path: 'compagnies', component: CompagniesDashboardComponent},
    {path: 'entrepreneur', component: EntrepreneurDashboardComponent},
    {path: 'password-forgotten', component: PasswordForgottenComponent},
    {path: 'brandambassador', component: BrandAmbassadorDashboardComponent},
    {path: '', redirectTo : '/welcome', pathMatch: 'full'}
  ]
;
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
    AnalyticsComponent
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
    ToastModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
