export const ClientSettings = {
    authority: 'http://localhost:5000',
    client_id: 'spaclient',
    redirect_uri: 'http://localhost:4200/auth-callback',
    post_logout_redirect_uri: 'http://localhost:4200/',
    response_type: 'code',
    scope: 'openid profile identity.api test.api'
};
