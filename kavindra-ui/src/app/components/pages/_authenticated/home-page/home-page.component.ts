import { Component } from '@angular/core';

import { FullIssueBoardComponent } from '../../../lib/_board/full-issue-board/full-issue-board.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [FullIssueBoardComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  projects: unknown[] = [];
}
