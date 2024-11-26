import { NgIf } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-bottom-full-width-message',
  standalone: true,
  imports: [NgIf],
  templateUrl: './bottom-full-width-message.component.html',
  styleUrl: './bottom-full-width-message.component.scss',
})
export class BottomFullWidthMessageComponent {
  message = input.required<string>();
  acceptButtonText = input.required<string>();
  rejectButtonText = input<string | undefined | null>();
  onAccept = input.required<() => void>();
}
