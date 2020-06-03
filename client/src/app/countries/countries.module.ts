import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../angular-material.module';
import { CountriesComponent } from './countries.component';
import { CountriesService } from './countries.service';
import { CountriesRoutingModule } from './countries-routing.module';

@NgModule({
    declarations: [CountriesComponent],
    providers: [CountriesService],
    imports: [CountriesRoutingModule, CommonModule, AngularMaterialModule]
})

export class CountriesModule {}
