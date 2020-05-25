import * as VideoActions from './video.actions';
import { VideoState, initializeState } from './video.state';
import { Action, createReducer, on } from '@ngrx/store';
import { AddVideoResult } from '@core/models/addVideoResult';


export const initialState = initializeState();

const reducer = createReducer(
  initialState,
  on(VideoActions.AddYouTubeVideo, (state: VideoState, { videoId }) =>
    ({ ...state, showErrorMessage: true, videoId })
  ),
  on(VideoActions.AddYouTubeVideoSuccess, (state: VideoState, videoResult: AddVideoResult ) => {
    const videos = state.videoList.slice();
    if (!videoResult.isExistingVideo) {
      videos.push(videoResult.video);
    }
    return { ...state, videoList: videos, showErrorMessage: false};
  }),
  on(VideoActions.AddYouTubeVideoFail, (state: VideoState, { fail }) =>
    ({ ...state, showErrorMessage: fail })
  ),
  on(VideoActions.AddVimeoVideo, (state: VideoState, { videoId }) =>
    ({ ...state, showErrorMessage: true, videoId })
  ),
  on(VideoActions.AddVimeoVideoSuccess, (state: VideoState, videoResult: AddVideoResult  ) => {
    const videos = state.videoList.slice();
    if (!videoResult.isExistingVideo) {
      videos.push(videoResult.video);
    }
    return { ...state, videoList: videos, showErrorMessage: false};
  }),
  on(VideoActions.AddVimeoVideoFail, (state: VideoState, { fail }) =>
    ({ ...state, showErrorMessage: fail })
  ),
  on(VideoActions.SetVideos, (state: VideoState, { videos }) =>
  ({ ...state, videoList: videos})
  ),
  on(VideoActions.GetVideos, (state: VideoState) =>
    ({ ...state })
  )
);

export function VideoReducer(state: VideoState | undefined, action: Action) {
  return reducer(state, action);
}
