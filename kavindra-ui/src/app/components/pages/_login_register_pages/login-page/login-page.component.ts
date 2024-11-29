import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {ProgressSpinnerModule} from 'primeng/progressspinner';

import {SharedAccountPageComponent} from '../shared-account-page/shared-account-page.component';


@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ButtonModule, FormsModule, ProgressSpinnerModule, SharedAccountPageComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
}
