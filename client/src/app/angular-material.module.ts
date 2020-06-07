import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';

@NgModule({
    imports: [MatTableModule, MatPaginatorModule, MatSortModule, MatInputModule, MatSelectModule, MatGridListModule, MatCardModule],
    exports: [MatTableModule, MatPaginatorModule, MatSortModule, MatInputModule, MatSelectModule, MatGridListModule, MatCardModule],
})
export class AngularMaterialModule {}
