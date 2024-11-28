import {NgIf} from '@angular/common';
import {Component, inject, OnInit, signal} from '@angular/core';
import {RouterLink} from '@angular/router';
import {SharedModule} from 'primeng/api';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {take, tap} from 'rxjs';

import {RoutePath} from '../../../app.routes';
import {PaymentPlanDto} from '../../../dtos/payments/PaymentPlan.dto';
import {PaymentsService} from '../../../services/payments/payments.service';
import {rebaseRoutePath} from '../../../util/router/Router.utils';
import {FeatureDisplayComponent} from '../../lib/_landing-page/feature-display/feature-display.component';
import {PricingDisplayComponent} from '../../lib/_landing-page/pricing-display/pricing-display.component';


@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    SharedModule,
    RouterLink,
    FeatureDisplayComponent,
    PricingDisplayComponent,
    NgIf,
    ProgressSpinnerModule,
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent implements OnInit {
  protected readonly rebaseRoutePath = rebaseRoutePath;
  protected readonly RoutePath = RoutePath;
  protected readonly pricingPlans = signal<PaymentPlanDto[]>([]);

  private readonly paymentsService = inject(PaymentsService);

  ngOnInit() {
    this.paymentsService.getPlans().pipe(
        take(1),
        tap((paymentPlans) => {
          this.pricingPlans.set(paymentPlans);
        }),
    ).subscribe();
  }
}
