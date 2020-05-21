import { Injectable } from '@angular/core';
import { YoutubeService } from 'src/app/core/youtube/youtube.service';
import { VimeoService } from 'src/app/core/vimeo/vimeo.service';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as VideoActions from './video.actions';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
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
            map(isWrong => {
              if (isWrong) {
                return VideoActions.AddYouTubeVideoFail({fail: true});
              } else {
                 this.router.navigate(['/home']);
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
            map(isWrong => {
              return VideoActions.AddVimeoVideoSuccess({ fail: isWrong });
            }),
            catchError((error: Error) => {
              return of(VideoActions.AddVimeoVideoFail({ fail: true }));
            }),
            tap((state) => {
              if (!state.fail) {
                this.router.navigate(['/home']);
              }
            })
          )
      )
    )
  );
}
