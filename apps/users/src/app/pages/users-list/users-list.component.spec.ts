import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { of, throwError, NEVER } from 'rxjs';
import { UsersListComponent } from './users-list.component';
import { UserService } from '@angular-micro-frontend/api';
import { RandomHelper, UsersHelper } from '@angular-micro-frontend/shared';
import { usersReducer } from '../../state/users.reducer';
import { UsersEffects } from '../../state/users.effects';

describe('UsersListComponent', () => {
  let component: UsersListComponent;
  let fixture: ComponentFixture<UsersListComponent>;
  let mockUserService: jest.Mocked<UserService>;

  beforeEach(async () => {
    mockUserService = {
      getUsers: jest.fn(),
      deleteUser: jest.fn(),
      createUser: jest.fn()
    } as any;

    await TestBed.configureTestingModule({
      imports: [UsersListComponent],
      providers: [
        provideStore({ users: usersReducer }),
        provideEffects([UsersEffects]),
        { provide: UserService, useValue: mockUserService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UsersListComponent);
    component = fixture.componentInstance;
  });

  describe('Component Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize with loading state false before ngOnInit', () => {
      expect(component['loading']()).toBe(false);
    });

    it('should initialize with empty users array', () => {
      expect(component['users']()).toEqual([]);
    });

    it('should initialize with null error', () => {
      expect(component['error']()).toBeNull();
    });
  });

  describe('ngOnInit', () => {
    it('should load users on init', () => {
      const mockUsers = RandomHelper.randomUsers(3);
      mockUserService.getUsers.mockReturnValue(of(mockUsers));

      component.ngOnInit();

      expect(mockUserService.getUsers).toHaveBeenCalled();
    });

    it('should set users signal when data loads successfully', (done) => {
      const mockUsers = RandomHelper.randomUsers(3);
      mockUserService.getUsers.mockReturnValue(of(mockUsers));

      component.ngOnInit();

      setTimeout(() => {
        expect(component['users']()).toEqual(mockUsers);
        done();
      }, 0);
    });

    it('should set loading to false when data loads successfully', (done) => {
      const mockUsers = RandomHelper.randomUsers(3);
      mockUserService.getUsers.mockReturnValue(of(mockUsers));

      component.ngOnInit();

      setTimeout(() => {
        expect(component['loading']()).toBe(false);
        done();
      }, 0);
    });

    it('should set error message when loading fails', (done) => {
      mockUserService.getUsers.mockReturnValue(throwError(() => new Error('Test error')));

      component.ngOnInit();

      setTimeout(() => {
        expect(component['error']()).toBeTruthy();
        done();
      }, 0);
    });

    it('should set loading to false when loading fails', (done) => {
      mockUserService.getUsers.mockReturnValue(throwError(() => new Error('Test error')));

      component.ngOnInit();

      setTimeout(() => {
        expect(component['loading']()).toBe(false);
        done();
      }, 0);
    });
  });


  describe('deleteUser', () => {
    it('should call confirm dialog with user name', () => {
      const user = RandomHelper.randomUser({ id: 'test-123', name: 'John Doe' });
      mockUserService.getUsers.mockReturnValue(of([user]));
      component.ngOnInit();

      const confirmSpy = jest.spyOn(window, 'confirm').mockReturnValue(true);
      mockUserService.deleteUser.mockReturnValue(of(void 0));
      mockUserService.getUsers.mockReturnValue(of([]));

      component['deleteUser']('test-123');

      expect(confirmSpy).toHaveBeenCalledWith('Are you sure you want to delete John Doe?');
    });

    it('should dispatch deleteUser action when confirmed', () => {
      const user = RandomHelper.randomUser({ id: 'test-123' });
      mockUserService.getUsers.mockReturnValue(of([user]));
      component.ngOnInit();

      jest.spyOn(window, 'confirm').mockReturnValue(true);
      mockUserService.deleteUser.mockReturnValue(of(void 0));

      component['deleteUser']('test-123');

      expect(mockUserService.deleteUser).toHaveBeenCalledWith('test-123');
    });

    it('should not dispatch deleteUser action when cancelled', () => {
      const user = RandomHelper.randomUser({ id: 'test-123' });
      mockUserService.getUsers.mockReturnValue(of([user]));
      component.ngOnInit();

      jest.spyOn(window, 'confirm').mockReturnValue(false);
      const deleteUserSpy = jest.spyOn(mockUserService, 'deleteUser');

      component['deleteUser']('test-123');

      expect(deleteUserSpy).not.toHaveBeenCalled();
    });

    it('should do nothing when user not found', () => {
      mockUserService.getUsers.mockReturnValue(of([]));
      component.ngOnInit();

      const deleteUserSpy = jest.spyOn(mockUserService, 'deleteUser');

      component['deleteUser']('non-existent');

      expect(deleteUserSpy).not.toHaveBeenCalled();
    });
  });

  describe('formatDate', () => {
    it('should format date using DateHelper', () => {
      const dateString = '2024-01-15T10:30:00.000Z';
      const result = component['formatDate'](dateString);

      expect(typeof result).toBe('string');
    });

    it('should handle invalid date strings', () => {
      const result = component['formatDate']('invalid-date');

      expect(result).toBe('Invalid Date');
    });
  });

  describe('Computed Values', () => {
    it('should sort users alphabetically', () => {
      const users = [
        RandomHelper.randomUser({ name: 'Charlie' }),
        RandomHelper.randomUser({ name: 'Alice' }),
        RandomHelper.randomUser({ name: 'Bob' })
      ];
      mockUserService.getUsers.mockReturnValue(of(users));

      component.ngOnInit();
      fixture.detectChanges();

      expect(component['sortedUsers']()[0].name).toBe('Alice');
    });

    it('should count users correctly', () => {
      const users = RandomHelper.randomUsers(5);
      mockUserService.getUsers.mockReturnValue(of(users));

      component.ngOnInit();
      fixture.detectChanges();

      expect(component['userCount']()).toBe(5);
    });

    it('should calculate role statistics', () => {
      const users = [
        RandomHelper.randomUser({ role: 'admin' }),
        RandomHelper.randomUser({ role: 'admin' }),
        RandomHelper.randomUser({ role: 'user' })
      ];
      mockUserService.getUsers.mockReturnValue(of(users));

      component.ngOnInit();
      fixture.detectChanges();

      expect(component['roleStats']()['admin']).toBe(2);
    });
  });

  describe('Template Rendering', () => {
    it('should display loading spinner when loading', () => {
      mockUserService.getUsers.mockReturnValue(NEVER);
      fixture.detectChanges();
      const compiled = fixture.nativeElement;

      expect(compiled.querySelector('mat-spinner')).toBeTruthy();
    });

    it('should display error message when error occurs', (done) => {
      mockUserService.getUsers.mockReturnValue(throwError(() => new Error('Test error')));
      component.ngOnInit();

      setTimeout(() => {
        fixture.detectChanges();
        const compiled = fixture.nativeElement;
        expect(compiled.querySelector('.error-message')).toBeTruthy();
        done();
      }, 0);
    });

    it('should display users when data loads successfully', (done) => {
      const mockUsers = [RandomHelper.randomUser({ name: 'John Doe' })];
      mockUserService.getUsers.mockReturnValue(of(mockUsers));
      component.ngOnInit();

      setTimeout(() => {
        fixture.detectChanges();
        const compiled = fixture.nativeElement;
        expect(compiled.textContent).toContain('John Doe');
        done();
      }, 0);
    });
  });
});