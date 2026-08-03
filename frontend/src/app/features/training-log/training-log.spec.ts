import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingLog } from './training-log';
import { TranslationService } from '../../core/services/translation.service';
import { EDUCATION } from '../../core/data/education.data';

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

  it('renders 7 entries in total (5 dev + 2 lab)', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('article.entry').length).toBe(7);
  });

  it('does not render any "active" badge, since no entry has active: true', () => {
    expect(EDUCATION.some((entry) => entry.active)).toBe(false);

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('.badge').length).toBe(0);
  });

  it('updates the rendered content when the active language changes', async () => {
    const adalab = EDUCATION.find((entry) => entry.id === 'adalab')!;
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain(adalab.translations.en.t);

    TestBed.inject(TranslationService).setLang('ca');
    await fixture.whenStable();

    expect(compiled.textContent).toContain(adalab.translations.ca.t);
    expect(compiled.textContent).not.toContain(adalab.translations.en.t);
  });
});
