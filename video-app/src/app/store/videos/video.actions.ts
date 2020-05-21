import { createAction, props } from '@ngrx/store';

export const AddYouTubeVideo = createAction(
  '[Video] - Add YouTube Video',
  props<{ videoId: string }>()
);

export const AddYouTubeVideoSuccess = createAction(
  '[Video] - Add YouTube Video Success',
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
  props<{ fail: boolean }>()
);

export const AddVimeoVideoFail = createAction(
  '[Video] - Add Vimeo Video Fail',
  props<{ fail: boolean }>()
);
