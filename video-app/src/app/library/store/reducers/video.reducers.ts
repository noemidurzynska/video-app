import * as VideoActions from '../actions/video.actions';
import { initializeState, VideoState } from '../states/video.state';
import { Action, createReducer, on } from '@ngrx/store';

export const initialState = initializeState();

const reducer = createReducer(
  initialState,
  on(VideoActions.BeginAddVideoAction, (state: VideoState, { payload }) => {
    return { ...state, Videos: [...state.Videos, payload], VideoError: null };
  }),
  on(VideoActions.SuccesAddVideoAction, (state: VideoState, { payload }) => {
    return { ...state, Videos: payload };
  }),
  on(VideoActions.ErrorAddVideoAction, (state: VideoState, error: Error) => {
    return { ...state, VideoError: error };
  }),
);

export function VideoReducer(state: VideoState | undefined, action: Action) {
  return reducer(state, action);
}
