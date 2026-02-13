import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntroSectionComponent } from '../components/intro-section/intro-section';
import { LigandSearchComponent } from '../components/search-sections/ligand-search/ligand-search';
import { CellTypeSearchComponent } from '../components/search-sections/cell-type-search/cell-type-search';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    IntroSectionComponent,
    LigandSearchComponent,
    CellTypeSearchComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  // Eventos que recibiremos de los componentes hijos
  onLigandSearch(searchData: any) {
    console.log('Ligand search:', searchData);
    // La navegación ahora se maneja en el componente LigandSearchComponent
  }
}
