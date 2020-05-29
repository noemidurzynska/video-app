import { YouTubeThumbnails } from './youtubeThumbnails';

export class YouTubeSnippet {
  public title: string;
  public publishedAt: Date;
  public thumbnails: YouTubeThumbnails = new YouTubeThumbnails();
}
