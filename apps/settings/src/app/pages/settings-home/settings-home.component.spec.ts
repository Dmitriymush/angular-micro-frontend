import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { SettingsHomeComponent } from './settings-home.component';
import { DashboardService } from '@angular-micro-frontend/api';
import { RandomHelper, SettingsHelper } from '@angular-micro-frontend/shared';

describe('SettingsHomeComponent', () => {
  let component: SettingsHomeComponent;
  let fixture: ComponentFixture<SettingsHomeComponent>;
  let mockDashboardService: jest.Mocked<DashboardService>;

  beforeEach(async () => {
    mockDashboardService = {
      getSettings: jest.fn(),
      getStats: jest.fn()
    } as any;

    await TestBed.configureTestingModule({
      imports: [SettingsHomeComponent],
      providers: [
        { provide: DashboardService, useValue: mockDashboardService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsHomeComponent);
    component = fixture.componentInstance;
  });

  describe('Component Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize with loading state true', () => {
      expect(component['loading']()).toBe(true);
    });

    it('should initialize with null settings', () => {
      expect(component['settings']()).toBeNull();
    });

    it('should initialize with null error', () => {
      expect(component['error']()).toBeNull();
    });
  });

  describe('ngOnInit', () => {
    it('should load settings on init', () => {
      const mockSettings = RandomHelper.randomSettings();
      mockDashboardService.getSettings.mockReturnValue(of(mockSettings));

      component.ngOnInit();

      expect(mockDashboardService.getSettings).toHaveBeenCalled();
    });

    it('should set settings signal when data loads successfully', (done) => {
      const mockSettings = RandomHelper.randomSettings();
      mockDashboardService.getSettings.mockReturnValue(of(mockSettings));

      component.ngOnInit();

      setTimeout(() => {
        expect(component['settings']()).toEqual(mockSettings);
        done();
      }, 0);
    });

    it('should set original settings when data loads successfully', (done) => {
      const mockSettings = RandomHelper.randomSettings();
      mockDashboardService.getSettings.mockReturnValue(of(mockSettings));

      component.ngOnInit();

      setTimeout(() => {
        expect(component['originalSettings']()).toEqual(mockSettings);
        done();
      }, 0);
    });

    it('should set loading to false when data loads successfully', (done) => {
      const mockSettings = RandomHelper.randomSettings();
      mockDashboardService.getSettings.mockReturnValue(of(mockSettings));

      component.ngOnInit();

      setTimeout(() => {
        expect(component['loading']()).toBe(false);
        done();
      }, 0);
    });

    it('should set error message when loading fails', (done) => {
      mockDashboardService.getSettings.mockReturnValue(throwError(() => new Error('Test error')));

      component.ngOnInit();

      setTimeout(() => {
        expect(component['error']()).toBeTruthy();
        done();
      }, 0);
    });

    it('should set loading to false when loading fails', (done) => {
      mockDashboardService.getSettings.mockReturnValue(throwError(() => new Error('Test error')));

      component.ngOnInit();

      setTimeout(() => {
        expect(component['loading']()).toBe(false);
        done();
      }, 0);
    });
  });

  describe('saveSettings', () => {
    it('should update original settings on save', () => {
      const mockSettings = RandomHelper.randomSettings();
      component['settings'].set(mockSettings);
      component['originalSettings'].set(RandomHelper.randomSettings());

      component['saveSettings']();

      expect(component['originalSettings']()).toEqual(mockSettings);
    });

    it('should set error when settings invalid', () => {
      component['settings'].set(null);

      component['saveSettings']();

      expect(component['error']()).toBeTruthy();
    });

    it('should not save when settings are invalid', () => {
      const original = RandomHelper.randomSettings();
      component['originalSettings'].set(original);
      component['settings'].set({ ...original, theme: 'invalid' as any });

      component['saveSettings']();

      expect(component['originalSettings']()).toEqual(original);
    });
  });

  describe('resetSettings', () => {
    it('should restore settings to original values', () => {
      const original = RandomHelper.randomSettings({ theme: 'light' });
      const modified = { ...original, theme: 'dark' as const };
      component['originalSettings'].set(original);
      component['settings'].set(modified);

      component['resetSettings']();

      expect(component['settings']()).toEqual(original);
    });

    it('should handle null original settings', () => {
      component['originalSettings'].set(null);
      const current = RandomHelper.randomSettings();
      component['settings'].set(current);

      component['resetSettings']();

      expect(component['settings']()).toEqual(current);
    });
  });

  describe('getThemeDisplayName', () => {
    it('should return display name for light theme', () => {
      const result = component['getThemeDisplayName']('light');

      expect(result).toBe('Light Mode');
    });

    it('should return display name for dark theme', () => {
      const result = component['getThemeDisplayName']('dark');

      expect(result).toBe('Dark Mode');
    });

    it('should return display name for auto theme', () => {
      const result = component['getThemeDisplayName']('auto');

      expect(result).toBe('Auto (System)');
    });
  });

  describe('getLanguageDisplayName', () => {
    it('should return display name for English', () => {
      const result = component['getLanguageDisplayName']('en');

      expect(result).toBe('English');
    });

    it('should return display name for Spanish', () => {
      const result = component['getLanguageDisplayName']('es');

      expect(result).toBe('Español');
    });
  });

  describe('Computed Values', () => {
    it('should detect no unsaved changes when settings match original', () => {
      const settings = RandomHelper.randomSettings();
      mockDashboardService.getSettings.mockReturnValue(of(settings));

      component.ngOnInit();
      fixture.detectChanges();

      expect(component['hasUnsavedChanges']()).toBe(false);
    });

    it('should detect unsaved changes when settings modified', (done) => {
      const settings = RandomHelper.randomSettings({ theme: 'light' });
      mockDashboardService.getSettings.mockReturnValue(of(settings));

      component.ngOnInit();
      fixture.detectChanges();

      setTimeout(() => {
        fixture.detectChanges(); // Ensure initial load is complete
        component['settings'].set({ ...settings, theme: 'dark' });
        fixture.detectChanges();
        expect(component['hasUnsavedChanges']()).toBe(true);
        done();
      }, 10);
    });

    it('should validate settings correctly', () => {
      const validSettings = RandomHelper.randomSettings();
      mockDashboardService.getSettings.mockReturnValue(of(validSettings));

      component.ngOnInit();
      fixture.detectChanges();

      expect(component['isValid']()).toBe(true);
    });

    it('should invalidate settings with invalid theme', (done) => {
      const settings = RandomHelper.randomSettings();
      mockDashboardService.getSettings.mockReturnValue(of(settings));

      component.ngOnInit();
      fixture.detectChanges();

      setTimeout(() => {
        fixture.detectChanges(); // Ensure initial load is complete
        component['settings'].set({ ...settings, theme: 'invalid' as any });
        fixture.detectChanges();
        expect(component['isValid']()).toBe(false);
        done();
      }, 10);
    });
  });

  describe('Template Rendering', () => {
    it('should display loading spinner when loading', () => {
      mockDashboardService.getSettings.mockReturnValue(of(RandomHelper.randomSettings()).pipe(
        delay(100) // Delay to keep loading state
      ));
      component.ngOnInit();
      fixture.detectChanges();
      const compiled = fixture.nativeElement;

      expect(compiled.querySelector('mat-spinner')).toBeTruthy();
    });

    it('should display error message when error occurs', (done) => {
      mockDashboardService.getSettings.mockReturnValue(throwError(() => new Error('Test error')));
      component.ngOnInit();

      setTimeout(() => {
        fixture.detectChanges();
        const compiled = fixture.nativeElement;
        expect(compiled.querySelector('.error-message')).toBeTruthy();
        done();
      }, 0);
    });

    it('should display settings form when data loads successfully', (done) => {
      const mockSettings = RandomHelper.randomSettings();
      mockDashboardService.getSettings.mockReturnValue(of(mockSettings));
      component.ngOnInit();

      setTimeout(() => {
        fixture.detectChanges();
        const compiled = fixture.nativeElement;
        expect(compiled.querySelector('mat-select')).toBeTruthy();
        done();
      }, 0);
    });
  });
});
