import { createAction, props } from '@ngrx/store';

export const BeginYouTubeAddVideoAction = createAction(
  '[Video] - Begin YouTube Add Video',
  props<{ videoId: string }>()
);

export const AddYouTubeVideoSuccess = createAction(
  '[Video] - Add YouTube Video Success',
  props<{ fail: boolean }>()
);

export const AddYouTubeVideoFail = createAction(
  '[Video] - Add YouTube Video Fail',
  props<{ fail: boolean }>()
);

export const BeginVimeoAddVideoAction = createAction(
  '[Video] - Begin Vimeo Add Video',
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
