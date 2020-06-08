import { Video } from '@core/models/video';

export interface VideoState {
  videoId: string;
  showErrorMessage: boolean;
  videoList: Video[];
}

export const initializeState = (): VideoState => ({
  videoId: '',
  videoList: [],
  showErrorMessage: false,
});
