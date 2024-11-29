import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ButtonModule} from 'primeng/button';

import {SharedAccountPageComponent} from '../shared-account-page/shared-account-page.component';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [FormsModule, ButtonModule, SharedAccountPageComponent],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss',
})
export class RegisterPageComponent {

}
