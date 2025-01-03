import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';

import {TenantStore} from '../../+state/tenant/tenant.store';
import {SupabaseService} from '../../services/supabase/supabase.service';

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const tenantStore = inject(TenantStore);
  const supabaseService = inject(SupabaseService);
  if (
    /(https):\/\/(.*).api.kavindra.io/.test(req.url) ||
    /(https):\/\/(.*).api.kavindra-staging.com/.test(req.url) ||
    /(https):\/\/(.*).api.kavindra-local.com/.test(req.url) ||
    /(http):\/\/localhost:8080\/(.*)/.test(req.url) ||
    new RegExp('/(https)://(.*).' + tenantStore.customHostname() + '/').test(
        req.url,
    )
  ) {
    return next(
      (supabaseService.session?.access_token) ?
        req.clone({
          withCredentials: true,
          setHeaders: {
            Authorization: `Bearer ${supabaseService.session?.access_token}`,
          },
        }) :
        req,
    );
  }

  return next(req);
};
