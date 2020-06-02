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
import { Video } from '@core/models';

@Injectable()
export class VideoFacade {
  public videos$: Observable<VideoState> = this.store.select('videos');

  constructor(private readonly store: Store<VideoStateModel>) {}

  addYouTubeVideo(payload: { videoId: string }) {
    this.store.dispatch(addYouTubeVideo(payload));
  }

  addYouTubeVideoSuccess(video: Video) {
    this.store.dispatch(addYouTubeVideoSuccess(video));
  }

  addYouTubeVideoFail() {
    this.store.dispatch(addYouTubeVideoFail());
  }

  addVimeoVideo(payload: { videoId: string }) {
    this.store.dispatch(addVimeoVideo(payload));
  }

  addVimeoVideoSuccess(video: Video) {
    this.store.dispatch(addVimeoVideoSuccess(video));
  }

  addVimeoVideoFail() {
    this.store.dispatch(addVimeoVideoFail());
  }

  deleteVideo(payload: { videoId: string }) {
    this.store.dispatch(deleteVideo(payload));
  }

  clearVideos() {
    this.store.dispatch(clearVideos());
  }

  toggleFavouriteVideo(payload: { videoId: string }) {
    this.store.dispatch(toggleFavouriteVideo(payload));
  }
}
