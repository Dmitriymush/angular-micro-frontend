import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { DashboardService } from '@angular-micro-frontend/api';
import { Settings } from '@angular-micro-frontend/shared';
import { SettingsHelper } from '../../helpers/settings.helper';

@Component({
  selector: 'app-settings-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDividerModule
  ],
  templateUrl: './settings-home.component.html',
  styleUrl: './settings-home.component.scss'
})
export class SettingsHomeComponent implements OnInit {
  private readonly dashboardService = inject(DashboardService);

  protected readonly settings = signal<Settings | null>(null);
  protected readonly loading = signal<boolean>(true);
  protected readonly error = signal<string | null>(null);

  private readonly originalSettings = signal<Settings | null>(null);

  protected readonly hasUnsavedChanges = computed(() => {
    const current = this.settings();
    const original = this.originalSettings();
    if (!current || !original) return false;
    return SettingsHelper.hasChanges(original, current);
  });

  protected readonly isValid = computed(() =>
    SettingsHelper.isValidSettings(this.settings() || {})
  );

  ngOnInit(): void {
    this.loadSettings();
  }

  private loadSettings(): void {
    this.loading.set(true);
    this.error.set(null);

    this.dashboardService
      .getSettings()
      .subscribe({
        next: (settings) => {
          this.settings.set(settings);
          this.originalSettings.set({ ...settings });
          this.loading.set(false);
        },
        error: (err: Error) => {
          this.error.set('Failed to load settings. Please try again later.');
          this.loading.set(false);
          console.error('Settings loading error:', err);
        }
      });
  }

  protected getThemeDisplayName(theme: string): string {
    return SettingsHelper.getThemeDisplayName(theme);
  }

  protected getLanguageDisplayName(language: string): string {
    return SettingsHelper.getLanguageDisplayName(language);
  }

  protected saveSettings(): void {
    const currentSettings = this.settings();
    if (!currentSettings || !this.isValid()) {
      this.error.set('Invalid settings. Please check your inputs.');
      return;
    }

    console.log('Saving settings:', currentSettings);
    this.originalSettings.set({ ...currentSettings });
  }

  protected resetSettings(): void {
    const original = this.originalSettings();
    if (original) {
      this.settings.set({ ...original });
    }
  }
}