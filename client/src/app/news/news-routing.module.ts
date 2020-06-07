import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Shell } from './../shell/shell.service';
import { NewsComponent } from './news.component';
import { NewDetailComponent } from './new-detail.component';

const routes: Routes = [
    Shell.childRoutes([
        { path: 'newest/:category', component: NewsComponent },
        { path: 'newest/detail/:id', component: NewDetailComponent }
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
export class NewsRoutingModule {}
