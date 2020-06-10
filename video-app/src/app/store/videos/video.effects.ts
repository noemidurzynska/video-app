import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as VideoActions from '@store/videos/video.actions';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { VideoService } from '@core/video.service';

@Injectable()
export class VideoEffects {
  constructor(
    private readonly action$: Actions,
    private readonly router: Router,
    private readonly videoService: VideoService
  ) {}

  AddVideo$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(VideoActions.addVideo),
      mergeMap(({ videoId, platform }) =>
        this.videoService.addVideo(videoId, platform).pipe(
          map((video) => {
            if (!video) {
              return VideoActions.addVideoFail();
            }
            this.router.navigate(['home']);
            return VideoActions.addVideoSuccess(video);
          }),
          catchError(() => {
            return of(VideoActions.addVideoFail());
          })
        )
      )
    )
  );
}
