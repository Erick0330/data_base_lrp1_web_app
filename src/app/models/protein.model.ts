// Para la página de resultados por tipo celular
export interface CellTypeProtein {
  id: number;
  name: string;
  uniprotId: string;
  geneSymbol?: string;
  description?: string;
  cellTypeSpecificity?: number;
  publicationCount?: number;
  // Estos campos son específicos para la tabla de tipo celular
  detectionTechnique: string;
  detectionType: 'High-throughput' | 'Medium-throughput' | 'Low-throughput';
  score: number;
  gene: string;
  cellLineTissue: string;
  reference: string;
}

// Para la página de detalles de ligando
export interface LigandProtein {
  id: number;
  name: string;
  uniprotId: string;
  gene: string;
  function: string;
  cellularLocation: string;
  description?: string;
}

// Para la expresión en diferentes tipos celulares
export interface ProteinCellExpression {
  id: number;
  proteinId: number;
  cellLine: string;        // Línea celular
  cellType: string;        // Tipo celular
  organism: string;        // Organismo (esto es la "O")
  detectionTechnique: string;
  detectionType: 'High-throughput' | 'Medium-throughput' | 'Low-throughput';
  score: number;
  // Datos adicionales específicos de la expresión
  expressionLevel?: number;
  validationStatus?: 'Validated' | 'Predicted' | 'Experimental';
  reference?: string;
}

// Para los resultados de búsqueda por tipo celular
export interface CellTypeData {
  cellType: string;
  proteins: CellTypeProtein[];
  totalCount: number;
  lastUpdated: Date;
}

// Para los resultados de búsqueda por ligando
export interface LigandSearchResult {
  protein: LigandProtein;
  cellExpressions: ProteinCellExpression[];
  totalCellTypes: number;
  lastUpdated: Date;
}

