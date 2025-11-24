import { createReducer, on } from '@ngrx/store';
import { UsersState, initialUsersState } from './users.state';
import * as UsersActions from './users.actions';

export const usersReducer = createReducer(
  initialUsersState,

  on(UsersActions.loadUsers, (state): UsersState => ({
    ...state,
    loading: true,
    error: null
  })),

  on(UsersActions.loadUsersSuccess, (state, { users }): UsersState => ({
    ...state,
    users,
    loading: false,
    error: null
  })),

  on(UsersActions.loadUsersFailure, (state, { error }): UsersState => ({
    ...state,
    loading: false,
    error
  })),

  // Delete User
  on(UsersActions.deleteUser, (state): UsersState => ({
    ...state,
    error: null
  })),

  on(UsersActions.deleteUserSuccess, (state, { id }): UsersState => ({
    ...state,
    users: state.users.filter(user => user.id !== id),
    loading: false,
    error: null
  })),

  on(UsersActions.deleteUserFailure, (state, { error }): UsersState => ({
    ...state,
    loading: false,
    error
  })),

  // Select User
  on(UsersActions.selectUser, (state, { user }): UsersState => ({
    ...state,
    selectedUser: user
  })),

  on(UsersActions.clearSelectedUser, (state): UsersState => ({
    ...state,
    selectedUser: null
  }))
);
