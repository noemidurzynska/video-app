import { Injectable, Inject } from '@angular/core';
import { Video, Source } from '../models';
import { StorageService, LOCAL_STORAGE } from 'ngx-webstorage-service';

@Injectable()
export class StreamingPlatformService {
  constructor( @Inject (LOCAL_STORAGE) private storage: StorageService) {
  }

  public saveVideo(video: Video): void {

    let videoList = this.storage.get('video-list');
    if (videoList === undefined) {
      videoList = new Array<Video>();
    }

    const existingVideo = videoList.find(x => x.id === video.id);
    if (existingVideo) {
      return;
    }

    videoList.push(video);

    this.storage.set('video-list', videoList);
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

  public getUrlAddress(source: Source, urlCode: string): string {
    let urlAdress = '';
    if (source === Source.Youtube) {
      urlAdress = 'https://www.youtube.com/embed/' + urlCode;
    } else {
      urlAdress = 'https://player.vimeo.com/video/' + urlCode;
    }
    return urlAdress;
  }
}
