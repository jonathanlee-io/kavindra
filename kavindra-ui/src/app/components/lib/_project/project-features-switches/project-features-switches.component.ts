import {NgIf} from '@angular/common';
import {Component, input} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {ToggleSwitchModule} from 'primeng/toggleswitch';

@Component({
  selector: 'app-project-features-switches',
  imports: [
    ToggleSwitchModule,
    ReactiveFormsModule,
    NgIf,
  ],
  templateUrl: './project-features-switches.component.html',
  styleUrl: './project-features-switches.component.scss',
})
export class ProjectFeaturesSwitchesComponent {
  bugReportsEnabledFormControl = input.required<FormControl<boolean>>();
  featureRequestsEnabledFormControl = input.required<FormControl<boolean>>();
  featureFeedbackEnabledFormControl = input.required<FormControl<boolean>>();
  hintEnabled = input.required<boolean>();
}
