import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideStore } from '@ngrx/store';
import { of, throwError, NEVER } from 'rxjs';
import { FindingsListComponent } from './findings-list.component';
import { FindingService } from '@angular-micro-frontend/api';
import { RandomHelper, FindingsHelper } from '@angular-micro-frontend/shared';
import { findingsReducer } from '../../state/findings.reducer';

describe('FindingsListComponent', () => {
  let component: FindingsListComponent;
  let fixture: ComponentFixture<FindingsListComponent>;
  let mockFindingService: jest.Mocked<FindingService>;

  beforeEach(async () => {
    mockFindingService = {
      getFindings: jest.fn(),
      resolveFinding: jest.fn()
    } as any;

    await TestBed.configureTestingModule({
      imports: [FindingsListComponent],
      providers: [
        provideStore({ findings: findingsReducer }),
        { provide: FindingService, useValue: mockFindingService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FindingsListComponent);
    component = fixture.componentInstance;
  });

  describe('Component Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize with loading state true', () => {
      expect(component['loading']()).toBe(true);
    });

    it('should initialize with empty findings array', () => {
      expect(component['findings']()).toEqual([]);
    });

    it('should initialize with null error', () => {
      expect(component['error']()).toBeNull();
    });
  });

  describe('ngOnInit', () => {
    it('should load findings on init', () => {
      const mockFindings = RandomHelper.randomFindings(3);
      mockFindingService.getFindings.mockReturnValue(of(mockFindings));

      component.ngOnInit();

      expect(mockFindingService.getFindings).toHaveBeenCalled();
    });

    it('should set findings signal when data loads successfully', (done) => {
      const mockFindings = RandomHelper.randomFindings(3);
      mockFindingService.getFindings.mockReturnValue(of(mockFindings));

      component.ngOnInit();

      setTimeout(() => {
        expect(component['findings']()).toEqual(mockFindings);
        done();
      }, 0);
    });

    it('should set loading to false when data loads successfully', (done) => {
      const mockFindings = RandomHelper.randomFindings(3);
      mockFindingService.getFindings.mockReturnValue(of(mockFindings));

      component.ngOnInit();

      setTimeout(() => {
        expect(component['loading']()).toBe(false);
        done();
      }, 0);
    });

    it('should set error message when loading fails', (done) => {
      mockFindingService.getFindings.mockReturnValue(throwError(() => new Error('Test error')));

      component.ngOnInit();

      setTimeout(() => {
        expect(component['error']()).toBeTruthy();
        done();
      }, 0);
    });

    it('should set loading to false when loading fails', (done) => {
      mockFindingService.getFindings.mockReturnValue(throwError(() => new Error('Test error')));

      component.ngOnInit();

      setTimeout(() => {
        expect(component['loading']()).toBe(false);
        done();
      }, 0);
    });
  });

  describe('loadFindings', () => {
    it('should call finding service getFindings method', () => {
      const mockFindings = RandomHelper.randomFindings(2);
      mockFindingService.getFindings.mockReturnValue(of(mockFindings));

      component['loadFindings']();

      expect(mockFindingService.getFindings).toHaveBeenCalled();
    });

    it('should set loading to false after loading completes', () => {
      mockFindingService.getFindings.mockReturnValue(of([]));

      component['loadFindings']();

      expect(component['loading']()).toBe(false);
    });

    it('should clear error before loading', () => {
      mockFindingService.getFindings.mockReturnValue(of([]));
      component['error'].set('Previous error');

      component['loadFindings']();

      expect(component['error']()).toBeNull();
    });
  });

  describe('resolveFinding', () => {
    beforeEach(() => {
      mockFindingService.resolveFinding.mockReturnValue(of(void 0));
      mockFindingService.getFindings.mockReturnValue(of([]));
    });

    it('should call resolveFinding service method', () => {
      component['resolveFinding']('test-123');

      expect(mockFindingService.resolveFinding).toHaveBeenCalledWith('test-123');
    });

    it('should update finding in local state after successful resolution', () => {
      const finding1 = RandomHelper.randomFinding({ id: 'test-123', status: 'open' });
      const finding2 = RandomHelper.randomFinding({ id: 'test-456', status: 'open' });
      component['findings'].set([finding1, finding2]);

      const resolvedFinding = { ...finding1, status: 'resolved' as const };
      mockFindingService.resolveFinding.mockReturnValue(of(resolvedFinding));

      component['resolveFinding']('test-123');

      const updatedFindings = component['findings']();
      expect(updatedFindings.find(f => f.id === 'test-123')?.status).toBe('resolved');
      expect(updatedFindings.length).toBe(2);
    });

    it('should set error when resolution fails', (done) => {
      mockFindingService.resolveFinding.mockReturnValue(throwError(() => new Error('Resolve failed')));

      component['resolveFinding']('test-123');

      setTimeout(() => {
        expect(component['error']()).toBeTruthy();
        done();
      }, 0);
    });
  });

  describe('getSeverityColor', () => {
    it('should return red color for critical severity', () => {
      const result = component['getSeverityColor']('critical');

      expect(result).toBe('#f44336');
    });

    it('should return green color for low severity', () => {
      const result = component['getSeverityColor']('low');

      expect(result).toBe('#4caf50');
    });

    it('should return default color for unknown severity', () => {
      const result = component['getSeverityColor']('unknown');

      expect(result).toBe('#9e9e9e');
    });
  });

  describe('getStatusColor', () => {
    it('should return red color for open status', () => {
      const result = component['getStatusColor']('open');

      expect(result).toBe('#f44336');
    });

    it('should return green color for resolved status', () => {
      const result = component['getStatusColor']('resolved');

      expect(result).toBe('#4caf50');
    });

    it('should return default color for unknown status', () => {
      const result = component['getStatusColor']('unknown');

      expect(result).toBe('#9e9e9e');
    });
  });

  describe('Computed Values', () => {
    it('should sort findings by severity with critical first', () => {
      const findings = [
        RandomHelper.randomFinding({ severity: 'low' }),
        RandomHelper.randomFinding({ severity: 'critical' }),
        RandomHelper.randomFinding({ severity: 'medium' })
      ];
      mockFindingService.getFindings.mockReturnValue(of(findings));

      component.ngOnInit();
      fixture.detectChanges();

      expect(component['sortedFindings']()[0].severity).toBe('critical');
    });

    it('should filter only open findings', () => {
      const findings = [
        RandomHelper.randomFinding({ status: 'open' }),
        RandomHelper.randomFinding({ status: 'resolved' }),
        RandomHelper.randomFinding({ status: 'open' })
      ];
      mockFindingService.getFindings.mockReturnValue(of(findings));

      component.ngOnInit();
      fixture.detectChanges();

      expect(component['openFindings']().length).toBe(2);
    });

    it('should filter only critical findings', () => {
      const findings = [
        RandomHelper.randomFinding({ severity: 'critical' }),
        RandomHelper.randomFinding({ severity: 'low' }),
        RandomHelper.randomFinding({ severity: 'critical' })
      ];
      mockFindingService.getFindings.mockReturnValue(of(findings));

      component.ngOnInit();
      fixture.detectChanges();

      expect(component['criticalFindings']().length).toBe(2);
    });

    it('should calculate status statistics correctly', () => {
      const findings = [
        RandomHelper.randomFinding({ status: 'open' }),
        RandomHelper.randomFinding({ status: 'open' }),
        RandomHelper.randomFinding({ status: 'resolved' })
      ];
      mockFindingService.getFindings.mockReturnValue(of(findings));

      component.ngOnInit();
      fixture.detectChanges();

      expect(component['statusStats']()['open']).toBe(2);
    });
  });

  describe('Template Rendering', () => {
    it('should display loading spinner when loading', () => {
      mockFindingService.getFindings.mockReturnValue(NEVER);
      fixture.detectChanges();
      const compiled = fixture.nativeElement;

      expect(compiled.querySelector('mat-spinner')).toBeTruthy();
    });

    it('should display error message when error occurs', (done) => {
      mockFindingService.getFindings.mockReturnValue(throwError(() => new Error('Test error')));
      component.ngOnInit();

      setTimeout(() => {
        fixture.detectChanges();
        const compiled = fixture.nativeElement;
        expect(compiled.querySelector('.error-message')).toBeTruthy();
        done();
      }, 0);
    });

    it('should display findings when data loads successfully', (done) => {
      const mockFindings = [RandomHelper.randomFinding({ title: 'Test Finding' })];
      mockFindingService.getFindings.mockReturnValue(of(mockFindings));
      component.ngOnInit();

      setTimeout(() => {
        fixture.detectChanges();
        const compiled = fixture.nativeElement;
        expect(compiled.textContent).toContain('Test Finding');
        done();
      }, 0);
    });
  });
});