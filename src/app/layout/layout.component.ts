import { Component } from '@angular/core';
import { HeaderComponent } from './header/header/header.component';
import { FooterComponent } from './footer/footer/footer.component';
import { AsideComponent } from './aside/aside.component';
import { RouterModule } from '@angular/router';

@Component({
	selector: 'app-layout',
	imports: [RouterModule, FooterComponent, HeaderComponent, AsideComponent],
	templateUrl: './layout.component.html',
	styleUrl: './layout.component.scss',
})
export class LayoutComponent {}
