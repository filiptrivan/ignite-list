import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiSecurityService, TableFilter, TableResponse, Namebook, Codebook, LazyLoadSelectedIdsResult, VerificationTokenRequest, AuthResult, ExternalProvider } from 'spiderly';
import { ConfigService } from '../config.service';
import { Notification } from '../../entities/business-entities.generated';
import { NotificationSaveBody } from '../../entities/business-entities.generated';
import { Category } from '../../entities/business-entities.generated';
import { CategorySaveBody } from '../../entities/business-entities.generated';
import { CategoryMainUIForm } from '../../entities/business-entities.generated';
import { NotificationMainUIForm } from '../../entities/business-entities.generated';
import { Project } from '../../entities/business-entities.generated';
import { ProjectSaveBody } from '../../entities/business-entities.generated';
import { ProjectMainUIForm } from '../../entities/business-entities.generated';
import { Upvote } from '../../entities/business-entities.generated';
import { UpvoteSaveBody } from '../../entities/business-entities.generated';
import { UpvoteMainUIForm } from '../../entities/business-entities.generated';
import { UserExtended } from '../../entities/business-entities.generated';
import { UserExtendedSaveBody } from '../../entities/business-entities.generated';
import { UserExtendedMainUIForm } from '../../entities/business-entities.generated';
import { UserNotification } from '../../entities/business-entities.generated';
import { UserNotificationSaveBody } from '../../entities/business-entities.generated';
import { UserNotificationMainUIForm } from '../../entities/business-entities.generated';

@Injectable({
    providedIn: 'root'
})
export class ApiGeneratedService extends ApiSecurityService {

    constructor(
        protected override http: HttpClient,
        protected override config: ConfigService
    ) {
        super(http, config);
    }

    sendNotificationEmail = (notificationId: number, notificationVersion: number): Observable<any> => { 
        return this.http.get(`${this.config.apiUrl}/Notification/SendNotificationEmail?notificationId=${notificationId}&notificationVersion=${notificationVersion}`, this.config.httpOptions);
    }

    deleteNotificationForCurrentUser = (notificationId: number, notificationVersion: number): Observable<any> => { 
        return this.http.delete(`${this.config.apiUrl}/Notification/DeleteNotificationForCurrentUser?notificationId=${notificationId}&notificationVersion=${notificationVersion}`, this.config.httpOptions);
    }

    markNotificationAsReadForCurrentUser = (notificationId: number, notificationVersion: number): Observable<any> => { 
        return this.http.get(`${this.config.apiUrl}/Notification/MarkNotificationAsReadForCurrentUser?notificationId=${notificationId}&notificationVersion=${notificationVersion}`, this.config.httpOptions);
    }

    markNotificationAsUnreadForCurrentUser = (notificationId: number, notificationVersion: number): Observable<any> => { 
        return this.http.get(`${this.config.apiUrl}/Notification/MarkNotificationAsUnreadForCurrentUser?notificationId=${notificationId}&notificationVersion=${notificationVersion}`, this.config.httpOptions);
    }

    getNotificationsForCurrentUser = (tableFilterDTO: TableFilter): Observable<TableResponse<Notification>> => { 
        return this.http.post<TableResponse<Notification>>(`${this.config.apiUrl}/Notification/GetNotificationsForCurrentUser`, tableFilterDTO, this.config.httpSkipSpinnerOptions);
    }

    getCurrentUserExtended = (): Observable<UserExtended> => { 
        return this.http.get<UserExtended>(`${this.config.apiUrl}/UserExtended/GetCurrentUserExtended`, this.config.httpSkipSpinnerOptions);
    }

    getCategoryTableData = (tableFilterDTO: TableFilter): Observable<TableResponse<Category>> => { 
        return this.http.post<TableResponse<Category>>(`${this.config.apiUrl}/Category/GetCategoryTableData`, tableFilterDTO, this.config.httpSkipSpinnerOptions);
    }

    exportCategoryTableDataToExcel = (tableFilterDTO: TableFilter): Observable<any> => { 
        return this.http.post(`${this.config.apiUrl}/Category/ExportCategoryTableDataToExcel`, tableFilterDTO, { observe: 'response', responseType: 'blob' });
    }

