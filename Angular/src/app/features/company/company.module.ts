import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';
import { CompanyBaseDetailsComponent, NotificationBaseDetailsComponent, UserExtendedBaseDetailsComponent } from 'src/app/business/components/base-details/business-base-details.generated';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimengModule, SpiderlyDataTableComponent, SpiderlyControlsModule, CardSkeletonComponent, RoleBaseDetailsComponent } from 'spiderly';
import { CompanyDetailsComponent } from './company-details.component';
import { CompanyTableComponent } from './company-table.component';

const routes: Routes = [
    {
        path: 'companies',
        component: CompanyTableComponent,
    },
    {
        path: 'companies/:id',
        component: CompanyDetailsComponent,
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
    CompanyBaseDetailsComponent
],
declarations: [
        CompanyTableComponent,
        CompanyDetailsComponent,
    ],
    providers:[]
})
export class CompanyModule { }

