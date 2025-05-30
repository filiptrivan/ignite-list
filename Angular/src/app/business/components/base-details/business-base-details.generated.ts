import { ValidatorService } from 'src/app/business/services/validators/validators';
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
import { PrimengModule, SpiderlyControlsModule, CardSkeletonComponent, IndexCardComponent, IsAuthorizedForSaveEvent, SpiderlyDataTableComponent, SpiderlyFormArray, BaseEntity, LastMenuIconIndexClicked, SpiderlyFormGroup, SpiderlyButton, nameof, BaseFormService, getControl, Column, TableFilter, LazyLoadSelectedIdsResult, AllClickEvent, SpiderlyFileSelectEvent, getPrimengDropdownNamebookOptions, PrimengOption, SpiderlyFormControl, getPrimengAutocompleteNamebookOptions } from 'spiderly';
import { Notification, NotificationSaveBody, UserExtended, UserNotification, UserExtendedSaveBody, UserNotificationSaveBody } from '../../entities/business-entities.generated';

@Component({
    selector: 'notification-base-details',
    template: `
<ng-container *transloco="let t">
    <spiderly-panel [isFirstMultiplePanel]="isFirstMultiplePanel" [isMiddleMultiplePanel]="isMiddleMultiplePanel" [isLastMultiplePanel]="isLastMultiplePanel" [showPanelHeader]="showPanelHeader" >
        <panel-header [title]="panelTitle" [icon]="panelIcon"></panel-header>

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
                            [getTableDataObservableMethod]="getRecipientsTableDataObservableMethodForNotification" 
                            [exportTableDataToExcelObservableMethod]="exportRecipientsTableDataToExcelObservableMethodForNotification"
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
        PrimengModule,
        SpiderlyControlsModule,
        TranslocoDirective,
        CardSkeletonComponent,
        IndexCardComponent,
        SpiderlyDataTableComponent,
    ]
})
export class NotificationBaseDetailsComponent {
    @Output() onSave = new EventEmitter<void>();
    @Output() onNotificationFormGroupInitFinish = new EventEmitter<void>();
    @Input() getCrudMenuForOrderedData: (formArray: SpiderlyFormArray, modelConstructor: BaseEntity, lastMenuIconIndexClicked: LastMenuIconIndexClicked, adjustFormArrayManually: boolean) => MenuItem[];
    @Input() formGroup: SpiderlyFormGroup;
    @Input() notificationFormGroup: SpiderlyFormGroup<Notification>;
    @Input() additionalButtons: SpiderlyButton[] = [];
    @Input() isFirstMultiplePanel: boolean = false;
    @Input() isMiddleMultiplePanel: boolean = false;
    @Input() isLastMultiplePanel: boolean = false;
    @Input() showPanelHeader: boolean = true;
    @Input() panelTitle: string;
    @Input() panelIcon: string;
    @Input() showReturnButton: boolean = true;
    authorizationForSaveSubscription: Subscription;
    @Input() authorizedForSaveObservable: () => Observable<boolean> = () => of(false);
    isAuthorizedForSave: boolean = false;
    @Output() onIsAuthorizedForSaveChange = new EventEmitter<IsAuthorizedForSaveEvent>(); 

    modelId: number;
    loading: boolean = true;

    notificationSaveBodyName: string = nameof<NotificationSaveBody>('notificationDTO');







    recipientsTableColsForNotification: Column<UserExtended>[];
    getRecipientsTableDataObservableMethodForNotification = this.apiService.getRecipientsTableDataForNotification;
    exportRecipientsTableDataToExcelObservableMethodForNotification = this.apiService.exportRecipientsTableDataToExcelForNotification;
    newlySelectedRecipientsIdsForNotification: number[] = [];
    unselectedRecipientsIdsForNotification: number[] = [];
    areAllRecipientsSelectedForNotification: boolean = null;
    lastRecipientsLazyLoadTableFilterForNotification: TableFilter;

    @Input() showTitleForNotification: boolean = true;
    @Input() showDescriptionForNotification: boolean = true;
    @Input() showEmailBodyForNotification: boolean = true;
    @Input() showRecipientsForNotification: boolean = true;


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
            []
        );
        this.notificationFormGroup.mainDTOName = this.notificationSaveBodyName;

        this.onNotificationFormGroupInitFinish.next();
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





    selectedRecipientsLazyLoadMethodForNotification = (event: TableFilter): Observable<LazyLoadSelectedIdsResult> => {
        let tableFilter: TableFilter = event;
        tableFilter.additionalFilterIdLong = this.modelId;

        return this.apiService.lazyLoadSelectedRecipientsIdsForNotification(tableFilter);
    }
    areAllRecipientsSelectedChangeForNotification(event: AllClickEvent){
        this.areAllRecipientsSelectedForNotification = event.checked;
    }
    onRecipientsLazyLoadForNotification(event: TableFilter){
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
    selector: 'user-extended-base-details',
    template: `
<ng-container *transloco="let t">
    <spiderly-panel [isFirstMultiplePanel]="isFirstMultiplePanel" [isMiddleMultiplePanel]="isMiddleMultiplePanel" [isLastMultiplePanel]="isLastMultiplePanel" [showPanelHeader]="showPanelHeader" >
        <panel-header [title]="panelTitle" [icon]="panelIcon"></panel-header>

        <panel-body>
            @defer (when loading === false) {
                <form class="grid">
                    <ng-content select="[BEFORE]"></ng-content>
                    <div *ngIf="showHasLoggedInWithExternalProviderForUserExtended" class="col-12 md:col-6">
                        <spiderly-checkbox [control]="control('hasLoggedInWithExternalProvider', userExtendedFormGroup)"></spiderly-checkbox>
                    </div>
                    <div *ngIf="showIsDisabledForUserExtended" class="col-12 md:col-6">
                        <spiderly-checkbox [control]="control('isDisabled', userExtendedFormGroup)"></spiderly-checkbox>
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
        PrimengModule,
        SpiderlyControlsModule,
        TranslocoDirective,
        CardSkeletonComponent,
        IndexCardComponent,
        SpiderlyDataTableComponent,
    ]
})
export class UserExtendedBaseDetailsComponent {
    @Output() onSave = new EventEmitter<void>();
    @Output() onUserExtendedFormGroupInitFinish = new EventEmitter<void>();
    @Input() getCrudMenuForOrderedData: (formArray: SpiderlyFormArray, modelConstructor: BaseEntity, lastMenuIconIndexClicked: LastMenuIconIndexClicked, adjustFormArrayManually: boolean) => MenuItem[];
    @Input() formGroup: SpiderlyFormGroup;
    @Input() userExtendedFormGroup: SpiderlyFormGroup<UserExtended>;
    @Input() additionalButtons: SpiderlyButton[] = [];
    @Input() isFirstMultiplePanel: boolean = false;
    @Input() isMiddleMultiplePanel: boolean = false;
    @Input() isLastMultiplePanel: boolean = false;
    @Input() showPanelHeader: boolean = true;
    @Input() panelTitle: string;
    @Input() panelIcon: string;
    @Input() showReturnButton: boolean = true;
    authorizationForSaveSubscription: Subscription;
    @Input() authorizedForSaveObservable: () => Observable<boolean> = () => of(false);
    isAuthorizedForSave: boolean = false;
    @Output() onIsAuthorizedForSaveChange = new EventEmitter<IsAuthorizedForSaveEvent>(); 

