import {Component, inject, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {ButtonModule} from 'primeng/button';

import {UserAuthenticationStore} from '../../../+state/auth/user-auth.store';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [RouterLink, FormsModule, ButtonModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss',
})
export class RegisterPageComponent implements OnInit {
  protected readonly userAuthenticationStore = inject(UserAuthenticationStore);

  ngOnInit() {
    window.scrollTo(0, 0);
  }

  doRegisterWithGoogle() {
    this.userAuthenticationStore.attemptSupabaseLoginWithGoogle();
  }

  doRegisterWithGithub() {
    this.userAuthenticationStore.attemptSupabaseLoginWithGitHub();
  }
}
