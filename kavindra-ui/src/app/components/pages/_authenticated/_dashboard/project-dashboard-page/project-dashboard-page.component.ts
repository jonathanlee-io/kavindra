import {Component, inject, OnInit} from '@angular/core';
import {FormControl, FormsModule, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {watchState} from '@ngrx/signals';
import {ButtonModule} from 'primeng/button';
import {Drawer} from 'primeng/drawer';
import {skip, take, tap} from 'rxjs';

import {ProjectStore} from '../../../../../+state/project/project.store';
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
  private readonly route = inject(ActivatedRoute);

  protected readonly projectStore = inject(ProjectStore);

  private isInitialized = false;

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

  constructor() {
    watchState(this.projectStore, (state) => {
      if (!state?.projectById || this.isInitialized) {
        return;
      }
      this.isInitialized = true;
      this.bugReportsEnabledFormControl.setValue(state.projectById.isBugReportsEnabled);
      this.featureRequestsEnabledFormControl.setValue(state.projectById.isFeatureRequestsEnabled);
      this.featureFeedbackEnabledFormControl.setValue(state.projectById.isFeatureFeedbackEnabled);
    });

    this.bugReportsEnabledFormControl.valueChanges.pipe(
        skip(1), // Initial data load
        tap((value) => {
          const projectById = this.projectStore.projectById();
          if (!projectById) {
            return;
          }

          this.projectStore.updateProjectById(projectById.id, {
            ...projectById,
            isBugReportsEnabled: value,
          });
        }),
    ).subscribe();

    this.featureRequestsEnabledFormControl.valueChanges.pipe(
        skip(1), // Initial data load
        tap((value) => {
          const projectById = this.projectStore.projectById();
          if (!projectById) {
            return;
          }

          this.projectStore.updateProjectById(projectById.id, {
            ...projectById,
            isFeatureRequestsEnabled: value,
          });
        }),
    ).subscribe();

    this.featureFeedbackEnabledFormControl.valueChanges.pipe(
        skip(1), // Initial data load
        tap((value) => {
          const projectById = this.projectStore.projectById();
          if (!projectById) {
            return;
          }

          this.projectStore.updateProjectById(projectById.id, {
            ...projectById,
            isFeatureFeedbackEnabled: value,
          });
        }),
    ).subscribe();
  }

  ngOnInit() {
    this.route.params.pipe(
        take(1),
        tap((params) => {
          this.projectStore.loadProjectById(params['projectId']);
        }),
    ).subscribe();
  }
}
