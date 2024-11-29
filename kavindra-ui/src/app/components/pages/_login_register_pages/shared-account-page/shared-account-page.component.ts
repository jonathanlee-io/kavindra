import {NgIf, NgOptimizedImage} from '@angular/common';
import {Component, inject, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {ButtonModule} from 'primeng/button';
import {ProgressSpinnerModule} from 'primeng/progressspinner';

import {UserAuthenticationStore} from '../../../../+state/auth/user-auth.store';

@Component({
  selector: 'app-shared-account-page',
  imports: [
    ProgressSpinnerModule,
    NgIf,
    ButtonModule,
    RouterLink,
    NgOptimizedImage,
  ],
  templateUrl: './shared-account-page.component.html',
  styleUrl: './shared-account-page.component.scss',
  standalone: true,
})
export class SharedAccountPageComponent implements OnInit {
  protected readonly userAuthenticationStore = inject(UserAuthenticationStore);

  ngOnInit() {
    window.scrollTo(0, 0);
  }

  doGoogleLogin() {
    this.userAuthenticationStore.attemptSupabaseLoginWithGoogle();
  }

  doGithubLogin() {
    this.userAuthenticationStore.attemptSupabaseLoginWithGitHub();
  }
}
