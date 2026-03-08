import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { CellTypeResultsComponent } from './cell-type-results/cell-type-results.component';
import { LigandDetailsComponent } from './ligand-details/ligand-details.component';
import { getCellTypeDisplayName } from './shared/cell-type-image.util';
import { StatisticsComponent } from './statistics/statistics.component';
import { AboutComponent } from './about/about.component';
import { HelpComponent } from './help/help.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'LRP1 Interactome - Home'
  },
  {
    path: 'cell-type/:cellType',
    component: CellTypeResultsComponent,
    title: (route) => `${getCellTypeDisplayName(decodeURIComponent(route.params['cellType'] ?? ''))} - Cell Type Results`
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
    path: 'stats',
    component: StatisticsComponent,
    title: 'Statistics & Analysis - LRP-IntDB'
  },
  {
    path: 'about',
    component: AboutComponent,
    title: 'About - LRP-IntDB'
  },
  {
    path: 'help',
    component: HelpComponent,
    title: 'Help & Tutorial - LRP-IntDB'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
