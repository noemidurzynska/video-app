import { Injectable } from '@angular/core';
import { YoutubeService } from '@core/youtube/youtube.service';
import { VimeoService } from '@core/vimeo/vimeo.service';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as VideoActions from '@store/videos/video.actions';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class VideoEffects {
  constructor(
    private readonly youTubeService: YoutubeService,
    private readonly vimeoService: VimeoService,
    private readonly action$: Actions,
    private readonly router: Router
  ) {}

  AddYouTubeVideo$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(VideoActions.addYouTubeVideo),
      mergeMap(({ videoId }) =>
        this.youTubeService.addVideo(videoId).pipe(
          map((video) => {
            if (!video) {
              return VideoActions.addYouTubeVideoFail();
            }
            this.router.navigate(['home']);
            return VideoActions.addYouTubeVideoSuccess(video);
          }),
          catchError(() => {
            return of(VideoActions.addYouTubeVideoFail());
          })
        )
      )
    )
  );

  AddVimeoVideo$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(VideoActions.addVimeoVideo),
      mergeMap(({ videoId }) =>
        this.vimeoService.addVideo(videoId).pipe(
          map((video) => {
            if (!video) {
              return VideoActions.addVimeoVideoFail();
            }
            this.router.navigate(['home']);
            return VideoActions.addVimeoVideoSuccess(video);
          }),
          catchError(() => {
            return of(VideoActions.addVimeoVideoFail());
          })
        )
      )
    )
  );
}
