import * as VideoActions from '../actions/video.actions';
import { initializeState, VideoState } from '../states/video.state';
import { Action, createReducer, on } from '@ngrx/store';

export const initialState = initializeState();

const reducer = createReducer(
  initialState,
  on(VideoActions.BeginYouTubeAddVideoAction, (state: VideoState, { payload }) => {
    return { ...state, VideoId: payload, VideoError: null };
  }),
  on(VideoActions.SuccesYouTubeAddVideoAction, (state: VideoState, { payload }) => {
    return { ...state, ShowErrorMessage: payload };
  }),
  on(VideoActions.ErrorYouTubeAddVideoAction, (state: VideoState, { payload }) => {
    return { ...state, ShowErrorMessage: payload };
  }),
  on(VideoActions.BeginVimeoAddVideoAction, (state: VideoState, { payload }) => {
    return { ...state, VideoId: payload, VideoError: null };
  }),
  on(VideoActions.SuccesVimeoAddVideoAction, (state: VideoState, { payload }) => {
    return { ...state, ShowErrorMessage: payload };
  }),
  on(VideoActions.ErrorVimeoAddVideoAction, (state: VideoState, { payload }) => {
    return { ...state, ShowErrorMessage: payload };
  }),
);

export function VideoReducer(state: VideoState | undefined, action: Action) {
  return reducer(state, action);
}
