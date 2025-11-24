import { createAction, props } from '@ngrx/store';
import { Finding } from '@angular-micro-frontend/shared';

export const loadFindings = createAction(
  '[Findings] Load Findings'
);

export const loadFindingsSuccess = createAction(
  '[Findings] Load Findings Success',
  props<{ findings: Finding[] }>()
);

export const loadFindingsFailure = createAction(
  '[Findings] Load Findings Failure',
  props<{ error: string }>()
);

// Resolve Finding
export const resolveFinding = createAction(
  '[Findings] Resolve Finding',
  props<{ id: string }>()
);

export const resolveFindingSuccess = createAction(
  '[Findings] Resolve Finding Success',
  props<{ id: string }>()
);

export const resolveFindingFailure = createAction(
  '[Findings] Resolve Finding Failure',
  props<{ error: string }>()
);

// Select Finding
export const selectFinding = createAction(
  '[Findings] Select Finding',
  props<{ finding: Finding }>()
);

export const clearSelectedFinding = createAction(
  '[Findings] Clear Selected Finding'
);
