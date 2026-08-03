import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Readout } from './readout';
import { PROJECTS } from '../../../core/data/projects.data';
import { TranslationService } from '../../../core/services/translation.service';

describe('Readout', () => {
  let component: Readout;
  let fixture: ComponentFixture<Readout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Readout],
    }).compileComponents();

    fixture = TestBed.createComponent(Readout);
    component = fixture.componentInstance;
  });

  it('should create', async () => {
    await fixture.whenStable();
    expect(component).toBeTruthy();
  });

  it('shows the empty message when project is null', async () => {
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.empty')?.textContent).toContain(
      'Select a well to read the sample.',
    );
  });

  it('shows the tag/method/reading of the project in the active language', async () => {
    const bbt = PROJECTS.find((p) => p.id === 'bbt')!;
    fixture.componentRef.setInput('project', bbt);
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.tag')?.textContent).toContain(bbt.translations.en.tag);
    expect(compiled.querySelector('.method')?.textContent).toContain(bbt.translations.en.method);
    expect(compiled.querySelector('.reading')?.textContent).toContain(
      bbt.translations.en.reading,
    );
  });

  it('switches translated content when the active language changes', async () => {
    const bbt = PROJECTS.find((p) => p.id === 'bbt')!;
    fixture.componentRef.setInput('project', bbt);
    TestBed.inject(TranslationService).setLang('ca');
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.tag')?.textContent).toContain(bbt.translations.ca.tag);
  });
});
