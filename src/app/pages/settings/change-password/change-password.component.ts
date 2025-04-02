import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { NgClass } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-change-password',
	imports: [FormsModule, ButtonModule, NgClass, ToastModule, CommonModule],
	providers: [MessageService],
	templateUrl: './change-password.component.html',
	styleUrl: './change-password.component.scss',
})
export class ChangePasswordComponent {
	newPassword: string = '';
	confirmPassword: string = '';

	constructor(private messageService: MessageService) {}

	changePassword() {
		if (this.newPassword === this.confirmPassword) {
			this.messageService.add({
				severity: 'success',
				summary: 'Успех',
				detail: 'Пароль успешно изменён!',
				life: 3000,
			});
		} else {
			this.messageService.add({
				severity: 'error',
				summary: 'Ошибка',
				detail: 'Пароли не совпадают!',
				life: 3000,
			});
		}
		this.newPassword = '';
		this.confirmPassword = '';
	}
}
