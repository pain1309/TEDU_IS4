import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NewsComponent } from './news.component';
import { NewsRoutingModule } from './news-routing.module';
import { AngularMaterialModule } from '../angular-material.module';
import { NewsService } from './news.service';
import { NewDetailComponent } from './new-detail.component';

@NgModule({
    declarations: [NewsComponent, NewDetailComponent],
    providers: [NewsService],
    imports: [CommonModule, RouterModule, NewsRoutingModule, AngularMaterialModule]
})
export class NewsModule {}
