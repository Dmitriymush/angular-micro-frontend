import { Finding } from '@angular-micro-frontend/shared';

export interface FindingsState {
  findings: Finding[];
  selectedFinding: Finding | null;
  loading: boolean;
  error: string | null;
}

export const initialFindingsState: FindingsState = {
  findings: [],
  selectedFinding: null,
  loading: false,
  error: null
};