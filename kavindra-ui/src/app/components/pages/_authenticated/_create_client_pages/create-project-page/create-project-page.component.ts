import {NgClass, NgIf, NgSwitch, NgSwitchCase} from '@angular/common';
import {Component} from '@angular/core';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {ButtonModule} from 'primeng/button';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {ToggleSwitchModule} from 'primeng/toggleswitch';
import {debounceTime, tap} from 'rxjs';

import {RoutePath} from '../../../../../app.routes';
import {rebaseRoutePath} from '../../../../../util/router/Router.utils';

export type SubdomainState = 'INIT' | 'AVAILABLE' | 'UNAVAILABLE' | 'LOADING';

@Component({
  selector: 'app-create-project-page',
  imports: [
    RouterLink,
    ButtonModule,
    NgClass,
    ReactiveFormsModule,
    NgIf,
    ProgressSpinnerModule,
    NgSwitchCase,
    NgSwitch,
    ToggleSwitchModule,
  ],
  standalone: true,
  templateUrl: './create-project-page.component.html',
  styleUrl: './create-project-page.component.scss',
})
export class CreateProjectPageComponent {
  protected readonly rebaseRoutePath = rebaseRoutePath;
  protected readonly RoutePath = RoutePath;

  subdomainState: SubdomainState = 'INIT';

  subdomainFormControl = new FormControl<string>('', Validators.compose([
    Validators.required,
    Validators.pattern(/^[a-zA-Z0-9][a-zA-Z0-9.-]+[a-zA-Z0-9]$/),
  ]));
  bugReportsEnabledFormControl = new FormControl<boolean>(true);
  featureRequestsEnabledFormControl = new FormControl<boolean>(true);
  featureFeedbackEnabledFormControl = new FormControl<boolean>(true);

  constructor() {
    this.subdomainFormControl.valueChanges.pipe(
        tap(() => {
          this.subdomainState = 'LOADING';
        }),
        debounceTime(500),
        tap(() => {
          if (this.subdomainFormControl.invalid) {
            this.subdomainState = 'UNAVAILABLE';
            return;
          }
          if (this.subdomainState === 'LOADING') {
            this.subdomainState = 'AVAILABLE';
            return;
          }
          setTimeout(() => {
            this.subdomainState = 'UNAVAILABLE';
          }, 5000);
        }),
    ).subscribe();
  }
}
