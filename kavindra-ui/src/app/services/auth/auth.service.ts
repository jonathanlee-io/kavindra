import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';

import {TenantStore} from '../../+state/tenant/tenant.store';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpClient = inject(HttpClient);
  private readonly tenantStore = inject(TenantStore);

  checkIn() {
    return this.httpClient.post<{ isSuccessful: boolean; isCreatedNew: boolean }>(
        this.tenantStore.getFullRequestUrl('v1/users/authenticated/check-in'),
        {},
    );
  }
}
