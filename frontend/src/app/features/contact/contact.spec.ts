import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';

import { Contact } from './contact';

function setValue(root: HTMLElement, selector: string, value: string): void {
  const el = root.querySelector(selector) as HTMLInputElement | HTMLTextAreaElement;
  el.value = value;
  el.dispatchEvent(new Event('input'));
}

describe('Contact', () => {
  let component: Contact;
  let fixture: ComponentFixture<Contact>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Contact],
    }).compileComponents();

    fixture = TestBed.createComponent(Contact);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('is invalid when empty and valid once all three fields are filled', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const submitButton = () => compiled.querySelector('button[type="submit"]') as HTMLButtonElement;

    expect(submitButton().disabled).toBe(true);

    setValue(compiled, 'input[type="text"]', 'Ada');
    setValue(compiled, 'input[type="email"]', 'ada@example.com');
    setValue(compiled, 'textarea', 'Hello!');
    fixture.detectChanges();

    expect(submitButton().disabled).toBe(false);
  });

  it('does not call any external service on submit — only warns', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    const compiled = fixture.nativeElement as HTMLElement;
    compiled.querySelector('form')?.dispatchEvent(new Event('submit'));

    expect(warnSpy).toHaveBeenCalledWith('Contact form submission not wired up yet');
  });

  it('shows the placeholder once the photo fails to load', async () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('.photo-placeholder')).toBeNull();
    expect(compiled.querySelector('img')).not.toBeNull();

    compiled.querySelector('img')?.dispatchEvent(new Event('error'));
    await fixture.whenStable();

    expect(compiled.querySelector('img')).toBeNull();
    expect(compiled.querySelector('.photo-placeholder')?.textContent).toContain(
      'Add foto.jpg next to this file',
    );
  });
});
