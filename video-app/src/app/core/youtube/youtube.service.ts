import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Video, Passwords } from '@core/models';
import { PlatformEnum } from '@core/enums/platform.enum';
import { YouTubeResponse } from '@core/models/youtube.response';

@Injectable()
export class YoutubeService {
  public passwords = new Passwords();

  constructor(private readonly http: HttpClient) {}

  public addVideo(videoId: string): Observable<YouTubeResponse> {
    return this.http.get<YouTubeResponse>(
      `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${this.passwords.YouTube}&part=snippet,contentDetails,statistics,status`
    );
  }
  public parseVideo(response: YouTubeResponse, videoId: string): Video {
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
