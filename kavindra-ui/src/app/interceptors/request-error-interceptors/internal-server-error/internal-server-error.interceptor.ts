import {HttpInterceptorFn} from '@angular/common/http';
import {catchError, throwError} from 'rxjs';

import {HttpStatus} from '../../../common/enums/HttpStatus';

export const internalServerErrorInterceptor: HttpInterceptorFn = (
    req,
    next,
) => {
  return next(req).pipe(
      catchError((error) => {
        if (error.status === HttpStatus.INTERNAL_SERVER_ERROR) {
          console.error(`Internal Server Error: ${error.message}`);
        }
        return throwError(() => error);
      }),
  );
};
