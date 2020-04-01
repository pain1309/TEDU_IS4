import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthCallbackComponent } from './auth-callback/auth-callback.component';
import { HomeComponent } from './home/home.component';
import { LogoutComponent } from './logout/logout.component';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpClientModule } from '@angular/common/http';
import { ConfigService } from './_shared/config.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { NavComponent } from './nav/nav.component';
import { AuthGuard } from './_guard/auth.guard';
import { AuthService } from './_services/auth.service';
import { CallApiComponent } from './call-api/call-api.component';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'auth-callback', component: AuthCallbackComponent },
    { path: 'logout', component: LogoutComponent },
    { path: 'register', component: RegisterComponent },
    {
        path: 'call-api',
        component: CallApiComponent,
        canActivate: [AuthGuard]
    }
];

@NgModule({
    declarations: [
        AppComponent,
        AuthCallbackComponent,
        HomeComponent,
        LogoutComponent,
        RegisterComponent,
        LoginComponent,
        NavComponent,
        CallApiComponent
    ],
    imports: [
        HttpClientModule,
        FormsModule,
        BrowserModule,
        RouterModule.forRoot(appRoutes),
        AppRoutingModule,
        NgxSpinnerModule,
        BrowserAnimationsModule
    ],
    providers: [ConfigService, AuthGuard, AuthService],
    bootstrap: [AppComponent]
})
export class AppModule {}
