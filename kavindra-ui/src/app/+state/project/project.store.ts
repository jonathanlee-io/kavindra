import {inject} from '@angular/core';
import {patchState, signalStore, withMethods, withState} from '@ngrx/signals';
import {catchError, take, tap, throwError} from 'rxjs';

import {CreateProjectDto} from '../../dtos/projects/CreateProject.dto';
import {ProjectDto} from '../../dtos/projects/Project.dto';
import {ProjectsService} from '../../services/projects/projects.service';

export type ProjectState = {
  isLoading: boolean;
  projectById: ProjectDto | null;
  projectsWhereInvolved: ProjectDto[];
  projectsForClient: ProjectDto[];
};

const initialState: ProjectState = {
  isLoading: false,
  projectById: null,
  projectsWhereInvolved: [],
  projectsForClient: [],
};

export const ProjectStore = signalStore(
    {providedIn: 'root'},
    withState(initialState),
    withMethods((store) => {
      const projectsService = inject(ProjectsService);
      return {
        loadProjectsWhereInvolved: async () => new Promise<ProjectDto[]>((resolve, reject) => {
          patchState(store, {isLoading: true});
          projectsService.fetchProjectsWhereInvolved()
              .pipe(
                  take(1),
                  tap((projectsWhereInvolved) => {
                    patchState(store, {isLoading: false, projectsWhereInvolved: [...projectsWhereInvolved]});
                    resolve(projectsWhereInvolved);
                  }),
                  catchError((err) => {
                    patchState(store, {...initialState});
                    reject(err);
                    return throwError(() => err);
                  }),
              ).subscribe();
        }),
        loadProjectsForClient: (clientId: string) => {
          patchState(store, {isLoading: true});
          projectsService.fetchProjectsForClient(clientId)
              .pipe(
                  take(1),
                  tap((projectsForClient) => {
                    patchState(store, {isLoading: false, projectsForClient: [...projectsForClient]});
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
        createProjectForExistingClient: (clientId: string, project: CreateProjectDto) => {
          patchState(store, {isLoading: true});
          projectsService.createProjectForExistingClient(clientId, project)
              .pipe(
                  take(1),
                  tap((createdProject) => {
                    patchState(store, {
                      isLoading: false,
                      projectById: {...createdProject},
                    });
                  }),
              );
        },
      };
    }),
);
