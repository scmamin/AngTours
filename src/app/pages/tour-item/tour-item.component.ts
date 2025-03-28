import { Component, OnInit } from '@angular/core';
import { ToursService } from './../../services/tours.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ITour } from '../../models/tour';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { NearestToursComponent } from './nearest-tours/nearest-tours.component';
import { Location } from '@angular/common';

@Component({
	selector: 'app-tour-item',
	imports: [ButtonModule, CommonModule, CardModule, RouterLink, NearestToursComponent],
	templateUrl: './tour-item.component.html',
	styleUrl: './tour-item.component.scss',
})
export class TourItemComponent implements OnInit {
	tourId: string = null;
	tour: ITour;

	constructor(private tourService: ToursService, private route: ActivatedRoute, private location: Location) {}

	ngOnInit(): void {
		this.tourId = this.route.snapshot.paramMap.get('id');
		if (this.tourId) {
			this.tourService.getToursById(this.tourId).subscribe({
				next: (tourData: ITour) => {
					this.tour = tourData;
				},
				error: err => {
					console.error('Ошибка при загрузке тура:', err);
					this.tour = null;
				},
			});
		}
	}

	onTourChanges(ev: ITour): void {
		this.tour = ev;
		this.location.replaceState('tours/tour' + this.tour.id);
	}
}
