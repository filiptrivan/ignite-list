import { ValidatorService } from 'src/app/business/services/validators/validators';
import { DropdownChangeEvent } from 'primeng/dropdown';
import { CheckboxChangeEvent } from 'primeng/checkbox';
import { TranslateLabelsService } from '../../services/translates/merge-labels';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, firstValueFrom, forkJoin, map, Observable, of, Subscription } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../services/auth/auth.service';
import { SpiderlyControlsModule, CardSkeletonComponent, IndexCardComponent, IsAuthorizedForSaveEvent, SpiderlyDataTableComponent, SpiderlyFormArray, BaseEntity, LastMenuIconIndexClicked, SpiderlyFormGroup, SpiderlyButton, nameof, BaseFormService, getControl, Column, Filter, LazyLoadSelectedIdsResult, AllClickEvent, SpiderlyFileSelectEvent, getPrimengDropdownNamebookOptions, PrimengOption, SpiderlyFormControl, getPrimengAutocompleteNamebookOptions } from 'spiderly';
import { Notification, NotificationSaveBody, Project, Category, ProjectCategory, Upvote, User, UserNotification, CategorySaveBody, ProjectSaveBody, ProjectCategorySaveBody, UpvoteSaveBody, UserSaveBody, UserNotificationSaveBody } from '../../entities/business-entities.generated';

@Component({
    selector: 'category-base-details',
    template: `
<ng-container *transloco="let t">
    <spiderly-panel [isFirstMultiplePanel]="isFirstMultiplePanel" [isMiddleMultiplePanel]="isMiddleMultiplePanel" [isLastMultiplePanel]="isLastMultiplePanel" [showPanelHeader]="showPanelHeader" >
        <panel-header [title]="panelTitle" [showBigTitle]="showBigPanelTitle" [icon]="panelIcon"></panel-header>

        <panel-body>
            @defer (when loading === false) {
                <form class="grid">
                    <ng-content select="[BEFORE]"></ng-content>
                    <div *ngIf="showNameForCategory" class="col-12 md:col-6">
                        <spiderly-textbox [control]="control('name', categoryFormGroup)"></spiderly-textbox>
                    </div>
                    <ng-content select="[AFTER]"></ng-content>
                </form>
            } @placeholder {
                <card-skeleton [height]="502"></card-skeleton>
            }
        </panel-body>

        <panel-footer>
            <spiderly-button [disabled]="!isAuthorizedForSave" (onClick)="save()" [label]="t('Save')" icon="pi pi-save"></spiderly-button>
            @for (button of additionalButtons; track button.label) {
                <spiderly-button (onClick)="button.onClick()" [disabled]="button.disabled" [label]="button.label" [icon]="button.icon"></spiderly-button>
            }
            <return-button *ngIf="showReturnButton" ></return-button>
        </panel-footer>
    </spiderly-panel>
</ng-container>
    `,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SpiderlyControlsModule,
        TranslocoDirective,
        CardSkeletonComponent,
        IndexCardComponent,
        SpiderlyDataTableComponent,
    ]
})
export class CategoryBaseDetailsComponent {
    @Output() onSave = new EventEmitter<void>();
    @Output() onAfterFormGroupInit = new EventEmitter<void>();
    @Input() getCrudMenuForOrderedData: (formArray: SpiderlyFormArray, modelConstructor: BaseEntity, lastMenuIconIndexClicked: LastMenuIconIndexClicked, adjustFormArrayManually: boolean) => MenuItem[];
    @Input() formGroup: SpiderlyFormGroup;
    @Input() categoryFormGroup: SpiderlyFormGroup<Category>;
    @Input() additionalButtons: SpiderlyButton[] = [];
    @Input() isFirstMultiplePanel: boolean = false;
    @Input() isMiddleMultiplePanel: boolean = false;
    @Input() isLastMultiplePanel: boolean = false;
    @Input() showPanelHeader: boolean = true;
    @Input() panelTitle: string;
    @Input() showBigPanelTitle: boolean = true;
    @Input() panelIcon: string;
    @Input() showReturnButton: boolean = true;
    authorizationForSaveSubscription: Subscription;
    @Input() authorizedForSaveObservable: () => Observable<boolean> = () => of(false);
    isAuthorizedForSave: boolean = false;
    @Output() onIsAuthorizedForSaveChange = new EventEmitter<IsAuthorizedForSaveEvent>(); 

    modelId: number;
    loading: boolean = true;

    categorySaveBodyName: string = nameof<CategorySaveBody>('categoryDTO');









