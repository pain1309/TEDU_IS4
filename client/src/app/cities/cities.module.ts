import { NgModule } from '@angular/core';
import { CitiesComponent } from './cities.component';
import { CitiesRoutingModule } from './cities-routing.module';
import { CommonModule } from '@angular/common';
import { CitiesService } from './cities.service';
import { AngularMaterialModule } from '../angular-material.module';
import { CityEditComponent } from './city-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [CitiesComponent, CityEditComponent],
    providers: [CitiesService],
    imports: [CitiesRoutingModule, CommonModule, AngularMaterialModule, FormsModule, ReactiveFormsModule]
})

export class CitiesModule {}
