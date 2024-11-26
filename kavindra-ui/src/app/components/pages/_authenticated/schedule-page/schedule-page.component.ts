import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-schedule-page',
  standalone: true,
  imports: [],
  templateUrl: './schedule-page.component.html',
  styleUrl: './schedule-page.component.scss',
})
export class SchedulePageComponent {
  menuIsOpen = signal<boolean>(false);
}
