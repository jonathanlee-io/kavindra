import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

import { HttpStatus } from '../../../common/enums/HttpStatus';

export const forbiddenInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error) => {
      if (error.status === HttpStatus.FORBIDDEN) {
      }
      return throwError(() => error);
    }),
  );
};
