import {inject} from '@angular/core';
import {patchState, signalStore, withMethods, withState} from '@ngrx/signals';
import {catchError, take, tap, throwError} from 'rxjs';

import {ProjectDto} from '../../dtos/projects/Project.dto';
import {ProjectsService} from '../../services/projects/projects.service';

export type ProjectState = {
  isLoading: boolean;
  projectById: ProjectDto | null;
  projectsWhereInvolved: ProjectDto[];
};

const initialState: ProjectState = {
  isLoading: false,
  projectById: null,
  projectsWhereInvolved: [],
};

export const ProjectStore = signalStore(
    {providedIn: 'root'},
    withState(initialState),
    withMethods((store) => {
      const projectsService = inject(ProjectsService);
      return {
        loadProjectsWhereInvolved: () => {
          patchState(store, {isLoading: true});
          projectsService.fetchProjectsWhereInvolved()
              .pipe(
                  take(1),
                  tap((projectsWhereInvolved) => {
                    patchState(store, {isLoading: false, projectsWhereInvolved: [...projectsWhereInvolved]});
                  }),
                  catchError((err) => {
                    patchState(store, {...initialState});
                    return throwError(() => err);
                  }),
              ).subscribe();
        },
        loadProjectById: (projectId: string) => {
          patchState(store, {isLoading: true});
          projectsService.fetchProjectById(projectId)
              .pipe(
                  take(1),
                  tap((projectById) => {
                    patchState(store, {isLoading: false, projectById: {...projectById}});
                  }),
                  catchError((err) => {
                    patchState(store, {...initialState});
                    return throwError(() => err);
                  }),
              ).subscribe();
        },
        updateProjectById: (projectId: string, project: ProjectDto) => {
          patchState(store, {isLoading: true});
          projectsService.updateProjectById(projectId, project)
              .pipe(
                  take(1),
                  tap((updatedProject) => {
                    patchState(store, {projectById: {...updatedProject}, isLoading: false});
                  }),
              ).subscribe();
        },
      };
    }),
);