    @Input() showNameForCategory = true;




    constructor(
        private apiService: ApiService,
        private route: ActivatedRoute,
        private baseFormService: BaseFormService,
        private validatorService: ValidatorService,
        private translateLabelsService: TranslateLabelsService,
        private translocoService: TranslocoService,
        private authService: AuthService,
    ) {}

    ngOnInit(){
        this.formGroup.initSaveBody = () => { 
            let saveBody = new CategorySaveBody();
            saveBody.categoryDTO = this.categoryFormGroup.getRawValue();




            return saveBody;
        }

        this.formGroup.saveObservableMethod = this.apiService.saveCategory;
        this.formGroup.mainDTOName = this.categorySaveBodyName;

        this.route.params.subscribe(async (params) => {
            this.modelId = params['id'];




            if(this.modelId > 0){
                forkJoin({
                    mainUIFormDTO: this.apiService.getCategoryMainUIFormDTO(this.modelId),
                })
                .subscribe(({ mainUIFormDTO }) => {
                    this.initCategoryFormGroup(new Category(mainUIFormDTO.categoryDTO));



                    this.authorizationForSaveSubscription = this.handleAuthorizationForSave().subscribe();
                    this.loading = false;
                });
            }
            else{
                this.initCategoryFormGroup(new Category({id: 0}));

                this.authorizationForSaveSubscription = this.handleAuthorizationForSave().subscribe();
                this.loading = false;
            }
        });
    }

    initCategoryFormGroup(category: Category) {
        this.baseFormService.addFormGroup<Category>(
            this.categoryFormGroup, 
            this.formGroup, 
            category, 
            this.categorySaveBodyName,
            ['createdAt', 'modifiedAt']
        );
        this.categoryFormGroup.mainDTOName = this.categorySaveBodyName;

        this.onAfterFormGroupInit.next();
    }

    handleAuthorizationForSave = () => {
        return combineLatest([this.authService.currentUserPermissionCodes$, this.authorizedForSaveObservable()]).pipe(
            map(([currentUserPermissionCodes, isAuthorizedForSave]) => {
                if (currentUserPermissionCodes != null && isAuthorizedForSave != null) {
                    this.isAuthorizedForSave =

                        (currentUserPermissionCodes.includes('InsertCategory') && this.modelId <= 0) || 
                        (currentUserPermissionCodes.includes('UpdateCategory') && this.modelId > 0) ||
                        isAuthorizedForSave;

                    if (this.isAuthorizedForSave) { 
                        this.categoryFormGroup.controls.name.enable();

                    }
                    else{
                        this.categoryFormGroup.controls.name.disable();

                    }

                    this.onIsAuthorizedForSaveChange.next(new IsAuthorizedForSaveEvent({
                        isAuthorizedForSave: this.isAuthorizedForSave, 
                        currentUserPermissionCodes: currentUserPermissionCodes
                    })); 
                }
            })
        );
    }











    control(formControlName: string, formGroup: SpiderlyFormGroup){
        return getControl(formControlName, formGroup);
    }

    getFormArrayGroups<T>(formArray: SpiderlyFormArray): SpiderlyFormGroup<T>[]{
        return this.baseFormService.getFormArrayGroups<T>(formArray);
    }

    save(){
        this.onSave.next();
    }

	ngOnDestroy(){
        if (this.authorizationForSaveSubscription) {
            this.authorizationForSaveSubscription.unsubscribe();
        }
    }

}

