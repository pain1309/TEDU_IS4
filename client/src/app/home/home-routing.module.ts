import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { Shell } from './../shell/shell.service';

const routes: Routes = [
    Shell.childRoutes([
        { path: '', redirectTo: '/home', pathMatch: 'full' },
        { path: 'home', component: IndexComponent }
    ])

    // static childRoutes(routes: Routes): Route {
    //     return {
    //         path: '',
    //         component: ShellComponent,
    //         children: routes,
    //         // =canActivate: [AuthenticationGuard],
    //         // Reuse ShellComponent instance when navigating between child views
    //         data: { reuse: true }
    //     };
    // }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class HomeRoutingModule {}
