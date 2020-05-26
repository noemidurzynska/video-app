import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Video, Passwords } from '@core/models';
import { StreamingPlatformService } from '@core/common/streamingPlatform.service';
import { PlatformEnum } from '@core/enums/platform.enum';
import { AddVideoResult } from '@core/models/addVideoResult';

@Injectable()
export class YoutubeService {

  public passwords = new Passwords();

  constructor(private readonly http: HttpClient
    ,         private readonly streamingPlatformService: StreamingPlatformService) { }

  public getVideo(videoId: string): Observable<AddVideoResult> {

    return this.http.get('https://www.googleapis.com/youtube/v3/videos?id='
      + videoId +
      '&key='
      + this.passwords.YouTube +
      '&part=snippet,contentDetails,statistics,status')
      .pipe(
        switchMap((response: any) => {
        const videoResult = new AddVideoResult();


        if (response.items.length === 0) {
            videoResult.showErrorMessage = true;
            return of(videoResult);
          }

        const item = response.items[0];

        const video = new Video();
        video.sourceType = PlatformEnum.youTube;
        video.id = item.id;
        video.title = item.snippet.title;
        video.date = item.snippet.publishedAt;
        video.image = item.snippet.thumbnails.default.url;
        video.playesCount = item.statistics.viewCount;
        video.playsCountDescription = item.statistics.viewCount;
        video.likesCount = item.statistics.likeCount;
        video.urlCode = videoId;
        video.creationDate = new Date();

        videoResult.showErrorMessage = false;
        videoResult.video = video;
        return of(videoResult);
        })
      );
  }
}
