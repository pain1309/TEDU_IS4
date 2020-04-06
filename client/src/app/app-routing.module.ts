import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthCallbackComponent } from './auth-callback/auth-callback.component';

const routes: Routes = [
    { path: 'auth-callback', component: AuthCallbackComponent },
    // Fallback when no prior route is matched
    // This is useful for displaying a "404 - Not Found" page or redirecting to another route
    { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
