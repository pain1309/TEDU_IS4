import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { User, UserManager, UserManagerSettings } from 'oidc-client';
import { ClientSettings } from '../_shared/ClientSettings';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    private user: User = null;
    private manager = new UserManager(getClientSettings());
    constructor(private authService: AuthService) {
        this.manager.getUser().then(user => {
            this.user = user;
        });
    }

    ngOnInit() {}
    logout() {
        this.authService.signout();
    }
}

export function getClientSettings(): UserManagerSettings {
    return {
        // the URL of our OpenID Connect Provider
        authority: ClientSettings.authority,
        // // the client application’s identifier registered within the OpenID Connect Provider
        client_id: ClientSettings.client_id,
        // the client’s registered URI where all tokens will be sent to from the OpenID Connect Provider
        redirect_uri: ClientSettings.redirect_uri,
        // a registered URI that the OpenID Connect provider can redirect a user to once they log out
        post_logout_redirect_uri: ClientSettings.post_logout_redirect_uri,
        // 
        response_type: ClientSettings.response_type,
        scope: ClientSettings.scope,
        loadUserInfo: true
    };
}
