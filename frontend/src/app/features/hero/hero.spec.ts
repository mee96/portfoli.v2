import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { Hero } from './hero';
import { Button } from '../../shared/ui/button/button';

describe('Hero', () => {
  let component: Hero;
  let fixture: ComponentFixture<Hero>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Hero],
    }).compileComponents();

    fixture = TestBed.createComponent(Hero);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders the eyebrow, title and lede for the default language', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.eyebrow')?.textContent).toContain(
      'Assay 001 · Full stack developer · Barcelona',
    );
    expect(compiled.querySelector('h1')?.innerHTML).toContain(
      'Same rigour.<br>Different <em>bench</em>.',
    );
    expect(compiled.querySelector('p')?.textContent).toContain(
      "Three years reading clinical assays",
    );
  });

  it('passes the right label, href and variant to each CTA button', () => {
    const buttons = fixture.debugElement.queryAll(By.directive(Button));
    expect(buttons.length).toBe(2);

    const [primary, secondary] = buttons.map((el) => el.componentInstance as Button);

    expect(primary.label).toBe('Read the plate');
    expect(primary.href).toBe('#plate');
    expect(primary.variant).toBe('primary');

    expect(secondary.label).toBe('Get in touch');
    expect(secondary.href).toBe('#contact');
    expect(secondary.variant).toBe('secondary');
  });
});
