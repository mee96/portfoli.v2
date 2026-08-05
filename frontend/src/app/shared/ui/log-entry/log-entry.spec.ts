import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogEntry } from './log-entry';

describe('LogEntry', () => {
  let component: LogEntry;
  let fixture: ComponentFixture<LogEntry>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogEntry],
    }).compileComponents();

    fixture = TestBed.createComponent(LogEntry);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('dt', '2026');
    fixture.componentRef.setInput('title', 'Some role');
    fixture.componentRef.setInput('org', 'Some org');
    fixture.componentRef.setInput('chips', ['Angular', 'FastAPI']);
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('renders dt, title, org and chips, without a description or badge by default', async () => {
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('.dt')?.textContent).toContain('2026');
    expect(compiled.querySelector('.title')?.textContent).toContain('Some role');
    expect(compiled.querySelector('.org')?.textContent).toContain('Some org');
    expect(compiled.querySelectorAll('app-chip').length).toBe(2);

    expect(compiled.querySelector('.description')).toBeNull();
    expect(compiled.querySelector('.badge')).toBeNull();
  });

  it('renders the description when passed, and the badge with the given label when active', async () => {
    fixture.componentRef.setInput('description', 'Doing things.');
    fixture.componentRef.setInput('active', true);
    fixture.componentRef.setInput('activeLabel', 'Now');
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.description')?.textContent).toContain('Doing things.');
    expect(compiled.querySelector('.badge')?.textContent).toContain('Now');
  });
});
