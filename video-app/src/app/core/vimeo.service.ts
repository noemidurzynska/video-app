import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { PlatformEnum } from '@core/enums/platform.enum';
import { VimeoResponse } from '@core/models/vimeo.response';
import { Video } from '@core/models/video';
import { Passwords } from '@core/models/passwords';
import { PlatformService } from '@core/platform.service';

@Injectable()
export class VimeoService implements PlatformService<VimeoResponse> {
  public passwords = new Passwords();

  constructor(private readonly http: HttpClient) {}

  public addVideo(videoId: Video['id']): Observable<Video> {
    return this.http
      .get(`https://api.vimeo.com/videos/${videoId}?access_token=${this.passwords.Vimeo}`)
      .pipe(
        switchMap((response: VimeoResponse) => {
          const video = this.parseVideo(response, videoId);
          return of(video);
        }),
        catchError(() => {
          return of(null);
        })
      );
  }

  public parseVideo(response: VimeoResponse, videoId: Video['id']): Video {
    const video: Video = {
      sourceType: PlatformEnum.vimeo,
      id: response.resource_key,
      title: response.name,
      date: response.created_time,
      image: response.pictures.sizes[0].link,
      likesCount: response.metadata.connections.likes.total,
      playsCountDescription: 'unknown',
      urlCode: videoId,
      creationDate: new Date(),
      playesCount: null,
      fav: false,
    };
    return video;
  }
  public extractIdentifier(videoId: Video['id']): string {
    return videoId.replace('https://www.', '').replace('https://', '').replace('vimeo.com/', '');
  }

  public getUrlAddress(urlCode: string): string {
    return `https://player.vimeo.com/video/${urlCode}`;
  }
}
