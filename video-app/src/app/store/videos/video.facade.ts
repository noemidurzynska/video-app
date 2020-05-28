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
import { AddVideoResult } from '@core/models/addVideoResult';

@Injectable()
export class VideoFacade {
  public videos$: Observable<VideoState>;

  constructor(private store: Store) {}

  addYouTubeVideo(payload: { videoId: string }) {
    this.store.dispatch(addYouTubeVideo(payload));
  }
  addYouTubeVideoSuccess(addVideoResult: AddVideoResult) {
    this.store.dispatch(addYouTubeVideoSuccess(addVideoResult));
  }
  addYouTubeVideoFail() {
    this.store.dispatch(addYouTubeVideoFail());
  }
  addVimeoVideo(payload: { videoId: string }) {
    this.store.dispatch(addVimeoVideo(payload));
  }
  addVimeoVideoSuccess(addVideoResult: AddVideoResult) {
    this.store.dispatch(addVimeoVideoSuccess(addVideoResult));
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
