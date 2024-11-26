import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

import { HttpStatus } from '../../../common/enums/HttpStatus';

export const conflictInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error) => {
      if (error.status === HttpStatus.CONFLICT) {
      }
      return throwError(() => error);
    }),
  );
};
