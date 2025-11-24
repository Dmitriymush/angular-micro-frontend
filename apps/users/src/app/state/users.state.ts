import { User } from '@angular-micro-frontend/shared';

export interface UsersState {
  users: User[];
  selectedUser: User | null;
  loading: boolean;
  error: string | null;
}

export const initialUsersState: UsersState = {
  users: [],
  selectedUser: null,
  loading: false,
  error: null
};
