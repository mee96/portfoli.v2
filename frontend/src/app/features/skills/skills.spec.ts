import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { Skills } from './skills';
import { SectionHeader } from '../../shared/ui/section-header/section-header';
import { TranslationService } from '../../core/services/translation.service';
import { SKILLS } from '../../core/data/skills.data';

describe('Skills', () => {
  let component: Skills;
  let fixture: ComponentFixture<Skills>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Skills],
    }).compileComponents();

    fixture = TestBed.createComponent(Skills);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders 6 skill cards', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('article.skill-card').length).toBe(6);
  });

  it('renders the translated content for the active language and updates on change', async () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const first = SKILLS[0];

    expect(compiled.querySelector('article.skill-card .title')?.textContent).toContain(
      first.translations.en.title,
    );

    TestBed.inject(TranslationService).setLang('ca');
    await fixture.whenStable();

    expect(compiled.querySelector('article.skill-card .title')?.textContent).toContain(
      first.translations.ca.title,
    );
  });

  it('passes the correct inputs to SectionHeader', () => {
    const header = fixture.debugElement.query(By.directive(SectionHeader))
      .componentInstance as SectionHeader;

    expect(header.fig).toBe('Fig. 3');
    expect(header.title).toBe('How the lab shows up in the code');
    expect(header.subtitle).toBe(
      "Three years running RIA and EIA assays before I wrote production code. Lab work is engineering with worse consequences — a mislabelled tube is somebody's diagnosis. Six habits came with me.",
    );
  });

  it('renders 6 dots for the mobile slide indicator, with the first one active by default', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const dots = compiled.querySelectorAll('.dot');

    expect(dots.length).toBe(6);
    expect(dots[0].classList.contains('dot--active')).toBe(true);
    expect(dots[1].classList.contains('dot--active')).toBe(false);
  });

  it('does not throw when IntersectionObserver is unavailable (defensive guard)', () => {
    expect(typeof IntersectionObserver).toBe('undefined');
    expect(component).toBeTruthy();
  });
});
