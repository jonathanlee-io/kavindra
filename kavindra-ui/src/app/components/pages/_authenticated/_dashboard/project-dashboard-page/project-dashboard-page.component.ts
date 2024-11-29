import {Component} from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {Drawer} from 'primeng/drawer';

@Component({
  selector: 'app-project-dashboard-page',
  imports: [
    ButtonModule,
    Drawer,
  ],
  templateUrl: './project-dashboard-page.component.html',
  styleUrl: './project-dashboard-page.component.scss',
})
export class ProjectDashboardPageComponent {
  visible1: boolean = false;
  visible2: boolean = false;
  visible3: boolean = false;
  visible4: boolean = false;
}
