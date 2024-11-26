import { NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { UserAuthenticationStore } from '../../../+state/auth/user-auth.store';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [RouterLink, ButtonModule, FormsModule, NgIf, ProgressSpinnerModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent implements OnInit {
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
