import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { Video, Passwords } from '@core/models';
import { PlatformEnum } from '@core/enums/platform.enum';
import { VimeoResponse } from '@core/models/vimeo.response';

@Injectable()
export class VimeoService {
  public passwords = new Passwords();

  constructor(private readonly http: HttpClient) {}

  public addVideo(videoId: string): Observable<Video> {
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

  private parseVideo(response: VimeoResponse, videoId: string): Video {
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
}
