import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { LayoutComponent } from './layout/layout.component';
import { ToursComponent } from './pages/tours/tours.component';
import { TourItemComponent } from './pages/tour-item/tour-item.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { ChangePasswordComponent } from './pages/settings/change-password/change-password.component';
import { StatisticComponent } from './pages/settings/statistic/statistic.component';
import { authGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  {
    path: '',
    canActivate: [authGuard],
    component: LayoutComponent,
    children: [
      {
        path: 'tours',
        children: [
          { path: '', component: ToursComponent, data: { showAside: true } },
          { path: 'tour/:id', component: TourItemComponent },
          { path: 'tour', redirectTo: '', pathMatch: 'full' },
        ],
      },
      {
        path: 'settings',
        component: SettingsComponent,
        children: [
          { path: 'change-password', component: ChangePasswordComponent },
          { path: 'statistic', component: StatisticComponent, data: { showAside: true } },
        ],
      },
      { path: '', redirectTo: 'tours', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: '/auth', pathMatch: 'full' },
];