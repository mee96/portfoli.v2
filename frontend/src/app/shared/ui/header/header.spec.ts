import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { Header } from './header';
import { LangSwitcher } from '../lang-switcher/lang-switcher';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header],
    }).compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders the 4 anchor links with the correct hrefs', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const hrefs = Array.from(compiled.querySelectorAll('.nav a')).map((a) =>
      a.getAttribute('href'),
    );

    expect(hrefs).toEqual(['#plate', '#skills', '#training-log', '#contact']);
  });

  it('renders app-lang-switcher inside the header', () => {
    const langSwitcher = fixture.debugElement.query(By.directive(LangSwitcher));
    expect(langSwitcher).not.toBeNull();
  });
});
