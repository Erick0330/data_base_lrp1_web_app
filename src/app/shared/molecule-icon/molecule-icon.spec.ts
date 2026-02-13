import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoleculeIcon } from './molecule-icon';

describe('MoleculeIcon', () => {
  let component: MoleculeIcon;
  let fixture: ComponentFixture<MoleculeIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoleculeIcon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoleculeIcon);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
