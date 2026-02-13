import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LigandDetailsComponent } from './ligand-details.component';

describe('LigandDetailsComponent', () => {
  let component: LigandDetailsComponent;
  let fixture: ComponentFixture<LigandDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LigandDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LigandDetailsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
