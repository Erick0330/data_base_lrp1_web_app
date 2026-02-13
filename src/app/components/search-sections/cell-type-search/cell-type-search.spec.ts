import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellTypeSearch } from './cell-type-search';

describe('CellTypeSearch', () => {
  let component: CellTypeSearch;
  let fixture: ComponentFixture<CellTypeSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CellTypeSearch]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CellTypeSearch);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
