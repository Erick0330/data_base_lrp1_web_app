import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CellTypeDataService {
  private allData = signal<any[]>([]);
  private selectedCellType = signal<string>('');

  readonly proteins = computed(() => {
    const cellType = this.selectedCellType();
    const data = this.allData();

    return data
      .filter(item => item['Cell Type'] === cellType || item['Cell line/ Tissue'] === cellType)
      .map((item, index) => ({
        id: index,
        name: item['Protein Name A'] || '',
        uniprotId: item['ID Uniprot A'] || '',
        gene: item['Gene'] || '',
        subcellularLocation: item['Subcellular location'] || '',
        functionality: item['Functionality'] || '',
        organism: item['Organism'] || '',
        cellType: item['Cell Type'] || '',
        cellLineTissue: item['Cell line/ Tissue'] || '',
        detectionTechnique: item['Detection technique'] || '',
        detectionType: item['TD Type'] || '',
        reference: item['Reference'] || '',
        score: this.parseScore(item['Score']),
        validationStatus: 'Validated'
      }));
  });

  readonly totalCount = computed(() => this.proteins().length);

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    const storedData = localStorage.getItem('excelData');
    if (storedData) {
      this.allData.set(JSON.parse(storedData));
    }
  }

  private parseScore(value: any): number {
    if (typeof value === 'number') return value;
    if (typeof value === 'string') {
      const cleanValue = value.replace(',', '.');
      const parsed = parseFloat(cleanValue);
      return isNaN(parsed) ? 0 : parsed;
    }
    return 0;
  }

  loadCellTypeData(cellType: string) {
    if (this.allData().length === 0) this.loadFromStorage();
    this.selectedCellType.set(cellType);
  }

  exportToCSV(): string {
    const data = this.proteins();
    const headers = ['Protein Name', 'Uniprot ID', 'Gene', 'Score', 'Technique', 'Type'];
    const rows = data.map(p =>
      `"${p.name}","${p.uniprotId}","${p.gene}",${p.score},"${p.detectionTechnique}","${p.detectionType}"`
    );
    return [headers.join(','), ...rows].join('\n');
  }
}