@Component({
    selector: 'notification-base-details',
    template: `
<ng-container *transloco="let t">
    <spiderly-panel [isFirstMultiplePanel]="isFirstMultiplePanel" [isMiddleMultiplePanel]="isMiddleMultiplePanel" [isLastMultiplePanel]="isLastMultiplePanel" [showPanelHeader]="showPanelHeader" >
        <panel-header [title]="panelTitle" [showBigTitle]="showBigPanelTitle" [icon]="panelIcon"></panel-header>

        <panel-body>
            @defer (when loading === false) {
                <form class="grid">
                    <ng-content select="[BEFORE]"></ng-content>
                    <div *ngIf="showTitleForNotification" class="col-12">
                        <spiderly-textbox [control]="control('title', notificationFormGroup)"></spiderly-textbox>
                    </div>
                    <div *ngIf="showDescriptionForNotification" class="col-12">
                        <spiderly-textarea [control]="control('description', notificationFormGroup)"></spiderly-textarea>
                    </div>
                    <div *ngIf="showEmailBodyForNotification" class="col-12">
                        <spiderly-editor [control]="control('emailBody', notificationFormGroup)"></spiderly-editor>
                    </div>
                    <div *ngIf="showRecipientsForNotification" class="col-12">
                        <spiderly-data-table 
                            [tableTitle]="t('Recipients')" 
                            [cols]="recipientsTableColsForNotification" 
                            [getPaginatedListObservableMethod]="getPaginatedRecipientsListObservableMethodForNotification" 
                            [exportListToExcelObservableMethod]="exportRecipientsListToExcelObservableMethodForNotification"
                            [showAddButton]="false" 
                            [readonly]="!isAuthorizedForSave"
                            selectionMode="multiple"
                            [newlySelectedItems]="newlySelectedRecipientsIdsForNotification" 
                            [unselectedItems]="unselectedRecipientsIdsForNotification" 
                            [rows]="5" 
                            (onLazyLoad)="onRecipientsLazyLoadForNotification($event)"
                            [selectedLazyLoadObservableMethod]="selectedRecipientsLazyLoadMethodForNotification" 
                            (onIsAllSelectedChange)="areAllRecipientsSelectedChangeForNotification($event)"></spiderly-data-table>
                    </div>
                    <ng-content select="[AFTER]"></ng-content>
                </form>
            } @placeholder {
                <card-skeleton [height]="502"></card-skeleton>
            }
        </panel-body>

        <panel-footer>
            <spiderly-button [disabled]="!isAuthorizedForSave" (onClick)="save()" [label]="t('Save')" icon="pi pi-save"></spiderly-button>
            @for (button of additionalButtons; track button.label) {
                <spiderly-button (onClick)="button.onClick()" [disabled]="button.disabled" [label]="button.label" [icon]="button.icon"></spiderly-button>
            }
            <return-button *ngIf="showReturnButton" ></return-button>
        </panel-footer>
    </spiderly-panel>
</ng-container>
    `,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SpiderlyControlsModule,
        TranslocoDirective,
        CardSkeletonComponent,
        IndexCardComponent,
        SpiderlyDataTableComponent,
    ]
})
export class NotificationBaseDetailsComponent {
    @Output() onSave = new EventEmitter<void>();
    @Output() onAfterFormGroupInit = new EventEmitter<void>();
    @Input() getCrudMenuForOrderedData: (formArray: SpiderlyFormArray, modelConstructor: BaseEntity, lastMenuIconIndexClicked: LastMenuIconIndexClicked, adjustFormArrayManually: boolean) => MenuItem[];
    @Input() formGroup: SpiderlyFormGroup;
    @Input() notificationFormGroup: SpiderlyFormGroup<Notification>;
    @Input() additionalButtons: SpiderlyButton[] = [];
    @Input() isFirstMultiplePanel: boolean = false;
    @Input() isMiddleMultiplePanel: boolean = false;
    @Input() isLastMultiplePanel: boolean = false;
    @Input() showPanelHeader: boolean = true;
    @Input() panelTitle: string;
    @Input() showBigPanelTitle: boolean = true;
    @Input() panelIcon: string;
    @Input() showReturnButton: boolean = true;
    authorizationForSaveSubscription: Subscription;
    @Input() authorizedForSaveObservable: () => Observable<boolean> = () => of(false);
    isAuthorizedForSave: boolean = false;
    @Output() onIsAuthorizedForSaveChange = new EventEmitter<IsAuthorizedForSaveEvent>(); 

    modelId: number;
    loading: boolean = true;

    notificationSaveBodyName: string = nameof<NotificationSaveBody>('notificationDTO');







    recipientsTableColsForNotification: Column<User>[];
    getPaginatedRecipientsListObservableMethodForNotification = this.apiService.getPaginatedRecipientsListForNotification;
    exportRecipientsListToExcelObservableMethodForNotification = this.apiService.exportRecipientsListToExcelForNotification;
    newlySelectedRecipientsIdsForNotification: number[] = [];
    unselectedRecipientsIdsForNotification: number[] = [];
    areAllRecipientsSelectedForNotification: boolean = null;
    lastRecipientsLazyLoadTableFilterForNotification: Filter;

    @Input() showTitleForNotification = true;
    @Input() showDescriptionForNotification = true;
    @Input() showEmailBodyForNotification = true;
    @Input() showRecipientsForNotification = true;




    constructor(
        private apiService: ApiService,
        private route: ActivatedRoute,
        private baseFormService: BaseFormService,
        private validatorService: ValidatorService,
        private translateLabelsService: TranslateLabelsService,
        private translocoService: TranslocoService,
        private authService: AuthService,
    ) {}

