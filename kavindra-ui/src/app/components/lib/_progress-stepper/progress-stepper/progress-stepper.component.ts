import { NgClass } from '@angular/common';
import { Component, input, output } from '@angular/core';

import { rebaseRoutePath, RoutePath } from '../../../../app.routes';
import { ProgressStepDto } from '../ProgressStep.dto';

@Component({
  selector: 'app-progress-stepper',
  standalone: true,
  imports: [NgClass],
  templateUrl: './progress-stepper.component.html',
  styleUrl: './progress-stepper.component.scss',
})
export class ProgressStepperComponent {
  progressStepIndexChanged = output<number>();

  progressSteps = input.required<ProgressStepDto[]>();

  protected readonly rebaseRoutePath = rebaseRoutePath;
  protected readonly RoutePath = RoutePath;
}
