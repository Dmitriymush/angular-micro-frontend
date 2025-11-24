import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FindingsState } from './findings.state';

export const selectFindingsState = createFeatureSelector<FindingsState>('findings');

export const selectAllFindings = createSelector(
  selectFindingsState,
  (state) => state.findings
);

export const selectSelectedFinding = createSelector(
  selectFindingsState,
  (state) => state.selectedFinding
);

export const selectFindingsLoading = createSelector(
  selectFindingsState,
  (state) => state.loading
);

export const selectFindingsError = createSelector(
  selectFindingsState,
  (state) => state.error
);

export const selectFindingById = (id: string) =>
  createSelector(selectAllFindings, (findings) =>
    findings.find((finding) => finding.id === id)
  );

export const selectOpenFindings = createSelector(
  selectAllFindings,
  (findings) => findings.filter((finding) => finding.status === 'open')
);

export const selectResolvedFindings = createSelector(
  selectAllFindings,
  (findings) => findings.filter((finding) => finding.status === 'resolved')
);

export const selectFindingsBySeverity = (severity: string) =>
  createSelector(selectAllFindings, (findings) =>
    findings.filter((finding) => finding.severity === severity)
  );

export const selectCriticalFindings = createSelector(
  selectAllFindings,
  (findings) => findings.filter((finding) => finding.severity === 'critical')
);

export const selectFindingsCount = createSelector(
  selectAllFindings,
  (findings) => findings.length
);

export const selectOpenFindingsCount = createSelector(
  selectOpenFindings,
  (findings) => findings.length
);

export const selectCriticalFindingsCount = createSelector(
  selectCriticalFindings,
  (findings) => findings.length
);