    ngOnInit(){
        this.formGroup.initSaveBody = () => { 
            let saveBody = new NotificationSaveBody();
            saveBody.notificationDTO = this.notificationFormGroup.getRawValue();



            saveBody.selectedRecipientsIds = this.newlySelectedRecipientsIdsForNotification;
            saveBody.unselectedRecipientsIds = this.unselectedRecipientsIdsForNotification;
            saveBody.areAllRecipientsSelected = this.areAllRecipientsSelectedForNotification;
            saveBody.recipientsTableFilter = this.lastRecipientsLazyLoadTableFilterForNotification;
            return saveBody;
        }

        this.formGroup.saveObservableMethod = this.apiService.saveNotification;
        this.formGroup.mainDTOName = this.notificationSaveBodyName;

        this.route.params.subscribe(async (params) => {
            this.modelId = params['id'];


            this.recipientsTableColsForNotification = [
                {name: this.translocoService.translate('Email'), filterType: 'text', field: 'email'  },
                {name: this.translocoService.translate('CreatedAt'), filterType: 'date', field: 'createdAt' , showMatchModes: true }
            ];

            if(this.modelId > 0){
                forkJoin({
                    mainUIFormDTO: this.apiService.getNotificationMainUIFormDTO(this.modelId),
                })
                .subscribe(({ mainUIFormDTO }) => {
                    this.initNotificationFormGroup(new Notification(mainUIFormDTO.notificationDTO));



                    this.authorizationForSaveSubscription = this.handleAuthorizationForSave().subscribe();
                    this.loading = false;
                });
            }
            else{
                this.initNotificationFormGroup(new Notification({id: 0}));

                this.authorizationForSaveSubscription = this.handleAuthorizationForSave().subscribe();
                this.loading = false;
            }
        });
    }

    initNotificationFormGroup(notification: Notification) {
        this.baseFormService.addFormGroup<Notification>(
            this.notificationFormGroup, 
            this.formGroup, 
            notification, 
            this.notificationSaveBodyName,
            ['createdAt', 'modifiedAt']
        );
        this.notificationFormGroup.mainDTOName = this.notificationSaveBodyName;

        this.onAfterFormGroupInit.next();
    }

    handleAuthorizationForSave = () => {
        return combineLatest([this.authService.currentUserPermissionCodes$, this.authorizedForSaveObservable()]).pipe(
            map(([currentUserPermissionCodes, isAuthorizedForSave]) => {
                if (currentUserPermissionCodes != null && isAuthorizedForSave != null) {
                    this.isAuthorizedForSave =

                        (currentUserPermissionCodes.includes('InsertNotification') && this.modelId <= 0) || 
                        (currentUserPermissionCodes.includes('UpdateNotification') && this.modelId > 0) ||
                        isAuthorizedForSave;

                    if (this.isAuthorizedForSave) { 
                        this.notificationFormGroup.controls.title.enable();
                        this.notificationFormGroup.controls.description.enable();
                        this.notificationFormGroup.controls.emailBody.enable();

                    }
                    else{
                        this.notificationFormGroup.controls.title.disable();
                        this.notificationFormGroup.controls.description.disable();
                        this.notificationFormGroup.controls.emailBody.disable();

                    }

                    this.onIsAuthorizedForSaveChange.next(new IsAuthorizedForSaveEvent({
                        isAuthorizedForSave: this.isAuthorizedForSave, 
                        currentUserPermissionCodes: currentUserPermissionCodes
                    })); 
                }
            })
        );
    }





    selectedRecipientsLazyLoadMethodForNotification = (event: Filter): Observable<LazyLoadSelectedIdsResult> => {
        let filter: Filter = event;
        filter.additionalFilterIdLong = this.modelId;

        return this.apiService.lazyLoadSelectedRecipientsIdsForNotification(filter);
    }
    areAllRecipientsSelectedChangeForNotification(event: AllClickEvent){
        this.areAllRecipientsSelectedForNotification = event.checked;
    }
    onRecipientsLazyLoadForNotification(event: Filter){
        this.lastRecipientsLazyLoadTableFilterForNotification = event;
    }





    control(formControlName: string, formGroup: SpiderlyFormGroup){
        return getControl(formControlName, formGroup);
    }

    getFormArrayGroups<T>(formArray: SpiderlyFormArray): SpiderlyFormGroup<T>[]{
        return this.baseFormService.getFormArrayGroups<T>(formArray);
    }

    save(){
        this.onSave.next();
    }

