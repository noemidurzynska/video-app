import { PlatformEnum } from '@core/enums/platform.enum';

export interface Video {
  id: string;
  playesCount: number;
  playsCountDescription: string;
  likesCount: number;
  title: string;
  image: string;
  date: Date;
  sourceType: PlatformEnum;
  urlCode: string;
  fav: boolean;
  creationDate: Date;
}
