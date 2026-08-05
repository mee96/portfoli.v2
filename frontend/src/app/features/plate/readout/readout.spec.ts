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

  it('renders GitHub and Live links only when the project defines them', async () => {
    const plantealo = PROJECTS.find((p) => p.id === 'plantealo')!;
    fixture.componentRef.setInput('project', plantealo);
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    const links = Array.from(compiled.querySelectorAll('.link-circle'));
    expect(links.length).toBe(1);
    expect(links[0].getAttribute('aria-label')).toBe('GitHub');
    expect(links[0].getAttribute('href')).toBe(plantealo.githubUrl);
  });

  it('renders no links row at all when the project has neither githubUrl nor demoUrl', async () => {
    const nikkura = PROJECTS.find((p) => p.id === 'nikkura')!;
    expect(nikkura.githubUrl).toBeUndefined();
    expect(nikkura.demoUrl).toBeUndefined();

    fixture.componentRef.setInput('project', nikkura);
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.links')).toBeNull();
    expect(compiled.querySelector('.link-circle')).toBeNull();
  });

  it('sets the correct aria-label (and matching data-tooltip) on the GitHub and Live circles', async () => {
    const plantealo = PROJECTS.find((p) => p.id === 'plantealo')!;
    fixture.componentRef.setInput('project', plantealo);
    await fixture.whenStable();

    let compiled = fixture.nativeElement as HTMLElement;
    const github = compiled.querySelector('.link-circle')!;
    expect(github.getAttribute('aria-label')).toBe('GitHub');
    expect(github.getAttribute('data-tooltip')).toBe('GitHub');

    const bbt = PROJECTS.find((p) => p.id === 'bbt')!;
    fixture.componentRef.setInput('project', bbt);
    await fixture.whenStable();

    compiled = fixture.nativeElement as HTMLElement;
    const live = compiled.querySelector('.link-circle--live')!;
    expect(live.getAttribute('aria-label')).toBe('Live demo');
    expect(live.getAttribute('data-tooltip')).toBe('Live demo');
  });
});
