import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionHeader } from './section-header';

describe('SectionHeader', () => {
  let component: SectionHeader;
  let fixture: ComponentFixture<SectionHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionHeader],
    }).compileComponents();

    fixture = TestBed.createComponent(SectionHeader);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.componentRef.setInput('fig', 'Fig. 1');
    fixture.componentRef.setInput('title', 'Skills');
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('always renders fig and title', async () => {
    fixture.componentRef.setInput('fig', 'Fig. 1');
    fixture.componentRef.setInput('title', 'Skills');
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.mono')?.textContent).toContain('Fig. 1');
    expect(compiled.querySelector('h2')?.textContent).toContain('Skills');
  });

  it('omits the subtitle when it is not passed', async () => {
    fixture.componentRef.setInput('fig', 'Fig. 1');
    fixture.componentRef.setInput('title', 'Skills');
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.subtitle')).toBeNull();
  });

  it('renders the subtitle when it is passed', async () => {
    fixture.componentRef.setInput('fig', 'Fig. 1');
    fixture.componentRef.setInput('title', 'Skills');
    fixture.componentRef.setInput('subtitle', 'What I actually use');
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.subtitle')?.textContent).toContain('What I actually use');
  });
});
