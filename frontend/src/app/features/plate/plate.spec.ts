import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { Plate } from './plate';
import { PROJECTS } from '../../core/data/projects.data';
import { SectionHeader } from '../../shared/ui/section-header/section-header';

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

  it('hovering an occupied well updates selected()', async () => {
    const bbt = PROJECTS.find((p) => p.id === 'bbt')!;
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector(`[data-well="${bbt.well}"]`) as HTMLButtonElement;

    button.dispatchEvent(new MouseEvent('mouseenter'));
    await fixture.whenStable();

    expect(component.selected()?.id).toBe('bbt');
  });

  it('starts with a featured project selected', () => {
    const featuredIds = PROJECTS.filter((p) => p.featured).map((p) => p.id);

    expect(featuredIds.length).toBeGreaterThan(0);
    expect(featuredIds).toContain(component.selected()?.id);
  });

  it('marks only the selected well', async () => {
    const compiled = fixture.nativeElement as HTMLElement;
    await fixture.whenStable();

    const marked = compiled.querySelectorAll('button.well--selected');
    expect(marked.length).toBe(1);
    expect(marked[0].getAttribute('data-well')).toBe(component.selected()?.well);
  });

  it('focusing an occupied well updates selected()', async () => {
    const bbt = PROJECTS.find((p) => p.id === 'bbt')!;
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector(`[data-well="${bbt.well}"]`) as HTMLButtonElement;

    button.dispatchEvent(new FocusEvent('focus'));
    await fixture.whenStable();

    expect(component.selected()?.id).toBe('bbt');
  });

  it('an empty well keeps the current selection', async () => {
    const before = component.selectedId();
    const compiled = fixture.nativeElement as HTMLElement;
    // A1 has no project in PROJECTS
    const button = compiled.querySelector('[data-well="A1"]') as HTMLButtonElement;

    button.click();
    await fixture.whenStable();

    expect(component.selectedId()).toBe(before);
  });

  it('passes the correct inputs to SectionHeader', () => {
    const header = fixture.debugElement.query(By.directive(SectionHeader))
      .componentInstance as SectionHeader;

    expect(header.fig).toBe('Fig. 1');
    expect(header.title).toBe('Plate map');
    expect(header.subtitle).toBe('Tap a well to read the sample.');
  });

  it('renders the 3 legend entries with the correct labels', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const items = Array.from(compiled.querySelectorAll('.legend-item'));

    expect(items.length).toBe(3);
    expect(items[0].textContent).toContain('Full-stack app');
    expect(items[1].textContent).toContain('AI layer');
    expect(items[2].textContent).toContain('Client & CMS work');

    expect(compiled.querySelector('.legend-item .dot--stack')).not.toBeNull();
    expect(compiled.querySelector('.legend-item .dot--ai')).not.toBeNull();
    expect(compiled.querySelector('.legend-item .dot--client')).not.toBeNull();
  });
});
