import { createReducer, on } from '@ngrx/store';
import { FindingsState, initialFindingsState } from './findings.state';
import * as FindingsActions from './findings.actions';

export const findingsReducer = createReducer(
  initialFindingsState,

  on(FindingsActions.loadFindings, (state): FindingsState => ({
    ...state,
    loading: true,
    error: null
  })),

  on(FindingsActions.loadFindingsSuccess, (state, { findings }): FindingsState => ({
    ...state,
    findings,
    loading: false,
    error: null
  })),

  on(FindingsActions.loadFindingsFailure, (state, { error }): FindingsState => ({
    ...state,
    loading: false,
    error
  })),

  // Resolve Finding
  on(FindingsActions.resolveFinding, (state): FindingsState => ({
    ...state,
    loading: true,
    error: null
  })),

  on(FindingsActions.resolveFindingSuccess, (state, { id }): FindingsState => ({
    ...state,
    findings: state.findings.map(finding =>
      finding.id === id
        ? { ...finding, status: 'resolved' }
        : finding
    ),
    loading: false,
    error: null
  })),

  on(FindingsActions.resolveFindingFailure, (state, { error }): FindingsState => ({
    ...state,
    loading: false,
    error
  })),

  on(FindingsActions.selectFinding, (state, { finding }): FindingsState => ({
    ...state,
    selectedFinding: finding
  })),

  on(FindingsActions.clearSelectedFinding, (state): FindingsState => ({
    ...state,
    selectedFinding: null
  }))
);
