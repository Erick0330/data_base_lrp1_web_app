import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LigandSearch } from './ligand-search';

describe('LigandSearch', () => {
  let component: LigandSearch;
  let fixture: ComponentFixture<LigandSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LigandSearch]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LigandSearch);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