	ngOnDestroy(){
        if (this.authorizationForSaveSubscription) {
            this.authorizationForSaveSubscription.unsubscribe();
        }
    }

}

@Component({
    selector: 'project-base-details',
    template: `
<ng-container *transloco="let t">
    <spiderly-panel [isFirstMultiplePanel]="isFirstMultiplePanel" [isMiddleMultiplePanel]="isMiddleMultiplePanel" [isLastMultiplePanel]="isLastMultiplePanel" [showPanelHeader]="showPanelHeader" >
        <panel-header [title]="panelTitle" [showBigTitle]="showBigPanelTitle" [icon]="panelIcon"></panel-header>

        <panel-body>
            @defer (when loading === false) {
                <form class="grid">
                    <ng-content select="[BEFORE]"></ng-content>
                    <div *ngIf="showLogoBlobNameForProject" class="col-12">
                        <spiderly-file [control]="control('logoBlobName', projectFormGroup)" [fileData]="projectFormGroup.controls.logoBlobNameData.getRawValue()" [objectId]="projectFormGroup.controls.id.getRawValue()" (onFileSelected)="uploadLogoBlobNameForProject($event)" [disabled]="!isAuthorizedForSave"></spiderly-file>
                    </div>
                    <div *ngIf="showProjectNameForProject" class="col-12 md:col-6">
                        <spiderly-textbox [control]="control('projectName', projectFormGroup)"></spiderly-textbox>
                    </div>
                    <div *ngIf="showLinkForProject" class="col-12 md:col-6">
                        <spiderly-textbox [control]="control('link', projectFormGroup)"></spiderly-textbox>
                    </div>
                    <div *ngIf="showUpvoteCountForProject" class="col-12 md:col-6">
                        <spiderly-number [control]="control('upvoteCount', projectFormGroup)"></spiderly-number>
                    </div>
                    <div *ngIf="showCategoriesForProject" class="col-12">
                        <spiderly-multiselect [control]="selectedCategoriesForProject" [options]="categoriesOptionsForProject" [label]="t('Categories')"></spiderly-multiselect>
                    </div>
                    <div *ngIf="showDescriptionForProject" class="col-12">
                        <spiderly-textarea [control]="control('description', projectFormGroup)"></spiderly-textarea>
                    </div>
                    <ng-content select="[AFTER]"></ng-content>
                </form>
            } @placeholder {
                <card-skeleton [height]="502"></card-skeleton>
            }
        </panel-body>

        <panel-footer>
            <spiderly-button [disabled]="!isAuthorizedForSave" (onClick)="save()" [label]="t('Save')" icon="pi pi-save"></spiderly-button>
            @for (button of additionalButtons; track button.label) {
                <spiderly-button (onClick)="button.onClick()" [disabled]="button.disabled" [label]="button.label" [icon]="button.icon"></spiderly-button>
            }
            <return-button *ngIf="showReturnButton" ></return-button>
        </panel-footer>
    </spiderly-panel>
</ng-container>
    `,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SpiderlyControlsModule,
        TranslocoDirective,
        CardSkeletonComponent,
        IndexCardComponent,
        SpiderlyDataTableComponent,
    ]
})
export class ProjectBaseDetailsComponent {
    @Output() onSave = new EventEmitter<void>();
    @Output() onAfterFormGroupInit = new EventEmitter<void>();
    @Input() getCrudMenuForOrderedData: (formArray: SpiderlyFormArray, modelConstructor: BaseEntity, lastMenuIconIndexClicked: LastMenuIconIndexClicked, adjustFormArrayManually: boolean) => MenuItem[];
    @Input() formGroup: SpiderlyFormGroup;
    @Input() projectFormGroup: SpiderlyFormGroup<Project>;
    @Input() additionalButtons: SpiderlyButton[] = [];
    @Input() isFirstMultiplePanel: boolean = false;
    @Input() isMiddleMultiplePanel: boolean = false;
    @Input() isLastMultiplePanel: boolean = false;
    @Input() showPanelHeader: boolean = true;
    @Input() panelTitle: string;
    @Input() showBigPanelTitle: boolean = true;
    @Input() panelIcon: string;
    @Input() showReturnButton: boolean = true;
    authorizationForSaveSubscription: Subscription;
    @Input() authorizedForSaveObservable: () => Observable<boolean> = () => of(true);
    isAuthorizedForSave: boolean = true;
    @Output() onIsAuthorizedForSaveChange = new EventEmitter<IsAuthorizedForSaveEvent>(); 

    modelId: number;
    loading: boolean = true;

