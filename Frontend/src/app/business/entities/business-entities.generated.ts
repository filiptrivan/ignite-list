import { BaseEntity, TableFilter, TableFilterContext, TableFilterSortMeta, MimeTypes, Namebook } from 'spiderly';



export class Category extends BaseEntity
{
    name?: string;
	version?: number;
	id?: number;
	createdAt?: Date;
	modifiedAt?: Date;

    constructor(
    {
        name,
		version,
		id,
		createdAt,
		modifiedAt
    }:{
        name?: string;
		version?: number;
		id?: number;
		createdAt?: Date;
		modifiedAt?: Date;     
    } = {}
    ) {
        super('Category'); 

        this.name = name;
		this.version = version;
		this.id = id;
		this.createdAt = createdAt;
		this.modifiedAt = modifiedAt;
    }
}


export class CategorySaveBody extends BaseEntity
{
    categoryDTO?: Category;

    constructor(
    {
        categoryDTO
    }:{
        categoryDTO?: Category;     
    } = {}
    ) {
        super('CategorySaveBody'); 

        this.categoryDTO = categoryDTO;
    }
}


export class CategoryMainUIForm extends BaseEntity
{
    categoryDTO?: Category;

    constructor(
    {
        categoryDTO
    }:{
        categoryDTO?: Category;     
    } = {}
    ) {
        super('CategoryMainUIForm'); 

        this.categoryDTO = categoryDTO;
    }
}


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


export class Project extends BaseEntity
{
    logoBlobNameData?: string;
	logoBlobName?: string;
	projectName?: string;
	link?: string;
	description?: string;
	userDisplayName?: string;
	userId?: number;
	version?: number;
	id?: number;
	createdAt?: Date;
	modifiedAt?: Date;

    constructor(
    {
        logoBlobNameData,
		logoBlobName,
		projectName,
		link,
		description,
		userDisplayName,
		userId,
		version,
		id,
		createdAt,
		modifiedAt
    }:{
        logoBlobNameData?: string;
		logoBlobName?: string;
		projectName?: string;
		link?: string;
		description?: string;
		userDisplayName?: string;
		userId?: number;
		version?: number;
		id?: number;
		createdAt?: Date;
		modifiedAt?: Date;     
    } = {}
    ) {
        super('Project'); 

        this.logoBlobNameData = logoBlobNameData;
		this.logoBlobName = logoBlobName;
		this.projectName = projectName;
		this.link = link;
		this.description = description;
		this.userDisplayName = userDisplayName;
		this.userId = userId;
		this.version = version;
		this.id = id;
		this.createdAt = createdAt;
		this.modifiedAt = modifiedAt;
    }
}


export class ProjectSaveBody extends BaseEntity
{
    projectDTO?: Project;
	selectedCategoriesIds?: number[];

    constructor(
    {
        projectDTO,
		selectedCategoriesIds
    }:{
        projectDTO?: Project;
		selectedCategoriesIds?: number[];     
    } = {}
    ) {
        super('ProjectSaveBody'); 

        this.projectDTO = projectDTO;
		this.selectedCategoriesIds = selectedCategoriesIds;
    }
}


export class ProjectMainUIForm extends BaseEntity
{
    projectDTO?: Project;
	categoriesNamebookDTOList?: Namebook[];

    constructor(
    {
        projectDTO,
		categoriesNamebookDTOList
    }:{
        projectDTO?: Project;
		categoriesNamebookDTOList?: Namebook[];     
    } = {}
    ) {
        super('ProjectMainUIForm'); 

        this.projectDTO = projectDTO;
		this.categoriesNamebookDTOList = categoriesNamebookDTOList;
    }
}


export class ProjectCategory extends BaseEntity
{
    projectDisplayName?: string;
	projectId?: number;
	categoryDisplayName?: string;
	categoryId?: number;

    constructor(
    {
        projectDisplayName,
		projectId,
		categoryDisplayName,
		categoryId
    }:{
        projectDisplayName?: string;
		projectId?: number;
		categoryDisplayName?: string;
		categoryId?: number;     
    } = {}
    ) {
        super('ProjectCategory'); 

        this.projectDisplayName = projectDisplayName;
		this.projectId = projectId;
		this.categoryDisplayName = categoryDisplayName;
		this.categoryId = categoryId;
    }
}


export class ProjectCategorySaveBody extends BaseEntity
{
    projectCategoryDTO?: ProjectCategory;

    constructor(
    {
        projectCategoryDTO
    }:{
        projectCategoryDTO?: ProjectCategory;     
    } = {}
    ) {
        super('ProjectCategorySaveBody'); 

        this.projectCategoryDTO = projectCategoryDTO;
    }
}


export class ProjectCategoryMainUIForm extends BaseEntity
{
    projectCategoryDTO?: ProjectCategory;

    constructor(
    {
        projectCategoryDTO
    }:{
        projectCategoryDTO?: ProjectCategory;     
    } = {}
    ) {
        super('ProjectCategoryMainUIForm'); 

        this.projectCategoryDTO = projectCategoryDTO;
    }
}


export class Upvote extends BaseEntity
{
    userDisplayName?: string;
	userId?: number;
	projectDisplayName?: string;
	projectId?: number;

    constructor(
    {
        userDisplayName,
		userId,
		projectDisplayName,
		projectId
    }:{
        userDisplayName?: string;
		userId?: number;
		projectDisplayName?: string;
		projectId?: number;     
    } = {}
    ) {
        super('Upvote'); 

        this.userDisplayName = userDisplayName;
		this.userId = userId;
		this.projectDisplayName = projectDisplayName;
		this.projectId = projectId;
    }
}


export class UpvoteSaveBody extends BaseEntity
{
    upvoteDTO?: Upvote;

    constructor(
    {
        upvoteDTO
    }:{
        upvoteDTO?: Upvote;     
    } = {}
    ) {
        super('UpvoteSaveBody'); 

        this.upvoteDTO = upvoteDTO;
    }
}


export class UpvoteMainUIForm extends BaseEntity
{
    upvoteDTO?: Upvote;

    constructor(
    {
        upvoteDTO
    }:{
        upvoteDTO?: Upvote;     
    } = {}
    ) {
        super('UpvoteMainUIForm'); 

        this.upvoteDTO = upvoteDTO;
    }
}


export class UserExtended extends BaseEntity
{
    email?: string;
	name?: string;
	age?: number;
	description?: string;
	hasLoggedInWithExternalProvider?: boolean;
	isDisabled?: boolean;
	version?: number;
	id?: number;
	createdAt?: Date;
	modifiedAt?: Date;

    constructor(
    {
        email,
		name,
		age,
		description,
		hasLoggedInWithExternalProvider,
		isDisabled,
		version,
		id,
		createdAt,
		modifiedAt
    }:{
        email?: string;
		name?: string;
		age?: number;
		description?: string;
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
		this.name = name;
		this.age = age;
		this.description = description;
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

