import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [ButtonModule, RouterLink, RouterOutlet, CommonModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  menuItems = [
    { label: 'Смена пароля', route: 'change-password' },
    { label: 'Статистика', route: 'statistic' },
  ];
}



