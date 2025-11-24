import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError, NEVER } from 'rxjs';
import { DashboardHomeComponent } from './dashboard-home.component';
import { DashboardService } from '@angular-micro-frontend/api';
import { RandomHelper } from '@angular-micro-frontend/shared';
import { DashboardHelper } from '../../helpers/dashboard.helper';

describe('DashboardHomeComponent', () => {
  let component: DashboardHomeComponent;
  let fixture: ComponentFixture<DashboardHomeComponent>;
  let mockDashboardService: jest.Mocked<DashboardService>;

  beforeEach(async () => {
    mockDashboardService = {
      getStats: jest.fn(),
      getSettings: jest.fn()
    } as any;

    await TestBed.configureTestingModule({
      imports: [DashboardHomeComponent],
      providers: [
        { provide: DashboardService, useValue: mockDashboardService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardHomeComponent);
    component = fixture.componentInstance;
  });

  describe('Component Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize with loading state true', () => {
      expect(component['loading']()).toBe(true);
    });

    it('should initialize with null stats', () => {
      expect(component['stats']()).toBeNull();
    });

    it('should initialize with null error', () => {
      expect(component['error']()).toBeNull();
    });
  });

  describe('ngOnInit', () => {
    it('should load dashboard stats on init', () => {
      const mockStats = RandomHelper.randomDashboardStats();
      mockDashboardService.getStats.mockReturnValue(of(mockStats));

      component.ngOnInit();

      expect(mockDashboardService.getStats).toHaveBeenCalled();
    });

    it('should set stats signal when data loads successfully', (done) => {
      const mockStats = RandomHelper.randomDashboardStats();
      mockDashboardService.getStats.mockReturnValue(of(mockStats));

      component.ngOnInit();

      setTimeout(() => {
        expect(component['stats']()).toEqual(mockStats);
        done();
      }, 0);
    });

    it('should set loading to false when data loads successfully', (done) => {
      const mockStats = RandomHelper.randomDashboardStats();
      mockDashboardService.getStats.mockReturnValue(of(mockStats));

      component.ngOnInit();

      setTimeout(() => {
        expect(component['loading']()).toBe(false);
        done();
      }, 0);
    });

    it('should set error message when loading fails', (done) => {
      const errorMsg = 'Test error';
      mockDashboardService.getStats.mockReturnValue(throwError(() => new Error(errorMsg)));

      component.ngOnInit();

      setTimeout(() => {
        expect(component['error']()).toBeTruthy();
        done();
      }, 0);
    });

    it('should set loading to false when loading fails', (done) => {
      mockDashboardService.getStats.mockReturnValue(throwError(() => new Error('Test error')));

      component.ngOnInit();

      setTimeout(() => {
        expect(component['loading']()).toBe(false);
        done();
      }, 0);
    });
  });

  describe('Computed Values', () => {
    it('should calculate active assets percentage correctly', () => {
      const mockStats = RandomHelper.randomDashboardStats({ totalAssets: 100, activeAssets: 75 });
      mockDashboardService.getStats.mockReturnValue(of(mockStats));

      component.ngOnInit();
      fixture.detectChanges();

      expect(component['activeAssetsPercentage']()).toBe(75);
    });

    it('should calculate critical findings percentage correctly', () => {
      const mockStats = RandomHelper.randomDashboardStats({ openFindings: 100, criticalFindings: 25 });
      mockDashboardService.getStats.mockReturnValue(of(mockStats));

      component.ngOnInit();
      fixture.detectChanges();

      expect(component['criticalFindingsPercentage']()).toBe(25);
    });

    it('should detect critical alerts when critical findings exist', () => {
      const mockStats = RandomHelper.randomDashboardStats({ criticalFindings: 5 });
      mockDashboardService.getStats.mockReturnValue(of(mockStats));

      component.ngOnInit();
      fixture.detectChanges();

      expect(component['hasCriticalAlerts']()).toBe(true);
    });

    it('should not detect critical alerts when no critical findings', () => {
      const mockStats = RandomHelper.randomDashboardStats({ criticalFindings: 0 });
      mockDashboardService.getStats.mockReturnValue(of(mockStats));

      component.ngOnInit();
      fixture.detectChanges();

      expect(component['hasCriticalAlerts']()).toBe(false);
    });

    it('should calculate severity level as "critical" for many critical findings', () => {
      const mockStats = RandomHelper.randomDashboardStats({ criticalFindings: 15 });
      mockDashboardService.getStats.mockReturnValue(of(mockStats));

      component.ngOnInit();
      fixture.detectChanges();

      expect(component['severityLevel']()).toBe('critical');
    });
  });

  describe('Template Rendering', () => {
    it('should display loading spinner when loading', () => {
      mockDashboardService.getStats.mockReturnValue(NEVER);
      fixture.detectChanges();
      const compiled = fixture.nativeElement;

      expect(compiled.querySelector('mat-spinner')).toBeTruthy();
    });

    it('should display error message when error occurs', (done) => {
      mockDashboardService.getStats.mockReturnValue(throwError(() => new Error('Test error')));
      component.ngOnInit();

      setTimeout(() => {
        fixture.detectChanges();
        const compiled = fixture.nativeElement;
        expect(compiled.querySelector('.error-message')).toBeTruthy();
        done();
      }, 0);
    });

    it('should display stats when data loads successfully', (done) => {
      const mockStats = RandomHelper.randomDashboardStats({ totalUsers: 100 });
      mockDashboardService.getStats.mockReturnValue(of(mockStats));
      component.ngOnInit();

      setTimeout(() => {
        fixture.detectChanges();
        const compiled = fixture.nativeElement;
        expect(compiled.textContent).toContain('100');
        done();
      }, 0);
    });
  });
});