import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { ImprintComponent } from './imprint/imprint.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'user', component: UserComponent },
    { path: 'user/:id', component: UserDetailComponent },
    { path: 'imprint', component: ImprintComponent },
    { path: 'login', component: LoginComponent },
];
