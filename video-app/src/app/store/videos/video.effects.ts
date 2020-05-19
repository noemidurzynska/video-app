import { Injectable } from '@angular/core';
import { YoutubeService } from 'src/app/core/youtube/youtube.service';
import { VimeoService } from 'src/app/core/vimeo/vimeo.service';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as VideoActions from './video.actions';
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
        this.youTubeService.getVideo(action.videoId)
          .pipe(
            map(data => {
              return VideoActions.AddYouTubeVideoSuccess({ fail: data });
            }),
            catchError((error: Error) => {
              return of(VideoActions.AddYouTubeVideoFail({ fail: true }));
            })
          )
      )
    )
  );

  AddVimeoVideo$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(VideoActions.BeginVimeoAddVideoAction),
      mergeMap(action =>
        this.vimeoService.getVideo(action.videoId)
          .pipe(
            map(data => {
              return VideoActions.AddVimeoVideoSuccess({ fail: data });
            }),
            catchError((error: Error) => {
              return of(VideoActions.AddVimeoVideoFail({ fail: true }));
            })
          )
      )
    )
  );
}
