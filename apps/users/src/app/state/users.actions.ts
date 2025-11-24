import { createAction, props } from '@ngrx/store';
import { User } from '@angular-micro-frontend/shared';

// Load Users
export const loadUsers = createAction(
  '[Users] Load Users'
);

export const loadUsersSuccess = createAction(
  '[Users] Load Users Success',
  props<{ users: User[] }>()
);

export const loadUsersFailure = createAction(
  '[Users] Load Users Failure',
  props<{ error: string }>()
);

// Delete User
export const deleteUser = createAction(
  '[Users] Delete User',
  props<{ id: string }>()
);

export const deleteUserSuccess = createAction(
  '[Users] Delete User Success',
  props<{ id: string }>()
);

export const deleteUserFailure = createAction(
  '[Users] Delete User Failure',
  props<{ error: string }>()
);

// Select User
export const selectUser = createAction(
  '[Users] Select User',
  props<{ user: User }>()
);

export const clearSelectedUser = createAction(
  '[Users] Clear Selected User'
);