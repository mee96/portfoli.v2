import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Readout } from './readout';

describe('Readout', () => {
  let component: Readout;
  let fixture: ComponentFixture<Readout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Readout],
    }).compileComponents();

    fixture = TestBed.createComponent(Readout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
