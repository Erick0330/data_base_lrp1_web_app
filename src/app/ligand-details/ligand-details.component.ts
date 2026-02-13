import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LigandDataService } from '../services/ligand-data.service';
import { CellExpressionTableComponent } from '../shared/cell-expression-table/cell-expression-table.component';

@Component({
  selector: 'app-ligand-details',
  standalone: true,
  imports: [CommonModule, RouterModule, CellExpressionTableComponent],
  templateUrl: './ligand-details.component.html',
  styleUrls: ['./ligand-details.component.css'],
})
export class LigandDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private ligandDataService = inject(LigandDataService);

  // Signals para estado reactivo
  isLoading = signal(true);
  searchTerm = signal('');
  searchType = signal('');
  proteinId = signal<number | null>(null);
  source = signal<'search' | 'cell-type-table'>('search');

  // Computed signals desde el servicio
  protein = this.ligandDataService.protein;
  cellExpressions = this.ligandDataService.cellExpressions;
  totalCellTypes = this.ligandDataService.totalCellTypes;
  lastUpdated = this.ligandDataService.lastUpdated;

  // Método para obtener el cellType del query param
  get cellType(): string {
    return this.route.snapshot.queryParams['cellType'] || '';
  }

  // Método para encodeURIComponent (ahora disponible en la clase)
  encodeURIComponent(str: string): string {
    return encodeURIComponent(str);
  }

  ngOnInit() {
    // 1. Carga de datos (se mantiene igual)
    const storedData = localStorage.getItem('excelData');
    if (storedData) {
      this.ligandDataService.setData(JSON.parse(storedData));
    } else {
      this.router.navigate(['/']);
      return;
    }

    // 2. Escuchar cambios en la URL
    this.route.queryParams.subscribe((queryParams) => {
      const term = queryParams['term'];
      const type = queryParams['type'];
      const cellTypeParam = queryParams['cellType']; // Capturamos el cellType

      if (term && type) {
        // SI HAY cellType en la URL, cambiamos la fuente a 'cell-type-table'
        if (cellTypeParam) {
          this.source.set('cell-type-table');
        } else {
          this.source.set('search');
        }

        this.searchTerm.set(term);
        this.searchType.set(type);

        this.loadLigandData(term, type);
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  private loadLigandData(term: string, type: string) {
    this.isLoading.set(true);

    // Limpiamos el resultado anterior para que el DOM se resetee
    this.ligandDataService.clearResults();

    setTimeout(() => {
      this.ligandDataService.searchLigand(term, type);
      this.isLoading.set(false);

      // Log para depurar: verifica cuántas expresiones hay realmente
      console.log('Filas cargadas:', this.cellExpressions().length);
    }, 100);
  }

  private loadProteinById(proteinId: number) {
    this.isLoading.set(true);
    this.ligandDataService.searchProteinById(proteinId);
    setTimeout(() => {
      this.isLoading.set(false);
    }, 300);
  }

  onDownload() {
    const csvData = this.ligandDataService.exportToCSV();
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    const proteinName = this.protein()?.name.replace(/\s+/g, '_') || 'ligand';
    a.download = `${proteinName}_cell_expressions_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

  goBack() {
    // Si venimos de la tabla de tipo celular, regresar ahí
    if (this.source() === 'cell-type-table' && this.cellType) {
      this.router.navigate(['/cell-type', encodeURIComponent(this.cellType)]);
    } else {
      this.router.navigate(['/']);
    }
  }

  onExpressionClick(expressionId: number) {
    console.log('Expression clicked:', expressionId);
  }

  ligandData: any;
}
