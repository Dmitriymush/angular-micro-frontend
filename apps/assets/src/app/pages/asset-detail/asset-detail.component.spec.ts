import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { of, throwError, NEVER } from 'rxjs';
import { AssetDetailComponent } from './asset-detail.component';
import { AssetService } from '@angular-micro-frontend/api';
import { RandomHelper, AssetWithVulnerabilities } from '@angular-micro-frontend/shared';
import { AssetsHelper } from '../../helpers/assets.helper';
import { assetsReducer } from '../../state/assets.reducer';
import { AssetsEffects } from '../../state/assets.effects';

describe('AssetDetailComponent', () => {
  let component: AssetDetailComponent;
  let fixture: ComponentFixture<AssetDetailComponent>;
  let mockAssetService: jest.Mocked<AssetService>;
  let mockRouter: jest.Mocked<Router>;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    mockAssetService = {
      getAssets: jest.fn(),
      getAssetById: jest.fn()
    } as any;

    mockRouter = {
      navigate: jest.fn()
    } as any;

    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: jest.fn()
        }
      }
    };

    await TestBed.configureTestingModule({
      imports: [AssetDetailComponent],
      providers: [
        provideStore({ assets: assetsReducer }),
        provideEffects([AssetsEffects]),
        { provide: AssetService, useValue: mockAssetService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AssetDetailComponent);
    component = fixture.componentInstance;
  });

  describe('Component Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize with loading state false before ngOnInit', () => {
      expect(component['loading']()).toBe(false);
    });

    it('should initialize with null asset', () => {
      expect(component['asset']()).toBeNull();
    });

    it('should initialize with null error', () => {
      expect(component['error']()).toBeNull();
    });
  });

  describe('ngOnInit', () => {
    it('should load asset when ID is present', () => {
      mockActivatedRoute.snapshot.paramMap.get.mockReturnValue('test-123');
      const mockAsset: AssetWithVulnerabilities = {
        ...RandomHelper.randomAsset(),
        vulnerabilities: []
      };
      mockAssetService.getAssetById.mockReturnValue(of(mockAsset));
      component.ngOnInit();

      expect(mockAssetService.getAssetById).toHaveBeenCalledWith('test-123');
    });

    it('should set asset signal when data loads successfully', () => {
      mockActivatedRoute.snapshot.paramMap.get.mockReturnValue('test-123');
      const mockAsset: AssetWithVulnerabilities = {
        ...RandomHelper.randomAsset(),
        vulnerabilities: []
      };
      mockAssetService.getAssetById.mockReturnValue(of(mockAsset));
      component.ngOnInit();

      expect(component['asset']()).toEqual(mockAsset);
    });

    it('should set loading to false when data loads successfully', () => {
      mockActivatedRoute.snapshot.paramMap.get.mockReturnValue('test-123');
      const mockAsset: AssetWithVulnerabilities = {
        ...RandomHelper.randomAsset(),
        vulnerabilities: []
      };
      mockAssetService.getAssetById.mockReturnValue(of(mockAsset));
      component.ngOnInit();

      expect(component['loading']()).toBe(false);
    });

    it('should not load asset when ID is missing', () => {
      mockActivatedRoute.snapshot.paramMap.get.mockReturnValue(null);
      component.ngOnInit();

      expect(mockAssetService.getAssetById).not.toHaveBeenCalled();
    });

    it('should set error message when loading fails', (done) => {
      mockActivatedRoute.snapshot.paramMap.get.mockReturnValue('test-123');
      mockAssetService.getAssetById.mockReturnValue(throwError(() => new Error('Test error')));
      component.ngOnInit();

      setTimeout(() => {
        expect(component['error']()).toBeTruthy();
        done();
      }, 0);
    });

    it('should set loading to false when loading fails', (done) => {
      mockActivatedRoute.snapshot.paramMap.get.mockReturnValue('test-123');
      mockAssetService.getAssetById.mockReturnValue(throwError(() => new Error('Test error')));
      component.ngOnInit();

      setTimeout(() => {
        expect(component['loading']()).toBe(false);
        done();
      }, 0);
    });
  });

  describe('Computed Values', () => {
    it('should calculate total vulnerabilities correctly', () => {
      mockActivatedRoute.snapshot.paramMap.get.mockReturnValue('test-123');
      const mockAsset: AssetWithVulnerabilities = {
        ...RandomHelper.randomAsset(),
        vulnerabilities: RandomHelper.randomVulnerabilities(5)
      };
      mockAssetService.getAssetById.mockReturnValue(of(mockAsset));
      component.ngOnInit();

      expect(component['totalVulnerabilities']()).toBe(5);
    });

    it('should detect critical vulnerabilities correctly', () => {
      mockActivatedRoute.snapshot.paramMap.get.mockReturnValue('test-123');
      const mockAsset: AssetWithVulnerabilities = {
        ...RandomHelper.randomAsset(),
        vulnerabilities: [RandomHelper.randomVulnerability({ severity: 'critical' })]
      };
      mockAssetService.getAssetById.mockReturnValue(of(mockAsset));
      component.ngOnInit();

      expect(component['hasCriticalVulnerabilities']()).toBe(true);
    });

    it('should not detect critical vulnerabilities when none exist', () => {
      mockActivatedRoute.snapshot.paramMap.get.mockReturnValue('test-123');
      const mockAsset: AssetWithVulnerabilities = {
        ...RandomHelper.randomAsset(),
        vulnerabilities: [RandomHelper.randomVulnerability({ severity: 'low' })]
      };
      mockAssetService.getAssetById.mockReturnValue(of(mockAsset));
      component.ngOnInit();

      expect(component['hasCriticalVulnerabilities']()).toBe(false);
    });

    it('should calculate severity level as "critical" for critical vulnerabilities', () => {
      mockActivatedRoute.snapshot.paramMap.get.mockReturnValue('test-123');
      const mockAsset: AssetWithVulnerabilities = {
        ...RandomHelper.randomAsset(),
        vulnerabilities: [RandomHelper.randomVulnerability({ severity: 'critical' })]
      };
      mockAssetService.getAssetById.mockReturnValue(of(mockAsset));
      component.ngOnInit();

      expect(component['severityLevel']()).toBe('critical');
    });

    it('should calculate severity level as "none" for no vulnerabilities', () => {
      mockActivatedRoute.snapshot.paramMap.get.mockReturnValue('test-123');
      const mockAsset: AssetWithVulnerabilities = {
        ...RandomHelper.randomAsset(),
        vulnerabilities: []
      };
      mockAssetService.getAssetById.mockReturnValue(of(mockAsset));
      component.ngOnInit();

      expect(component['severityLevel']()).toBe('none');
    });
  });

  describe('countBySeverity', () => {
    it('should count vulnerabilities by severity', () => {
      mockActivatedRoute.snapshot.paramMap.get.mockReturnValue('test-123');
      const mockAsset: AssetWithVulnerabilities = {
        ...RandomHelper.randomAsset(),
        vulnerabilities: [
          RandomHelper.randomVulnerability({ severity: 'critical' }),
          RandomHelper.randomVulnerability({ severity: 'low' }),
          RandomHelper.randomVulnerability({ severity: 'critical' })
        ]
      };
      mockAssetService.getAssetById.mockReturnValue(of(mockAsset));
      component.ngOnInit();

      expect(component['countBySeverity']('critical')).toBe(2);
    });

    it('should return 0 when asset is null', () => {
      const result = component['countBySeverity']('critical');

      expect(result).toBe(0);
    });
  });

  describe('Navigation', () => {
    it('should navigate back to assets list when goBack is called', () => {
      component['goBack']();

      expect(mockRouter.navigate).toHaveBeenCalledWith(['/assets']);
    });
  });

  describe('Helper Methods', () => {
    it('should get status color from AssetsHelper', () => {
      const result = component['getStatusColor']('active');

      expect(result).toBe(AssetsHelper.getStatusColor('active'));
    });

    it('should get status display name from AssetsHelper', () => {
      const result = component['getStatusDisplayName']('active');

      expect(result).toBe(AssetsHelper.getStatusDisplayName('active'));
    });
  });

  describe('Template Rendering', () => {
    it('should display loading spinner when loading', () => {
      mockActivatedRoute.snapshot.paramMap.get.mockReturnValue('test-123');
      mockAssetService.getAssetById.mockReturnValue(NEVER);
      fixture.detectChanges();
      const compiled = fixture.nativeElement;

      expect(compiled.querySelector('mat-spinner')).toBeTruthy();
    });

    it('should display error message when error occurs', (done) => {
      mockActivatedRoute.snapshot.paramMap.get.mockReturnValue('test-123');
      mockAssetService.getAssetById.mockReturnValue(throwError(() => new Error('Test error')));
      component.ngOnInit();

      setTimeout(() => {
        fixture.detectChanges();
        const compiled = fixture.nativeElement;
        expect(component['error']()).toBeTruthy();
        done();
      }, 0);
    });
  });
});
