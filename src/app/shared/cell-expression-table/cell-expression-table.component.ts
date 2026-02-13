import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProteinCellExpression } from '../../models/protein.model';

@Component({
  selector: 'app-cell-expression-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cell-expression-table.component.html',
  styleUrls: ['./cell-expression-table.component.css']
})
export class CellExpressionTableComponent {
  expressions = input<ProteinCellExpression[]>([]);
  proteinName = input<string>('');

  rowClicked = output<number>();

  onRowClick(expressionId: number) {
    this.rowClicked.emit(expressionId);
  }

  getDetectionTypeClass(type: string): string {
    switch (type) {
      case 'High-throughput': return 'badge bg-success';
      case 'Medium-throughput': return 'badge bg-warning';
      case 'Low-throughput': return 'badge bg-secondary';
      default: return 'badge bg-light text-dark';
    }
  }

  getScoreClass(score: number): string {
    if (score >= 0.9) return 'score-high';
    if (score >= 0.7) return 'score-medium';
    if (score >= 0.5) return 'score-low';
    return 'score-very-low';
  }

  getValidationClass(status?: string): string {
    switch (status) {
      case 'Validated': return 'badge bg-success';
      case 'Experimental': return 'badge bg-primary';
      case 'Predicted': return 'badge bg-warning';
      default: return 'badge bg-secondary';
    }
  }
}
