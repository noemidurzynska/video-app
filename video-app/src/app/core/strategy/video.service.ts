import { Injectable } from '@angular/core';
import { PlatformEnum } from '@core/enums/platform.enum';
import { Video } from '@core/models/video';
import { Observable } from 'rxjs';
import { VimeoService } from '@core/vimeo/vimeo.service';
import { YoutubeService } from '@core/youtube/youtube.service';

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
}
