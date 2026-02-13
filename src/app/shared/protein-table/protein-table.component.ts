import { Component, Input, output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CellTypeProtein } from '../../models/protein.model';

@Component({
  selector: 'app-protein-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './protein-table.component.html',
  styleUrls: ['./protein-table.component.css']
})
export class ProteinTableComponent {
  private router = inject(Router);

  @Input() proteins: CellTypeProtein[] = [];
  @Input() cellType: string = '';

  // Output como función (nueva sintaxis Angular 17+)
  rowClicked = output<number>();

  onRowClick(protein: CellTypeProtein) {
    this.rowClicked.emit(protein.id);

    // Navegar a ligand-details usando los QueryParams que el componente espera
    this.router.navigate(['/ligand-details'], {
      queryParams: {
        term: protein.name,
        type: 'name',         // Indicamos que busque por nombre
        cellType: this.cellType // Para que el botón "Back" sepa a dónde volver
      }
    });
  }

  // Resto de métodos igual...
  getScoreClass(score: number): string {
    if (score >= 0.9) return 'score-high';
    if (score >= 0.7) return 'score-medium';
    if (score >= 0.5) return 'score-low';
    return 'score-very-low';
  }

  getDetectionTypeClass(type: string): string {
    switch (type) {
      case 'High-throughput': return 'badge bg-success';
      case 'Medium-throughput': return 'badge bg-warning';
      case 'Low-throughput': return 'badge bg-secondary';
      default: return 'badge bg-light text-dark';
    }
  }
}
