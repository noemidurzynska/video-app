import { Source } from './source.enum';

export class Video {
  public id: string;
  public playesCount: number;
  public likesCount: number;
  public title: string;
  public image: string;
  public date: Date;
  public source: Source;
}
