import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VideoState } from './video.state';
import { addVideo, deleteVideo, clearVideos, toggleFavouriteVideo } from './video.actions';
import { Store } from '@ngrx/store';
import { VideoStateModel } from '@core/models/videoState.model';
import { Video } from '@core/models/video';
import { PlatformEnum } from '@core/enums/platform.enum';
import { VideoService } from '@core/video.service';

@Injectable()
export class VideoFacade {
  public videos$: Observable<VideoState> = this.store.select('videos');

  constructor(
    private readonly store: Store<VideoStateModel>,
    private readonly videoService: VideoService
  ) {}

  addVideo(payload: { videoId: Video['id']; platform: PlatformEnum }): void {
    this.store.dispatch(addVideo(payload));
  }

  deleteVideo(payload: { videoId: Video['id'] }): void {
    this.store.dispatch(deleteVideo(payload));
  }

  clearVideos(): void {
    this.store.dispatch(clearVideos());
  }

  toggleFavouriteVideo(payload: { videoId: Video['id'] }): void {
    this.store.dispatch(toggleFavouriteVideo(payload));
  }

  extractIdentifier(platform: PlatformEnum, videoId: Video['id']): string {
    return this.videoService.extractIdentifier(platform, videoId);
  }
  getUrlAddress(platform: PlatformEnum, urlCode: string): string {
    return this.videoService.getUrlAddress(platform, urlCode);
  }
}
