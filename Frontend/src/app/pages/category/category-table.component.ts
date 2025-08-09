import { ApiService } from 'src/app/business/services/api/api.service';
import { TranslocoService } from '@jsverse/transloco';
import { Component, OnInit } from '@angular/core';
import { Column } from 'spiderly';
import { Category } from 'src/app/business/entities/business-entities.generated';

@Component({
    selector: 'category-table',
    templateUrl: './category-table.component.html',
    styles: [],
    standalone: false
})
export class CategoryTableComponent implements OnInit {
    cols: Column<Category>[];

    getCategoryTableDataObservableMethod = this.apiService.getPaginatedCategoryList;
    exportCategoryTableDataToExcelObservableMethod = this.apiService.exportCategoryListToExcel;
    deleteCategoryObservableMethod = this.apiService.deleteCategory;

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
            {name: this.translocoService.translate('CategoryName'), filterType: 'text', field: 'name'},
        ]
    }
}
