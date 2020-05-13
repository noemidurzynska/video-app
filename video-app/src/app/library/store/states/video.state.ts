import { Video } from '../../../core/models';

export class VideoState {
  Videos: Video[];
  VideoError: Error;
}

export const initializeState = (): VideoState => {
  return { Videos: Array<Video>(), VideoError: null };
};
