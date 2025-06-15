import { TranslocoService } from '@jsverse/transloco';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from 'src/app/business/services/auth/auth.service';
import { ConfigService } from 'src/app/business/services/config.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SpiderlyMenuItem, SpiderlyLayoutComponent } from 'spiderly';
import { CommonModule } from '@angular/common';
import { BusinessPermissionCodes } from '../enums/business-enums.generated';
import { SecurityPermissionCodes } from 'spiderly';

@Component({
    selector: 'layout',
    templateUrl: './layout.component.html',
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        RouterModule,
        SpiderlyLayoutComponent,
    ]
})
export class LayoutComponent implements OnInit {
    menu: SpiderlyMenuItem[];

    constructor(
        private config: ConfigService,
        private translocoService: TranslocoService
    ) {
    }

    ngOnInit(): void {
        this.menu = [
            {
                visible: true,
                items: [
                    {
                        label: this.translocoService.translate('Home'),
                        icon: 'pi pi-fw pi-home',
                        routerLink: [''],
                        visible: true,
                    },
                    {
                        label: this.translocoService.translate('Project'),
                        icon: 'pi pi-fw pi-briefcase',
                        routerLink: ['projects'],
                        visible: true,
                    },
                    {
                        label: this.translocoService.translate('Category'),
                        icon: 'pi pi-fw pi-briefcase',
                        routerLink: ['categories'],
                        hasPermission: (permissionCodes: string[]): boolean => {
                            return (
                                permissionCodes?.includes(BusinessPermissionCodes.ReadCategory)
                            )
                        },
                        visible: true,
                    },
                    {
                        label: this.translocoService.translate('Administration'),
                        icon: 'pi pi-fw pi-cog',
                        visible: true,
                        hasPermission: (permissionCodes: string[]): boolean => {
                            return (
                                permissionCodes?.includes(BusinessPermissionCodes.ReadUserExtended) ||
                                permissionCodes?.includes(SecurityPermissionCodes.ReadRole) ||
                                permissionCodes?.includes(BusinessPermissionCodes.ReadNotification)
                            )
                        },
                        items: [
                            {
                                label: this.translocoService.translate('UserList'),
                                icon: 'pi pi-fw pi-user',
                                routerLink: [`/${this.config.administrationSlug}/users`],
                                hasPermission: (permissionCodes: string[]): boolean => {
                                    return (
                                        permissionCodes?.includes(BusinessPermissionCodes.ReadUserExtended)
                                    )
                                },
                                visible: true,
                            },
                            {
                                label: this.translocoService.translate('RoleList'),
                                icon: 'pi pi-fw pi-id-card',
                                routerLink: [`/${this.config.administrationSlug}/roles`],
                                hasPermission: (permissionCodes: string[]): boolean => {
                                    return (
                                        permissionCodes?.includes(SecurityPermissionCodes.ReadRole)
                                    )
                                },
                                visible: true,
                            },
                            {
                                label: this.translocoService.translate('NotificationList'),
                                icon: 'pi pi-fw pi-bell',
                                routerLink: [`/${this.config.administrationSlug}/notifications`],
                                hasPermission: (permissionCodes: string[]): boolean => {
                                    return (
                                        permissionCodes?.includes(BusinessPermissionCodes.ReadNotification)
                                    )
                                },
                                visible: true,
                            },
                        ]
                    },
                ]
            },
        ];
    }
}

