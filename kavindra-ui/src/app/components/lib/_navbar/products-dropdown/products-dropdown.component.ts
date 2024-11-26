import { NgIf } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-products-dropdown',
  standalone: true,
  imports: [NgIf],
  templateUrl: './products-dropdown.component.html',
  styleUrl: './products-dropdown.component.scss',
})
export class ProductsDropdownComponent {
  isVisible = input.required<boolean>();
}
