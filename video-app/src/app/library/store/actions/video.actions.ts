import { createAction, props } from '@ngrx/store';

import { Video } from '../../../core/models';

export const BeginAddVideoAction = createAction(
  '[Video] - Begin Add Video',
  props<{ payload: Video }>()
);

export const SuccesAddVideoAction = createAction(
  '[Video] - Succes Add Video',
  props<{ payload: Video[] }>()
);

export const ErrorAddVideoAction = createAction(
  '[Video] - Error Add Video',
  props<Error>()
);
