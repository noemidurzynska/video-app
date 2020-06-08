import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PlatformEnum } from '@core/enums/platform.enum';
import { YouTubeResponse } from '@core/models/youtube.response';
import { Video } from '@core/models/video';
import { Passwords } from '@core/models/passwords';
import { VideoStrategy } from '@core/strategy/videoStrategy';
import { switchMap, catchError } from 'rxjs/operators';

@Injectable()
export class YoutubeService implements VideoStrategy {
  public passwords = new Passwords();

  constructor(private readonly http: HttpClient) {}

  public addVideo(videoId: Video['id']): Observable<Video> {
    return this.http
      .get<YouTubeResponse>(
        `https://www.googleapis.com/youtube/v3/videos?id=${videoId}
        &key=${this.passwords.YouTube}&part=snippet,contentDetails,statistics,status`
      )
      .pipe(
        switchMap((response: YouTubeResponse) => {
          const video = this.parseVideo(response, videoId);
          return of(video);
        }),
        catchError(() => {
          return of(null);
        })
      );
  }
  private parseVideo(response: YouTubeResponse, videoId: Video['id']): Video {
    if (response.items.length === 0) {
      return null;
    }

    const item = response.items[0];

    const video: Video = {
      sourceType: PlatformEnum.youTube,
      id: item.id,
      title: item.snippet.title,
      date: item.snippet.publishedAt,
      image: item.snippet.thumbnails.default.url,
      playesCount: item.statistics.viewCount,
      playsCountDescription: item.statistics.viewCount.toString(),
      likesCount: item.statistics.likeCount,
      urlCode: videoId,
      creationDate: new Date(),
      fav: false,
    };
    return video;
  }
}