    modelId: number;
    loading: boolean = true;

    userExtendedSaveBodyName: string = nameof<UserExtendedSaveBody>('userExtendedDTO');









    @Input() showHasLoggedInWithExternalProviderForUserExtended: boolean = true;
    @Input() showIsDisabledForUserExtended: boolean = true;


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
            let saveBody = new UserExtendedSaveBody();
            saveBody.userExtendedDTO = this.userExtendedFormGroup.getRawValue();




            return saveBody;
        }

        this.formGroup.saveObservableMethod = this.apiService.saveUserExtended;
        this.formGroup.mainDTOName = this.userExtendedSaveBodyName;

        this.route.params.subscribe(async (params) => {
            this.modelId = params['id'];




            if(this.modelId > 0){
                forkJoin({
                    mainUIFormDTO: this.apiService.getUserExtendedMainUIFormDTO(this.modelId),
                })
                .subscribe(({ mainUIFormDTO }) => {
                    this.initUserExtendedFormGroup(new UserExtended(mainUIFormDTO.userExtendedDTO));



                    this.authorizationForSaveSubscription = this.handleAuthorizationForSave().subscribe();
                    this.loading = false;
                });
            }
            else{
                this.initUserExtendedFormGroup(new UserExtended({id: 0}));

                this.authorizationForSaveSubscription = this.handleAuthorizationForSave().subscribe();
                this.loading = false;
            }
        });
    }

    initUserExtendedFormGroup(userExtended: UserExtended) {
        this.baseFormService.addFormGroup<UserExtended>(
            this.userExtendedFormGroup, 
            this.formGroup, 
            userExtended, 
            this.userExtendedSaveBodyName,
            []
        );
        this.userExtendedFormGroup.mainDTOName = this.userExtendedSaveBodyName;

        this.onUserExtendedFormGroupInitFinish.next();
    }

    handleAuthorizationForSave = () => {
        return combineLatest([this.authService.currentUserPermissionCodes$, this.authorizedForSaveObservable()]).pipe(
            map(([currentUserPermissionCodes, isAuthorizedForSave]) => {
                if (currentUserPermissionCodes != null && isAuthorizedForSave != null) {
                    this.isAuthorizedForSave =

                        (currentUserPermissionCodes.includes('InsertUserExtended') && this.modelId <= 0) || 
                        (currentUserPermissionCodes.includes('UpdateUserExtended') && this.modelId > 0) ||
                        isAuthorizedForSave;

                    if (this.isAuthorizedForSave) { 
                        this.userExtendedFormGroup.controls.hasLoggedInWithExternalProvider.enable();
                        this.userExtendedFormGroup.controls.isDisabled.enable();

                    }
                    else{
                        this.userExtendedFormGroup.controls.hasLoggedInWithExternalProvider.disable();
                        this.userExtendedFormGroup.controls.isDisabled.disable();

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
