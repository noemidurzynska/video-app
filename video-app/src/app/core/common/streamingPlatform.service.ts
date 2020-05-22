import { Injectable, Inject } from '@angular/core';
import { Video } from '../models';
import { StorageService, LOCAL_STORAGE } from 'ngx-webstorage-service';
import { PlatformEnum } from '../enums/platform.enum';

@Injectable()
export class StreamingPlatformService {
  constructor( @Inject (LOCAL_STORAGE) private storage: StorageService) {
  }

  public saveVideo(video: Video): boolean {

    let videoList = this.storage.get('video-list');
    if (videoList === undefined) {
      videoList = new Array<Video>();
    }

    const existingVideo = videoList.find(x => x.id === video.id);
    if (existingVideo) {
      return existingVideo;
    }

    videoList.push(video);

    this.storage.set('video-list', videoList);
    return existingVideo;
  }

  public extractIdentifier(videoId: string): string {

    videoId = videoId
      .replace('https://www.', '')
      .replace('https://', '')
      .replace('youtube.com/watch?v=', '')
      .replace('youtu.be/', '')
      .replace('vimeo.com/', '');
    return videoId;
  }

  public getUrlAddress(source: PlatformEnum, urlCode: string): string {
    let urlAdress = '';
    if (source === PlatformEnum.youTube) {
      urlAdress = 'https://www.youtube.com/embed/' + urlCode;
    } else {
      urlAdress = 'https://player.vimeo.com/video/' + urlCode;
    }
    return urlAdress;
  }
}
