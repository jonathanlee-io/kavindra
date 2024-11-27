import {inject} from '@angular/core';
import {CanActivateFn} from '@angular/router';

import {UserAuthenticationStore} from '../+state/auth/user-auth.store';

export const reverseAuthGuard: CanActivateFn = () => {
  const userAuthenticationStore = inject(UserAuthenticationStore);
  if (userAuthenticationStore.loggedInState() === 'LOGGED_IN') {
    return false;
  }
  return true;
};
