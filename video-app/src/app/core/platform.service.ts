import { Video } from '@core/models/video';
import { Observable } from 'rxjs';

export interface PlatformService<T> {
  addVideo(videoId: Video['id']): Observable<Video>;
  parseVideo(response: T, videoId: Video['id']): Video;
  extractIdentifier(videoId: Video['id']): string;
  getUrlAddress(urlCode: string): string;
}
