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
          const video = new Video();
          video.sourceType = PlatformEnum.vimeo;
          video.id = response.resource_key;
          video.title = response.name;
          video.date = response.created_time;
          video.image = response.pictures.sizes[0].link;
          video.likesCount = response.metadata.connections.likes.total;
          video.playsCountDescription = 'unknown';
          video.urlCode = videoId;
          video.creationDate = new Date();
          return of(video);
        }),
        catchError(() => {
          return of(null);
        })
      );
  }
}
