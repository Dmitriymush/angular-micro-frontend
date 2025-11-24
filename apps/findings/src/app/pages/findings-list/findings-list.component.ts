import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FindingService } from '@angular-micro-frontend/api';
import { Finding } from '@angular-micro-frontend/shared';
import { FindingsHelper } from '../../helpers/findings.helper';

@Component({
  selector: 'app-findings-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './findings-list.component.html',
  styleUrl: './findings-list.component.scss'
})
export class FindingsListComponent implements OnInit {
  private readonly findingService = inject(FindingService);

  protected readonly findings = signal<Finding[]>([]);
  protected readonly loading = signal<boolean>(true);
  protected readonly error = signal<string | null>(null);

  protected readonly sortedFindings = computed(() =>
    FindingsHelper.sortBySeverity(this.findings())
  );

  protected readonly openFindings = computed(() =>
    FindingsHelper.getOpenFindings(this.findings())
  );

  protected readonly criticalFindings = computed(() =>
    FindingsHelper.getCriticalFindings(this.findings())
  );

  protected readonly statusStats = computed(() =>
    FindingsHelper.countByStatus(this.findings())
  );

  ngOnInit(): void {
    this.loadFindings();
  }

  protected loadFindings(): void {
    this.loading.set(true);
    this.error.set(null);

    this.findingService
      .getFindings()
      .subscribe({
        next: (findings) => {
          this.findings.set(findings);
          this.loading.set(false);
        },
        error: (err: Error) => {
          this.error.set('Failed to load findings. Please try again later.');
          this.loading.set(false);
          console.error('Findings loading error:', err);
        }
      });
  }

  protected resolveFinding(id: string): void {
    this.findingService
      .resolveFinding(id)
      .subscribe({
        next: (updatedFinding) => {
          const currentFindings = this.findings();
          const updatedFindings = currentFindings.map(f =>
            f.id === updatedFinding.id ? updatedFinding : f
          );
          this.findings.set(updatedFindings);
        },
        error: (err: Error) => {
          this.error.set('Failed to resolve finding. Please try again.');
          console.error('Resolve finding error:', err);
        }
      });
  }

  protected getSeverityColor(severity: string): string {
    return FindingsHelper.getSeverityColor(severity);
  }

  protected getStatusColor(status: string): string {
    return FindingsHelper.getStatusColor(status);
  }
}