import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {toObservable} from '@angular/core/rxjs-interop';
import {FormControl, FormsModule, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {ButtonModule} from 'primeng/button';
import {filter, Subscription, tap} from 'rxjs';

import {ProjectStore} from '../../../../../+state/project/project.store';
import {ProjectDto} from '../../../../../dtos/projects/Project.dto';
import {
  ProjectFeaturesSwitchesComponent,
} from '../../../../lib/_project/project-features-switches/project-features-switches.component';

@Component({
  selector: 'app-project-dashboard-page',
  imports: [
    ButtonModule,
    ProjectFeaturesSwitchesComponent,
    FormsModule,
  ],
  templateUrl: './project-dashboard-page.component.html',
  styleUrl: './project-dashboard-page.component.scss',
})
export class ProjectDashboardPageComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);

  protected readonly projectStore = inject(ProjectStore);

  private readonly bugReportsSubscription: Subscription;
  private readonly featureRequestsSubscription: Subscription;
  private readonly featureFeedbackSubscription: Subscription;

  private routeParamsSubscription?: Subscription;
  private projectByIdSubscription?: Subscription;

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
    this.projectByIdSubscription = toObservable<ProjectDto | null>(this.projectStore.projectById).pipe(
        filter((value) => !!value),
        tap((projectById) => {
          this.bugReportsEnabledFormControl.setValue(projectById.isBugReportsEnabled, {emitEvent: false});
          this.featureRequestsEnabledFormControl.setValue(projectById.isFeatureRequestsEnabled, {emitEvent: false});
          this.featureFeedbackEnabledFormControl.setValue(projectById.isFeatureFeedbackEnabled, {emitEvent: false});
        }),
    ).subscribe();

    this.bugReportsSubscription = this.bugReportsEnabledFormControl.valueChanges.pipe(
        tap((newValue) => this.updateProjectFormControlValue({isBugReportsEnabled: newValue})),
    ).subscribe();

    this.featureRequestsSubscription = this.featureRequestsEnabledFormControl.valueChanges.pipe(
        tap((newValue) => this.updateProjectFormControlValue({isFeatureRequestsEnabled: newValue})),
    ).subscribe();

    this.featureFeedbackSubscription = this.featureFeedbackEnabledFormControl.valueChanges.pipe(
        tap((newValue) => this.updateProjectFormControlValue({isFeatureFeedbackEnabled: newValue})),
    ).subscribe();
  }

  ngOnInit() {
    this.routeParamsSubscription = this.route.params.pipe(
        tap((params) => {
          this.projectStore.loadProjectById(params['projectId']);
        }),
    ).subscribe();
  }

  ngOnDestroy() {
    this.routeParamsSubscription?.unsubscribe();
    this.projectByIdSubscription?.unsubscribe();
    this.bugReportsSubscription.unsubscribe();
    this.featureRequestsSubscription.unsubscribe();
    this.featureFeedbackSubscription.unsubscribe();
  }

  private updateProjectFormControlValue(updateProjectValue: Partial<ProjectDto>) {
    const projectById = this.projectStore.projectById();
    if (!projectById) {
      return;
    }
    this.projectStore.updateProjectById(projectById.id, {...projectById, ...updateProjectValue});
  }
}
