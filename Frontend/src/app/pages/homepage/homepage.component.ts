import { Component, OnInit } from '@angular/core';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { DataViewCardBody, Filter, SpiderlyControlsModule, SpiderlyDataViewComponent, SpiderlyTemplateTypeDirective } from 'spiderly';
import { Category, Project } from 'src/app/business/entities/business-entities.generated';
import { ApiService } from 'src/app/business/services/api/api.service';

@Component({
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
  imports: [
    TranslocoDirective,
    SpiderlyDataViewComponent,
    SpiderlyTemplateTypeDirective,
    SpiderlyControlsModule

  ],
})
export class HomepageComponent implements OnInit {
  templateType?: DataViewCardBody<Project>;
  filters: Filter<Project>[];

  getProjectTableDataObservableMethod = this.apiService.getProjectTableData;

  constructor(
    private apiService: ApiService,
    private translocoService: TranslocoService,
  ) { }

  ngOnInit() {
    this.filters = [
      { name: this.translocoService.translate('Name'), filterType: 'text', field: 'projectName' },
      { name: this.translocoService.translate('Id'), filterType: 'numeric', field: 'id', showMatchModes: true },
      { name: this.translocoService.translate('CreatedAt'), filterType: 'date', field: 'createdAt', showMatchModes: true },
    ]
  }
  upvote(projectId: number) {
    this.apiService.upvote(projectId).subscribe();
  }

}

