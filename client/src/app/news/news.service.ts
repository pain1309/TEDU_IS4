import { Injectable } from '@angular/core';
import { BaseService } from '../shared/base.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ConfigService } from '../shared/config.service';
import { News } from './news';

@Injectable({
    providedIn: 'root'
})

export class NewsService extends BaseService{

    constructor(
        private http: HttpClient,
        private configService: ConfigService) {
            super();
    }
    fetchNews(token: string, category: string) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: token
            })
        };
        return this.http.get<any>(this.configService.resourceApiURI + '/RrsVNExpresses/' + category, httpOptions);
    }
    fetchNewDetail(token: string, id: number) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: token
            })
        };
        return this.http.get<News>(this.configService.resourceApiURI + '/RrsVNExpresses/GetRrsVNExpressById/' + id, httpOptions);
    }
}