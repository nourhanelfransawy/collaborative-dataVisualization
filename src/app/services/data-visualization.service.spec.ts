import { TestBed } from '@angular/core/testing';

import { DataVisualizationService } from './data-visualization.service';

describe('DataVisualizationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataVisualizationService = TestBed.get(DataVisualizationService);
    expect(service).toBeTruthy();
  });
});
