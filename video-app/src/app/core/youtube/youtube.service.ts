import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Video, Passwords, Source } from '../models';
import { StreamingPlatformService } from '../';

@Injectable()
export class YoutubeService {

  public passwords = new Passwords();

  constructor(private readonly http: HttpClient
    ,         private readonly streamingPlatformService: StreamingPlatformService) { }

  public getVideo(videoId: string): Observable<boolean> {

    console.log('ngrx youtube test');

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

          this.streamingPlatformService.saveVideo(video);
          return of(false);
        })
      );
  }
}
