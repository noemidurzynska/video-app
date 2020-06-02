import { Injectable } from '@angular/core';
import { PlatformEnum } from '@core/enums/platform.enum';

@Injectable()
export class StreamingPlatformService {
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
    const urlAdress =
      source === PlatformEnum.youTube
        ? `https://www.youtube.com/embed/${urlCode}`
        : `https://player.vimeo.com/video/${urlCode}`;
    return urlAdress;
  }
}
