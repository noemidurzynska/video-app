import { Video } from '@core/models';

export interface VideoState {
  videoId: string;
  showErrorMessage: boolean;
  videoList: Video[];
}

export const initializeState = (): VideoState => ({ videoId: '', videoList: [] , showErrorMessage: false });
