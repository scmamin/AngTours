import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-settings',
	imports: [ButtonModule, RouterLink, CommonModule],
	templateUrl: './settings.component.html',
	styleUrl: './settings.component.scss',
})
export class SettingsComponent {
	menuItems = [
		{ label: 'Смена пароля', route: '/settings/change-password' },
		{ label: 'Статистика', route: '/settings/statistics' },
	];
}
