import { ApplicationConfig, inject, provideZoneChangeDetection, provideAppInitializer } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { provideHttpClient } from '@angular/common/http';
import { ConfigService } from './services/config.service';

function initialzeApp(config: ConfigService) {
	return config.loadObservable();
}

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(routes),
		provideAnimationsAsync(),
		providePrimeNG({
			theme: {
				preset: Aura,
				options: {
					darkModeSelector: false,
				},
			},
			translation: {
				dayNames: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
				monthNames: [
					'Январь',
					'Февраль',
					'Март',
					'Апрель',
					'Май',
					'Июнь',
					'Июль',
					'Август',
					'Сентябрь',
					'Октябрь',
					'Ноябрь',
					'Декабрь',
				],
				dayNamesMin: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
				clear: 'Очистить',
				today: 'Сегодня',
			},
		}),
		provideHttpClient(),
		provideAppInitializer(() => initialzeApp(inject(ConfigService))),
	],
};
