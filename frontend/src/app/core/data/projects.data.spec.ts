import { PROJECTS } from './projects.data';

describe('PROJECTS', () => {
  it('has at least 2 entries', () => {
    expect(PROJECTS.length).toBeGreaterThanOrEqual(2);
  });

  it('every project satisfies the Project shape', () => {
    for (const project of PROJECTS) {
      expect(project.id).toBeTruthy();
      expect(project.well).toBeTruthy();
      expect(['stack', 'ai', 'client']).toContain(project.kind);
      expect(project.year).toBeTruthy();
      expect(Array.isArray(project.stack)).toBe(true);
      expect(project.stack.length).toBeGreaterThan(0);

      for (const lang of ['en', 'es', 'ca'] as const) {
        const translation = project.translations[lang];
        expect(translation).toBeTruthy();
        expect(translation.tag).toBeTruthy();
        expect(translation.method).toBeTruthy();
        expect(translation.reading).toBeTruthy();
      }
    }
  });

  it('has unique ids', () => {
    const ids = PROJECTS.map((project) => project.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
