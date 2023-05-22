import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
})
export class TopBarComponent {
  @Input() uahToUsd: number;
  @Input() uahToEur: number;
}
