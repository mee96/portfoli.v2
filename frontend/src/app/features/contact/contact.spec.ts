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
    const photo = () => compiled.querySelector('.photo') as HTMLElement;

    expect(photo().querySelector('.photo-placeholder')).toBeNull();
    expect(photo().querySelector('img')).not.toBeNull();

    photo().querySelector('img')?.dispatchEvent(new Event('error'));
    await fixture.whenStable();

    expect(photo().querySelector('img')).toBeNull();
    expect(photo().querySelector('.photo-placeholder')?.textContent).toContain(
      'Add foto.jpg next to this file',
    );
  });

  it('renders the footer with two decorative, lazy-loaded gifs around the text', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const gifs = Array.from(compiled.querySelectorAll('footer.site-footer img.footer-gif'));

    expect(gifs.length).toBe(2);
    for (const gif of gifs) {
      expect(gif.getAttribute('alt')).toBe('');
      expect(gif.getAttribute('loading')).toBe('lazy');
    }
    expect(compiled.querySelector('.footer-text')?.textContent).toContain('Barcelona ·');
  });

  it('renders 3 social links with aria-label, opening in a new tab safely', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const links = Array.from(compiled.querySelectorAll('.footer-socials a'));

    expect(links.length).toBe(3);

    const labels = links.map((link) => link.getAttribute('aria-label'));
    expect(labels).toEqual(['GitHub', 'LinkedIn', 'Instagram']);

    for (const link of links) {
      expect(link.getAttribute('target')).toBe('_blank');
      expect(link.getAttribute('rel')).toBe('noopener noreferrer');
      expect(link.querySelector('svg')).not.toBeNull();
    }

    expect(links[0].getAttribute('href')).toBe('https://github.com/mee96');
  });

  it('renders only mail and CV in .links, each with an icon', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const links = Array.from(compiled.querySelectorAll('.links a'));

    expect(links.length).toBe(2);

    expect(links[0].getAttribute('href')).toBe('mailto:dev.mee96@gmail.com');
    expect(links[0].textContent).toContain('dev.mee96@gmail.com');
    expect(links[0].querySelector('svg')).not.toBeNull();

    expect(links[1].getAttribute('href')).toBe('#');
    expect(links[1].textContent).toContain('CV');
    expect(links[1].querySelector('svg')).not.toBeNull();

    const hrefs = links.map((link) => link.getAttribute('href'));
    expect(hrefs).not.toContain('https://github.com/mee96');
    expect(links.map((link) => link.textContent)).not.toContain('LinkedIn');
  });
});