    getCategoryList = (): Observable<Category[]> => { 
        return this.http.get<Category[]>(`${this.config.apiUrl}/Category/GetCategoryList`, this.config.httpOptions);
    }

    getCategoryMainUIFormDTO = (id: number): Observable<CategoryMainUIForm> => { 
        return this.http.get<CategoryMainUIForm>(`${this.config.apiUrl}/Category/GetCategoryMainUIFormDTO?id=${id}`, this.config.httpOptions);
    }

    getCategory = (id: number): Observable<Category> => { 
        return this.http.get<Category>(`${this.config.apiUrl}/Category/GetCategory?id=${id}`, this.config.httpOptions);
    }









    saveCategory = (saveBodyDTO: CategorySaveBody): Observable<CategorySaveBody> => { 
        return this.http.put<CategorySaveBody>(`${this.config.apiUrl}/Category/SaveCategory`, saveBodyDTO, this.config.httpOptions);
    }



    deleteCategory = (id: number): Observable<any> => { 
        return this.http.delete(`${this.config.apiUrl}/Category/DeleteCategory?id=${id}`, this.config.httpOptions);
    }


    getNotificationTableData = (tableFilterDTO: TableFilter): Observable<TableResponse<Notification>> => { 
        return this.http.post<TableResponse<Notification>>(`${this.config.apiUrl}/Notification/GetNotificationTableData`, tableFilterDTO, this.config.httpSkipSpinnerOptions);
    }

    exportNotificationTableDataToExcel = (tableFilterDTO: TableFilter): Observable<any> => { 
        return this.http.post(`${this.config.apiUrl}/Notification/ExportNotificationTableDataToExcel`, tableFilterDTO, { observe: 'response', responseType: 'blob' });
    }

    getNotificationList = (): Observable<Notification[]> => { 
        return this.http.get<Notification[]>(`${this.config.apiUrl}/Notification/GetNotificationList`, this.config.httpOptions);
    }

    getNotificationMainUIFormDTO = (id: number): Observable<NotificationMainUIForm> => { 
        return this.http.get<NotificationMainUIForm>(`${this.config.apiUrl}/Notification/GetNotificationMainUIFormDTO?id=${id}`, this.config.httpOptions);
    }

    getNotification = (id: number): Observable<Notification> => { 
        return this.http.get<Notification>(`${this.config.apiUrl}/Notification/GetNotification?id=${id}`, this.config.httpOptions);
    }







    getRecipientsTableDataForNotification = (tableFilterDTO: TableFilter): Observable<TableResponse<UserExtended>> => { 
        return this.http.post<TableResponse<UserExtended>>(`${this.config.apiUrl}/Notification/GetRecipientsTableDataForNotification`, tableFilterDTO, this.config.httpSkipSpinnerOptions);
    }

    exportRecipientsTableDataToExcelForNotification = (tableFilterDTO: TableFilter): Observable<any> => { 
        return this.http.post(`${this.config.apiUrl}/Notification/ExportRecipientsTableDataToExcelForNotification`, tableFilterDTO, { observe: 'response', responseType: 'blob' });
    }

    lazyLoadSelectedRecipientsIdsForNotification = (tableFilterDTO: TableFilter): Observable<LazyLoadSelectedIdsResult> => { 
        return this.http.post<LazyLoadSelectedIdsResult>(`${this.config.apiUrl}/Notification/LazyLoadSelectedRecipientsIdsForNotification`, tableFilterDTO, this.config.httpSkipSpinnerOptions);
    }

    saveNotification = (saveBodyDTO: NotificationSaveBody): Observable<NotificationSaveBody> => { 
        return this.http.put<NotificationSaveBody>(`${this.config.apiUrl}/Notification/SaveNotification`, saveBodyDTO, this.config.httpOptions);
    }



    deleteNotification = (id: number): Observable<any> => { 
        return this.http.delete(`${this.config.apiUrl}/Notification/DeleteNotification?id=${id}`, this.config.httpOptions);
    }


