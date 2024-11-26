import {
  NgClass,
  NgIf,
  NgSwitch,
  NgSwitchCase,
  NgSwitchDefault,
} from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  OnDestroy,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import {
  BindQueryParamsFactory,
  BindQueryParamsManager,
} from '@ngneat/bind-query-params';
import { watchState } from '@ngrx/signals';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Select } from 'primeng/select';
import { debounceTime, filter, Subscription, take, tap } from 'rxjs';

import { ClientStore } from '../../../../../+state/client/client.store';
import { rebaseRoutePath, RoutePath } from '../../../../../app.routes';
import { PaymentPlanDto } from '../../../../../dtos/payments/PaymentPlan.dto';
import { PaymentsService } from '../../../../../services/payments/payments.service';
import { ProgressStepDto } from '../../../../lib/_progress-stepper/ProgressStep.dto';
import { ProgressStepperComponent } from '../../../../lib/_progress-stepper/progress-stepper/progress-stepper.component';

export interface SetupPageForm {
  subdomain: string;
  clientDescription: string;
  projectName: string;
  selectPlan: PaymentPlanDto | null;
}

@Component({
  selector: 'app-setup-page',
  standalone: true,
  imports: [
    ProgressStepperComponent,
    ReactiveFormsModule,
    NgClass,
    NgIf,
    NgSwitchCase,
    NgSwitch,
    ProgressSpinnerModule,
    FileUploadModule,
    DropdownModule,
    Select,
    NgSwitchDefault,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './setup-page.component.html',
  styleUrl: './setup-page.component.scss',
})
export class SetupPageComponent implements OnInit, OnDestroy {
  private subdomainFormControlSubscription?: Subscription;
  private paymentPlanFormControlSubscription?: Subscription;
  private routerEventsSubscription?: Subscription;

  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly paymentsService = inject(PaymentsService);
  private readonly factory = inject(BindQueryParamsFactory);
  private readonly paths: string[] = ['client', 'project', 'review'] as const;

  protected readonly clientStore = inject(ClientStore);

  progressSteps: WritableSignal<ProgressStepDto[]> = signal([
    {
      stepTitle: 'Create Client',
      isActive: true,
      paths: [rebaseRoutePath(RoutePath.SETUP).replace(':step', 'client')],
    },
    {
      stepTitle: 'Create Project',
      isActive: false,
      paths: [rebaseRoutePath(RoutePath.SETUP).replace(':step', 'project')],
    },
    {
      stepTitle: 'Review and Continue',
      isActive: false,
      paths: [rebaseRoutePath(RoutePath.SETUP).replace(':step', 'review')],
    },
  ]);

  readonly clientCreationFormGroup;

  plans: PaymentPlanDto[] = [];

  currentStepPath: string = 'client';

  bindQueryParamsManager: BindQueryParamsManager<SetupPageForm>;

  subdomainKey = 'subdomain';
  clientDescriptionKey = 'clientDescription';
  projectNameKey = 'projectName';
  selectPlanKey = 'selectPlan';

  constructor() {
    this.clientCreationFormGroup = new FormGroup({
      subdomain: new FormControl<string>(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(1),
          Validators.pattern(/^[a-z0-9][a-z0-9-_]{0,61}$/),
        ]),
      ),
      clientDescription: new FormControl<string>(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(255),
        ]),
      ),
      projectName: new FormControl<string>(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
        ]),
      ),
      selectPlan: new FormControl<PaymentPlanDto | null>(
        null,
        Validators.compose([Validators.required]),
      ),
    });

    this.bindQueryParamsManager = this.factory
      .create<SetupPageForm>([
        {
          queryKey: this.subdomainKey as 'subdomain',
        },
        {
          queryKey: this.clientDescriptionKey as 'clientDescription',
        },
        {
          queryKey: this.projectNameKey as 'projectName',
        },
        {
          queryKey: this.selectPlanKey as 'selectPlan',
          type: 'object',
        },
      ])
      .connect(this.clientCreationFormGroup);

    watchState(this.clientStore, (state) => {
      if (state.currentlyCreatingClient !== null) {
        this.clientCreationFormGroup
          .get(this.subdomainKey)
          ?.setValue(
            this.clientStore.currentlyCreatingClient()?.subdomains?.[0]
              ?.subdomain,
          );
        this.clientCreationFormGroup.get(this.subdomainKey)?.disable();
        this.clientCreationFormGroup
          .get(this.clientDescriptionKey)
          ?.setValue(this.clientStore.currentlyCreatingClient()?.description);
        this.clientCreationFormGroup.get(this.clientDescriptionKey)?.disable();
        this.clientCreationFormGroup
          .get(this.projectNameKey)
          ?.setValue(
            this.clientStore.currentlyCreatingClient()?.projects?.[0]?.name,
          );
        this.clientCreationFormGroup.get(this.projectNameKey)?.disable();
        setTimeout(() => {
          this.nextStep(true);
        }, 1000);
      }
    });
  }

  ngOnInit() {
    this.clientStore.resetIsSubdomainAvailable();
    this.clientStore.fetchCreatedClient();
    if (
      this.clientCreationFormGroup.get(this.subdomainKey)?.value &&
      this.clientCreationFormGroup.get(this.subdomainKey)?.value !== ''
    ) {
      this.clientStore.fetchIsSubdomainAvailable(
        this.clientCreationFormGroup.get(this.subdomainKey)?.value,
      );
    }
    this.routerEventsSubscription = this.router.events
      .pipe(
        tap((event) => {
          if (!(event instanceof NavigationEnd)) {
            return;
          }
          this.handlePageChange();
        }),
      )
      .subscribe();
    this.handlePageChange();

    this.subdomainFormControlSubscription = this.clientCreationFormGroup
      .get(this.subdomainKey)
      ?.valueChanges.pipe(
        filter(() => this.clientStore.currentlyCreatingClient() === null),
        filter((value) => !!value),
        tap(() => this.clientStore.resetIsSubdomainAvailable()),
        filter(
          () =>
            this.clientCreationFormGroup.get(this.subdomainKey)?.valid ?? false,
        ),
        debounceTime(333),
        tap((value) => {
          this.clientStore.fetchIsSubdomainAvailable(value!);
        }),
      )
      .subscribe();

    this.paymentPlanFormControlSubscription = this.clientCreationFormGroup
      .get(this.selectPlanKey)
      ?.valueChanges.pipe(
        filter((value) => !!value),
        filter(() => this.clientCreationFormGroup.valid),
        tap((newPaymentPlan) =>
          this.clientStore.registerNewClientAndProjectWithPlan(
            this.clientCreationFormGroup.get(this.subdomainKey)?.getRawValue(),
            this.clientCreationFormGroup
              .get(this.clientDescriptionKey)
              ?.getRawValue(),
            this.clientCreationFormGroup
              .get(this.projectNameKey)
              ?.getRawValue(),
            newPaymentPlan,
          ),
        ),
      )
      .subscribe();

    this.paymentsService
      .getPlans()
      .pipe(
        take(1),
        tap((plans) => {
          this.plans = plans;
          this.clientCreationFormGroup
            .get(this.selectPlanKey)
            ?.setValue(this.plans[0]);
        }),
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.bindQueryParamsManager?.destroy();
    this.subdomainFormControlSubscription?.unsubscribe();
    this.paymentPlanFormControlSubscription?.unsubscribe();
    this.routerEventsSubscription?.unsubscribe();
  }

  handlePageChange() {
    const queryParams = this.route.snapshot.queryParams;
    this.currentStepPath = queryParams['step'];
    this.handleProgressStepIndexChanged(
      this.paths.indexOf(this.currentStepPath),
    );

    if (
      this.clientCreationFormGroup.get(this.subdomainKey)?.getRawValue() ===
        '' ||
      this.clientCreationFormGroup
        .get(this.clientDescriptionKey)
        ?.getRawValue() === ''
    ) {
      this.clientStore.resetIsSubdomainAvailable();
      this.router
        .navigate([RoutePath.SETUP], {
          queryParams: { ...queryParams, step: 'client' },
        })
        .catch((reason) => console.error(reason));
      return;
    } else if (
      this.clientCreationFormGroup
        .get(this.clientDescriptionKey)
        ?.getRawValue() === ''
    ) {
      this.router
        .navigate([RoutePath.SETUP], {
          queryParams: { ...queryParams, step: 'project' },
        })
        .catch((reason) => console.error(reason));
      return;
    }
  }

  handleProgressStepIndexChanged($event: number) {
    if ($event < 0 || $event > this.progressSteps().length - 1) {
      return;
    }
    const progressSteps = this.progressSteps();
    progressSteps.forEach((step, index) => {
      step.isActive = index <= $event;
    });
    this.progressSteps.set([...progressSteps]);
  }

  nextStep(skipToLastStep?: boolean) {
    if (skipToLastStep) {
      this.router
        .navigate([RoutePath.SETUP], {
          queryParams: { ...this.route.snapshot.queryParams, step: 'review' },
        })
        .catch((reason) => console.error(reason));
      return;
    }
    window.scrollTo(0, 0);
    if (this.currentStepPath === 'client') {
      this.router
        .navigate([RoutePath.SETUP], {
          queryParams: { ...this.route.snapshot.queryParams, step: 'project' },
        })
        .catch((reason) => console.error(reason));
    } else if (this.currentStepPath === 'project') {
      this.router
        .navigate([RoutePath.SETUP], {
          queryParams: { ...this.route.snapshot.queryParams, step: 'review' },
        })
        .catch((reason) => console.error(reason));
    }
  }

  previousStep() {
    window.scrollTo(0, 0);
    if (this.currentStepPath === 'project') {
      this.router
        .navigate([RoutePath.SETUP], {
          queryParams: { ...this.route.snapshot.queryParams, step: 'client' },
        })
        .catch((reason) => console.error(reason));
    } else if (this.currentStepPath === 'review') {
      this.router
        .navigate([RoutePath.SETUP], {
          queryParams: { ...this.route.snapshot.queryParams, step: 'project' },
        })
        .catch((reason) => console.error(reason));
    }
  }

  doSubmit() {
    this.clientStore.registerNewClientAndProjectWithPlan(
      this.clientCreationFormGroup.get(this.subdomainKey)?.getRawValue(),
      this.clientCreationFormGroup
        .get(this.clientDescriptionKey)
        ?.getRawValue(),
      this.clientCreationFormGroup.get(this.projectNameKey)?.getRawValue(),
      this.clientCreationFormGroup.get(this.selectPlanKey)?.getRawValue(),
    );
  }
}
