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

  it('wraps the three buttons in a group container', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const group = compiled.querySelector('.lang-switcher[role="group"]');

    expect(group).not.toBeNull();
    expect(group?.querySelectorAll('button.lang').length).toBe(3);
  });

  it('marks the active language button with aria-pressed="true"', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const enButton = Array.from(compiled.querySelectorAll('button.lang')).find(
      (btn) => btn.textContent?.trim() === 'EN',
    );

    expect(enButton?.getAttribute('aria-pressed')).toBe('true');
  });

  it('switches aria-pressed when a language is clicked', async () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const buttons = Array.from(compiled.querySelectorAll<HTMLButtonElement>('button.lang'));
    const caButton = buttons.find((btn) => btn.textContent?.trim() === 'CA');
    const enButton = buttons.find((btn) => btn.textContent?.trim() === 'EN');

    caButton?.click();
    await fixture.whenStable();

    expect(caButton?.getAttribute('aria-pressed')).toBe('true');
    expect(enButton?.getAttribute('aria-pressed')).toBe('false');
  });
});
