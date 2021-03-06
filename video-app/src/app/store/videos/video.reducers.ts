import * as VideoActions from './video.actions';
import { VideoState, initializeState } from './video.state';
import { Action, createReducer, on } from '@ngrx/store';
import { Video } from '@core/models/video';

export const initialState = initializeState();

const reducer = createReducer(
  initialState,
  on(VideoActions.addVideo, (state, { videoId, platform }) => ({
    ...state,
    showErrorMessage: false,
    videoId,
    platform,
  })),
  on(VideoActions.addVideoSuccess, (state, video: Video) => {
    const videos = [...state.videoList];
    const foundVideo = state.videoList.find((videoElement) => videoElement.id === video.id);

    if (!foundVideo) {
      videos.push(video);
    }

    return { ...state, videoList: videos, showErrorMessage: false };
  }),

  on(VideoActions.addVideoFail, (state) => ({ ...state, showErrorMessage: true })),

  on(VideoActions.addVideoSuccess, (state, video: Video) => {
    const videos = [...state.videoList];
    const foundVideo = state.videoList.find((videoElement) => videoElement.id === video.id);
    if (!foundVideo) {
      videos.push(video);
    }
    return { ...state, videoList: videos, showErrorMessage: false };
  }),
  on(VideoActions.addVideoFail, (state) => ({ ...state, showErrorMessage: true })),
  on(VideoActions.deleteVideo, (state, { videoId }) => ({
    ...state,
    videoList: state.videoList.filter((videoElement) => videoElement.id !== videoId),
  })),
  on(VideoActions.clearVideos, (state, {}) => ({ ...state, videoList: [] })),
  on(VideoActions.toggleFavouriteVideo, (state, { videoId }) => {
    const videos = [...state.videoList];
    const videoIndex = videos.findIndex((videoElement) => videoElement.id === videoId);

    videos[videoIndex] = { ...videos[videoIndex], fav: !videos[videoIndex].fav };
    return { ...state, videoList: videos };
  })
);

export function VideoReducer(state: VideoState | undefined, action: Action) {
  return reducer(state, action);
}
