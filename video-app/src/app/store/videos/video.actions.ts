import { createAction, props } from '@ngrx/store';
import { Video } from '@core/models/video';
import { PlatformEnum } from '@core/enums/platform.enum';

export const addVideo = createAction(
  '[Video] -  Add Video',
  props<{ videoId: Video['id']; platform: PlatformEnum }>()
);

export const addVideoSuccess = createAction('[Video] - Add Video Success', props<Video>());

export const addVideoFail = createAction('[Video] - Add Video Fail');

export const deleteVideo = createAction(
  '[Video] - Delete Video',
  props<{ videoId: Video['id'] }>()
);

export const clearVideos = createAction('[Video] - Clear Video');

export const toggleFavouriteVideo = createAction(
  '[Video] - Toggle Favourite Video',
  props<{ videoId: Video['id'] }>()
);
