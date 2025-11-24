import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { FindingService } from '@angular-micro-frontend/api';
import * as FindingsActions from './findings.actions';

@Injectable()
export class FindingsEffects {
  private actions$ = inject(Actions);
  private findingService = inject(FindingService);

  loadFindings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FindingsActions.loadFindings),
      switchMap(() =>
        this.findingService.getFindings().pipe(
          map((findings) => FindingsActions.loadFindingsSuccess({ findings })),
          catchError((error) =>
            of(FindingsActions.loadFindingsFailure({ error: error.message }))
          )
        )
      )
    )
  );

  resolveFinding$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FindingsActions.resolveFinding),
      switchMap(({ id }) =>
        this.findingService.resolveFinding(id).pipe(
          map(() => FindingsActions.resolveFindingSuccess({ id })),
          catchError((error) =>
            of(FindingsActions.resolveFindingFailure({ error: error.message }))
          )
        )
      )
    )
  );
}