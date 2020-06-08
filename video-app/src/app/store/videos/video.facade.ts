import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VideoState } from './video.state';
import {
  addYouTubeVideo,
  addYouTubeVideoSuccess,
  addYouTubeVideoFail,
  addVimeoVideo,
  addVimeoVideoSuccess,
  addVimeoVideoFail,
  deleteVideo,
  clearVideos,
  toggleFavouriteVideo,
} from './video.actions';
import { Store } from '@ngrx/store';
import { VideoStateModel } from '@core/models/videoState.model';
import { Video } from '@core/models/video';

@Injectable()
export class VideoFacade {
  public videos$: Observable<VideoState> = this.store.select('videos');

  constructor(private readonly store: Store<VideoStateModel>) {}

  addYouTubeVideo(payload: { videoId: Video['id'] }): void {
    this.store.dispatch(addYouTubeVideo(payload));
  }

  addYouTubeVideoSuccess(video: Video): void {
    this.store.dispatch(addYouTubeVideoSuccess(video));
  }

  addYouTubeVideoFail(): void {
    this.store.dispatch(addYouTubeVideoFail());
  }

  addVimeoVideo(payload: { videoId: Video['id'] }): void {
    this.store.dispatch(addVimeoVideo(payload));
  }

  addVimeoVideoSuccess(video: Video): void {
    this.store.dispatch(addVimeoVideoSuccess(video));
  }

  addVimeoVideoFail(): void {
    this.store.dispatch(addVimeoVideoFail());
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
