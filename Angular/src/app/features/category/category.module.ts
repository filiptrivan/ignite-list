import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';
import { CategoryBaseDetailsComponent, NotificationBaseDetailsComponent, UserExtendedBaseDetailsComponent } from 'src/app/business/components/base-details/business-base-details.generated';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimengModule, SpiderlyDataTableComponent, SpiderlyControlsModule, CardSkeletonComponent, RoleBaseDetailsComponent } from 'spiderly';
import { CategoryDetailsComponent } from './category-details.component';
import { CategoryTableComponent } from './category-table.component';

const routes: Routes = [
    {
        path: 'categories',
        component: CategoryTableComponent,
    },
    {
        path: 'categories/:id',
        component: CategoryDetailsComponent,
    },
];

@NgModule({
    imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PrimengModule,
    SpiderlyDataTableComponent,
    SpiderlyControlsModule,
    CardSkeletonComponent,
    TranslocoDirective,
    CategoryBaseDetailsComponent
],
declarations: [
        CategoryTableComponent,
        CategoryDetailsComponent,
    ],
    providers:[]
})
export class CategoryModule { }

