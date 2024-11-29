import {Component, inject, OnInit, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {DataViewModule} from 'primeng/dataview';
import {RatingModule} from 'primeng/rating';
import {TableModule} from 'primeng/table';
import {TagModule} from 'primeng/tag';
import {take, tap} from 'rxjs';

import {ProjectDto} from '../../../../../dtos/projects/Project.dto';
import {ProjectsService} from '../../../../../services/projects/projects.service';

@Component({
  selector: 'app-main-dashboard',
  imports: [
    DataViewModule,
    TagModule,
    ButtonModule,
    TableModule,
    RatingModule,
    FormsModule,
  ],
  templateUrl: './main-dashboard.component.html',
  styleUrl: './main-dashboard.component.scss',
})
export class MainDashboardComponent implements OnInit {
  projects = signal<ProjectDto[]>([]);

  private readonly projectsService = inject(ProjectsService);

  ngOnInit() {
    this.projectsService.fetchProjectsWhereInvolved().pipe(
        take(1),
        tap((projectsWhereInvolved) => {
          this.projects.set(projectsWhereInvolved);
        }),
    ).subscribe();
  }
}
