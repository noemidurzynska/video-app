import { PlatformEnum } from '../enums/platform.enum';

export class Video {
  public id: string;
  public playesCount: number;
  public playsCountDescription: string;
  public likesCount: number;
  public title: string;
  public image: string;
  public date: Date;
  public sourceType: PlatformEnum;
  public urlCode: string;
  public fav: boolean;
  public creationDate: Date;
}
