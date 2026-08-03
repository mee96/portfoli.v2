import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Plate } from './plate';

describe('Plate', () => {
  let component: Plate;
  let fixture: ComponentFixture<Plate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Plate],
    }).compileComponents();

    fixture = TestBed.createComponent(Plate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
