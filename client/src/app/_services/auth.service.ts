import { Injectable } from '@angular/core';
import { User, UserManager, UserManagerSettings } from 'oidc-client';
import { BehaviorSubject } from 'rxjs';
import { ClientSettings } from '../_shared/ClientSettings';
import { ConfigService } from '../_shared/config.service';
import { BaseService } from '../_shared/base.service';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AuthService extends BaseService {
    private _authNavStatusSource = new BehaviorSubject(false);
    authNavStatus$ = this._authNavStatusSource.asObservable();

    private manager = new UserManager(getClientSettings());
    private user: User | null;

    constructor(
        private http: HttpClient,
        private configService: ConfigService
    ) {
        super();
        this.manager.getUser().then(user => {
            this.user = user;
            this._authNavStatusSource.next(this.isAuthenticated());
        });
    }

    register(userRegistration: any) {
        return this.http
            .post(this.configService.authApiURI + '/register', userRegistration)
            .pipe(catchError(this.handleError));
    }

    login() {
        //  redirect users to our OpenID Connect provider
        // generate the authorization request to our OpenID Connect Provider, 
        // handling the state and nonce, and, if required, call the metadata endpoint.
        return this.manager.signinRedirect();
    }

    async completeAuthentication() {
        this.user = await this.manager.signinRedirectCallback();
        this._authNavStatusSource.next(this.isAuthenticated());
    }
    signinSilentCallback() {
        this.manager.signinSilentCallback().catch(err => {
            console.log(err);
        });
    }

    isAuthenticated(): boolean {
        return this.user != null && !this.user.expired;
    }

    getauthorizationHeaderValue(): string {
        return `${this.user.token_type} ${this.user.access_token}`;
    }

    get name(): string {
        if (this.user !== null && this.user.profile !== undefined) {
            return this.user.profile.name;
        } else {
            return '';
        }
    }

    async signout() {
        await this.manager.signoutRedirect();
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
        // 
        scope: ClientSettings.scope
    };
}
