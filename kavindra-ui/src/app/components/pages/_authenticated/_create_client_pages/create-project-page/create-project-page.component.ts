import {NgClass, NgIf, NgSwitch, NgSwitchCase} from '@angular/common';
import {Component, inject} from '@angular/core';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {watchState} from '@ngrx/signals';
import {ButtonModule} from 'primeng/button';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {ToggleSwitchModule} from 'primeng/toggleswitch';
import {debounceTime, filter, tap} from 'rxjs';

import {ClientStore} from '../../../../../+state/client/client.store';
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

  private readonly clientStore = inject(ClientStore);

  subdomainState: SubdomainState = 'INIT';

  subdomainFormControl = new FormControl<string>('', Validators.compose([
    Validators.required,
    Validators.pattern(/^[a-zA-Z0-9][a-zA-Z0-9.-]+[a-zA-Z0-9]$/),
  ]));
  bugReportsEnabledFormControl = new FormControl<boolean>(true);
  featureRequestsEnabledFormControl = new FormControl<boolean>(true);
  featureFeedbackEnabledFormControl = new FormControl<boolean>(true);

  constructor() {
    watchState(this.clientStore, (state) => {
      if (state.isLoading) {
        this.subdomainState = 'LOADING';
        return;
      }
      if (state.isSubdomainAvailable === null) {
        this.subdomainState = 'INIT';
        return;
      }
      this.subdomainState = state.isSubdomainAvailable ? 'AVAILABLE' : 'UNAVAILABLE';
    });

    this.subdomainFormControl.valueChanges.pipe(
        filter((subdomain) => !!subdomain),
        filter(() => this.subdomainFormControl.valid),
        debounceTime(500),
        tap((subdomain) => {
          this.clientStore.fetchIsSubdomainAvailable(subdomain!);
          this.subdomainState = 'LOADING';
        }),
    ).subscribe();
  }
}
