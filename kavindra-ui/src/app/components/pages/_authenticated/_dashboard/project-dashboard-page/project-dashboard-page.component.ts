import {Component, OnInit} from '@angular/core';
import {FormControl, FormsModule, Validators} from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {Drawer} from 'primeng/drawer';

import {
  ProjectFeaturesSwitchesComponent,
} from '../../../../lib/_project/project-features-switches/project-features-switches.component';

@Component({
  selector: 'app-project-dashboard-page',
  imports: [
    ButtonModule,
    Drawer,
    ProjectFeaturesSwitchesComponent,
    FormsModule,
  ],
  templateUrl: './project-dashboard-page.component.html',
  styleUrl: './project-dashboard-page.component.scss',
})
export class ProjectDashboardPageComponent implements OnInit {
  visible1: boolean = false;
  visible2: boolean = false;
  visible3: boolean = false;
  visible4: boolean = false;

  bugReportsEnabledFormControl = new FormControl<boolean>(true, {
    nonNullable: true,
    validators: [Validators.required],
  });

  featureRequestsEnabledFormControl = new FormControl<boolean>(true, {
    nonNullable: true,
    validators: [Validators.required],
  });

  featureFeedbackEnabledFormControl = new FormControl<boolean>(true, {
    nonNullable: true,
    validators: [Validators.required],
  });

  ngOnInit() {
    return;
  }
}
