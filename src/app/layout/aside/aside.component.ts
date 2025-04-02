import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectChangeEvent, SelectModule } from 'primeng/select';
import { ToursService } from '../../services/tours.service';
import { DatePickerModule } from 'primeng/datepicker';
import { TourType } from '../../models/tour';

@Component({
	selector: 'app-aside',
	templateUrl: './aside.component.html',
	styleUrls: ['./aside.component.scss'],
	imports: [SelectModule, FormsModule, DatePickerModule],
})
export class AsideComponent implements OnInit {
	private tourService = inject(ToursService);

	date: Date = null;

	selectedType: TourType = null;

	tourTypes: TourType[] = [
		{ key: 'single', label: 'Одиночный' },
		{ key: 'group', label: 'Групповой' },
		{ key: 'all', label: 'Все' },
	];

	ngOnInit(): void {
		this.selectedType = this.tourTypes.find(type => type.key === 'all');
	}

	changeTourType(ev: SelectChangeEvent): void {
		this.tourService.initChangeTourType(this.selectedType);
	}

	changeDate(ev: Date): void {
		this.tourService.initChangeTourDate(ev);
	}

	clearDate(): void {
		this.tourService.initChangeTourDate(null);
	}
}
