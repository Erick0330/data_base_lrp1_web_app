import { Injectable, signal, computed } from '@angular/core';
import { LigandProtein, ProteinCellExpression, LigandSearchResult } from '../models/protein.model';

@Injectable({
  providedIn: 'root'
})
export class LigandDataService {
  // ... (tus signals y variables siguen igual) ...
  private searchResult = signal<LigandSearchResult | null>(null);

  readonly protein = computed(() => this.searchResult()?.protein || null);
  readonly cellExpressions = computed(() => this.searchResult()?.cellExpressions || []);
  readonly totalCellTypes = computed(() => this.searchResult()?.totalCellTypes || 0);
  readonly lastUpdated = computed(() => this.searchResult()?.lastUpdated || new Date());

  private excelData: any[] = [];

  private columnMap: Record<string, string> = {
    'name': 'Protein Name A',
    'uniprot': 'ID Uniprot A',
    'gene': 'Gene'
  };

  constructor() {
    this.loadFromStorage();
  }

  // --- NUEVO MÉTODO HELPER PARA ARREGLAR NÚMEROS ---
  private parseScore(value: any): number {
    if (typeof value === 'number') return value;
    if (typeof value === 'string') {
      // Reemplaza coma por punto (ej: "0,04" -> "0.04") y convierte a número
      const cleanValue = value.replace(',', '.');
      const parsed = parseFloat(cleanValue);
      return isNaN(parsed) ? 0 : parsed;
    }
    return 0;
  }
  // --------------------------------------------------

  loadFromStorage() {
    const storedData = localStorage.getItem('excelData');
    if (storedData) {
      this.excelData = JSON.parse(storedData);
    }
  }

  setData(data: any[]) {
    this.excelData = data;
  }

  searchLigand(term: string, type: string): void {
    if (!this.excelData.length) this.loadFromStorage();

    const searchTerm = term.toLowerCase().trim();
    const targetColumn = this.columnMap[type] || 'Protein Name A';

    const results = this.excelData.filter((entry) =>
      entry[targetColumn]?.toString().toLowerCase().includes(searchTerm)
    );

    if (results.length > 0) {
      const firstMatch = results[0];

      this.searchResult.set({
        protein: {
          id: firstMatch.id || 0,
          name: firstMatch['Protein Name A'],
          uniprotId: firstMatch['ID Uniprot A'],
          gene: firstMatch['Gene'],
          function: firstMatch['Functionality'],
          cellularLocation: firstMatch['Subcellular location'],
          description: firstMatch['Functionality'] || '',
        },
        cellExpressions: results.map((entry, index) => {
          // AQUI USAMOS EL NUEVO PARSEADOR
          const scoreValue = this.parseScore(entry['Score']);

          return {
            id: index, // Usamos el índice como ID único para la tabla
            proteinId: firstMatch.id || 0,
            cellLine: entry['Cell line/ Tissue'],
            cellType: entry['Cell Type'],
            organism: entry['Organism'],
            detectionTechnique: entry['Detection technique'],
            detectionType: entry['TD Type'],
            score: scoreValue, // Ahora es un número real (0.04)
            expressionLevel: Math.round(scoreValue * 100), // Calculamos porcentaje
            validationStatus: 'Validated'
          };
        }),
        totalCellTypes: results.length,
        lastUpdated: new Date(),
      });
    } else {
      this.searchResult.set(null);
    }
  }

  searchProteinById(proteinId: number): void {
    if (!this.excelData.length) this.loadFromStorage();

    const results = this.excelData.filter((entry) => entry.id === proteinId);

    if (results.length > 0) {
      const protein = results[0];
      this.searchResult.set({
        protein: {
          id: protein.id,
          name: protein['Protein Name A'],
          uniprotId: protein['ID Uniprot A'],
          gene: protein['Gene'],
          function: protein['Functionality'],
          cellularLocation: protein['Subcellular location'],
          description: protein['Functionality'] || '',
        },
        cellExpressions: results.map((entry, index) => {
          // AQUI TAMBIÉN USAMOS EL PARSEADOR
          const scoreValue = this.parseScore(entry['Score']);

          return {
            id: index,
            proteinId: protein.id,
            cellLine: entry['Cell line/ Tissue'],
            cellType: entry['Cell Type'],
            organism: entry['Organism'],
            detectionTechnique: entry['Detection technique'],
            detectionType: entry['TD Type'],
            score: scoreValue,
            expressionLevel: Math.round(scoreValue * 100),
            validationStatus: 'Validated',
          };
        }),
        totalCellTypes: results.length,
        lastUpdated: new Date(),
      });
    } else {
      this.searchResult.set(null);
    }
  }

  // ... el resto de métodos (clearResults, exportToCSV) siguen igual
  exportToCSV(): string {
      const expressions = this.cellExpressions();
      // ...
      return ''; // Tu código actual
  }

  clearResults() {
    this.searchResult.set(null);
  }
}
