import { Injectable } from '@angular/core';
import { YoutubeService } from '@core/youtube/youtube.service';
import { VimeoService } from '@core/vimeo/vimeo.service';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as VideoActions from '@store/videos/video.actions';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { mergeMap, map, catchError } from 'rxjs/operators';

@Injectable()
export class VideoEffects {
  constructor(
    private readonly youTubeService: YoutubeService,
    private readonly vimeoService: VimeoService,
    private readonly action$: Actions
  ) {}

  AddYouTubeVideo$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(VideoActions.addYouTubeVideo),
      mergeMap((action) =>
        this.youTubeService.addVideo(action.videoId).pipe(
          map((response) => {
            const video = this.youTubeService.parseVideo(response, action.videoId);
            if (video === null) {
              return VideoActions.addYouTubeVideoFail();
            } else {
              return VideoActions.addYouTubeVideoSuccess(video);
            }
          }),
          catchError((error: Error) => {
            return of(VideoActions.addYouTubeVideoFail());
          })
        )
      )
    )
  );

  AddVimeoVideo$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(VideoActions.addVimeoVideo),
      mergeMap((action) =>
        this.vimeoService.addVideo(action.videoId).pipe(
          map((video) => {
            if (video === null) {
              return VideoActions.addVimeoVideoFail();
            } else {
              return VideoActions.addVimeoVideoSuccess(video);
            }
          }),
          catchError(() => {
            return of(VideoActions.addVimeoVideoFail());
          })
        )
      )
    )
  );
}
