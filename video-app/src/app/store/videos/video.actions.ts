import { createAction, props } from '@ngrx/store';
import { Video } from 'src/app/core/models';
import { AddVideoResult } from 'src/app/core/models/addVideoResult';

export const AddYouTubeVideo = createAction(
  '[Video] - Add YouTube Video',
  props<{ videoId: string }>()
);

export const AddYouTubeVideoSuccess = createAction(
  '[Video] - Add YouTube Video Success',
  props<AddVideoResult>()
);

export const AddYouTubeVideoFail = createAction(
  '[Video] - Add YouTube Video Fail',
  props<{ fail: boolean }>()
);

export const AddVimeoVideo = createAction(
  '[Video] -  Add Vimeo Video',
  props<{ videoId: string }>()
);

export const AddVimeoVideoSuccess = createAction(
  '[Video] - Add Vimeo Video Success',
  props<AddVideoResult>()
);

export const AddVimeoVideoFail = createAction(
  '[Video] - Add Vimeo Video Fail',
  props<{ fail: boolean }>()
);

export const SetVideos = createAction(
  '[Video] - Set Videos',
  props<{ videos: Video[] }>()
);

export const GetVideos = createAction(
  '[Video] - Get Videos',
);
