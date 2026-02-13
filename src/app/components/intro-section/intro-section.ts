import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoleculeIconComponent } from '../../shared/molecule-icon/molecule-icon';

@Component({
  selector: 'app-intro-section',
  standalone: true,
  imports: [CommonModule, MoleculeIconComponent],
  templateUrl: './intro-section.component.html',
  styleUrls: ['./intro-section.component.css']
})
export class IntroSectionComponent {}
