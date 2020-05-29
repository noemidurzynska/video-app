import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Video, Passwords } from '@core/models';
import { PlatformEnum } from '@core/enums/platform.enum';
import { AddVideoResult } from '@core/models/addVideoResult';
import { YouTubeResponse } from '@core/models/platforms/youtube/youtube.response';

@Injectable()
export class YoutubeService {
  public passwords = new Passwords();

  constructor(private readonly http: HttpClient) {}

  public addVideo(videoId: string): Observable<YouTubeResponse> {
    return this.http.get<YouTubeResponse>(
      'https://www.googleapis.com/youtube/v3/videos?id=' +
        videoId +
        '&key=' +
        this.passwords.YouTube +
        '&part=snippet,contentDetails,statistics,status'
    );
  }
  public parseVideo(response: YouTubeResponse, videoId: string): AddVideoResult {
    const videoResult = new AddVideoResult();

    if (response.items.length === 0) {
      videoResult.showErrorMessage = true;
      return videoResult;
    }

    const item = response.items[0];

    const video = new Video();
    video.sourceType = PlatformEnum.youTube;
    video.id = item.id;
    video.title = item.snippet.title;
    video.date = item.snippet.publishedAt;
    video.image = item.snippet.thumbnails.default.url;
    video.playesCount = item.statistics.viewCount;
    video.playsCountDescription = item.statistics.viewCount.toString();
    video.likesCount = item.statistics.likeCount;
    video.urlCode = videoId;
    video.creationDate = new Date();
    video.fav = false;

    videoResult.showErrorMessage = false;
    videoResult.video = video;
    return videoResult;
  }
}
