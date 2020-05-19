// tslint:disable-next-line: class-name
export interface VideoState {
  videoId: string;
  showErrorMessage: boolean;
  videoList: any[];
}

export const initializeState = (): VideoState => {
  return { videoId: '', videoList: [] , showErrorMessage: false };
};
