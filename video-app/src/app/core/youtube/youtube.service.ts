import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Video, Passwords, Source  } from '../models';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Router } from '@angular/router';

@Injectable()
export class YoutubeService {

  public passwords = new Passwords();

  constructor( private readonly http: HttpClient
    ,          @Inject(LOCAL_STORAGE) private storage: StorageService
    ,          private readonly router: Router){}

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

        this.saveVideo(video);

        if (redirect) {
          this.router.navigate(['/home']);
        }
      });
  }

  public saveVideo(video: Video): void {

    let videoList = this.storage.get('video-list');
    if (videoList === undefined) {
      videoList = new Array<Video>();
    }

    videoList.push(video);

    this.storage.set('video-list', videoList);
  }
}
