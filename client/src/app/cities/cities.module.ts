import { NgModule } from '@angular/core';
import { CitiesComponent } from './cities.component';
import { CitiesRoutingModule } from './cities-routing.module';
import { CommonModule } from '@angular/common';
import { CitiesService } from './cities.service';
import { AngularMaterialModule } from '../angular-material.module';

@NgModule({
    declarations: [CitiesComponent],
    providers: [CitiesService],
    imports: [CitiesRoutingModule, CommonModule, AngularMaterialModule]
})

export class CitiesModule {}
