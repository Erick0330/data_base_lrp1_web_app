import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntroSectionComponent } from '../components/intro-section/intro-section';
import { LigandSearchComponent } from '../components/search-sections/ligand-search/ligand-search';
import { CellTypeSearchComponent } from '../components/search-sections/cell-type-search/cell-type-search';

interface DownloadResource {
  title: string;
  description: string;
  href: string;
  fileName: string;
  icon: string;
  buttonLabel: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, IntroSectionComponent, LigandSearchComponent, CellTypeSearchComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  downloadResources: DownloadResource[] = [
    {
      title: 'Database Excel',
      description: 'Download the spreadsheet used as the source for the search tools and result tables.',
      href: '/data.xlsx',
      fileName: 'data.xlsx',
      icon: 'bi-file-earmark-excel',
      buttonLabel: 'Download Excel'
    },
    {
      title: 'Multimolecular complexes PDF',
      description: 'Download the supporting PDF for the multimolecular complexes formed by the LRP-1 receptor.',
      href: '/Table%201.%20Multimolecular%20complexes%20formed%20by%20the%20LRP-1%20receptor.pdf',
      fileName: 'Table 1. Multimolecular complexes formed by the LRP-1 receptor.pdf',
      icon: 'bi-file-earmark-pdf',
      buttonLabel: 'Download PDF'
    }
  ];

  onLigandSearch(searchData: any) {
    console.log('Ligand search:', searchData);
  }
}
