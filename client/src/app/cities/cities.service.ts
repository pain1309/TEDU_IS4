import { Injectable } from '@angular/core';
import { BaseService } from '../shared/base.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ConfigService } from '../shared/config.service';
import { catchError } from 'rxjs/operators';
import { PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Injectable({
    providedIn: 'root'
})

export class CitiesService extends BaseService{
    public defaultSortColumn: string = 'name';
    public defaultSortOrder: string = 'asc';
    filterQuery: string = null;
    defaultFilterColumn: string = 'name';

    constructor(
        private http: HttpClient,
        private configService: ConfigService) {
            super();
    }
    fetchCities(token: string, event: PageEvent, sort: MatSort, filterQuery: string) {
        var params = new HttpParams()
            .set('pageIndex', event.pageIndex.toString())
            .set('pageSize', event.pageSize.toString())
            .set('sortColumn', (sort) ? sort.active : this.defaultSortColumn)
            .set('sortOrder', (sort) ? sort.direction : this.defaultSortOrder);

        if (filterQuery) {
            params = params
                .set('filterColumn', this.defaultFilterColumn)
                .set('filterQuery', filterQuery);
        }

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: token
            }),
            params: params
        };
        return this.http.get<any>(this.configService.resourceApiURI + '/cities', httpOptions)
        .pipe(catchError(this.handleError));
    }
}