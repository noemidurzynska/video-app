import { Injectable } from '@angular/core';
import { YoutubeService, VimeoService } from 'src/app/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as VideoActions from '../actions/video.actions';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { mergeMap, map, catchError } from 'rxjs/operators';


@Injectable()
export class VideoEffects {

  constructor(
    private readonly youTubeService: YoutubeService,
    private readonly vimeoService: VimeoService,
    private readonly action$: Actions
  ) { }

  AddYouTubeVideo$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(VideoActions.BeginYouTubeAddVideoAction),
      mergeMap(action =>
        this.youTubeService.getVideo(action.payload)
          .pipe(
            map(data => {
              return VideoActions.SuccesYouTubeAddVideoAction({ payload: data });
            }),
            catchError((error: Error) => {
              return of(VideoActions.ErrorYouTubeAddVideoAction({ payload: true }));
            })
          )
      )
    )
  );

  AddVimeoVideo$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(VideoActions.BeginVimeoAddVideoAction),
      mergeMap(action =>
        this.vimeoService.getVideo(action.payload)
          .pipe(
            map(data => {
              return VideoActions.SuccesVimeoAddVideoAction({ payload: data });
            }),
            catchError((error: Error) => {
              return of(VideoActions.ErrorVimeoAddVideoAction({ payload: true }));
            })
          )
      )
    )
  );
}
