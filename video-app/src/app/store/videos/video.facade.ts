import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VideoState } from './video.state';
import {
  addVideo,
  addVideoSuccess,
  addVideoFail,
  deleteVideo,
  clearVideos,
  toggleFavouriteVideo,
} from './video.actions';
import { Store } from '@ngrx/store';
import { VideoStateModel } from '@core/models/videoState.model';
import { Video } from '@core/models/video';
import { PlatformEnum } from '@core/enums/platform.enum';

@Injectable()
export class VideoFacade {
  public videos$: Observable<VideoState> = this.store.select('videos');

  constructor(private readonly store: Store<VideoStateModel>) {}

  addVideo(payload: { videoId: Video['id']; platform: PlatformEnum }): void {
    this.store.dispatch(addVideo(payload));
  }

  addVideoSuccess(video: Video): void {
    this.store.dispatch(addVideoSuccess(video));
  }

  addVideoFail(): void {
    this.store.dispatch(addVideoFail());
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
}
