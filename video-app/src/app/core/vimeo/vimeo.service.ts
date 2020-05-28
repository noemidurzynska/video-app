import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { Video, Passwords } from '@core/models';
import { StreamingPlatformService } from '@core/common/streamingPlatform.service';
import { PlatformEnum } from '@core/enums/platform.enum';
import { AddVideoResult } from '@core/models/addVideoResult';

@Injectable()
export class VimeoService {
  public passwords = new Passwords();

  constructor(
    private readonly http: HttpClient,
    private readonly streamingPlatformService: StreamingPlatformService
  ) {}

  public addVideo(videoId: string): Observable<AddVideoResult> {
    return this.http
      .get(
        'https://api.vimeo.com/videos/' +
          videoId +
          '?access_token=' +
          this.passwords.Vimeo
      )
      .pipe(
        switchMap((response: any) => {
          const videoResult = new AddVideoResult();
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

          videoResult.video = video;
          videoResult.showErrorMessage = false;
          return of(videoResult);
        }),
        catchError(() => {
          const videoResult = new AddVideoResult();
          videoResult.showErrorMessage = true;
          return of(videoResult);
        })
      );
  }
}
