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
      ofType(VideoActions.addYouTubeVideo),
      mergeMap(action =>
        this.youTubeService.addVideo(action.videoId)
          .pipe(
            map(videoResult => {
              if (videoResult.showErrorMessage) {
                return VideoActions.addYouTubeVideoFail({ fail: true });
              } else {
                return VideoActions.addYouTubeVideoSuccess(videoResult);
              }
            }),
            catchError((error: Error) => {
              return of(VideoActions.addYouTubeVideoFail({ fail: true }));
            })
          )
      )
    )
  );

  AddVimeoVideo$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(VideoActions.addVimeoVideo),
      mergeMap(action =>
        this.vimeoService.addVideo(action.videoId)
          .pipe(
            map(videoResult => {
              if (videoResult.showErrorMessage) {
                return VideoActions.addVimeoVideoFail({ fail: true });
              } else {
                return VideoActions.addVimeoVideoSuccess(videoResult);
              }

            }),
            catchError((error: Error) => {
              return of(VideoActions.addVimeoVideoFail({ fail: true }));
            })
          )
      )
    )
  );
}
