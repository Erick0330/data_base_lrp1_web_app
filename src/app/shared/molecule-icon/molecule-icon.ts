import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-molecule-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './molecule-icon.component.html',
  styleUrls: ['./molecule-icon.component.css']
})
export class MoleculeIconComponent {
  @Input() size: string = '24px';
  @Input() color: string = 'currentColor';
  @Input() className: string = '';
}
