import { Video } from '@core/models/video';
import { Observable } from 'rxjs';

export interface VideoStrategy {
  addVideo(videoId: Video['id']): Observable<Video>;
}
