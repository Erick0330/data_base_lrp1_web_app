import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { CellTypeResultsComponent } from './cell-type-results/cell-type-results.component';
import { LigandDetailsComponent } from './ligand-details/ligand-details.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'LRP1 Interactome - Home'
  },
  {
    path: 'cell-type/:cellType',
    component: CellTypeResultsComponent,
    title: (route) => `${route.params['cellType']} - Cell Type Results`
  },
  {
    path: 'ligand-details',
    component: LigandDetailsComponent,
    title: 'Ligand Details'
  },
  {
    // Nueva ruta para detalles de proteína específica
    path: 'protein/:proteinId',
    component: LigandDetailsComponent,
    title: 'Protein Details'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
