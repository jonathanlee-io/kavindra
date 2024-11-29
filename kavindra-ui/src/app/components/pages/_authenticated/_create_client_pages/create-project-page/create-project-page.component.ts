import {NgClass, NgIf, NgSwitch, NgSwitchCase} from '@angular/common';
import {Component, inject, OnInit, signal} from '@angular/core';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {watchState} from '@ngrx/signals';
import {ButtonModule} from 'primeng/button';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {ToggleSwitchModule} from 'primeng/toggleswitch';
import {debounceTime, filter, take, tap} from 'rxjs';

import {ClientStore} from '../../../../../+state/client/client.store';
import {RoutePath} from '../../../../../app.routes';
import {PaymentPlanDto} from '../../../../../dtos/payments/PaymentPlan.dto';
import {PaymentsService} from '../../../../../services/payments/payments.service';
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
export class CreateProjectPageComponent implements OnInit {
  protected readonly rebaseRoutePath = rebaseRoutePath;
  protected readonly RoutePath = RoutePath;
  protected readonly clientStore = inject(ClientStore);

  private readonly pricingPlans = signal<PaymentPlanDto[]>([]);

  private readonly paymentsService = inject(PaymentsService);

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

  ngOnInit() {
    this.paymentsService.getPaymentPlans().pipe(
        take(1),
        tap((paymentPlans) => {
          this.pricingPlans.set(paymentPlans);
        }),
    ).subscribe();
  }

  doCreateProject() {
    this.clientStore.registerNewClientAndProjectWithPlan(this.subdomainFormControl.value!, this.pricingPlans()[0]);
  }
}
