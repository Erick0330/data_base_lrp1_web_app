import { Component, Output, EventEmitter, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ligand-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ligand-search.component.html',
  styleUrls: ['./ligand-search.component.css'],
})
export class LigandSearchComponent {
  private router = inject(Router);
  @Output() search = new EventEmitter<any>();

  // Usamos Signals para el estado (Arquitectura Angular 18+)
  searchTerm = signal('');
  selectedOption = signal('name');
  allData = signal<any[]>([]);

  searchOptions = [
    { value: 'name', label: 'Protein Name' },
    { value: 'uniprot', label: 'Uniprot ID' },
    { value: 'gene', label: 'Gene' },
  ];

  examples: Record<string, string> = {
    name: 'E.g.: APP, A2M, LPL',
    uniprot: 'E.g.: P05067, P01023',
    gene: 'E.g.: APP, A2M, LPL',
  };

  constructor() {
    const storedData = localStorage.getItem('excelData');
    if (storedData) {
      this.allData.set(JSON.parse(storedData));
      console.log('Datos cargados en LigandSearchComponent:', this.allData());
    }
  }

  // Computed signal: se actualiza sola cuando cambian los datos
  placeholder = computed(() => this.examples[this.selectedOption()]);

  // Lista de sugerencias filtrada automáticamente
  filteredSuggestions = signal<string[]>([]);

  onSearchTermChange(): void {
    const term = this.searchTerm().toLowerCase().trim();
    const selected = this.selectedOption(); // 'name', 'uniprot', o 'gene'

    // Mapeo de columnas del Excel
    const columnMap: Record<string, string> = {
      name: 'Protein Name A',
      uniprot: 'ID Uniprot A',
      gene: 'Gene',
    };

    const targetColumn = columnMap[selected];

    // Obtenemos todos los valores de esa columna (sin asteriscos ni vacíos)
    console.log('allData actual:', this.allData());
    console.log('targetColumn:', targetColumn);
    if (!this.allData().length) {
      console.warn('No hay datos en allData. ¿Se cargó excelData en localStorage?');
    }
    const allValues = this.allData()
      .map((entry) => {
        // Mostrar el valor real de la columna para depuración
        const val = entry[targetColumn];
        console.log('Valor en entry[', targetColumn, ']:', val);
        return val?.toString().trim() || '';
      })
      .filter((value) => value !== '' && value !== '*');

    if (term.length === 0) {
      // 🔥 Si el campo está vacío, mostramos los primeros 8 valores únicos de la lista
      const initialSuggestions = [...new Set(allValues)].slice(0, 8);
      this.filteredSuggestions.set(initialSuggestions);
    } else {
      // Filtrado normal por texto
      const suggestions = allValues.filter((value) => value.toLowerCase().includes(term));

      // Eliminamos duplicados y limitamos a 8
      this.filteredSuggestions.set([...new Set(suggestions)].slice(0, 8));
    }

    console.log('Buscando en:', targetColumn, '| Término:', term);
    console.log('Sugerencias filtradas:', allValues);

  }

  onSearch(value?: string) {
    const finalTerm = value || this.searchTerm();
    if (finalTerm.trim()) {
      const searchData = { term: finalTerm.trim(), type: this.selectedOption() };
      this.search.emit(searchData);
      this.router.navigate(['/ligand-details'], { queryParams: searchData });
    }
  }

  selectSuggestion(suggestion: string) {
    this.searchTerm.set(suggestion);
    this.filteredSuggestions.set([]); // Limpiar sugerencias al elegir una
    this.onSearch(suggestion);
  }

  onBlur(): void {
    // Cuando el usuario sale del input, vaciamos las sugerencias para ocultar la lista
    setTimeout(() => {
      this.filteredSuggestions.set([]);
    }, 100);
  }
}
