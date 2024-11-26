import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SharedModule } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

import { rebaseRoutePath, RoutePath } from '../../../app.routes';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [ButtonModule, DialogModule, SharedModule, RouterLink],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent {
  protected readonly rebaseRoutePath = rebaseRoutePath;
  protected readonly RoutePath = RoutePath;
}
