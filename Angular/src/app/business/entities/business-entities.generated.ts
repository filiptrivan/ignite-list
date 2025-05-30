import { BaseEntity, TableFilter, TableFilterContext, TableFilterSortMeta, MimeTypes, Namebook } from 'spiderly';



export class Notification extends BaseEntity
{
    title?: string;
	description?: string;
	emailBody?: string;
	version?: number;
	id?: number;
	createdAt?: Date;
	modifiedAt?: Date;
	isMarkedAsRead?: boolean;

    constructor(
    {
        title,
		description,
		emailBody,
		version,
		id,
		createdAt,
		modifiedAt,
		isMarkedAsRead
    }:{
        title?: string;
		description?: string;
		emailBody?: string;
		version?: number;
		id?: number;
		createdAt?: Date;
		modifiedAt?: Date;
		isMarkedAsRead?: boolean;     
    } = {}
    ) {
        super('Notification'); 

        this.title = title;
		this.description = description;
		this.emailBody = emailBody;
		this.version = version;
		this.id = id;
		this.createdAt = createdAt;
		this.modifiedAt = modifiedAt;
		this.isMarkedAsRead = isMarkedAsRead;
    }
}


export class NotificationSaveBody extends BaseEntity
{
    notificationDTO?: Notification;
	selectedRecipientsIds?: number[];
	unselectedRecipientsIds?: number[];
	areAllRecipientsSelected?: boolean;
	recipientsTableFilter?: TableFilter;
	isMarkedAsRead?: boolean;

    constructor(
    {
        notificationDTO,
		selectedRecipientsIds,
		unselectedRecipientsIds,
		areAllRecipientsSelected,
		recipientsTableFilter,
		isMarkedAsRead
    }:{
        notificationDTO?: Notification;
		selectedRecipientsIds?: number[];
		unselectedRecipientsIds?: number[];
		areAllRecipientsSelected?: boolean;
		recipientsTableFilter?: TableFilter;
		isMarkedAsRead?: boolean;     
    } = {}
    ) {
        super('NotificationSaveBody'); 

        this.notificationDTO = notificationDTO;
		this.selectedRecipientsIds = selectedRecipientsIds;
		this.unselectedRecipientsIds = unselectedRecipientsIds;
		this.areAllRecipientsSelected = areAllRecipientsSelected;
		this.recipientsTableFilter = recipientsTableFilter;
		this.isMarkedAsRead = isMarkedAsRead;
    }
}


export class NotificationMainUIForm extends BaseEntity
{
    notificationDTO?: Notification;

    constructor(
    {
        notificationDTO
    }:{
        notificationDTO?: Notification;     
    } = {}
    ) {
        super('NotificationMainUIForm'); 

        this.notificationDTO = notificationDTO;
    }
}


export class UserExtended extends BaseEntity
{
    email?: string;
	hasLoggedInWithExternalProvider?: boolean;
	isDisabled?: boolean;
	version?: number;
	id?: number;
	createdAt?: Date;
	modifiedAt?: Date;

    constructor(
    {
        email,
		hasLoggedInWithExternalProvider,
		isDisabled,
		version,
		id,
		createdAt,
		modifiedAt
    }:{
        email?: string;
		hasLoggedInWithExternalProvider?: boolean;
		isDisabled?: boolean;
		version?: number;
		id?: number;
		createdAt?: Date;
		modifiedAt?: Date;     
    } = {}
    ) {
        super('UserExtended'); 

        this.email = email;
		this.hasLoggedInWithExternalProvider = hasLoggedInWithExternalProvider;
		this.isDisabled = isDisabled;
		this.version = version;
		this.id = id;
		this.createdAt = createdAt;
		this.modifiedAt = modifiedAt;
    }
}


export class UserExtendedSaveBody extends BaseEntity
{
    userExtendedDTO?: UserExtended;

    constructor(
    {
        userExtendedDTO
    }:{
        userExtendedDTO?: UserExtended;     
    } = {}
    ) {
        super('UserExtendedSaveBody'); 

        this.userExtendedDTO = userExtendedDTO;
    }
}


export class UserExtendedMainUIForm extends BaseEntity
{
    userExtendedDTO?: UserExtended;

    constructor(
    {
        userExtendedDTO
    }:{
        userExtendedDTO?: UserExtended;     
    } = {}
    ) {
        super('UserExtendedMainUIForm'); 

        this.userExtendedDTO = userExtendedDTO;
    }
}


export class UserNotification extends BaseEntity
{
    notificationDisplayName?: string;
	notificationId?: number;
	userDisplayName?: string;
	userId?: number;
	isMarkedAsRead?: boolean;

    constructor(
    {
        notificationDisplayName,
		notificationId,
		userDisplayName,
		userId,
		isMarkedAsRead
    }:{
        notificationDisplayName?: string;
		notificationId?: number;
		userDisplayName?: string;
		userId?: number;
		isMarkedAsRead?: boolean;     
    } = {}
    ) {
        super('UserNotification'); 

        this.notificationDisplayName = notificationDisplayName;
		this.notificationId = notificationId;
		this.userDisplayName = userDisplayName;
		this.userId = userId;
		this.isMarkedAsRead = isMarkedAsRead;
    }
}


export class UserNotificationSaveBody extends BaseEntity
{
    userNotificationDTO?: UserNotification;

    constructor(
    {
        userNotificationDTO
    }:{
        userNotificationDTO?: UserNotification;     
    } = {}
    ) {
        super('UserNotificationSaveBody'); 

        this.userNotificationDTO = userNotificationDTO;
    }
}


export class UserNotificationMainUIForm extends BaseEntity
{
    userNotificationDTO?: UserNotification;

    constructor(
    {
        userNotificationDTO
    }:{
        userNotificationDTO?: UserNotification;     
    } = {}
    ) {
        super('UserNotificationMainUIForm'); 

        this.userNotificationDTO = userNotificationDTO;
    }
}

