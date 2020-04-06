import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/authentication/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-auth-callback',
    templateUrl: './auth-callback.component.html',
    styleUrls: ['./auth-callback.component.scss']
})
export class AuthCallbackComponent implements OnInit {
    error: boolean;

    constructor(
        private authService: AuthService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    async ngOnInit() {
        await this.authService.completeAuthentication();
        this.router.navigate(['/home']);
    }
}
