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

  it('renders the 3 entries via the shared LogEntry component', () => {
    const entries = fixture.debugElement.queryAll(By.directive(LogEntry));
    expect(entries.length).toBe(3);
  });

  it('marks Fundació Esplai as active, and the other two as not active', () => {
    const entries = fixture.debugElement
      .queryAll(By.directive(LogEntry))
      .map((el) => el.componentInstance as LogEntry);

    const esplai = entries.find((e) => e.org === 'Fundació Esplai');
    const freelance = entries.find((e) => e.title === 'Freelance Web Developer');
    const lab = entries.find((e) => e.title === 'Laboratory Technician');

    expect(esplai?.active).toBe(true);
    expect(freelance?.active).toBe(false);
    expect(lab?.active).toBe(false);
  });

  it('passes the correct inputs to SectionHeader', () => {
    const header = fixture.debugElement.query(By.directive(SectionHeader))
      .componentInstance as SectionHeader;

    expect(header.fig).toBe('Fig. 2');
    expect(header.title).toBe('Experience');
    expect(header.subtitle).toBe('Where the work has actually happened.');
  });
});
