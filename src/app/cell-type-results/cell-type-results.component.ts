import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CellTypeDataService } from '../services/cell-type-data.service';
import { ProteinTableComponent } from '../shared/protein-table/protein-table.component';

@Component({
  selector: 'app-cell-type-results',
  standalone: true,
  imports: [CommonModule, RouterModule, ProteinTableComponent],
  templateUrl: './cell-type-results.component.html',
  styleUrls: ['./cell-type-results.component.css']
})
export class CellTypeResultsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private cellTypeDataService = inject(CellTypeDataService);

  isLoading = signal(true);
  cellType = signal('');

  proteins = this.cellTypeDataService.proteins;
  totalCount = this.cellTypeDataService.totalCount;

  ngOnInit() {
    this.route.params.subscribe(params => {
      const encodedCellType = params['cellType'];
      if (encodedCellType) {
        const decodedCellType = decodeURIComponent(encodedCellType);
        this.loadData(decodedCellType);
      }
    });
  }

  private loadData(cellType: string) {
    this.isLoading.set(true);
    this.cellType.set(cellType);

    // No necesitamos timeout largo, pero lo dejamos breve para que la UI respire
    setTimeout(() => {
      this.cellTypeDataService.loadCellTypeData(cellType);
      this.isLoading.set(false);
    }, 100);
  }

  onRowClick(proteinId: number) {
    // Buscamos la proteína por su nombre en la lista actual para pasar el parámetro
    const protein = this.proteins().find(p => p.id === proteinId);
    if (protein) {
      // Navegamos a detalles usando el nombre o Uniprot como término de búsqueda
      this.router.navigate(['/ligand-details'], {
        queryParams: {
          term: protein.name,
          type: 'name',
          cellType: this.cellType() // Para el botón "Volver"
        }
      });
    }
  }

  onDownload() {
    const csvData = this.cellTypeDataService.exportToCSV();
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `${this.cellType().replace(/\s+/g, '_')}_proteins_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
