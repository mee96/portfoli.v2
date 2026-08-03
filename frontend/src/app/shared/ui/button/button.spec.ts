import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Button } from './button';

describe('Button', () => {
  let component: Button;
  let fixture: ComponentFixture<Button>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Button],
    }).compileComponents();

    fixture = TestBed.createComponent(Button);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.componentRef.setInput('label', 'Send');
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('renders an <a> when href is passed', async () => {
    fixture.componentRef.setInput('label', 'Read the plate');
    fixture.componentRef.setInput('href', '#plate');
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('a')).not.toBeNull();
    expect(compiled.querySelector('button')).toBeNull();
    expect(compiled.querySelector('a')?.getAttribute('href')).toBe('#plate');
  });

  it('renders a <button> when href is not passed', async () => {
    fixture.componentRef.setInput('label', 'Send');
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('button')).not.toBeNull();
    expect(compiled.querySelector('a')).toBeNull();
  });

  it('applies the class matching the variant', async () => {
    fixture.componentRef.setInput('label', 'Send');
    fixture.componentRef.setInput('variant', 'secondary');
    await fixture.whenStable();

    const button = (fixture.nativeElement as HTMLElement).querySelector('button');
    expect(button?.classList.contains('btn--secondary')).toBe(true);
    expect(button?.classList.contains('btn--primary')).toBe(false);
  });

  it('emits clicked when the button element is clicked', async () => {
    fixture.componentRef.setInput('label', 'Send');
    await fixture.whenStable();

    let emitted = false;
    component.clicked.subscribe(() => (emitted = true));

    (fixture.nativeElement as HTMLElement)
      .querySelector('button')
      ?.dispatchEvent(new Event('click'));
    await fixture.whenStable();

    expect(emitted).toBe(true);
  });
});
