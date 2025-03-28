import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { LayoutComponent } from './layout/layout.component';
import { ToursComponent } from './pages/tours/tours.component';
import { TourItemComponent } from './pages/tour-item/tour-item.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { ChangePasswordComponent } from './pages/settings/change-password/change-password.component';
import { authGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
	{ path: 'auth', component: AuthComponent },
	{ path: '', redirectTo: '/auth', pathMatch: 'full' },
	{
		path: '',
		component: LayoutComponent,
		canActivate: [authGuard],
		children: [
			{
				path: 'tours',
				children: [
					{ path: '', component: ToursComponent },
					{ path: 'tour', redirectTo: '', pathMatch: 'full' },
					{ path: 'tour/:id', component: TourItemComponent },
				],
			},

			{
				path: 'settings',
				children: [
					{ path: '', component: SettingsComponent },
					{ path: 'change-password', component: ChangePasswordComponent },
				],
			},

			{ path: '', redirectTo: 'tours', pathMatch: 'full' },
		],
	},
	{ path: '**', redirectTo: '/auth', pathMatch: 'full' },
];
