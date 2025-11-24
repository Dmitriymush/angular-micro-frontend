import { Component, OnInit, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { User, DateHelper } from '@angular-micro-frontend/shared';
import { UsersHelper } from '../../helpers/users.helper';
import * as UsersActions from '../../state/users.actions';
import * as UsersSelectors from '../../state/users.selectors';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent implements OnInit {
  private readonly store = inject(Store);

  protected readonly users = this.store.selectSignal(UsersSelectors.selectAllUsers);
  protected readonly loading = this.store.selectSignal(UsersSelectors.selectUsersLoading);
  protected readonly error = this.store.selectSignal(UsersSelectors.selectUsersError);

  protected readonly sortedUsers = computed(() =>
    UsersHelper.sortByName(this.users())
  );

  protected readonly userCount = computed(() => this.users().length);

  protected readonly roleStats = computed(() =>
    UsersHelper.countByRole(this.users())
  );

  ngOnInit(): void {
    this.store.dispatch(UsersActions.loadUsers());
  }

  protected deleteUser(id: string): void {
    const user = UsersHelper.findById(this.users(), id);
    if (!user) return;

    const confirmMessage = `Are you sure you want to delete ${user.name}?`;
    if (!confirm(confirmMessage)) return;

    this.store.dispatch(UsersActions.deleteUser({ id }));
  }

  protected formatDate(dateString: string): string {
    return DateHelper.formatToLocaleString(dateString);
  }
}
