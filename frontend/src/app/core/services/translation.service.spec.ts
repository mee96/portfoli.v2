import { TestBed } from '@angular/core/testing';
import { TranslationService } from './translation.service';

describe('TranslationService', () => {
  let service: TranslationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranslationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('defaults to english', () => {
    expect(service.lang()).toBe('en');
  });

  it('setLang updates the lang signal', () => {
    service.setLang('es');
    expect(service.lang()).toBe('es');

    service.setLang('ca');
    expect(service.lang()).toBe('ca');
  });

  it('t() resolves nested translation keys per language', () => {
    expect(service.t('hero.title')).toBe("Hi, I'm building my portfolio");

    service.setLang('ca');
    expect(service.t('hero.title')).toBe('Hola, estic construint el meu portfolio');
  });

  it('t() falls back to the key when the translation is missing', () => {
    expect(service.t('nope.missing')).toBe('nope.missing');
  });
});
