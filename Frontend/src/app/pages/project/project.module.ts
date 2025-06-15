import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';
import { ProjectBaseDetailsComponent, NotificationBaseDetailsComponent, UserExtendedBaseDetailsComponent } from 'src/app/business/components/base-details/business-base-details.generated';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpiderlyDataTableComponent, SpiderlyControlsModule, CardSkeletonComponent, RoleBaseDetailsComponent } from 'spiderly';
import { ProjectDetailsComponent } from './project-details.component';
import { ProjectTableComponent } from './project-table.component';

const routes: Routes = [
    {
        path: 'projects',
        component: ProjectTableComponent,
    },
    {
        path: 'projects/:id',
        component: ProjectDetailsComponent,
    },
];

@NgModule({
    imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SpiderlyDataTableComponent,
    SpiderlyControlsModule,
    CardSkeletonComponent,
    TranslocoDirective,
    ProjectBaseDetailsComponent
],
declarations: [
        ProjectTableComponent,
        ProjectDetailsComponent,
    ],
    providers:[]
})
export class ProjectModule { }

