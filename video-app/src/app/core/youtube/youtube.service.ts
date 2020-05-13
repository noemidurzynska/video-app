import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Video, Passwords, Source } from '../models';
import { VideoState } from 'src/app/library/store/states/video.state';
import { Store } from '@ngrx/store';
import * as VideoActions from '../../library/store/actions/video.actions';

@Injectable()
export class YoutubeService {

  public passwords = new Passwords();

  constructor(private readonly http: HttpClient
    ,         private readonly store: Store<{ videos: VideoState }>) { }

  public getVideo(videoId: string): Observable<any> {

    return this.http.get('https://www.googleapis.com/youtube/v3/videos?id='
      + videoId +
      '&key='
      + this.passwords.YouTube +
      '&part=snippet,contentDetails,statistics,status')
      .pipe(
        switchMap((response: any) => {

          if (response.items.length === 0) {
            return of(true);
          }

          const item = response.items[0];

          const video = new Video();
          video.sourceType = Source.Youtube;
          video.source = 'Youtube';
          video.id = item.id;
          video.title = item.snippet.title;
          video.date = item.snippet.publishedAt;
          video.image = item.snippet.thumbnails.default.url;
          video.playesCount = item.statistics.viewCount;
          video.playsCountDescription = item.statistics.viewCount;
          video.likesCount = item.statistics.likeCount;
          video.urlCode = videoId;
          video.creationDate = new Date();

          this.store.dispatch(VideoActions.BeginAddVideoAction({ payload: video }));
          return of(false);
        })
      );
  }
}