    getProjectTableData = (tableFilterDTO: TableFilter): Observable<TableResponse<Project>> => { 
        return this.http.post<TableResponse<Project>>(`${this.config.apiUrl}/Project/GetProjectTableData`, tableFilterDTO, this.config.httpSkipSpinnerOptions);
    }

    exportProjectTableDataToExcel = (tableFilterDTO: TableFilter): Observable<any> => { 
        return this.http.post(`${this.config.apiUrl}/Project/ExportProjectTableDataToExcel`, tableFilterDTO, { observe: 'response', responseType: 'blob' });
    }

    getProjectList = (): Observable<Project[]> => { 
        return this.http.get<Project[]>(`${this.config.apiUrl}/Project/GetProjectList`, this.config.httpOptions);
    }

    getProjectMainUIFormDTO = (id: number): Observable<ProjectMainUIForm> => { 
        return this.http.get<ProjectMainUIForm>(`${this.config.apiUrl}/Project/GetProjectMainUIFormDTO?id=${id}`, this.config.httpOptions);
    }

    getProject = (id: number): Observable<Project> => { 
        return this.http.get<Project>(`${this.config.apiUrl}/Project/GetProject?id=${id}`, this.config.httpOptions);
    }



    getUserDropdownListForProject = (projectId?: number): Observable<Namebook[]> => { 
        return this.http.get<Namebook[]>(`${this.config.apiUrl}/Project/GetUserDropdownListForProject?projectId=${projectId}`, this.config.httpSkipSpinnerOptions);
    }






    saveProject = (saveBodyDTO: ProjectSaveBody): Observable<ProjectSaveBody> => { 
        return this.http.put<ProjectSaveBody>(`${this.config.apiUrl}/Project/SaveProject`, saveBodyDTO, this.config.httpOptions);
    }

    uploadLogoBlobNameForProject = (file: any): Observable<string> => { 
        return this.http.post(`${this.config.apiUrl}/Project/UploadLogoBlobNameForProject`, file, { ...this.config.httpOptions, responseType: 'text' });
    }

    deleteProject = (id: number): Observable<any> => { 
        return this.http.delete(`${this.config.apiUrl}/Project/DeleteProject?id=${id}`, this.config.httpOptions);
    }


    getUserExtendedTableData = (tableFilterDTO: TableFilter): Observable<TableResponse<UserExtended>> => { 
        return this.http.post<TableResponse<UserExtended>>(`${this.config.apiUrl}/UserExtended/GetUserExtendedTableData`, tableFilterDTO, this.config.httpSkipSpinnerOptions);
    }

    exportUserExtendedTableDataToExcel = (tableFilterDTO: TableFilter): Observable<any> => { 
        return this.http.post(`${this.config.apiUrl}/UserExtended/ExportUserExtendedTableDataToExcel`, tableFilterDTO, { observe: 'response', responseType: 'blob' });
    }

    getUserExtendedList = (): Observable<UserExtended[]> => { 
        return this.http.get<UserExtended[]>(`${this.config.apiUrl}/UserExtended/GetUserExtendedList`, this.config.httpOptions);
    }

    getUserExtendedMainUIFormDTO = (id: number): Observable<UserExtendedMainUIForm> => { 
        return this.http.get<UserExtendedMainUIForm>(`${this.config.apiUrl}/UserExtended/GetUserExtendedMainUIFormDTO?id=${id}`, this.config.httpOptions);
    }

    getUserExtended = (id: number): Observable<UserExtended> => { 
        return this.http.get<UserExtended>(`${this.config.apiUrl}/UserExtended/GetUserExtended?id=${id}`, this.config.httpOptions);
    }









    saveUserExtended = (saveBodyDTO: UserExtendedSaveBody): Observable<UserExtendedSaveBody> => { 
        return this.http.put<UserExtendedSaveBody>(`${this.config.apiUrl}/UserExtended/SaveUserExtended`, saveBodyDTO, this.config.httpOptions);
    }



    deleteUserExtended = (id: number): Observable<any> => { 
        return this.http.delete(`${this.config.apiUrl}/UserExtended/DeleteUserExtended?id=${id}`, this.config.httpOptions);
    }


}
