import { createAction, props } from '@ngrx/store';

export const BeginYouTubeAddVideoAction = createAction(
  '[Video] - Begin YouTube Add Video',
  props<{ payload: string }>()
);

export const SuccesYouTubeAddVideoAction = createAction(
  '[Video] - Succes YouTube Add Video',
  props<{ payload: boolean }>()
);

export const ErrorYouTubeAddVideoAction = createAction(
  '[Video] - Error YouTube Add Video',
  props<{ payload: boolean }>()
);

export const BeginVimeoAddVideoAction = createAction(
  '[Video] - Begin Vimeo Add Video',
  props<{ payload: string }>()
);

export const SuccesVimeoAddVideoAction = createAction(
  '[Video] - Succes Vimeo Add Video',
  props<{ payload: boolean }>()
);

export const ErrorVimeoAddVideoAction = createAction(
  '[Video] - Error Vimeo Add Video',
  props<{ payload: boolean }>()
);
