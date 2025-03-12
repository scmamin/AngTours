import { Injectable } from '@angular/core';
import { IUser, IUserRegister } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { API } from '../shared/api';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	private userStorage: IUser[] = [];
	private currentUser: IUser | null = null;

	constructor(private http: HttpClient) {}

	private getUser(login: string): IUser | null {
		return this.userStorage.find(user => user.login === login) || null;
	}

	addUser(user: IUser, isRememberMe?: boolean): true | string {
		if (this.getUser(user.login)) {
			return 'User already exists';
		}
		this.userStorage.push(user);
		return true;
	}

	checkUser(login: string): boolean {
		return !!this.getUser(login);
	}

	registerUser(user: IUserRegister): Observable<any> {
		return this.http.post(API.registration, user, { responseType: 'text' });
	}

	authUser(user: IUser): Observable<any> {
		return this.http.post(API.auth, user, { responseType: 'text' });
	}
}
