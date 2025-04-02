import { Component, OnInit } from '@angular/core';
import { ToursService } from '../../services/tours.service';
import { CardModule } from 'primeng/card';
import { ActivatedRoute, Router } from '@angular/router';
import { ITour, TourType } from '../../models/tour';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SearchPipe } from '../../shared/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { HighlightActiveDirective } from '../../shared/directives/highlight-active.directive';
import { isValid } from 'date-fns';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-tours',
	imports: [
		CardModule,
		InputGroupModule,
		InputGroupAddonModule,
		ButtonModule,
		InputTextModule,
		SearchPipe,
		FormsModule,
		HighlightActiveDirective,
	],
	templateUrl: './tours.component.html',
	styleUrl: './tours.component.scss',
})
export class ToursComponent implements OnInit {
	tours: ITour[];
	toursStore: ITour[] = [];
	private tourTypesSubscription: Subscription;
	private tourDateSubscription: Subscription;
	currentType: TourType = null;
	currentDate: Date | null = null;

	constructor(private toursService: ToursService, private route: ActivatedRoute, private router: Router) {}

	ngOnInit(): void {
		this.currentType = { key: 'all', label: 'Все' };

		this.toursService.getTours().subscribe(data => {
			if (Array.isArray(data?.tours)) {
				this.tours = data.tours;
				this.toursStore = [...data.tours];
			}
		});

		this.tourTypesSubscription = this.toursService.tourTypes$.subscribe(tour => {
			this.currentType = tour;
			switch (tour.key) {
				case 'group':
					this.tours = this.toursStore.filter(el => el.type === 'group');
					break;
				case 'single':
					this.tours = this.toursStore.filter(el => el.type === 'single');
					break;
				case 'all':
					this.tours = [...this.toursStore];
					break;
			}

			if (this.currentDate !== null) {
				this.tours = this.tours.filter(tour => {
					if (isValid(new Date(tour.date))) {
						const tourDate = new Date(tour.date).setHours(0, 0, 0, 0);
						const calendarDate = new Date(this.currentDate).setHours(0, 0, 0, 0);
						return tourDate === calendarDate;
					}
					return false;
				});
			}
		});

		this.tourDateSubscription = this.toursService.tourDate$.subscribe(date => {
			this.currentDate = date;
			switch (this.currentType?.key) {
				case 'group':
					this.tours = this.toursStore.filter(el => el.type === 'group');
					break;
				case 'single':
					this.tours = this.toursStore.filter(el => el.type === 'single');
					break;
				case 'all':
				default:
					this.tours = [...this.toursStore];
					break;
			}

			if (date !== null) {
				this.tours = this.tours.filter(tour => {
					if (isValid(new Date(tour.date))) {
						const tourDate = new Date(tour.date).setHours(0, 0, 0, 0);
						const calendarDate = new Date(date).setHours(0, 0, 0, 0);
						return tourDate === calendarDate;
					}
					return false;
				});
			}
		});
	}

	ngOnDestroy(): void {
		this.tourTypesSubscription.unsubscribe();
		this.tourDateSubscription.unsubscribe();
	}

	goToTour(item: ITour): void {
		this.router.navigate(['tour', item.id], { relativeTo: this.route });
	}

	searchTour(ev: Event): void {
		const target = ev.target as HTMLInputElement;
		const targetValue = target.value;
		this.tours = this.toursService.searchTours(this.toursStore, targetValue);
	}

	selectActive(index: number): void {
		const targetTour = this.tours.find((tour, i) => i === index);
		if (targetTour) {
			this.goToTour(targetTour);
		}
	}
}
