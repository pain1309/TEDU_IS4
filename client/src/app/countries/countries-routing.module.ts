import { Routes, RouterModule } from '@angular/router';
import { Shell } from '../shell/shell.service';
import { NgModule } from '@angular/core';
import { CountriesComponent } from './countries.component';
import { CountryEditComponent } from './country-edit.component';

const routes: Routes = [
    Shell.childRoutes([
        { path: 'countries', component: CountriesComponent},
        { path: 'country/:id', component: CountryEditComponent },
        { path: 'country', component: CountryEditComponent }
    ])
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})

export class CountriesRoutingModule {}
