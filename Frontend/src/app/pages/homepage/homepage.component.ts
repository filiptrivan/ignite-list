import { Component, OnInit } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { DataViewCardBody, DataViewFilter, getHtmlImgDisplayString64, SpiderlyControlsModule, SpiderlyDataViewComponent, SpiderlyTemplateTypeDirective } from 'spiderly';
import { Project } from 'src/app/business/entities/business-entities.generated';
import { ApiService } from 'src/app/business/services/api/api.service';
import { ButtonModule } from 'primeng/button';

@Component({
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
  imports: [
    SpiderlyDataViewComponent,
    SpiderlyTemplateTypeDirective,
    SpiderlyControlsModule,
    ButtonModule

  ],
})
export class HomepageComponent implements OnInit {
  templateType?: DataViewCardBody<Project>;
  filters: DataViewFilter<Project>[];

  getProjectTableDataObservableMethod = this.apiService.getPaginatedProjectList;

  constructor(
    private apiService: ApiService,
    private translocoService: TranslocoService,
  ) { }

  ngOnInit() {
    this.filters = [
      { label: this.translocoService.translate('Name'), type: 'text', field: 'projectName' },
      { label: this.translocoService.translate('CreatedAt'), type: 'date', field: 'createdAt', showMatchModes: true },
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

