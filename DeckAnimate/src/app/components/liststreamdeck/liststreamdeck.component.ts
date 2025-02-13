import { Component } from '@angular/core';

@Component({
  selector: 'app-liststreamdeck',
  imports: [],
  templateUrl: './liststreamdeck.component.html',
  styleUrl: './liststreamdeck.component.css',
})
export class ListstreamdeckComponent {
  options: string[] = ['6 Touches', '15 Touches', '30 Touches'];
  selectedOption: string = '';
}
