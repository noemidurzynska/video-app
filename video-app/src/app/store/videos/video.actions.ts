import { createAction, props } from '@ngrx/store';
import { Video } from '@core/models/video';

export const addYouTubeVideo = createAction(
  '[Video] - Add YouTube Video',
  props<{ videoId: Video['id'] }>()
);

export const addYouTubeVideoSuccess = createAction(
  '[Video] - Add YouTube Video Success',
  props<Video>()
);

export const addYouTubeVideoFail = createAction('[Video] - Add YouTube Video Fail');

export const addVimeoVideo = createAction(
  '[Video] -  Add Vimeo Video',
  props<{ videoId: Video['id'] }>()
);

export const addVimeoVideoSuccess = createAction(
  '[Video] - Add Vimeo Video Success',
  props<Video>()
);

export const addVimeoVideoFail = createAction('[Video] - Add Vimeo Video Fail');

export const deleteVideo = createAction(
  '[Video] - Delete Video',
  props<{ videoId: Video['id'] }>()
);

export const clearVideos = createAction('[Video] - Clear Video');

export const toggleFavouriteVideo = createAction(
  '[Video] - Toggle Favourite Video',
  props<{ videoId: Video['id'] }>()
);
