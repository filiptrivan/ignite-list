import { Component, OnInit } from '@angular/core';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { DataViewCardBody, Filter, getHtmlImgDisplayString64, SpiderlyControlsModule, SpiderlyDataViewComponent, SpiderlyTemplateTypeDirective } from 'spiderly';
import { Category, Project } from 'src/app/business/entities/business-entities.generated';
import { ApiService } from 'src/app/business/services/api/api.service';
import { ButtonModule } from 'primeng/button';

@Component({
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
  imports: [
    TranslocoDirective,
    SpiderlyDataViewComponent,
    SpiderlyTemplateTypeDirective,
    SpiderlyControlsModule,
    ButtonModule

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
      { name: this.translocoService.translate('CreatedAt'), filterType: 'date', field: 'createdAt', showMatchModes: true },
    ]
  }
  upvote(projectDTO: Project) {
    this.apiService.upvote(projectDTO.id).subscribe();
    projectDTO.hasUpvoted=!projectDTO.hasUpvoted;
  }
  getHtmlImgDisplayString64(base64String: string){
    console.log(base64String)
    return getHtmlImgDisplayString64(base64String);
  }
}

