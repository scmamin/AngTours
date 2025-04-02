import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { UserService } from '../../../services/user.service';
import { IUser } from '../../../models/user';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-header',
	imports: [MenubarModule, ButtonModule, CommonModule],
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
	dateTime: Date;
	menuItems: MenuItem[] = [];
	user: IUser;
	logoutIcon = 'pi pi-user';

	constructor(private userService: UserService, private router: Router, private ngZone: NgZone) {}

	ngOnInit(): void {
		this.user = this.userService.getUser();
		this.menuItems = this.initMenuItems();
		this.ngZone.runOutsideAngular(() => {
			setInterval(() => {
				this.dateTime = new Date();
			}, 1000);
		});
	}
	ngOnDestroy(): void {}

	initMenuItems(): MenuItem[] {
		return [
			{
				label: 'Билеты',
				routerLink: ['/tours'],
			},
			{
				label: 'Настройки',
				routerLink: ['/settings'],
			},
			{
				label: 'Заказы',
				routerLink: ['/orders'],
			},
		];
	}

	logout(): void {
		this.userService.setUser(null);
		this.router.navigate(['/auth']);
	}

	hoverLogoutBtn(val: boolean): void {
		this.logoutIcon = val ? 'pi pi-sign-out' : 'pi pi-user';
	}
}
