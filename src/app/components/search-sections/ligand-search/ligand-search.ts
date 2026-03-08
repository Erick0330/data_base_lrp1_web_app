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

  searchTerm = signal('');
  selectedOption = signal('name');
  allData = signal<any[]>([]);
  isInputFocused = signal(false);
  filteredSuggestions = signal<string[]>([]);

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

  placeholder = computed(() => this.examples[this.selectedOption()]);

  constructor() {
    const storedData = localStorage.getItem('excelData');
    if (storedData) {
      this.allData.set(JSON.parse(storedData));
    }
  }

  private updateSuggestions(): void {
    const term = this.searchTerm().toLowerCase().trim();
    const columnMap: Record<string, string> = {
      name: 'Protein Name A',
      uniprot: 'ID Uniprot A',
      gene: 'Gene',
    };
    const targetColumn = columnMap[this.selectedOption()];

    const allValues = this.allData()
      .map((entry) => entry[targetColumn]?.toString().trim() || '')
      .filter((value) => value !== '' && value !== '*');

    if (term.length === 0) {
      this.filteredSuggestions.set([...new Set(allValues)].slice(0, 8));
      return;
    }

    const suggestions = allValues.filter((value) => value.toLowerCase().includes(term));
    this.filteredSuggestions.set([...new Set(suggestions)].slice(0, 8));
  }

  onSearchTermChange(term: string): void {
    this.searchTerm.set(term);

    if (!this.isInputFocused()) {
      this.filteredSuggestions.set([]);
      return;
    }

    this.updateSuggestions();
  }

  onInputFocus(): void {
    this.isInputFocused.set(true);
    this.updateSuggestions();
  }

  onSearchTypeChange(option: string): void {
    this.selectedOption.set(option);
    this.filteredSuggestions.set([]);
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
    this.filteredSuggestions.set([]);
    this.isInputFocused.set(false);
    this.onSearch(suggestion);
  }

  onSuggestionMouseDown(event: MouseEvent, suggestion: string): void {
    event.preventDefault();
    this.selectSuggestion(suggestion);
  }

  onBlur(): void {
    setTimeout(() => {
      this.isInputFocused.set(false);
      this.filteredSuggestions.set([]);
    }, 100);
  }
}