    projectSaveBodyName: string = nameof<ProjectSaveBody>('projectDTO');



    categoriesOptionsForProject: PrimengOption[];

    selectedCategoriesForProject = new SpiderlyFormControl<number[]>(null, {updateOn: 'change'});



    @Input() showLogoBlobNameForProject = true;
    @Input() showProjectNameForProject = true;
    @Input() showLinkForProject = true;
    @Input() showUpvoteCountForProject = true;
    @Input() showCategoriesForProject = true;
    @Input() showDescriptionForProject = true;




    constructor(
        private apiService: ApiService,
        private route: ActivatedRoute,
        private baseFormService: BaseFormService,
        private validatorService: ValidatorService,
        private translateLabelsService: TranslateLabelsService,
        private translocoService: TranslocoService,
        private authService: AuthService,
    ) {}

    ngOnInit(){
        this.formGroup.initSaveBody = () => { 
            let saveBody = new ProjectSaveBody();
            saveBody.projectDTO = this.projectFormGroup.getRawValue();

            saveBody.selectedCategoriesIds = this.selectedCategoriesForProject.getRawValue();


            return saveBody;
        }

        this.formGroup.saveObservableMethod = this.apiService.saveProject;
        this.formGroup.mainDTOName = this.projectSaveBodyName;

        this.route.params.subscribe(async (params) => {
            this.modelId = params['id'];

            getPrimengDropdownNamebookOptions(this.apiService.getCategoriesDropdownListForProject, this.modelId).subscribe(po => {
                this.categoriesOptionsForProject = po;
            });


            if(this.modelId > 0){
                forkJoin({
                    mainUIFormDTO: this.apiService.getProjectMainUIFormDTO(this.modelId),
                })
                .subscribe(({ mainUIFormDTO }) => {
                    this.initProjectFormGroup(new Project(mainUIFormDTO.projectDTO));

                    this.selectedCategoriesForProject.setValue(
                        mainUIFormDTO.categoriesNamebookDTOList.map(n => { return n.id })
                    );

                    this.authorizationForSaveSubscription = this.handleAuthorizationForSave().subscribe();
                    this.loading = false;
                });
            }
            else{
                this.initProjectFormGroup(new Project({id: 0}));

                this.authorizationForSaveSubscription = this.handleAuthorizationForSave().subscribe();
                this.loading = false;
            }
        });
    }

    initProjectFormGroup(project: Project) {
        this.baseFormService.addFormGroup<Project>(
            this.projectFormGroup, 
            this.formGroup, 
            project, 
            this.projectSaveBodyName,
            ['createdAt', 'modifiedAt']
        );
        this.projectFormGroup.mainDTOName = this.projectSaveBodyName;

        this.onAfterFormGroupInit.next();
    }

    handleAuthorizationForSave = () => {
        return combineLatest([this.authService.currentUserPermissionCodes$, this.authorizedForSaveObservable()]).pipe(
            map(([currentUserPermissionCodes, isAuthorizedForSave]) => {
                if (currentUserPermissionCodes != null && isAuthorizedForSave != null) {
                    this.isAuthorizedForSave =

                        (currentUserPermissionCodes.includes('InsertProject') && this.modelId <= 0) || 
                        (currentUserPermissionCodes.includes('UpdateProject') && this.modelId > 0) ||
                        isAuthorizedForSave;

                    if (this.isAuthorizedForSave) { 
                        this.projectFormGroup.controls.logoBlobName.enable();
                        this.projectFormGroup.controls.projectName.enable();
                        this.projectFormGroup.controls.link.enable();
                        this.projectFormGroup.controls.upvoteCount.enable();
                        this.selectedCategoriesForProject.enable();
                        this.projectFormGroup.controls.description.enable();

                    }
                    else{
                        this.projectFormGroup.controls.logoBlobName.disable();
                        this.projectFormGroup.controls.projectName.disable();
                        this.projectFormGroup.controls.link.disable();
                        this.projectFormGroup.controls.upvoteCount.disable();
                        this.selectedCategoriesForProject.disable();
                        this.projectFormGroup.controls.description.disable();

                    }

                    this.onIsAuthorizedForSaveChange.next(new IsAuthorizedForSaveEvent({
                        isAuthorizedForSave: this.isAuthorizedForSave, 
                        currentUserPermissionCodes: currentUserPermissionCodes
                    })); 
                }
            })
        );
    }









    uploadLogoBlobNameForProject(event: SpiderlyFileSelectEvent){
        this.apiService.uploadLogoBlobNameForProject(event.formData).subscribe((completeFileName: string) => {
            this.projectFormGroup.controls.logoBlobName.setValue(completeFileName);
        });
    }

