import { Injectable } from '@angular/core';
import { IUser, IUserRegister } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { API } from '../shared/api';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	private currentUser: IUser | null = null;

	constructor(private http: HttpClient) {}

	registerUser(user: IUserRegister): Observable<string> {
		return this.http.post(API.registration, user, { responseType: 'text' });
	}

	authUser(user: IUser): Observable<string> {
		return this.http.post<string>(API.auth, user);
	}

	getUser(): IUser | null {
		if (!this.currentUser) {
			const storedUser = sessionStorage.getItem('currentUser');
			if (storedUser) {
				this.currentUser = JSON.parse(storedUser);
			}
		}
		return this.currentUser;
	}

	setUser(user: IUser): void {
		this.currentUser = user;
		sessionStorage.setItem('currentUser', JSON.stringify(user));
	}
}
