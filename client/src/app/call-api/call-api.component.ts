import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../_services/auth.service';
import { ConfigService } from '../_shared/config.service';

@Component({
    selector: 'app-call-api',
    templateUrl: './call-api.component.html',
    styleUrls: ['./call-api.component.css']
})
export class CallApiComponent implements OnInit {
    response: Object;
    constructor(
        private http: HttpClient,
        private authService: AuthService,
        private configService: ConfigService
    ) {}

    ngOnInit() {
        let headers = new HttpHeaders({
            Authorization: this.authService.getauthorizationHeaderValue()
        });
        this.http
            .get(this.configService.resourceApiURI + '/test', { headers: headers })
            .subscribe(response => (this.response = response));
    }
}
