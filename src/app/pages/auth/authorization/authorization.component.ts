import { Component, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IUser } from '../../../models/user';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { UserService } from '../../../services/user.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
@Component({
	selector: 'app-authorization',
	imports: [NgClass, FormsModule, ButtonModule, InputTextModule],
	templateUrl: './authorization.component.html',
	styleUrl: './authorization.component.scss',
})
export class AuthorizationComponent implements OnInit {
	login: string;
	password: string;

	constructor(private userService: UserService, private messageService: MessageService, private router: Router) {}

	ngOnInit(): void {}

	onAuth(ev: Event): void {
		const user: IUser = {
			login: this.login,
			password: this.password,
		};
		this.userService.authUser(user).subscribe(
			() => {
				this.initToast('success', 'Вы успешно авторизовались');
				this.router.navigate(['tickets']);
			},
			() => {
				this.initToast('error', 'Произошла ошибка');
			}
		);
	}

	initToast(type: 'error' | 'success', text: string) {
		this.messageService.add({ severity: type, detail: text, life: 3000 });
	}
}
