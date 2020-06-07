import { FormGroup, FormControl, Validators, AsyncValidatorFn, AbstractControl } from '@angular/forms';
import { City } from './city';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigService } from '../shared/config.service';
import { AuthService } from '../core/authentication/auth.service';
import { CitiesService } from './cities.service';
import { Component } from '@angular/core';
import { Country } from '../countries/country';
import { HttpParams, HttpClient } from '@angular/common/http';
import { CountriesService } from '../countries/countries.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-city-edit',
    templateUrl: './city-edit.component.html',
    styleUrls: ['./city-edit.component.css']
})

export class CityEditComponent {
    // the view title
    title: string;
    // the form model
    form: FormGroup;
    // the city object to edit or create
    city: City;
    // the city object id, as fetched from the active route:
    // It's NULL when we're adding a new city,
    // and not NULL when we're editing an existing one.
    id?: number;

    // the countries array for the select
    countries: Country[];


    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private configService: ConfigService,
        private authService: AuthService,
        private citiesService: CitiesService,
        private countriesService: CountriesService,
        private http: HttpClient) { }

    ngOnInit() {
        this.form = new FormGroup({
            name: new FormControl('', Validators.required),
            lat: new FormControl('', Validators.required),
            lon: new FormControl('', Validators.required),
            countryId: new FormControl('', Validators.required)
        }, null, this.isDupeCity());
        this.loadData();
    }

    isDupeCity(): AsyncValidatorFn {
        return (control: AbstractControl): Observable<{ [key: string]: any} | null> => {
            var city = <City>{};
            city.id = (this.id) ? this.id : 0;
            city.name = this.form.get('name').value;
            city.lat = +this.form.get('lat').value;
            city.lon = +this.form.get('lon').value;
            city.countryId = +this.form.get('countryId').value;

            return this.http.post<boolean>(this.configService.resourceApiURI + '/cities/IsDupeCity', city)
            .pipe(map(result => {
                return (result ? { isDupeCity: true } : null);
            }));
        }
    }
    loadData() {

        // load countries
        this.loadCountries();
        // retrieve the ID from the 'id' parameter
        this.id = +this.activatedRoute.snapshot.paramMap.get('id');

        if (this.id) {
            // EDIT MODE
            // fetch the city from the server
            this.citiesService.loadCityDetail(this.id, this.authService.authorizationHeaderValue)
                .subscribe(result => {
                    this.city = result;
                    this.title = 'Edit - ' + this.city.name;

                    // update the form with the city value
                    this.form.patchValue(this.city);
                }, error => console.error(error));
        } else {
            // ADD NEW MODE
            this.title = 'Create a new City';
        }
    }

    loadCountries() {
        // fetch all the countries from the server
        var params = new HttpParams()
        .set('pageSize', '9999')
        .set('sortColumn', 'name');

        this.countriesService.fetchCountriesDefault(this.authService.authorizationHeaderValue, params)
        .subscribe(result => 
            {
                this.countries = result.data;
            }, error => console.error(error));
    }

    onSubmit() {
        var city = (this.id) ? this.city : <City>{};

        city.name = this.form.get('name').value;
        city.lat = +this.form.get('lat').value;
        city.lon = +this.form.get('lon').value;
        city.countryId = +this.form.get('countryId').value;

        if (this.id) {
            // EDIT mode
            this.citiesService.updateCity(this.city.id, this.city, this.authService.authorizationHeaderValue)
                .subscribe(result => {
                    console.log('City ' + city.id + ' has been updated.');

                    // go back to cities view
                    this.router.navigate(['/cities']);
                });
        } else {
            // ADD NEW mode
            this.citiesService.addCity(this.configService.resourceApiURI + '/cities', city, this.authService.authorizationHeaderValue)
                .subscribe(result => {
                    console.log('City ' + result.id + ' has been created.');
                    // go back to cities view
                    this.router.navigate(['/cities']);
                }, error => console.log(error));
        }

    }
}