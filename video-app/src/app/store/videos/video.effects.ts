import { Injectable } from '@angular/core';
import { YoutubeService } from '@core/youtube/youtube.service';
import { VimeoService } from '@core/vimeo/vimeo.service';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as VideoActions from '@store/videos/video.actions';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { mergeMap, map, catchError} from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable()
export class VideoEffects {

  constructor(
    private readonly youTubeService: YoutubeService,
    private readonly vimeoService: VimeoService,
    private readonly action$: Actions,
    private readonly router: Router
  ) { }

  AddYouTubeVideo$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(VideoActions.AddYouTubeVideo),
      mergeMap(action =>
        this.youTubeService.getVideo(action.videoId)
          .pipe(
            map(videoResult => {
              if (videoResult.showErrorMessage) {
                return VideoActions.AddYouTubeVideoFail({ fail: true });
              } else {
                return VideoActions.AddYouTubeVideoSuccess(videoResult);
              }
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
      ofType(VideoActions.AddVimeoVideo),
      mergeMap(action =>
        this.vimeoService.getVideo(action.videoId)
          .pipe(
            map(videoResult => {
              if (videoResult.showErrorMessage) {
                return VideoActions.AddVimeoVideoFail({ fail: true });
              } else {
                return VideoActions.AddVimeoVideoSuccess(videoResult);
              }

            }),
            catchError((error: Error) => {
              return of(VideoActions.AddVimeoVideoFail({ fail: true }));
            })
          )
      )
    )
  );
}
