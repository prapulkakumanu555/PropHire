import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    {
        path: '',
        canActivate: [authGuard],
        loadComponent: () => import('./layout/dashboard/dashboard.component').then(m => m.DashboardComponent),
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', loadComponent: () => import('./layout/home/home.component').then(m => m.HomeComponent) },
            { path: 'workflow-builder', loadComponent: () => import('./features/workflow/workflow-builder/workflow-builder.component').then(m => m.WorkflowBuilderComponent) },
            { path: 'clients', loadComponent: () => import('./features/clients/client-list/client-list.component').then(m => m.ClientListComponent) },
            { path: 'projects', loadComponent: () => import('./features/projects/project-list/project-list.component').then(m => m.ProjectListComponent) },
            { path: 'trainees', loadComponent: () => import('./features/trainees/trainee-list/trainee-list.component').then(m => m.TraineeListComponent) },
            { path: 'trainings', loadComponent: () => import('./features/trainings/training-list/training-list.component').then(m => m.TrainingListComponent) },
            { path: 'trainings/:id', loadComponent: () => import('./features/trainings/training-detail/training-detail.component').then(m => m.TrainingDetailComponent) },
            { path: 'vendors', loadComponent: () => import('./features/vendors/vendor-list/vendor-list.component').then(m => m.VendorListComponent) }
        ]
    },
    { path: '**', redirectTo: '' }
];
