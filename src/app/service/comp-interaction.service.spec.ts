import { TestBed, inject } from '@angular/core/testing';

import { CompInteractionService } from './comp-interaction.service';

describe('CompInteractionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CompInteractionService]
    });
  });

  it('should be created', inject([CompInteractionService], (service: CompInteractionService) => {
    expect(service).toBeTruthy();
  }));
});
