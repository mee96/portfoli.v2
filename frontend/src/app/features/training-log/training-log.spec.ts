import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingLog } from './training-log';

describe('TrainingLog', () => {
  let component: TrainingLog;
  let fixture: ComponentFixture<TrainingLog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingLog],
    }).compileComponents();

    fixture = TestBed.createComponent(TrainingLog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
