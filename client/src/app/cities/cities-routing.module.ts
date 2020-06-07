import { Routes, RouterModule } from '@angular/router';
import { Shell } from '../shell/shell.service';
import { CitiesComponent } from './cities.component';
import { NgModule } from '@angular/core';
import { CityEditComponent } from './city-edit.component';

const routes: Routes = [
    Shell.childRoutes([
        { path: 'cities', component: CitiesComponent},
        { path: 'city/:id', component: CityEditComponent },
        { path: 'city', component: CityEditComponent },
    ])
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})

export class CitiesRoutingModule {}
