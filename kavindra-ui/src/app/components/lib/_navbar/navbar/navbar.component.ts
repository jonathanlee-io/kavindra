import { NgClass, NgIf } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

import { UserAuthenticationStore } from '../../../../+state/auth/user-auth.store';
import { ClientStore } from '../../../../+state/client/client.store';
import {  RoutePath } from '../../../../app.routes';
import { ProductsDropdownComponent } from '../products-dropdown/products-dropdown.component';
import { rebaseRoutePath } from '../../../../util/router/Router.utils';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    ProductsDropdownComponent,
    RouterLink,
    ToggleSwitchModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  isProductsDropdownVisible = signal<boolean>(false);
  protected readonly userAuthenticationStore = inject(UserAuthenticationStore);
  protected readonly clientStore = inject(ClientStore);
  protected readonly rebaseRoutePath = rebaseRoutePath;
  protected readonly RoutePath = RoutePath;
}
