import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {delay, take, tap} from 'rxjs';

import {UserAuthenticationStore} from '../../../+state/auth/user-auth.store';
import {SuccessCheckmarkComponent} from '../../lib/success-checkmark/success-checkmark.component';

@Component({
  selector: 'app-login-success',
  standalone: true,
  imports: [SuccessCheckmarkComponent],
  templateUrl: './login-success.component.html',
  styleUrl: './login-success.component.scss',
})
export class LoginSuccessComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly userAuthenticationStore = inject(UserAuthenticationStore);

  ngOnInit() {
    this.activatedRoute.url
        .pipe(
            take(1),
            delay(2500),
            tap(() => {
              if (this.userAuthenticationStore.isLoggedIn()) {
                return;
              }
            }),
        )
        .subscribe();
  }
}
