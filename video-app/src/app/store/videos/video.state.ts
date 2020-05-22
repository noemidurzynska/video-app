import { Video } from 'src/app/core/models';

// tslint:disable-next-line: class-name
export interface VideoState {
  videoId: string;
  showErrorMessage: boolean;
  videoList: Video[];
}

export const initializeState = (): VideoState => {
  return { videoId: '', videoList: [] , showErrorMessage: false };
};
