import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { Experience } from './experience';
import { LogEntry } from '../../shared/ui/log-entry/log-entry';
import { SectionHeader } from '../../shared/ui/section-header/section-header';

describe('Experience', () => {
  let component: Experience;
  let fixture: ComponentFixture<Experience>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Experience],
    }).compileComponents();

    fixture = TestBed.createComponent(Experience);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders the 4 entries via the shared LogEntry component', () => {
    const entries = fixture.debugElement.queryAll(By.directive(LogEntry));
    expect(entries.length).toBe(4);
  });

  it('marks Fundación Esplai as active with activeLabel "Now", and the other three as not active', () => {
    const entries = fixture.debugElement
      .queryAll(By.directive(LogEntry))
      .map((el) => el.componentInstance as LogEntry);

    const esplai = entries.find((e) => e.org === 'Fundación Esplai');
    const freelance = entries.find((e) => e.title === 'Freelance Web Developer');
    const lab = entries.find((e) => e.title === 'Laboratory Technician');
    const teleperformance = entries.find((e) => e.org === 'Teleperformance');

    expect(esplai?.active).toBe(true);
    expect(esplai?.activeLabel).toBe('Now');
    expect(freelance?.active).toBe(false);
    expect(lab?.active).toBe(false);
    expect(teleperformance?.active).toBe(false);
  });

  it('renders no org for the freelance entry, since it has none', () => {
    const freelance = fixture.debugElement
      .queryAll(By.directive(LogEntry))
      .map((el) => el.componentInstance as LogEntry)
      .find((e) => e.title === 'Freelance Web Developer');

    expect(freelance?.org).toBeUndefined();
  });

  it('passes the correct inputs to SectionHeader', () => {
    const header = fixture.debugElement.query(By.directive(SectionHeader))
      .componentInstance as SectionHeader;

    expect(header.fig).toBe('Fig. 2');
    expect(header.title).toBe('Experience');
    expect(header.subtitle).toBe('Where the work has actually happened.');
  });
});
