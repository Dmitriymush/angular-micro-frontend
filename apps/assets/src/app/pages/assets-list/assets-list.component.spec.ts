import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { of, throwError, NEVER } from 'rxjs';
import { AssetsListComponent } from './assets-list.component';
import { AssetService } from '@angular-micro-frontend/api';
import { RandomHelper } from '@angular-micro-frontend/shared';
import { AssetsHelper } from '../../helpers/assets.helper';
import { assetsReducer } from '../../state/assets.reducer';
import { AssetsEffects } from '../../state/assets.effects';

describe('AssetsListComponent', () => {
  let component: AssetsListComponent;
  let fixture: ComponentFixture<AssetsListComponent>;
  let mockAssetService: jest.Mocked<AssetService>;
  let mockRouter: jest.Mocked<Router>;

  beforeEach(async () => {
    mockAssetService = {
      getAssets: jest.fn(),
      getAssetById: jest.fn()
    } as any;

    mockRouter = {
      navigate: jest.fn()
    } as any;

    await TestBed.configureTestingModule({
      imports: [AssetsListComponent],
      providers: [
        provideStore({ assets: assetsReducer }),
        provideEffects([AssetsEffects]),
        { provide: AssetService, useValue: mockAssetService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AssetsListComponent);
    component = fixture.componentInstance;
  });

  describe('Component Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize with loading state false before ngOnInit', () => {
      expect(component['loading']()).toBe(false);
    });

    it('should initialize with empty assets array', () => {
      expect(component['assets']()).toEqual([]);
    });

    it('should initialize with null error', () => {
      expect(component['error']()).toBeNull();
    });
  });

  describe('ngOnInit', () => {
    it('should load assets on init', () => {
      mockAssetService.getAssets.mockReturnValue(of(RandomHelper.randomAssets(3)));
      component.ngOnInit();

      expect(mockAssetService.getAssets).toHaveBeenCalled();
    });

    it('should set assets signal when data loads successfully', () => {
      const mockAssets = RandomHelper.randomAssets(3);
      mockAssetService.getAssets.mockReturnValue(of(mockAssets));
      component.ngOnInit();

      expect(component['assets']()).toEqual(mockAssets);
    });

    it('should set loading to false when data loads successfully', () => {
      mockAssetService.getAssets.mockReturnValue(of(RandomHelper.randomAssets(2)));
      component.ngOnInit();

      expect(component['loading']()).toBe(false);
    });

    it('should set error message when loading fails', (done) => {
      mockAssetService.getAssets.mockReturnValue(throwError(() => new Error('Test error')));
      component.ngOnInit();

      setTimeout(() => {
        expect(component['error']()).toBeTruthy();
        done();
      }, 0);
    });

    it('should set loading to false when loading fails', (done) => {
      mockAssetService.getAssets.mockReturnValue(throwError(() => new Error('Test error')));
      component.ngOnInit();

      setTimeout(() => {
        expect(component['loading']()).toBe(false);
        done();
      }, 0);
    });
  });

  describe('Computed Values', () => {
    it('should filter assets by search term correctly', () => {
      const assets = [
        RandomHelper.randomAsset({ name: 'Server-1' }),
        RandomHelper.randomAsset({ name: 'Database-1' })
      ];
      mockAssetService.getAssets.mockReturnValue(of(assets));
      component.ngOnInit();
      component['searchTerm'].set('server');

      expect(component['filteredAssets']().length).toBe(1);
    });

    it('should filter assets by status correctly', () => {
      const assets = [
        RandomHelper.randomAsset({ status: 'active' }),
        RandomHelper.randomAsset({ status: 'inactive' })
      ];
      mockAssetService.getAssets.mockReturnValue(of(assets));
      component.ngOnInit();
      component['statusFilter'].set('active');

      expect(component['filteredAssets']().length).toBe(1);
    });

    it('should sort assets by name', () => {
      const assets = [
        RandomHelper.randomAsset({ name: 'Zebra' }),
        RandomHelper.randomAsset({ name: 'Apple' })
      ];
      mockAssetService.getAssets.mockReturnValue(of(assets));
      component.ngOnInit();

      expect(component['sortedAssets']()[0].name).toBe('Apple');
    });

    it('should count assets by status', () => {
      const assets = [
        RandomHelper.randomAsset({ status: 'active' }),
        RandomHelper.randomAsset({ status: 'active' }),
        RandomHelper.randomAsset({ status: 'inactive' })
      ];
      mockAssetService.getAssets.mockReturnValue(of(assets));
      component.ngOnInit();

      expect(component['statusStats']()['active']).toBe(2);
    });
  });

  describe('Filter Methods', () => {
    it('should update search term when onSearchChange is called', () => {
      mockAssetService.getAssets.mockReturnValue(of([]));
      component.ngOnInit();
      component['onSearchChange']('test');

      expect(component['searchTerm']()).toBe('test');
    });

    it('should update status filter when onStatusChange is called', () => {
      mockAssetService.getAssets.mockReturnValue(of([]));
      component.ngOnInit();
      component['onStatusChange']('active');

      expect(component['statusFilter']()).toBe('active');
    });
  });

  describe('Navigation', () => {
    it('should navigate to asset detail when viewAsset is called', () => {
      mockAssetService.getAssets.mockReturnValue(of([]));
      component.ngOnInit();
      component['viewAsset']('test-123');

      expect(mockRouter.navigate).toHaveBeenCalledWith(['/assets', 'test-123']);
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
      mockAssetService.getAssets.mockReturnValue(NEVER);
      fixture.detectChanges();
      const compiled = fixture.nativeElement;

      expect(compiled.querySelector('mat-spinner')).toBeTruthy();
    });

    it('should display error message when error occurs', (done) => {
      mockAssetService.getAssets.mockReturnValue(throwError(() => new Error('Test error')));
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
