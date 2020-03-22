import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { Video, Passwords, Source } from '../models';
import { Router } from '@angular/router';
import { StreamingPlatformService } from '../common/streamingPlatform.service';

@Injectable()
export class VimeoService {

  public passwords = new Passwords();

  constructor(private readonly http: HttpClient
    ,         private readonly router: Router
    ,         private readonly streamingPlatform: StreamingPlatformService) { }

  public getVideo(videoId: string): Observable<boolean> {

    return this.http.get('https://api.vimeo.com/videos/' + videoId + '?access_token=' + this.passwords.Vimeo)
      .pipe(
        switchMap((response: any) => {
          const video = new Video();
          video.sourceType = Source.Vimeo;
          video.source = 'Vimeo';
          video.id = response.resource_key;
          video.title = response.name;
          video.date = response.created_time;
          video.image = response.pictures.sizes[0].link;
          video.likesCount = response.metadata.connections.likes.total;
          video.playsCountDescription = 'unknown';
          video.urlCode = videoId;
          video.creationDate = new Date();

          this.streamingPlatform.saveVideo(video);

          return of(false);
        })
        , catchError((error: any) => {
          return of(true);
        })
      );
  }
}
