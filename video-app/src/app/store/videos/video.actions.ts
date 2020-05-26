import { createAction, props } from '@ngrx/store';
import { AddVideoResult } from '@core/models/addVideoResult';

export const addYouTubeVideo = createAction(
  '[Video] - Add YouTube Video',
  props<{ videoId: string }>()
);

export const addYouTubeVideoSuccess = createAction(
  '[Video] - Add YouTube Video Success',
  props<AddVideoResult>()
);

export const addYouTubeVideoFail = createAction(
  '[Video] - Add YouTube Video Fail',
  props<{ fail: boolean }>()
);

export const addVimeoVideo = createAction(
  '[Video] -  Add Vimeo Video',
  props<{ videoId: string }>()
);

export const addVimeoVideoSuccess = createAction(
  '[Video] - Add Vimeo Video Success',
  props<AddVideoResult>()
);

export const addVimeoVideoFail = createAction(
  '[Video] - Add Vimeo Video Fail',
  props<{ fail: boolean }>()
);

export const deleteVideo = createAction(
  '[Video] - Delete Video',
  props<{ videoId: string }>()
);

export const clearVideos = createAction(
  '[Video] - Clear Video'
);

export const toggleFavouriteVideo = createAction(
  '[Video] - Toggle Favourite Video',
  props<{ videoId: string }>()
);

