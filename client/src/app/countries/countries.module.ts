import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../angular-material.module';
import { CountriesComponent } from './countries.component';
import { CountriesService } from './countries.service';
import { CountriesRoutingModule } from './countries-routing.module';
import { CountryEditComponent } from './country-edit.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
    declarations: [CountriesComponent, CountryEditComponent],
    providers: [CountriesService],
    imports: [CountriesRoutingModule, CommonModule, AngularMaterialModule, FormsModule, ReactiveFormsModule]
})

export class CountriesModule {}
