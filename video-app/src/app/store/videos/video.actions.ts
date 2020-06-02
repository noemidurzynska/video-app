import { createAction, props } from '@ngrx/store';
import { AddVideoResult } from '@core/models/addVideoResult';
import { Video } from '@core/models';

export const addYouTubeVideo = createAction(
  '[Video] - Add YouTube Video',
  props<{ videoId: string }>()
);

export const addYouTubeVideoSuccess = createAction(
  '[Video] - Add YouTube Video Success',
  props<Video>()
);

export const addYouTubeVideoFail = createAction('[Video] - Add YouTube Video Fail');

export const addVimeoVideo = createAction(
  '[Video] -  Add Vimeo Video',
  props<{ videoId: string }>()
);

export const addVimeoVideoSuccess = createAction(
  '[Video] - Add Vimeo Video Success',
  props<Video>()
);

export const addVimeoVideoFail = createAction('[Video] - Add Vimeo Video Fail');

export const deleteVideo = createAction('[Video] - Delete Video', props<{ videoId: string }>());

export const clearVideos = createAction('[Video] - Clear Video');

export const toggleFavouriteVideo = createAction(
  '[Video] - Toggle Favourite Video',
  props<{ videoId: string }>()
);
