import { Component, computed, signal } from '@angular/core';
import { Project } from '../../core/models/project.model';
import { PROJECTS } from '../../core/data/projects.data';
import { Readout } from './readout/readout';

const ROWS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const COLUMNS = Array.from({ length: 12 }, (_, i) => i + 1);

@Component({
  selector: 'app-plate',
  imports: [Readout],
  templateUrl: './plate.html',
  styleUrl: './plate.scss',
})
export class Plate {
  protected readonly rows = ROWS;
  protected readonly columns = COLUMNS;

  private readonly wells: Record<string, Project> = Object.fromEntries(
    PROJECTS.map((project) => [project.well, project]),
  );

  readonly selectedId = signal<string | null>(null);
  readonly selected = computed(() => PROJECTS.find((p) => p.id === this.selectedId()) ?? null);

  protected wellAt(row: string, col: number): Project | null {
    return this.wells[`${row}${col}`] ?? null;
  }

  select(id: string): void {
    this.selectedId.set(id);
  }
}
