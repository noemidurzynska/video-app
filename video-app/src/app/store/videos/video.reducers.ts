import * as VideoActions from './video.actions';
import { VideoState, initializeState } from './video.state';
import { Action, createReducer, on } from '@ngrx/store';


export const initialState = initializeState();

const reducer = createReducer(
  initialState,
  on(VideoActions.BeginYouTubeAddVideoAction, (state: VideoState, { videoId }) => {
    return { ...state, showErrorMessage: true, videoId };
  }),
  on(VideoActions.AddYouTubeVideoSuccess, (state: VideoState, { fail }) => {
    return { ...state, showErrorMessage: fail };
  }),
  on(VideoActions.AddYouTubeVideoFail, (state: VideoState, { fail }) => {
    return { ...state, showErrorMessage: fail };
  }),
  on(VideoActions.BeginVimeoAddVideoAction, (state: VideoState, { videoId }) => {
    return { ...state, showErrorMessage: true, videoId };
  }),
  on(VideoActions.AddVimeoVideoSuccess, (state: VideoState, { fail }) => {
    return { ...state, showErrorMessage: fail };
  }),
  on(VideoActions.AddVimeoVideoFail, (state: VideoState, { fail }) => {
    return { ...state, showErrorMessage: fail };
  }),
);

export function VideoReducer(state: VideoState | undefined, action: Action) {
  return reducer(state, action);
}
