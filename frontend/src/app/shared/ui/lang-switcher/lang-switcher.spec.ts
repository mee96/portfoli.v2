import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LangSwitcher } from './lang-switcher';

describe('LangSwitcher', () => {
  let component: LangSwitcher;
  let fixture: ComponentFixture<LangSwitcher>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LangSwitcher],
    }).compileComponents();

    fixture = TestBed.createComponent(LangSwitcher);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('marks the active language button based on translation.lang()', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const enButton = Array.from(compiled.querySelectorAll('button')).find(
      (btn) => btn.textContent?.trim() === 'EN',
    );

    expect(enButton?.classList.contains('active')).toBe(true);
  });

  it('switches the active button when a language is clicked', async () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const buttons = Array.from(compiled.querySelectorAll('button'));
    const caButton = buttons.find((btn) => btn.textContent?.trim() === 'CA');
    const enButton = buttons.find((btn) => btn.textContent?.trim() === 'EN');

    caButton?.click();
    await fixture.whenStable();

    expect(caButton?.classList.contains('active')).toBe(true);
    expect(enButton?.classList.contains('active')).toBe(false);
  });
});
