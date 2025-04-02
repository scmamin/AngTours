import {
	AfterViewInit,
	Component,
	ElementRef,
	EventEmitter,
	inject,
	Input,
	model,
	OnChanges,
	OnInit,
	Output,
	SimpleChanges,
	ViewChild,
} from '@angular/core';
import { ITour } from '../../../models/tour';
import { ToursService } from '../../../services/tours.service';
import { GalleriaModule } from 'primeng/galleria';
import { NgOptimizedImage } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { fromEvent, Subscription } from 'rxjs';

@Component({
	selector: 'app-nearest-tours',
	imports: [GalleriaModule, NgOptimizedImage, ButtonModule, InputGroupModule, InputGroupAddonModule, InputTextModule],
	templateUrl: './nearest-tours.component.html',
	styleUrl: './nearest-tours.component.scss',
})
export class NearestToursComponent implements OnInit, OnChanges, AfterViewInit {
	@Input() tourNearest: ITour = null;
	@Output() onTourChange = new EventEmitter<ITour>();
	@ViewChild('searchInput') searchInput: ElementRef;
	tourService = inject(ToursService);
	toursArr = model<ITour[]>([]);
	toursArrCopy = model<ITour[]>([]);
	activeLocationId: string;
	subscription: Subscription;

	ngOnInit(): void {}

	ngOnChanges(changes: SimpleChanges): void {
		const tour = changes['tourNearest']?.currentValue as ITour;
		if (tour?.locationId && this.activeLocationId !== tour?.locationId) {
			this.activeLocationId = tour?.locationId;
			this.tourService.getNearestTourByLocationId(this.activeLocationId).subscribe(data => {
				this.toursArr.set(data);
				this.toursArrCopy.set(data);
			});
		}
	}

	ngAfterViewInit(): void {
		//console.log('searchInput afterView', this.searchInput);
		const eventObservable = fromEvent<InputEvent>(this.searchInput.nativeElement, 'input');
		this.subscription = eventObservable.subscribe(ev => {
			const inputTargetValue = (ev.target as HTMLInputElement).value;
			//console.log('inputTargetValue', inputTargetValue, this.toursArr());

			if (inputTargetValue === '') {
				this.toursArr.set(this.toursArrCopy());
			} else {
				const newTours = this.tourService.searchTours(this.toursArrCopy(), inputTargetValue);
				this.toursArr.set(newTours);
			}
		});
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	activeIndexChange(index: number) {
		//console.log('index', index);
		const tours = this.toursArr();
		const activeTour = tours.find((el, i) => i === index);
		//console.log('activeTour', activeTour);
		this.onTourChange.emit(activeTour);
	}
}
