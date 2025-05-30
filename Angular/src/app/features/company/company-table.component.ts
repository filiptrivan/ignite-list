import { ApiService } from 'src/app/business/services/api/api.service';
import { TranslocoService } from '@jsverse/transloco';
import { Component, OnInit } from '@angular/core';
import { Column } from 'spiderly';
import { Company } from 'src/app/business/entities/business-entities.generated';

@Component({
    selector: 'company-table',
    templateUrl: './company-table.component.html',
    styles: [],
    standalone: false
})
export class CompanyTableComponent implements OnInit {
    cols: Column<Company>[];

    getCompanyTableDataObservableMethod = this.apiService.getCompanyTableData;
    exportCompanyTableDataToExcelObservableMethod = this.apiService.exportCompanyTableDataToExcel;
    deleteCompanyObservableMethod = this.apiService.deleteCompany;

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
            {name: this.translocoService.translate('Name'), filterType: 'text', field: 'name'},
        ]
    }
}
