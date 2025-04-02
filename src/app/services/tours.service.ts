import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../shared/api';
import { Observable, Subject } from 'rxjs';
import { ITour, TourType } from '../models/tour';

@Injectable({
	providedIn: 'root',
})
export class ToursService {
	private tourTypeSubject = new Subject<TourType>();
	readonly tourTypes$ = this.tourTypeSubject.asObservable();

	//date
	private tourDateSubject = new Subject<Date>();
	readonly tourDate$ = this.tourDateSubject.asObservable();

	constructor(private http: HttpClient) {}

	getTours(): Observable<{ tours: ITour[] }> {
		return this.http.get<{ tours: ITour[] }>(API.tours);
	}

	getToursById(id: string): Observable<ITour> {
		return this.http.get<ITour>(`${API.tour}/${id}`);
	}

	getNearestTourByLocationId(id: string): Observable<ITour[]> {
		return this.http.get<ITour[]>(API.nearestTours, {
			params: { locationId: id },
		});
	}

	searchTours(tours: ITour[], value: string): ITour[] {
		if (Array.isArray(tours)) {
			return tours.filter(tour => {
				if (tour && typeof tour.name === 'string') {
					return tour.name.toLowerCase().includes(value.toLowerCase());
				} else {
					return false;
				}
			});
		} else {
			return [];
		}
	}

	initChangeTourType(val: TourType): void {
		this.tourTypeSubject.next(val);
	}

	initChangeTourDate(val: Date): void {
		this.tourDateSubject.next(val);
	}
}
