import { Injectable } from "@angular/core";
import { ConfigService } from '../shared/config.service';
import { AuthService } from '../core/authentication/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserInfo } from './user';
import { News } from '../news/news';

@Injectable({
    providedIn: 'root'
})

export class HomeService {
    constructor(
        private configService: ConfigService,
        private http: HttpClient
    ) {}
    fetchDataUser(token: string) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: token
            })
        }
        return this.http.get<UserInfo[]>(this.configService.resourceApiURI + '/user', httpOptions);
    }

    crawlData(token: string) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: token
            })
        }
        return this.http.get<News[]>(this.configService.resourceApiURI + '/RrsVNExpresses/crawldata', httpOptions);
    }
}