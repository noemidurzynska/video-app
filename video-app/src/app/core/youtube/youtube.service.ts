import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Video, Passwords, Source  } from '../models';
import { Router } from '@angular/router';
import { StreamingPlatformService } from '../common/streamingPlatform.service';

@Injectable()
export class YoutubeService {

  public passwords = new Passwords();

  constructor( private readonly http: HttpClient
    ,          private readonly router: Router
    ,          private readonly streamingPlatform: StreamingPlatformService ) {}

  public getYouTubeVideo(videoId: string, redirect: boolean, self: any): void {

    this.http.get('https://www.googleapis.com/youtube/v3/videos?id='
      + videoId +
      '&key='
      + this.passwords.YouTube +
      '&part=snippet,contentDetails,statistics,status')
      .subscribe((response: any) => {

        if (response.items.length === 0) {
          self.showErrorMessage = true;
          return;
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

        this.streamingPlatform.saveVideo(video);

        if (redirect) {
          this.router.navigate(['/home']);
        }
      });
  }
}