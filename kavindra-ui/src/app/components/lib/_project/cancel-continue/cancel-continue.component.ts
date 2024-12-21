import {NgIf} from '@angular/common';
import {Component, inject, input} from '@angular/core';
import {FormControl} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {ButtonDirective} from 'primeng/button';
import {ArrowRightIcon} from 'primeng/icons';

import {ClientStore} from '../../../../+state/client/client.store';
import {RoutePath} from '../../../../app.routes';
import {rebaseRoutePath} from '../../../../util/router/Router.utils';

@Component({
  selector: 'app-cancel-continue',
  imports: [
    ArrowRightIcon,
    ButtonDirective,
    NgIf,
    RouterLink,
  ],
  templateUrl: './cancel-continue.component.html',
  styleUrl: './cancel-continue.component.scss',
})
export class CancelContinueComponent {
  protected readonly RoutePath = RoutePath;
  protected readonly rebaseRoutePath = rebaseRoutePath;
  protected readonly clientStore = inject(ClientStore);
  isReadyToContinue = input.required<boolean>();
  cancelRoutePath = input.required<string>();
  clientDisplayNameFormControl = input.required<FormControl<string>>();
  subdomainFormControl = input.required<FormControl<string>>();
  bugReportsEnabledFormControl = input.required<FormControl<boolean>>();
  featureRequestsEnabledFormControl = input.required<FormControl<boolean>>();
  featureFeedbackEnabledFormControl = input.required<FormControl<boolean>>();

  doCreateProject() {
    if (!this.clientDisplayNameFormControl().valid || !this.subdomainFormControl().valid) {
      return;
    }
    this.clientStore.registerNewClientAndProjectWithPlan(
        this.clientDisplayNameFormControl().value,
        this.subdomainFormControl().value,
        this.bugReportsEnabledFormControl().value,
        this.featureRequestsEnabledFormControl().value,
        this.featureFeedbackEnabledFormControl().value,
    );
  }
}
