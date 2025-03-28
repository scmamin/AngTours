import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { API } from '../shared/api';

@Injectable({
	providedIn: 'root',
})
export class ConfigService {
	static config: any;

	constructor(private http: HttpClient) {}

	loadObservable(): Observable<any> {
		const jsonFile = `${API.config}`;
		return this.http.get(jsonFile).pipe(tap(data => {
      console.log(data)
    }));
	}

	loadPromise(): Promise<any> {
		const jsonFile = `${API.config}`;

		const configPromise = new Promise<any>((resolve, reject) => {
			this.http
				.get(jsonFile)
				.toPromise()
				.then((response: any) => {
					if (response && typeof response === 'object') {
						if (Array.isArray(response?.rules)) {
							ConfigService.config = response;
							resolve(response);
						} else {
							reject(`Ошибка при загрузке файла ${jsonFile}': ${JSON.stringify(response)}`);
						}
					} else {
						reject(`Ошибка при загрузке файла ${jsonFile}': ${JSON.stringify(response)}`);
					}
				})
				.catch((response: any) => {
					reject(`Ошибка при загрузке файла ${jsonFile}': ${JSON.stringify(response)}`);
				});
		});

		const promiseArr = [configPromise];
		console.log(promiseArr);
		return Promise.all(promiseArr);
	}
}
