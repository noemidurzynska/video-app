import { Source } from './source.enum';

export class VideoModel{
  public id: string;
  public playesCount: number;
  public likesCount: number;
  public title: string;
  public image: string;
  public date: Date;
  public rows: number;
  public cols: number;
  public source: Source;
}
