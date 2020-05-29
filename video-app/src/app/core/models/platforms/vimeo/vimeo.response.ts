import { VimeoPictures } from './vimeoPictures';
import { VimeoMetadata } from './vimeoMetaData';

export class VimeoResponse {
  public resource_key: string;
  public name: string;
  public created_time: Date;
  public pictures: VimeoPictures = new VimeoPictures();
  public metadata: VimeoMetadata = new VimeoMetadata();
}
