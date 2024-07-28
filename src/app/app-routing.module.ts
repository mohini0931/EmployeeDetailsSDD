import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeAddComponent } from './components/employee-add-edit/employee-add.component';
import { EmployeeDeleteComponent } from './components/employee-delete/employee-delete.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'employee-list', component: EmployeeListComponent, canActivate: [AuthGuard] },
  { path: 'employee-add', component: EmployeeAddComponent, canActivate: [AuthGuard] },
  { path: 'employee-delete/:id', component: EmployeeDeleteComponent, canActivate: [AuthGuard] },
  {
    path: 'employee-details/:id',
    loadChildren: () => import('./modules/employee-details.module').then(m => m.EmployeeDetailsModule),
    canActivate: [AuthGuard]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
