import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Plate } from './plate';
import { PROJECTS } from '../../core/data/projects.data';

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

  it('renders 96 wells (8 rows x 12 columns)', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('button.well').length).toBe(96);
  });

  it('clicking an occupied well updates selected()', async () => {
    const bbt = PROJECTS.find((p) => p.id === 'bbt')!;
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector(`[data-well="${bbt.well}"]`) as HTMLButtonElement;

    button.click();
    await fixture.whenStable();

    expect(component.selected()?.id).toBe('bbt');
  });

  it('clicking an empty well does nothing', async () => {
    const compiled = fixture.nativeElement as HTMLElement;
    // A1 has no project in PROJECTS
    const button = compiled.querySelector('[data-well="A1"]') as HTMLButtonElement;

    button.click();
    await fixture.whenStable();

    expect(component.selectedId()).toBeNull();
    expect(component.selected()).toBeNull();
  });
});
