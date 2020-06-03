import { Routes, RouterModule } from '@angular/router';
import { Shell } from '../shell/shell.service';
import { CitiesComponent } from './cities.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
    Shell.childRoutes([
        { path: 'cities', component: CitiesComponent}
    ])
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})

export class CitiesRoutingModule {}