    control(formControlName: string, formGroup: SpiderlyFormGroup){
        return getControl(formControlName, formGroup);
    }

    getFormArrayGroups<T>(formArray: SpiderlyFormArray): SpiderlyFormGroup<T>[]{
        return this.baseFormService.getFormArrayGroups<T>(formArray);
    }

    save(){
        this.onSave.next();
    }

	ngOnDestroy(){
        if (this.authorizationForSaveSubscription) {
            this.authorizationForSaveSubscription.unsubscribe();
        }
    }

}

@Component({
    selector: 'user-base-details',
    template: `
<ng-container *transloco="let t">
    <spiderly-panel [isFirstMultiplePanel]="isFirstMultiplePanel" [isMiddleMultiplePanel]="isMiddleMultiplePanel" [isLastMultiplePanel]="isLastMultiplePanel" [showPanelHeader]="showPanelHeader" >
        <panel-header [title]="panelTitle" [showBigTitle]="showBigPanelTitle" [icon]="panelIcon"></panel-header>

        <panel-body>
            @defer (when loading === false) {
                <form class="grid">
                    <ng-content select="[BEFORE]"></ng-content>
                    <div *ngIf="showNameForUser" class="col-12 md:col-6">
                        <spiderly-textbox [control]="control('name', userFormGroup)"></spiderly-textbox>
                    </div>
                    <div *ngIf="showAgeForUser" class="col-12 md:col-6">
                        <spiderly-number [control]="control('age', userFormGroup)"></spiderly-number>
                    </div>
                    <div *ngIf="showHasLoggedInWithExternalProviderForUser" class="col-12 md:col-6">
                        <spiderly-checkbox [control]="control('hasLoggedInWithExternalProvider', userFormGroup)" (onChange)="onHasLoggedInWithExternalProviderForUserChange.next($event)"></spiderly-checkbox>
                    </div>
                    <div *ngIf="showIsDisabledForUser" class="col-12 md:col-6">
                        <spiderly-checkbox [control]="control('isDisabled', userFormGroup)" (onChange)="onIsDisabledForUserChange.next($event)"></spiderly-checkbox>
                    </div>
                    <div *ngIf="showDescriptionForUser" class="col-12">
                        <spiderly-textarea [control]="control('description', userFormGroup)"></spiderly-textarea>
                    </div>
                    <ng-content select="[AFTER]"></ng-content>
                </form>
            } @placeholder {
                <card-skeleton [height]="502"></card-skeleton>
            }
        </panel-body>

        <panel-footer>
            <spiderly-button [disabled]="!isAuthorizedForSave" (onClick)="save()" [label]="t('Save')" icon="pi pi-save"></spiderly-button>
            @for (button of additionalButtons; track button.label) {
                <spiderly-button (onClick)="button.onClick()" [disabled]="button.disabled" [label]="button.label" [icon]="button.icon"></spiderly-button>
            }
            <return-button *ngIf="showReturnButton" ></return-button>
        </panel-footer>
    </spiderly-panel>
</ng-container>
    `,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SpiderlyControlsModule,
        TranslocoDirective,
        CardSkeletonComponent,
        IndexCardComponent,
        SpiderlyDataTableComponent,
    ]
})
export class UserBaseDetailsComponent {
    @Output() onSave = new EventEmitter<void>();
    @Output() onAfterFormGroupInit = new EventEmitter<void>();
    @Input() getCrudMenuForOrderedData: (formArray: SpiderlyFormArray, modelConstructor: BaseEntity, lastMenuIconIndexClicked: LastMenuIconIndexClicked, adjustFormArrayManually: boolean) => MenuItem[];
    @Input() formGroup: SpiderlyFormGroup;
    @Input() userFormGroup: SpiderlyFormGroup<User>;
    @Input() additionalButtons: SpiderlyButton[] = [];
    @Input() isFirstMultiplePanel: boolean = false;
    @Input() isMiddleMultiplePanel: boolean = false;
    @Input() isLastMultiplePanel: boolean = false;
    @Input() showPanelHeader: boolean = true;
    @Input() panelTitle: string;
    @Input() showBigPanelTitle: boolean = true;
    @Input() panelIcon: string;
    @Input() showReturnButton: boolean = true;
    authorizationForSaveSubscription: Subscription;
    @Input() authorizedForSaveObservable: () => Observable<boolean> = () => of(true);
    isAuthorizedForSave: boolean = true;
    @Output() onIsAuthorizedForSaveChange = new EventEmitter<IsAuthorizedForSaveEvent>(); 

