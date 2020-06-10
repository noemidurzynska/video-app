import { Injectable } from '@angular/core';
import { PlatformEnum } from '@core/enums/platform.enum';
import { Video } from '@core/models/video';
import { Observable } from 'rxjs';
import { VimeoService } from '@core/vimeo.service';
import { YoutubeService } from '@core/youtube.service';

@Injectable()
export class VideoService {
  constructor(
    private readonly youTubeService: YoutubeService,
    private readonly vimeoService: VimeoService
  ) {}
  public addVideo(videoId: string, platform: PlatformEnum): Observable<Video> {
    if (platform === PlatformEnum.vimeo) {
      return this.vimeoService.addVideo(videoId);
    }
    if (platform === PlatformEnum.youTube) {
      return this.youTubeService.addVideo(videoId);
    }
  }
  public extractIdentifier(platform: PlatformEnum, videoId: Video['id']): string {
    if (platform === PlatformEnum.vimeo) {
      return this.vimeoService.extractIdentifier(videoId);
    }
    if (platform === PlatformEnum.youTube) {
      return this.youTubeService.extractIdentifier(videoId);
    }
  }

  public getUrlAddress(platform: PlatformEnum, urlCode: string): string {
    if (platform === PlatformEnum.vimeo) {
      return this.vimeoService.getUrlAddress(urlCode);
    }
    if (platform === PlatformEnum.youTube) {
      return this.youTubeService.getUrlAddress(urlCode);
    }
  }
}
