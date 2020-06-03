import { Component, Inject, ViewChild } from '@angular/core';
import { AuthService } from '../core/authentication/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ConfigService } from '../shared/config.service';
import { MatSort } from '@angular/material/sort';
import { Country } from './country';
import { CountriesService } from './countries.service';

@Component({
    selector: 'app-countries',
    templateUrl: './countries.component.html',
    styleUrls: ['./countries.component.css'],
})
export class CountriesComponent {
    public displayedColumns: string[] = ['id', 'name', 'iso2', 'iso3'];
    public countries: MatTableDataSource<Country>;
    busy: boolean;
    // We used the @ViewChild decorator to set a static view query and store its
    // result to the paginator variable; this allows us to access and manipulate
    // the MatPaginator instance that we previously set up in our Component's
    // template from within the Component class
    @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: false}) sort: MatSort;

    defaultPageIndex: number = 0;
    defaultPageSize: number = 10;
    public defaultSortColumn: string = 'name';
    public defaultSortOrder: string = 'asc';

    defaultFilterColumn: string = 'name';
    filterQuery:string = null;

    constructor(
        private authService: AuthService,
        private citiesService: CountriesService,
        private spinner: NgxSpinnerService,
        private configService: ConfigService
    ) {}

    ngOnInit() {
        this.loadData();
    }

    loadData(query: string = null) {
        var pageEvent = new PageEvent();
        pageEvent.pageIndex = this.defaultPageIndex;
        pageEvent.pageSize = this.defaultPageSize;
        if (query) {
            this.filterQuery = query;
        }
        this.getData(pageEvent);
    }

    getData(event: PageEvent) {
        this.citiesService.fetchCities(this.authService.authorizationHeaderValue, event, this.sort, this.filterQuery)
            .subscribe(result => {
                this.paginator.length = result.totalCount;
                this.paginator.pageIndex = result.pageIndex;
                this.paginator.pageSize = result.pageSize;
                this.countries = new MatTableDataSource<Country>(result.data);
            }, error => console.error(error));
    }
}
