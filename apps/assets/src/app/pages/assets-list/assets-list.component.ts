import { Component, OnInit, inject, ViewChild, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableDataSource } from '@angular/material/table';
import { Asset } from '@angular-micro-frontend/shared';
import { AssetsHelper } from '../../helpers/assets.helper';
import * as AssetsActions from '../../state/assets.actions';
import * as AssetsSelectors from '../../state/assets.selectors';

@Component({
  selector: 'app-assets-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './assets-list.component.html',
  styleUrl: './assets-list.component.scss'
})
export class AssetsListComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  protected readonly assets = this.store.selectSignal(AssetsSelectors.selectAllAssets);
  protected readonly loading = this.store.selectSignal(AssetsSelectors.selectAssetsLoading);
  protected readonly error = this.store.selectSignal(AssetsSelectors.selectAssetsError);

  protected readonly searchTerm = signal<string>('');
  protected readonly statusFilter = signal<string>('all');

  protected readonly filteredAssets = computed(() =>
    AssetsHelper.applyFilters(
      this.assets(),
      this.searchTerm(),
      this.statusFilter()
    )
  );

  protected readonly sortedAssets = computed(() =>
    AssetsHelper.sortByName(this.filteredAssets())
  );

  protected readonly statusStats = computed(() =>
    AssetsHelper.countByStatus(this.assets())
  );

  dataSource = new MatTableDataSource<Asset>([]);
  displayedColumns: string[] = ['name', 'status', 'owner', 'actions'];
  pageSize = 10;

  constructor() {
    effect(() => {
      this.dataSource.data = this.sortedAssets();
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  ngOnInit(): void {
    this.store.dispatch(AssetsActions.loadAssets());
  }

  protected onSearchChange(value: string): void {
    this.searchTerm.set(value);
  }

  protected onStatusChange(value: string): void {
    this.statusFilter.set(value);
  }

  protected viewAsset(id: string): void {
    this.router.navigate([id], { relativeTo: this.route });
  }

  protected getStatusColor(status: string): string {
    return AssetsHelper.getStatusColor(status);
  }

  protected getStatusDisplayName(status: string): string {
    return AssetsHelper.getStatusDisplayName(status);
  }
}
