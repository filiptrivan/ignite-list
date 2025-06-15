import { ApiService } from 'src/app/business/services/api/api.service';
import { TranslocoService } from '@jsverse/transloco';
import { Component, OnInit } from '@angular/core';
import { Column } from 'spiderly';
import { Project } from 'src/app/business/entities/business-entities.generated';

@Component({
    selector: 'project-table',
    templateUrl: './project-table.component.html',
    styles: [],
    standalone: false
})
export class ProjectTableComponent implements OnInit {
    cols: Column<Project>[];

    getProjectTableDataObservableMethod = this.apiService.getProjectTableData;
    exportProjectTableDataToExcelObservableMethod = this.apiService.exportProjectTableDataToExcel;
    deleteProjectObservableMethod = this.apiService.deleteProject;

    constructor(
        private apiService: ApiService,
        private translocoService: TranslocoService,
    ) { }

    ngOnInit(){
        this.cols = [
            {name: this.translocoService.translate('Actions'), actions:[
                {name: this.translocoService.translate('Details'), field: 'Details'},
                {name:  this.translocoService.translate('Delete'), field: 'Delete'},
            ]},
            {name: this.translocoService.translate('ProjectName'), filterType: 'text', field: 'projectName'},
        ]
    }
}
