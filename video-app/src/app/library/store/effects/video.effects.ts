import { Injectable } from '@angular/core';
import { StreamingPlatformService } from 'src/app/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as VideoActions from '../actions/video.actions';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { mergeMap, map } from 'rxjs/operators';
import { Video } from '../../../core/models';


@Injectable()
export class VideoEffects {

  constructor(
    private readonly streamingPlatformService: StreamingPlatformService,
    private readonly action$: Actions
  ) { }

  AddVideo$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(VideoActions.BeginAddVideoAction),
      mergeMap(action =>
        this.streamingPlatformService.saveVideoObservable(action.payload)
          .pipe(
            map((data: Video[]) => {
              return VideoActions.SuccesAddVideoAction({ payload: data });
            })
          )
      )
    )
  );
}
