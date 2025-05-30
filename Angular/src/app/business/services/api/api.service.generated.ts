import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiSecurityService, TableFilter, TableResponse, Namebook, Codebook, LazyLoadSelectedIdsResult, VerificationTokenRequest, AuthResult, ExternalProvider } from 'spiderly';
import { ConfigService } from '../config.service';
import { Notification } from '../../entities/business-entities.generated';
import { NotificationSaveBody } from '../../entities/business-entities.generated';
import { Company } from '../../entities/business-entities.generated';
import { CompanySaveBody } from '../../entities/business-entities.generated';
import { CompanyMainUIForm } from '../../entities/business-entities.generated';
import { NotificationMainUIForm } from '../../entities/business-entities.generated';
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


    getCompanyTableData = (tableFilterDTO: TableFilter): Observable<TableResponse<Company>> => { 
        return this.http.post<TableResponse<Company>>(`${this.config.apiUrl}/Company/GetCompanyTableData`, tableFilterDTO, this.config.httpSkipSpinnerOptions);
    }

    exportCompanyTableDataToExcel = (tableFilterDTO: TableFilter): Observable<any> => { 
        return this.http.post(`${this.config.apiUrl}/Company/ExportCompanyTableDataToExcel`, tableFilterDTO, { observe: 'response', responseType: 'blob' });
    }

    getCompanyList = (): Observable<Company[]> => { 
        return this.http.get<Company[]>(`${this.config.apiUrl}/Company/GetCompanyList`, this.config.httpOptions);
    }

    getCompanyMainUIFormDTO = (id: number): Observable<CompanyMainUIForm> => { 
        return this.http.get<CompanyMainUIForm>(`${this.config.apiUrl}/Company/GetCompanyMainUIFormDTO?id=${id}`, this.config.httpOptions);
    }

    getCompany = (id: number): Observable<Company> => { 
        return this.http.get<Company>(`${this.config.apiUrl}/Company/GetCompany?id=${id}`, this.config.httpOptions);
    }









    saveCompany = (saveBodyDTO: CompanySaveBody): Observable<CompanySaveBody> => { 
        return this.http.put<CompanySaveBody>(`${this.config.apiUrl}/Company/SaveCompany`, saveBodyDTO, this.config.httpOptions);
    }

    uploadLogoBlobNameForCompany = (file: any): Observable<string> => { 
        return this.http.post(`${this.config.apiUrl}/Company/UploadLogoBlobNameForCompany`, file, { ...this.config.httpOptions, responseType: 'text' });
    }

    deleteCompany = (id: number): Observable<any> => { 
        return this.http.delete(`${this.config.apiUrl}/Company/DeleteCompany?id=${id}`, this.config.httpOptions);
    }


}