    modelId: number;
    loading: boolean = true;

    userSaveBodyName: string = nameof<UserSaveBody>('userDTO');









    @Input() showNameForUser = true;
    @Input() showAgeForUser = true;
    @Input() showHasLoggedInWithExternalProviderForUser = true;
    @Input() showIsDisabledForUser = true;
    @Input() showDescriptionForUser = true;


    @Output() onHasLoggedInWithExternalProviderForUserChange = new EventEmitter<CheckboxChangeEvent>();
    @Output() onIsDisabledForUserChange = new EventEmitter<CheckboxChangeEvent>();


    constructor(
        private apiService: ApiService,
        private route: ActivatedRoute,
        private baseFormService: BaseFormService,
        private validatorService: ValidatorService,
        private translateLabelsService: TranslateLabelsService,
        private translocoService: TranslocoService,
        private authService: AuthService,
    ) {}

    ngOnInit(){
        this.formGroup.initSaveBody = () => { 
            let saveBody = new UserSaveBody();
            saveBody.userDTO = this.userFormGroup.getRawValue();




            return saveBody;
        }

        this.formGroup.saveObservableMethod = this.apiService.saveUser;
        this.formGroup.mainDTOName = this.userSaveBodyName;

        this.route.params.subscribe(async (params) => {
            this.modelId = params['id'];




            if(this.modelId > 0){
                forkJoin({
                    mainUIFormDTO: this.apiService.getUserMainUIFormDTO(this.modelId),
                })
                .subscribe(({ mainUIFormDTO }) => {
                    this.initUserFormGroup(new User(mainUIFormDTO.userDTO));



                    this.authorizationForSaveSubscription = this.handleAuthorizationForSave().subscribe();
                    this.loading = false;
                });
            }
            else{
                this.initUserFormGroup(new User({id: 0}));

                this.authorizationForSaveSubscription = this.handleAuthorizationForSave().subscribe();
                this.loading = false;
            }
        });
    }

    initUserFormGroup(user: User) {
        this.baseFormService.addFormGroup<User>(
            this.userFormGroup, 
            this.formGroup, 
            user, 
            this.userSaveBodyName,
            ['createdAt', 'modifiedAt']
        );
        this.userFormGroup.mainDTOName = this.userSaveBodyName;

        this.onAfterFormGroupInit.next();
    }

    handleAuthorizationForSave = () => {
        return combineLatest([this.authService.currentUserPermissionCodes$, this.authorizedForSaveObservable()]).pipe(
            map(([currentUserPermissionCodes, isAuthorizedForSave]) => {
                if (currentUserPermissionCodes != null && isAuthorizedForSave != null) {
                    this.isAuthorizedForSave =

                        (currentUserPermissionCodes.includes('InsertUser') && this.modelId <= 0) || 
                        (currentUserPermissionCodes.includes('UpdateUser') && this.modelId > 0) ||
                        isAuthorizedForSave;

                    if (this.isAuthorizedForSave) { 
                        this.userFormGroup.controls.name.enable();
                        this.userFormGroup.controls.age.enable();
                        this.userFormGroup.controls.hasLoggedInWithExternalProvider.enable();
                        this.userFormGroup.controls.isDisabled.enable();
                        this.userFormGroup.controls.description.enable();

                    }
                    else{
                        this.userFormGroup.controls.name.disable();
                        this.userFormGroup.controls.age.disable();
                        this.userFormGroup.controls.hasLoggedInWithExternalProvider.disable();
                        this.userFormGroup.controls.isDisabled.disable();
                        this.userFormGroup.controls.description.disable();

                    }

                    this.onIsAuthorizedForSaveChange.next(new IsAuthorizedForSaveEvent({
                        isAuthorizedForSave: this.isAuthorizedForSave, 
                        currentUserPermissionCodes: currentUserPermissionCodes
                    })); 
                }
            })
        );
    }











    control(formControlName: string, formGroup: SpiderlyFormGroup){
        return getControl(formControlName, formGroup);
    }

    getFormArrayGroups<T>(formArray: SpiderlyFormArray): SpiderlyFormGroup<T>[]{
        return this.baseFormService.getFormArrayGroups<T>(formArray);
    }

    save(){
        this.onSave.next();
    }

	ngOnDestroy(){
        if (this.authorizationForSaveSubscription) {
            this.authorizationForSaveSubscription.unsubscribe();
        }
    }

}
