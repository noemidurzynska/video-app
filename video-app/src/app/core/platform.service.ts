import { Video } from '@core/models/video';
import { Observable } from 'rxjs';
import { VimeoResponse } from './models/vimeo.response';
import { YouTubeResponse } from './models/youtube.response';

export interface PlatformService {
  addVideo(videoId: Video['id']): Observable<Video>;
  parseVideo(response: VimeoResponse | YouTubeResponse, videoId: Video['id']): Video;
  extractIdentifier(videoId: Video['id']): string;
  getUrlAddress(urlCode: string): string;
}
