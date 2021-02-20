import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CompagniesDashboardComponent } from './compagnies-dashboard/compagnies-dashboard.component';
import { EntrepreneurDashboardComponent } from './entrepreneur-dashboard/entrepreneur-dashboard.component';
import { BrandAmbassadorDashboardComponent } from './brand-ambassador-dashboard/brand-ambassador-dashboard.component';
import { BrandAmbassadorLeftMenuComponent } from './brand-ambassador-left-menu/brand-ambassador-left-menu.component';
import { CompagniesLeftMenuComponent } from './compagnies-left-menu/compagnies-left-menu.component';
import { EntrepreneurLeftMenuComponent } from './entrepreneur-left-menu/entrepreneur-left-menu.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import {RouterModule, Routes} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {FullCalendarModule} from '@fullcalendar/angular';
import { CompagniesSignupComponent } from './compagnies-signup/compagnies-signup.component';
import { EntrepreneurSignupComponent } from './entrepreneur-signup/entrepreneur-signup.component';
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
const appRoutes: Routes = [
    {path: 'analytics', component: AnalyticsComponent},
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: SignupComponent},
    {path: 'welcome', component: WelcomeComponent},
    {
      path: 'google',
      resolve: {
        url: 'https://angular.io/guide/deployment'
      }
    },
    {path: 'compagnies', component: CompagniesDashboardComponent},
    {path: 'compagnies-signup', component: CompagniesSignupComponent},
    {path: 'entrepreneur', component: EntrepreneurDashboardComponent},
    {path: 'entrepreneur-signup', component: EntrepreneurSignupComponent},
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
    BrandAmbassadorLeftMenuComponent,
    CompagniesLeftMenuComponent,
    EntrepreneurLeftMenuComponent,
    FooterComponent,
    HeaderComponent,
    CompagniesSignupComponent,
    EntrepreneurSignupComponent,
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
    ChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
