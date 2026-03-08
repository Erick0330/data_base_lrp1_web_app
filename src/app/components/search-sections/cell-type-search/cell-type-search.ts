import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { getCellTypeDisplayName } from '../../../shared/cell-type-image.util';

@Component({
  selector: 'app-cell-type-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cell-type-search.component.html',
  styleUrls: ['./cell-type-search.component.css']
})
export class CellTypeSearchComponent {
  private router = inject(Router);

  // Cell types list (27 types)
  cellTypes: string[] = [];
  cellTypeOptions: Array<{ value: string; label: string }> = [];

  constructor() {
    const storedData = localStorage.getItem('excelData');
    if (storedData) {
      const excelData = JSON.parse(storedData);
      this.cellTypes = Array.from(new Set(excelData.map((entry: Record<string, any>) => String(entry['Cell Type'] || '')))).filter((value: unknown): value is string => typeof value === 'string' && value.trim() !== '');
      this.cellTypeOptions = this.cellTypes.map((cellType) => ({
        value: cellType,
        label: getCellTypeDisplayName(cellType)
      }));
    } else {
      console.error('No se encontraron datos en localStorage.');
    }
  }

  selectedCellType: string = '';

  onSearch() {
    if (this.selectedCellType) {
      // Navegar a la página de resultados
      // encodeURIComponent para manejar espacios y caracteres especiales en la URL
      const encodedCellType = encodeURIComponent(this.selectedCellType);
      this.router.navigate(['/cell-type', encodedCellType]);
    }
  }
}
