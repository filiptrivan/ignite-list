import {
    InMemoryScrollingOptions,
    RouterConfigOptions,
    Routes,
} from '@angular/router';
import { AuthGuard, NotAuthGuard, NotFoundComponent } from 'spiderly';
import { LayoutComponent } from './business/layout/layout.component';

export const routes: Routes = [
    {
        path: '', 
        component: LayoutComponent,
        children: [
            {
                path: '',
                loadComponent: () => import('./pages/homepage/homepage.component').then(m => m.HomepageComponent),
                canActivate: [AuthGuard]
            },
            {
                path: '',
                loadChildren: () => import('./pages/project/project.module').then(m => m.ProjectModule),
                canActivate: [AuthGuard]
            },
            {
                path: '',
                loadChildren: () => import('./pages/category/category.module').then(m => m.CategoryModule),
                canActivate: [AuthGuard]
            },
            { 
                path: 'administration',
                loadChildren: () => import('./pages/administration/administration.module').then(m => m.AdministrationModule),
                canActivate: [AuthGuard]
            },
            { 
                path: 'notifications',
                loadComponent: () => import('./pages/notification/notification.component').then(m => m.NotificationComponent),
                canActivate: [AuthGuard]
            },
        ],
    },
    {
        path: 'login',
        loadComponent: () => import('spiderly').then((m) => m.LoginComponent),
        canActivate: [NotAuthGuard],
    },
    {
        path: 'registration',
        loadComponent: () =>
            import('spiderly').then((m) => m.RegistrationComponent),
        canActivate: [NotAuthGuard],
    },
    {
        path: '',
        children: [
            {
                path: '',
                loadChildren: () =>
                    import('./pages/legal/legal.module').then(
                        (m) => m.LegalModule
                    ),
            },
        ],
    },
    { path: 'not-found', component: NotFoundComponent },
    { path: '**', redirectTo: 'not-found' },
];
    
export const scrollConfig: InMemoryScrollingOptions = {
    scrollPositionRestoration: 'top',
    anchorScrolling: 'enabled',
};

export const routerConfigOptions: RouterConfigOptions = {
    onSameUrlNavigation: 'reload',
};
