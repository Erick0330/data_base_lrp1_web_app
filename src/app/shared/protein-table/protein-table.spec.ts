import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProteinTable } from './protein-table';

describe('ProteinTable', () => {
  let component: ProteinTable;
  let fixture: ComponentFixture<ProteinTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProteinTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProteinTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
