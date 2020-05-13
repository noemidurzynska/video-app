export class VideoState {
  VideoId: string;
  ShowErrorMessage: boolean;
}

export const initializeState = (): VideoState => {
  return { VideoId: '', ShowErrorMessage: false };
};
