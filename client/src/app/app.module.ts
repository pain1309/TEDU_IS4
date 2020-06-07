import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// used to create fake backend
import { FakeBackendProvider } from './shared/mocks/fake-backend-interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ConfigService } from './shared/config.service';

import { AuthCallbackComponent } from './auth-callback/auth-callback.component';

/* Module Imports */
import { CoreModule } from './core/core.module';
import { HomeModule } from './home/home.module';
import { AccountModule } from './account/account.module';
import { ShellModule } from './shell/shell.module';
import { TopSecretModule } from './top-secret/top-secret.module';
import { SharedModule } from './shared/shared.module';
import { CitiesModule } from './cities/cities.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { CountriesModule } from './countries/countries.module';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NewsModule } from './news/news.module';

@NgModule({
    // an array of components, directives, and pipes
    declarations: [AppComponent, AuthCallbackComponent],
    // need to include other modules 
    imports: [
        BrowserModule,
        HttpClientModule,
        CoreModule,
        HomeModule,
        CitiesModule,
        CountriesModule,
        NewsModule,
        AccountModule,
        TopSecretModule,
        AppRoutingModule,
        ShellModule,
        SharedModule,
        BrowserAnimationsModule,
        AngularMaterialModule,
        ReactiveFormsModule
    ],
    // need to include the services
    providers: [
        ConfigService,
        // provider used to create fake backend
        FakeBackendProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
